const students = require('../../data.json');
const noDuplicateValueInArray = array => {
	const seen = {};
	return array.filter(item => {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
};

module.exports = {
	home: async (req, res) => {
		students.forEach(student => {
			student.skills = noDuplicateValueInArray(student.skills);
		});
		res.json({
			status: 'ok',
			message: 'Data available',
			data: students
		});
	},

	show: async (req, res) => {
		res.json({
			status: 'ok',
			message: 'Data available',
			data: students.filter(s => s.id === req.params.id)
		});
	}
};
