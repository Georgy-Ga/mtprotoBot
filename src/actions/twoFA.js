const { call, mtproto } = require('../mtproto')

async function check2FA(ctx, user) {
	try {
		const pass = await call('account.getPassword')
		const { srp_id, current_algo, srp_B } = pass
		const { g, p, salt1, salt2 } = current_algo

		const { A, M1 } = await mtproto.crypto.getSRPParams({
			g,
			p,
			salt1,
			salt2,
			gB: srp_B,
			password: user.password,
		})

		await call('auth.checkPassword', {
			password: { _: 'inputCheckPasswordSRP', srp_id, A, M1 },
		})

		user.step = 'authorized'
		await ctx.reply('2FA успешно проверена! Теперь доступно /saved')
	} catch (err) {
		await ctx.reply('Ошибка 2FA: ' + err.error_message)
	}
}

module.exports = { check2FA }
