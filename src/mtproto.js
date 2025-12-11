const MTProto = require('@mtproto/core')
const fs = require('fs-extra')
const { api_id, api_hash, storageDir, storagePath } = require('../config')
const path = require('path')

// Always recreate clean session on boot
fs.removeSync(storageDir)
fs.mkdirSync(storageDir)

const mtproto = new MTProto({
	api_id,
	api_hash,
	storageOptions: {
		path: storagePath,
	},
})

async function call(method, params, options = {}) {
	try {
		return await mtproto.call(method, params, options)
	} catch (error) {
		const { error_code, error_message } = error

		if (error_code === 420) {
			const ms = Number(error_message.split('_')[1]) * 1000
			await new Promise(res => setTimeout(res, ms))
			return call(method, params, options)
		}

		if (error_code === 303) {
			const [type, dcId] = error_message.split('_MIGRATE_')
			options.dcId = Number(dcId)
			return call(method, params, options)
		}

		throw error
	}
}

module.exports = { mtproto, call }
