const { call } = require('../mtproto')

async function sendLastSaved(ctx) {
	try {
		const peer = { _: 'inputPeerSelf' }

		const dialog = await call('messages.getHistory', {
			peer,
			limit: 1,
		})

		if (dialog.messages.length === 0) {
			await ctx.reply('В избранном нет сообщений.')
			return
		}

		const msg = dialog.messages[0].message
		await ctx.reply('Последнее сообщение из избранного:\n' + msg)
	} catch (err) {
		await ctx.reply('Ошибка: ' + err.error_message)
	}
}

module.exports = { sendLastSaved }
