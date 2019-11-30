const fetch = require('node-fetch');
const FormData = require('form-data');
const BODY_FOR_GET_TOKEN = [
	{ key: 'go', value: 'get_token' },
	{ key: 'domain', value: 'localhost' },
	{ key: 'size', value: '3159' },
	{ key: 'k', value: 'XzI0Ll9fOC5fXzMuX182Ll9fMy40OC5fOl8uX18zLl9fXw==' }
];

module.exports = {
	errHandler: fn => (req, res, next) => {
		try {
			const result = fn(req, res, next);
			return result.catch(next);
		} catch (err) {
			return next(err);
		}
	},
	getToken: async params => {
		const body = new FormData();
		params.forEach(param => body.append(param.key, param.value));
		try {
			return await (await fetch('http://qodr.or.id/route.php', {
				method: 'POST',
				body,
				headers: body.getHeaders()
			})).text();
		} catch (err) {
			console.log('err', err);
		}
	},
	getData: async (param, sqlParam) => {
		const token = await param(BODY_FOR_GET_TOKEN);
		const body = new FormData();
		const BODY_FOR_GET_SANTRI = [
			{ key: 'go', value: 'eskiel' },
			{
				key: 'token',
				value: token
			},
			{ key: 'data', value: sqlParam },
			{
				key: 'k',
				value: 'XzI0Ll9fOC5fXzMuX182Ll9fMy40OC5fOl8uX18zLl9fXw=='
			}
		];
		BODY_FOR_GET_SANTRI.forEach(param =>
			body.append(param.key, param.value)
		);
		try {
			return await (await fetch('http://qodr.or.id/route.php', {
				method: 'POST',
				body,
				headers: body.getHeaders()
			})).json();
		} catch (err) {
			console.log('Error Bro', err);
		}
	}
};
