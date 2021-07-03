
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/pawan/Web-Dev/Dev-Setup/Gatsby-Setup/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/pawan/Web-Dev/Dev-Setup/Gatsby-Setup/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/home/pawan/Web-Dev/Dev-Setup/Gatsby-Setup/src/pages/index.js")),
  "component---src-templates-markdown-js": preferDefault(require("/home/pawan/Web-Dev/Dev-Setup/Gatsby-Setup/src/templates/markdown.js"))
}

