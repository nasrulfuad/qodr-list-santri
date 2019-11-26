const students = require('../../santri.json');

module.exports = {
	home: async (req, res) => {
		res.render('home', { menu: 'santri', students });
	},

	show: async (req, res) => {
		const [santri] = students.filter(s => s._id === req.params.id);
		res.render('single', { menu: 'santri', santri });
	},

	about: async (req, res) => {
		res.render('about', { menu: 'about' });
	},

	contact: async (req, res) => {
		res.render('contact', { menu: 'contact' });
	}
};
