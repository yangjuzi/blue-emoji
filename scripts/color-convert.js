/**
 * Fully working OpenMoji blue color converter
 * Downloads full SVG set + metadata + color transforms
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
// 假设您已经安装并使用了 decompress
const decompress = require("decompress"); 

// --- 配置常量 ---
const TEMP_ZIP = "./temp-openmoji.zip";
const TEMP_BASE_DIR = "./temp-openmoji"; 
// ⬇️ 路径修正：SVG 文件位于解压的根目录下
const TEMP_DIR = TEMP_BASE_DIR; 

const OUTPUT_DIR = "./public/emojis/blue-svg-smileys";
const SMILEYS_TEMP_DIR = "./temp-smileys-only";
const METADATA_PATH = path.join(TEMP_BASE_DIR, "openmoji.json"); 

// Stable GitHub Releases URLs
const OPENMOJI_SVG_URL =
  "https://github.com/hfg-gmuend/openmoji/releases/latest/download/openmoji-svg-color.zip";
const OPENMOJI_JSON_URL = 
    "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/data/openmoji.json";

// --- 颜色替换函数 ---

// Force color replace (yellow/black → blue/dark blue)
function convertToBlue(svgContent) {
  return svgContent
    // 核心黄色和浅色
    .replace(/#fcea2b/gi, "#3B82F6") // 核心面部黄色
    .replace(/#FFD83D/gi, "#3B82F6") // 典型黄色
    .replace(/#FFDD00/gi, "#3B82F6") // OpenMoji 标准黄色
    .replace(/#FFC900/gi, "#3B82F6") // 另一种面部主体黄
    .replace(/#FFE657/gi, "#60A5FA") // 亮黄色/高光 -> 浅蓝色
    .replace(/#FFE233/gi, "#60A5FA") // 另一种高亮/浅黄 -> 浅蓝色

    // 深黄色和阴影
    .replace(/#FFCC4D/gi, "#2563EB") // 深黄色 -> 深蓝色
    .replace(/#FEE433/gi, "#1D4ED8") // 备份黄色 -> 更深的蓝色
    .replace(/#FADB00/gi, "#2563EB") // 中度阴影黄 -> 深蓝色
    .replace(/#FFB400/gi, "#1D4ED8") // 深橙黄/阴影 -> 更深的蓝色
    
    // 最深阴影和棕色轮廓
    .replace(/#D99900/gi, "#1E3A8A") // 最深的棕/橙阴影 -> 深蓝阴影
    
    // 黑色线条替换
    .replace(/#000000/gi, "#1A202C") // 替换纯黑线条为极深蓝灰
    .replace(/#262626/gi, "#2C3647"); // 替换柔和黑线条为深蓝
}

// --- 实用工具函数 ---

// Generic Redirect-Safe Downloader
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log("↪️ Redirecting to:", res.headers.location);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);

      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

// Extract zip file using decompress
function unzipFile(zipPath, extractTo) {
    // decompress 返回一个 Promise，处理解压
    return decompress(zipPath, extractTo);
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// --- 主运行函数 ---

async function run() {
  try {
    console.log("🎨 Converting OpenMoji SVG to blue theme...");
    
    // 确保创建基础解压目录
    ensureDir(TEMP_BASE_DIR); 
    ensureDir(OUTPUT_DIR);
    ensureDir(SMILEYS_TEMP_DIR); 

    console.log("📥 Downloading SVG package...");
    await downloadFile(OPENMOJI_SVG_URL, TEMP_ZIP);

    console.log("📦 Extracting package...");
    // 解压到基础目录 TEMP_BASE_DIR
    await unzipFile(TEMP_ZIP, TEMP_BASE_DIR);

    console.log("📋 Downloading metadata...");
    await downloadFile(OPENMOJI_JSON_URL, METADATA_PATH);

    const metaRaw = fs.readFileSync(METADATA_PATH, "utf8");
    const meta = JSON.parse(metaRaw);

    console.log(`🔍 Found ${meta.length} emojis in metadata`);

    let processed = 0;
    let skipped = 0;
    let smileysCopied = 0; 
    const TARGET_CATEGORY = "smileys-emotion"; 

    console.log(`\n➡️ Processing only "${TARGET_CATEGORY}" category...`);

    for (const emoji of meta) {
      const id = emoji.hexcode;
      
      // 1. 过滤：只处理目标类别
      if (emoji.group !== TARGET_CATEGORY) {
        skipped++; 
        continue;
      }

      // ⬇️ 路径现在指向正确的位置：./temp-openmoji/1F600.svg
      const svgPath = path.join(TEMP_DIR, `${id}.svg`); 

      // 2. 检查文件是否存在
      if (!fs.existsSync(svgPath)) {
        // 现在只有当文件确实不存在时才跳过，而不是因为目录错误
        skipped++;
        continue;
      }
      
      // 3. 复制原始 SVG 文件到暂存目录
      const destPath = path.join(SMILEYS_TEMP_DIR, `${id}.svg`);
      fs.copyFileSync(svgPath, destPath); 
      smileysCopied++;

      // 4. 颜色转换和保存
      const svg = fs.readFileSync(svgPath, "utf8"); 
      const blueSVG = convertToBlue(svg);

      // 保存蓝色版本到 OUTPUT_DIR
      fs.writeFileSync(path.join(OUTPUT_DIR, `${id}.svg`), blueSVG, "utf8");
      processed++;
    }

    console.log("\n🎉 Done!");
    console.log(`📄 Smileys Copied (Original SVG): ${smileysCopied}`);
    console.log(`✔ Processed (Color Converted): ${processed}`);
    console.log(`✖ Skipped (Non-target/Missing):   ${meta.length - smileysCopied}`);
    console.log(`📁 Saved blue SVGs to: ${OUTPUT_DIR}`);
    
    console.log("\n🧹 Cleaning temp files...");
    fs.rmSync(TEMP_ZIP, { force: true });
    // ⚠️ 不删除 TEMP_BASE_DIR，因为它包含 openmoji.json 供 generate:data 使用
  } catch (err) {
    console.error("❌ Fatal error:", err);
  }
}

run();