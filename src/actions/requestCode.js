const { call } = require('../mtproto')

async function requestCode(ctx, user) {
	try {
		const res = await call('auth.sendCode', {
			phone_number: user.phone,
			settings: { _: 'codeSettings' },
		})

		user.phone_code_hash = res.phone_code_hash

		await ctx.reply('Отлично! Теперь введи код, который пришёл в Telegram.')
	} catch (err) {
		await ctx.reply('Ошибка при отправке кода: ' + err.error_message)
	}
}

module.exports = { requestCode }
