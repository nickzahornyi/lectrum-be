const net = require('net');

const client = new net.Socket();

client.connect(8090, () => {
	client.write(
		JSON.stringify({
			filter: {
				address: {
					zip: '69610',
					city: 'South Clarabelleshire',
					country: 'Mayotte',
					street: '984 McCullough',
				},
			},
			meta: {
				format: 'csv',
				archive: true,
			},
		})
	);
});

client.on('data', data => {
	console.log(data.toString());
});

client.on('close', () => {
	console.log('Connection closed!');
});
