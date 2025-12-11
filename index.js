const api = require('./src/api')
const auth = require('./src/auth')

const mainFunction = async () => {
	await auth()

	const chats = await api.call('messages.getDialogs', {
		offset_date: 0,
		offset_id: 0,
		offset_peer: { _: 'inputPeerEmpty' },
		limit: 100,
		hash: 0,
	})

	console.log(chats)
}

mainFunction()
