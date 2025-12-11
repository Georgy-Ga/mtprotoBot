const { call, mtproto } = require('../mtproto')

async function signIn(ctx, user) {
	try {
		const res = await call('auth.signIn', {
			phone_number: user.phone,
			phone_code: user.code,
			phone_code_hash: user.phone_code_hash,
		})

		if (res._ === 'auth.authorizationSignUpRequired') {
			await ctx.reply('Этот номер новый. Но мы не делаем регистрацию.')
			return
		}

		user.step = 'authorized'
		await ctx.reply(
			'Авторизация прошла успешно! Можешь писать /saved чтобы получить последнее сообщение из избранного.'
		)
	} catch (err) {
		if (err.error_message === 'SESSION_PASSWORD_NEEDED') {
			user.step = '2fa'
			await ctx.reply('Введи пароль двухфакторной аутентификации:')
			return
		}

		await ctx.reply('Ошибка при входе: ' + err.error_message)
	}
}

module.exports = { signIn }
