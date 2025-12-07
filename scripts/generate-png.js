#!/usr/bin/env node

/**
 * Generate PNG files from SVG files in multiple sizes
 * This script requires sharp package to be installed: npm install sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const config = {
  inputDir: './public/emojis/blue-svg',
  outputDir: './public/emojis/blue-png',
  sizes: [64, 128, 256], // PNG sizes to generate
  backgroundColor: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
};

async function generatePNGs() {
  console.log('🚀 Starting PNG generation...');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  try {
    // Get all SVG files from input directory
    const svgFiles = fs.readdirSync(config.inputDir).filter(file => file.endsWith('.svg'));

    if (svgFiles.length === 0) {
      console.log('⚠️  No SVG files found in', config.inputDir);
      console.log('Please run the color conversion script first to generate SVG files.');
      return;
    }

    console.log(`📁 Found ${svgFiles.length} SVG files`);

    // Process each SVG file
    for (const svgFile of svgFiles) {
      const svgPath = path.join(config.inputDir, svgFile);
      const baseName = path.basename(svgFile, '.svg');

      console.log(`🎨 Processing ${svgFile}...`);

      // Read SVG content
      const svgBuffer = fs.readFileSync(svgPath);

      // Generate PNGs for each size
      for (const size of config.sizes) {
        const pngFileName = `${baseName}-${size}.png`;
        const pngPath = path.join(config.outputDir, pngFileName);

        try {
          await sharp(svgBuffer)
            .resize(size, size, {
              fit: 'contain',
              background: config.backgroundColor
            })
            .png({
              compressionLevel: 9,
              adaptiveFiltering: true
            })
            .toFile(pngPath);

          console.log(`  ✅ Generated ${pngFileName}`);
        } catch (error) {
          console.error(`  ❌ Error generating ${pngFileName}:`, error.message);
        }
      }
    }

    console.log('✅ PNG generation completed successfully!');

    // Output statistics
    const totalPNGs = svgFiles.length * config.sizes.length;
    console.log(`📊 Generated ${totalPNGs} PNG files in ${config.sizes.length} different sizes`);

  } catch (error) {
    console.error('❌ Error during PNG generation:', error);
    process.exit(1);
  }
}

// Check if sharp is available
try {
  require.resolve('sharp');
} catch (e) {
  console.log('⚠️  Sharp package not found. Please install it with:');
  console.log('   npm install sharp');
  console.log('   # or');
  console.log('   yarn add sharp');
  process.exit(1);
}

// Run the script
if (require.main === module) {
  generatePNGs();
}

module.exports = { generatePNGs };