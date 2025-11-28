const http = require("http");
const fs = require("fs");
const path = require("path");

// Aturan redirect berdasarkan host
const redirects = {
  "wibuinfo.fst": { target: "https://wibuinfo.com", status: 301 }
};

// Fungsi untuk melayani file statis
function serveStaticFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  const host = req.headers.host;
  const rule = redirects[host];

  if (rule) {
    res.writeHead(rule.status, { Location: rule.target });
    res.end();
  } else {
    const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
    serveStaticFile(filePath, res);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});