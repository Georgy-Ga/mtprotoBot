require('dotenv').config()
const path = require('path')

module.exports = {
	api_id: Number(process.env.API_ID),
	api_hash: process.env.API_HASH,
	bot_token: process.env.BOT_TOKEN,
	storageDir: path.join(__dirname, 'src/data'),
	storagePath: path.join(__dirname, 'src/data/session.json'),
}
