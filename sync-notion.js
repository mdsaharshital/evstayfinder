const NotionParse = require("@kodaps/notion-parse");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

// 🔁 Clean content folder
function cleanFolder(contentType) {
  const folder = path.join(
    process.cwd(),
    "src",
    "content",
    contentType.toLowerCase()
  );
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((file) => {
      if (file.endsWith(".md")) {
        fs.unlinkSync(path.join(folder, file));
      }
    });
    console.log(`🧹 Cleaned old files from /${contentType}`);
  }
}

(async () => {
  const contentTypes = [
    { databaseId: process.env.NOTION_CITY_DB_ID, contentType: "City" },
    { databaseId: process.env.NOTION_BLOG_DB_ID, contentType: "Blog" },
    { databaseId: process.env.NOTION_HOTEL_DB_ID, contentType: "Hotel" },
  ];

  for (const { databaseId, contentType } of contentTypes) {
    cleanFolder(contentType); // remove old files
  }

  await NotionParse.parseNotion(
    process.env.NOTION_TOKEN,
    "./src/content",
    contentTypes,
    true
  );

  console.log("✅ Synced Notion content");
})();
