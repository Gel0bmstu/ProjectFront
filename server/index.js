const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {

	console.log('request', req.url);
	const filename = `./public${req.url}`

	fs.readFile(filename, {encoding: 'utf8'}, (err, body) => {
		if (err) {
			console.log("err, try to open", filename,  "file: ", err);
			const jsFile = fs.readFileSync(`./public/index.html`, {encoding: 'utf8'}, (err, body))

			if (err) {
				console.log(err);
			}

			res.write(jsFile);
			res.end();

			return;
		}

		res.write(body);
		res.end();	
	})

});

server.listen(8080);

console.log("hello world");
