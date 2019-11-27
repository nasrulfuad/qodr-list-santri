const students = require('../../data.json');

module.exports = {
	home: async (req, res) => {
		const breadcrumbs = [{ name: 'Home', url: '#', active: true }];
		res.render('front/home', { menu: 'santri', students, breadcrumbs });
	},

	show: async (req, res) => {
		const [santri] = students.filter(s => s.id === req.params.id);
		const breadcrumbs = [
			{ name: 'Home', url: '/', active: false },
			{ name: 'Details', url: '#', active: true },
			{ name: santri.name, url: '#', active: true }
		];
		res.render('front/single', { menu: 'santri', santri, breadcrumbs });
	},

	about: async (req, res) => {
		const breadcrumbs = [
			{ name: 'Home', url: '/', active: false },
			{ name: 'About', url: '/about', active: true }
		];
		res.render('front/about', { menu: 'about', breadcrumbs });
	},

	contact: async (req, res) => {
		const breadcrumbs = [
			{ name: 'Home', url: '/', active: false },
			{ name: 'Contact', url: '/contact', active: true }
		];
		res.render('front/contact', { menu: 'contact', breadcrumbs });
	},

	insert: async (req, res) => {
		const breadcrumbs = [
			{ name: 'Home', url: '/', active: false },
			{ name: 'Insert', url: '/insert', active: true }
		];
		res.render('insert', { menu: 'insert', breadcrumbs });
	},

	insertPost: async (req, res) => {
		const { name, email, qualification, skills } = req.body;
		req.flash('success_msg', 'Alhamdulillah antum sudah terdaftar akhi!');
		res.redirect('/');
	}
};
