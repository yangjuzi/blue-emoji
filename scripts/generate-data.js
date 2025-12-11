#!/usr/bin/env node

/**
 * Generate emoji data JSON from OpenMoji metadata
 * This script creates the data/list.json file with emoji information
 */

const fs = require('fs');
const path = require('path');

const config = {
  openmojiDataPath: './temp-openmoji/openmoji.json', 
  outputPath: './data/list.json',
  blueColor: '#1E7BF7', // Tailwind blue-600

  // Emoji categories mapping
  categoryMapping: {
    'Smileys & Emotion': 'smileys-emotion',
    'People & Body': 'people',
    'Animals & Nature': 'animals-nature',
    'Food & Drink': 'food-drink',
    'Travel & Places': 'travel-places',
    'Activities': 'activities',
    'Objects': 'objects',
    'Symbols': 'symbols',
    'Flags': 'flags'
  }
};

// Generate slug from emoji name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Get emoji unicode character
function getEmojiCharacter(unicode) {
  // Convert hexcode to actual emoji character
  const codePoints = unicode.split('-').map(hex => parseInt(hex, 16));
  return String.fromCodePoint(...codePoints);
}

// Format unicode string
function formatUnicode(unicode) {
  return 'U+' + unicode.replace(/-/g, '+').toUpperCase();
}

// Process OpenMoji data
function processOpenMojiData(openmojiData) {
  console.log('📊 Processing OpenMoji data...');

  const processedEmojis = [];
  const categoryCounts = {};
  
  // 目标类别，与 color-convert.js 保持一致
  const TARGET_CATEGORY = 'smileys-emotion'; 
  
  // Initialize category counts
  Object.values(config.categoryMapping).forEach(catId => {
    categoryCounts[catId] = 0;
  });

  // 1. 过滤：跳过肤色和空注解
  const initiallyFilteredEmojis = openmojiData.filter(emoji => {
    return emoji.annotation &&
           !emoji.annotation.includes('skin tone') &&
           emoji.annotation.trim() !== '';
  });
  
  // 2. 关键修改：再次过滤，只保留目标类别
  const finalEmojis = initiallyFilteredEmojis.filter(emoji => {
    return emoji.group === TARGET_CATEGORY;
  });

  console.log(`🔍 Found ${finalEmojis.length} valid emojis for "${TARGET_CATEGORY}"`);

  // 迭代最终的表情符号列表
  processedEmojis.push(...finalEmojis.map(emoji => {
    // 由于我们已经过滤，category 应该是 'smileys-emotion'
    const category = config.categoryMapping[emoji.group] || 'symbols'; 
    const slug = generateSlug(emoji.annotation);
    const emojiChar = getEmojiCharacter(emoji.hexcode);

    // Count categories
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    return {
      id: slug,
      name: emoji.annotation,
      category: category,
      unicode: formatUnicode(emoji.hexcode),
      emoji: emojiChar,
      keywords: [
        slug.replace(/-/g, ' '),
        category.replace(/-/g, ' '),
        ...extractKeywords(emoji.annotation)
      ],
      description: generateDescription(emoji.annotation),
      // 路径保持不变，使用新的子目录
      svgPath: `/emojis/blue-svg-smileys/${emoji.hexcode}.svg`, 
      // 如果您也修改了 PNG 目录，这里也要对应修改
      pngPath: `/emojis/blue-png/${emoji.hexcode}-64.png` 
    };
  }));

  // Create categories array
  // 由于只处理一个类别，这里只会有一个类别计数大于 0
  const categories = Object.entries(categoryCounts)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => ({
      id,
      name: formatCategoryName(id),
      count
    }));

  return {
    emojis: processedEmojis,
    categories
  };
}

// Extract keywords from emoji name
function extractKeywords(name) {
  return name
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 5); // Limit to 5 keywords
}

// Generate emoji description
function generateDescription(name) {
  const descriptions = {
    'blue heart': 'The Blue Heart emoji represents affection, support, and deep platonic love. It is often associated with trust, serenity, and loyalty.',
    'water wave': 'A wave of water, representing the ocean, sea, or water in general.',
    'droplet': 'A single droplet of water, representing moisture, rain, or small amounts of liquid.',
    'blue circle': 'A solid blue circle, often used to represent the color blue or circular objects.',
    'gem stone': 'A precious gem stone, representing value, beauty, and rarity.'
  };

  const key = name.toLowerCase();
  if (descriptions[key]) {
    return descriptions[key];
  }

  // Generate generic description
  return `The ${name} emoji represents ${name.toLowerCase()}, part of our blue-themed emoji collection.`;
}

// Format category name for display
function formatCategoryName(categoryId) {
  return categoryId.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Fallback emoji data when OpenMoji is not available
function getFallbackEmojiData() {
  console.log('⚠️  Using fallback emoji data...');

  // Fallback data only includes items for Smileys & Emotion (1F4A4) or others if needed
  const fallbackEmojis = [
    // ... (保留示例数据)
    { hexcode: '1F499', annotation: 'blue heart', group: 'Symbols' },
    { hexcode: '1F535', annotation: 'blue circle', group: 'Symbols' },
    { hexcode: '1F4A4', annotation: 'sleeping face', group: 'Smileys & Emotion' }, // Smileys example
    { hexcode: '1F41F', annotation: 'fish', group: 'Animals & Nature' }
  ];

  return processOpenMojiData(fallbackEmojis);
}

// Main function to generate emoji data
async function generateEmojiData() {
  console.log('📝 Generating emoji data JSON...');

  try {
    let emojiData;

    // Try to read OpenMoji data
    if (fs.existsSync(config.openmojiDataPath)) {
      console.log('📖 Reading OpenMoji metadata...');
      const openmojiData = JSON.parse(fs.readFileSync(config.openmojiDataPath, 'utf8'));
      emojiData = processOpenMojiData(openmojiData);
    } else {
      console.log('⚠️  OpenMoji data not found. Using fallback data.');
      console.log('   Run the color conversion script first to download OpenMoji data.');
      emojiData = getFallbackEmojiData();
    }

    // Ensure output directory exists
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(config.outputPath, JSON.stringify(emojiData, null, 2), 'utf8');

    console.log('✅ Emoji data generation completed!');
    console.log(`📊 Generated data for ${emojiData.emojis.length} emojis`);
    console.log(`📁 Data saved to: ${config.outputPath}`);

    // Display category summary
    console.log('\n📋 Categories:');
    emojiData.categories.forEach(category => {
      console.log(`  ${category.name}: ${category.count} emojis`);
    });

    console.log('\n🎉 You can now start the development server with: npm run dev');

  } catch (error) {
    console.error('❌ Error generating emoji data:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateEmojiData();
}

module.exports = { generateEmojiData };