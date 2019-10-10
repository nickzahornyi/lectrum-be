const net = require('net');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const Json2csv = require('./json2csv');
const Archiver = require('./Archiver');

const { validateFilter, validateMeta, findUser } = require('./utils');

const server = net.createServer();
const PORT = process.env.PORT || 8090;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const filePath = path.resolve(__dirname, './data/users.json');
const resultFilePath = path.resolve(__dirname, './data/filtered-users.json');

server.on('connection', socket => {
	socket.on('data', async msg => {
		const filter = validateFilter(JSON.parse(msg.toString()).filter);
		const meta = validateMeta(JSON.parse(msg.toString()).meta);

    const file = await readFile(filePath, {
			encoding: 'utf8',
    });
    
		const result = findUser(JSON.parse(file), filter);

		if (!meta || typeof result === 'string') {
			socket.write(JSON.stringify(result));
		} else {
			const resultFile = await writeFile(resultFilePath, JSON.stringify(result));

			const parser = new Json2csv();
			parser.convert(resultFilePath);

			if (meta.archive) {
				const archiver = new Archiver(resultFilePath, { algorithm: 'gzip' });
				archiver.archive();
			}
		}
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
