import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, "tags.json");

const outputDir = path.join(process.cwd(), "output");
const filePath = path.join(outputDir, "tags.json");
const url = "https://dev.to/tags";
const tags = [];

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const getTags = async () => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  // Find all elements with crayons-tag class, find their innerText and add them to the tags array
  $("a.crayons-tag").each((_idx, el) => tags.push($(el).text()));
  console.log(tags)
  fs.writeFileSync(filePath, JSON.stringify(tags));
  console.log("Tags saved to tags.json");
};

getTags();
