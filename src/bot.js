const { Bot } = require('grammy')
const { bot_token } = require('../config')
const { createAuthFlow } = require('./actions/authFlow')

function startBot() {
	const bot = new Bot(bot_token)

	bot.command('start', async ctx => {
		await ctx.reply(
			'Привет! Давай начнём авторизацию. Введи номер телефона в формате +380...'
		)
		ctx.session = { step: 'phone' }
	})

	bot.on('message:text', async ctx => {
		await createAuthFlow(ctx)
	})

	bot.catch(err => console.error('Bot error:', err))

	bot.start()
	console.log('Bot started')
}

module.exports = { startBot }
