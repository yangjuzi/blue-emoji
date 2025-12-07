#!/usr/bin/env node

/**
 * Convert OpenMoji SVG files to blue theme
 * This script downloads OpenMoji SVGs and converts them to blue color scheme
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const unzipper = require('unzipper');

const config = {
  // OpenMoji download URL
  openmojiUrl: 'https://github.com/hfg-gmuend/openmoji/releases/latest/download/openmoji-svg-color.zip',

  // Directories
  tempDir: './temp',
  openmojiDir: './temp/openmoji',
  outputDir: './public/emojis/blue-svg',

  // Blue color theme configuration
  blueColor: '#2563eb', // Tailwind blue-600
  colorsToReplace: [
    // Common OpenMoji colors to replace with blue
    '#FCEA2B', '#FFD23F', '#F1B31C', // Yellows
    '#FF9B21', '#FF8C7A', // Oranges
    '#FF4B55', '#EA5A47', // Reds
    '#95C11F', '#77B255', // Greens
    '#8A684A', '#B8956A', // Browns
    '#606060', '#3F3F3F', '#000000', // Grays/Black (optional)
  ]
};

// Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Download file from URL
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
    }).on('error', reject);
  });
}

// Extract zip file
function extractZip(zipPath, extractPath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .on('finish', resolve)
      .on('error', reject);
  });
}

// Process SVG content to replace colors with blue theme
function convertSvgToBlue(svgContent) {
  let modifiedContent = svgContent;

  // Replace specified colors with blue
  config.colorsToReplace.forEach(color => {
    // Replace fill attributes
    const fillRegex = new RegExp(`fill="${color}"`, 'g');
    modifiedContent = modifiedContent.replace(fillRegex, `fill="${config.blueColor}"`);

    // Replace style properties
    const styleRegex = new RegExp(`fill:\\s*${color}`, 'g');
    modifiedContent = modifiedContent.replace(styleRegex, `fill:${config.blueColor}`);
  });

  // Also replace common hex variations
  const colorVariations = [
    '#fce800', '#ffcc00', '#ff9933', // Yellow variations
    '#ff4444', '#cc0000', '#ff6666', // Red variations
    '#00aa00', '#00cc00', '#66bb6a', // Green variations
  ];

  colorVariations.forEach(color => {
    const fillRegex = new RegExp(`fill="${color}"`, 'g');
    modifiedContent = modifiedContent.replace(fillRegex, `fill="${config.blueColor}"`);
  });

  return modifiedContent;
}

// Get emoji list from metadata
function getEmojiList() {
  const metadataPath = path.join(config.openmojiDir, 'data', 'openmoji.json');

  if (!fs.existsSync(metadataPath)) {
    console.log('⚠️  OpenMoji metadata not found. Using default emoji list.');
    // Return a subset of common emojis as fallback
    return [
      { hexcode: '1F499', annotation: 'blue heart' },
      { hexcode: '1F535', annotation: 'blue circle' },
      { hexcode: '1F30A', annotation: 'water wave' },
      { hexcode: '1F4A7', annotation: 'droplet' },
      { hexcode: '1F4D8', annotation: 'blue book' },
      { hexcode: '1F48E', annotation: 'gem stone' },
      { hexcode: '1F327', annotation: 'cloud with rain' },
      { hexcode: '1F4A4', annotation: 'sleeping face' },
      { hexcode: '1F40B', annotation: 'whale' },
      { hexcode: '1F41F', annotation: 'fish' }
    ];
  }

  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    return metadata.filter(emoji => emoji.annotation && !emoji.annotation.includes('skin tone'));
  } catch (error) {
    console.error('Error reading OpenMoji metadata:', error);
    return [];
  }
}

// Main conversion function
async function convertColors() {
  console.log('🎨 Starting SVG color conversion to blue theme...');

  try {
    // Ensure directories exist
    ensureDir(config.tempDir);
    ensureDir(config.openmojiDir);
    ensureDir(config.outputDir);

    console.log('📥 Downloading OpenMoji SVG package...');

    // Download OpenMoji
    const zipPath = path.join(config.tempDir, 'openmoji.zip');
    await downloadFile(config.openmojiUrl, zipPath);

    console.log('📦 Extracting OpenMoji files...');
    await extractZip(zipPath, config.openmojiDir);

    console.log('📋 Getting emoji list...');
    const emojiList = getEmojiList();

    if (emojiList.length === 0) {
      console.log('⚠️  No emojis found to process.');
      return;
    }

    console.log(`🔄 Processing ${emojiList.length} emojis...`);

    let processedCount = 0;
    let skippedCount = 0;

    // Process each emoji
    for (const emoji of emojiList) {
      const svgFileName = `${emoji.hexcode}.svg`;
      const sourcePath = path.join(config.openmojiDir, 'svg', svgFileName);
      const targetPath = path.join(config.outputDir, svgFileName);

      if (fs.existsSync(sourcePath)) {
        try {
          // Read original SVG
          const svgContent = fs.readFileSync(sourcePath, 'utf8');

          // Convert to blue theme
          const blueSvgContent = convertSvgToBlue(svgContent);

          // Write modified SVG
          fs.writeFileSync(targetPath, blueSvgContent);

          processedCount++;

          if (processedCount % 50 === 0) {
            console.log(`  Processed ${processedCount} emojis...`);
          }
        } catch (error) {
          console.error(`❌ Error processing ${svgFileName}:`, error.message);
          skippedCount++;
        }
      } else {
        skippedCount++;
      }
    }

    console.log(`✅ Color conversion completed!`);
    console.log(`📊 Processed: ${processedCount} emojis`);
    console.log(`📊 Skipped: ${skippedCount} emojis`);
    console.log(`💾 Blue SVG files saved to: ${config.outputDir}`);

    // Clean up temporary files
    console.log('🧹 Cleaning up temporary files...');
    fs.rmSync(config.tempDir, { recursive: true, force: true });

    console.log('🎉 All done! You can now generate PNG files using npm run generate:png');

  } catch (error) {
    console.error('❌ Error during color conversion:', error);
    process.exit(1);
  }
}

// Check if required packages are available
try {
  require.resolve('unzipper');
} catch (e) {
  console.log('⚠️  Unzipper package not found. Please install it with:');
  console.log('   npm install unzipper');
  console.log('   # or');
  console.log('   yarn add unzipper');
  process.exit(1);
}

// Run the script
if (require.main === module) {
  convertColors();
}

module.exports = { convertColors };