module.exports = {
	errHandler: fn => (req, res, next) => {
		try {
			const result = fn(req, res, next);
			return result.catch(next);
		} catch (err) {
			return next(err);
		}
	}
};
