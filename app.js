const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {

	switch(req.method) {
		case "GET": 
			handleGETRequest(req, res);
			break;
		case "POST":
			handlePOSTRequest(req, res);
			break;
		default:
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end(`Internal Server Error. Requst methhod not supported.`);
	}

	
});

server.listen((8080), () => {
	console.log("Server is Running");
})





function handleGETRequest(req, res) {
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
}

function handlePOSTRequest(req, res) {
	var newEventStr = '';
	const EVENTS_FILEPATH = './data/sportData.json';

	req.on('data', line => newEventStr += line.toString());
	req.on('end', () => {
		const newEvent = JSON.parse(newEventStr);

		fs.readFile(EVENTS_FILEPATH, (err, content) => {
			if(err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end(`Internal Server Error. Unable to read events data file.\n Error message: ${err.message}`);
			}

			const allEvents = JSON.parse(content);

			allEvents.data.push(newEvent);

			fs.writeFile(EVENTS_FILEPATH, JSON.stringify(allEvents), (err) => {
				if(err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end(`Internal Server Error. Unable to store new event in data file.\n Error message: ${err.message}`);
				}

				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Successfully added new Event.');
			})
		})
	})
}

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