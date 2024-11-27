const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
	const reqRoute = req.url;

	const routes = {
		'/': 'public/index.html',
		'/data': 'data/sportData.json'
	}
	
	if(routes[reqRoute]) {
		const filePath = path.join(__dirname, routes[reqRoute]);

		respondReadFile(res, filePath);
	}
	else {
		const basePath = path.join(__dirname, 'public');
		const filePath = path.join(basePath, req.url);

		respondReadFile(res, filePath);		
	}
});

server.listen((8080), () => {
	console.log("Server is Running");
})




function parseContentType(filePath) {
	const extname = path.extname(filePath);

	const contentType = {
		".html": "text/html",
		".js"  : "application/javascript",
		".css" : "text/css",
		".json": "application/json",
		".ico" : "image/x-icon"
	}[extname] || "text/plain";

	return contentType;
}

function respondReadFile(res, filePath) {
	const contentType = parseContentType(filePath);

	fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end(`Internal Server Error: \n ${err.message}`);
		}
		
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(content, 'utf-8');
	});
}