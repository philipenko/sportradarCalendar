const http = require("http")

const server = http.createServer((req, res) => {
	res.
    res.write("Server created")
    res.end();
})

server.listen((8080), () => {
    console.log("Server is Running");
})