const session = require('../session')
const { requestCode } = require('./requestCode')
const { signIn } = require('./signIn')
const { check2FA } = require('./twoFA')
const { sendLastSaved } = require('./sendLastSaved')

async function createAuthFlow(ctx) {
	const chatId = ctx.chat.id
	const text = ctx.message.text

	if (!session[chatId]) session[chatId] = { step: 'phone' }

	const user = session[chatId]

	switch (user.step) {
		case 'phone':
			user.phone = text
			user.step = 'wait_code'
			await requestCode(ctx, user)
			break

		case 'wait_code':
			user.code = text
			await signIn(ctx, user)
			break

		case '2fa':
			user.password = text
			await check2FA(ctx, user)
			break

		case 'authorized':
			if (text === '/saved') {
				await sendLastSaved(ctx)
			} else {
				await ctx.reply(
					'Вы уже авторизованы. Напишите /saved чтобы отправить последнее сообщение из избранного.'
				)
			}
			break
	}
}

module.exports = { createAuthFlow }
