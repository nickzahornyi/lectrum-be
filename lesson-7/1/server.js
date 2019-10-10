const net = require('net');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { validateFilter, findUser } = require('./utils');

const server = net.createServer();
const PORT = process.env.PORT || 8090;
const readFile = promisify(fs.readFile);
const filePath = path.resolve(__dirname, './data/users.json');

server.on('connection', socket => {
	socket.on('data', async msg => {
		const filter = JSON.parse(msg.toString());
		validateFilter(filter);

		const file = await readFile(filePath, {
			encoding: 'utf8',
		});

		const result = findUser(JSON.parse(file), filter);

		socket.write(JSON.stringify(result));
	});

	socket.on('error', error => console.log(error));

	socket.on('end', () => {
		console.log('Client is disconnected!');
	});
});

server.on('listening', () => {
	const { port } = server.address();
	console.log(`TCP Server started on port ${port}!`);
});

server.listen(PORT);
