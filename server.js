'use strict';
const https = require("https");
const fs = require("fs");

const get_app_server = require('./app.js');

const database = require('./database.js');
const database_init = database.database_init;

/*
if(!process.env.SSL_CONTACT_EMAIL) {
	console.error(`[ERROR] The environment variable 'SSL_CONTACT_EMAIL' is not set, please set it.`);
	process.exit();
}
*/

(async () => {
	// Ensure database is initialized.
	await database_init();

	const app = await get_app_server();
	
	https.createServer(
		{
			key: fs.readFileSync(process.env.SSL_KEY_PATH),
			cert: fs.readFileSync(process.env.SSL_CERT_PATH),
		},
		app
	).listen(process.env.HTTPS_PORT, () => {
		console.log("xsshunnter-express listening on port:", process.env.HTTPS_PORT);
	});

	/*
		require('greenlock-express').init({
			packageRoot: __dirname,
			configDir: './greenlock.d',
			cluster: false,
				  maintainerEmail: process.env.SSL_CONTACT_EMAIL,
		}).serve(app);
		*/
})();
