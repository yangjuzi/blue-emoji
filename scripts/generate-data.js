#!/usr/bin/env node

/**
 * Generate emoji data JSON from OpenMoji metadata
 * This script creates the data/list.json file with emoji information
 */

const fs = require('fs');
const path = require('path');

const config = {
  openmojiDataPath: './temp/openmoji/data/openmoji.json',
  outputPath: './data/list.json',
  blueColor: '#2563eb', // Tailwind blue-600

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

  // Initialize category counts
  Object.values(config.categoryMapping).forEach(catId => {
    categoryCounts[catId] = 0;
  });

  // Filter and process emojis
  const filteredEmojis = openmojiData.filter(emoji => {
    // Skip skin tone variations and empty annotations
    return emoji.annotation &&
           !emoji.annotation.includes('skin tone') &&
           emoji.annotation.trim() !== '';
  });

  console.log(`🔍 Found ${filteredEmojis.length} valid emojis`);

  processedEmojis.push(...filteredEmojis.map(emoji => {
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
      svgPath: `/emojis/blue-svg/${emoji.hexcode}.svg`,
      pngPath: `/emojis/blue-png/${emoji.hexcode}-64.png`
    };
  }));

  // Create categories array
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
  console.log('⚠️  Using fallback emoji data...');

  const fallbackEmojis = [
    {
      hexcode: '1F499',
      annotation: 'blue heart',
      group: 'Symbols'
    },
    {
      hexcode: '1F535',
      annotation: 'blue circle',
      group: 'Symbols'
    },
    {
      hexcode: '1F30A',
      annotation: 'water wave',
      group: 'Travel & Places'
    },
    {
      hexcode: '1F4A7',
      annotation: 'droplet',
      group: 'Symbols'
    },
    {
      hexcode: '1F4D8',
      annotation: 'blue book',
      group: 'Objects'
    },
    {
      hexcode: '1F48E',
      annotation: 'gem stone',
      group: 'Objects'
    },
    {
      hexcode: '1F327',
      annotation: 'cloud with rain',
      group: 'Symbols'
    },
    {
      hexcode: '1F4A4',
      annotation: 'sleeping face',
      group: 'Smileys & Emotion'
    },
    {
      hexcode: '1F40B',
      annotation: 'whale',
      group: 'Animals & Nature'
    },
    {
      hexcode: '1F41F',
      annotation: 'fish',
      group: 'Animals & Nature'
    }
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
      console.log('⚠️  OpenMoji data not found. Using fallback data.');
      console.log('   Run the color conversion script first to download OpenMoji data.');
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
      console.log(`  ${category.name}: ${category.count} emojis`);
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