import * as fs from "fs"
import * as path from "path"

export function getAssets(): {} {
  if (process.env.NODE_ENV === "development") {
    return {
      main: {
        js: "/static/main.js",
      },
    }
  }

  // Fetch Webpack build manifest for hashed chunk names:
  const webpackAssets = path.resolve(__dirname, "..", "..", "dist", "webpack-assets.json")
  return JSON.parse(fs.readFileSync(webpackAssets, "utf-8"))
}
