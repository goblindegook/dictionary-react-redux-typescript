import * as fs from "fs";
import * as path from "path";
import { IDocumentAssets } from "../containers/Document";

export default function compileAssets(): IDocumentAssets {
  const assets: IDocumentAssets = { css: [], js: [] };

  if (process.env.NODE_ENV === "development") {
    assets.js.push("main.js");
    return assets;
  }

  // Fetch Webpack build manifest for hashed chunk names:
  const statsFile = path.resolve(__dirname, "..", "..", "dist", "stats.json");
  const stats = JSON.parse(fs.readFileSync(statsFile, "utf-8"));
  const chunks = [].concat(
    stats.assetsByChunkName.vendor,
    stats.assetsByChunkName.main
  );

  // Filter out sourcemaps, etc.
  chunks.forEach(chunk => {
    const match = chunk.match(/\.(css|js)$/);
    if (match && match[1]) {
      assets[match[1]].push(chunk);
    }
  });

  return assets;
}
