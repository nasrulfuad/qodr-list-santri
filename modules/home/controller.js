const { getToken, getData } = require('../../core/helpers');

module.exports = {
	home: async (req, res) => {
		const { filter } = req.query;
		let query;
		let filterNav;
		switch (filter) {
			case 'santri':
				filterNav = 'santri';
				query = `SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri WHERE status_santri='santri'`;
				break;
			case 'alumni':
				filterNav = 'alumni';
				query = `SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri WHERE status_santri='alumni'`;
				break;
			case 'cabang':
				filterNav = { id: 'cabang', nama: req.query.nama_cabang };
				query = `SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri WHERE cabang_sekarang='${req.query.nama_cabang}'`;
				break;
			default:
				filterNav = 'all';
				query =
					'SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri';
				break;
		}

		const cabang = await getData(getToken, 'SELECT * FROM cabang');
		const students = await getData(getToken, query);

		const breadcrumbs = [{ name: 'Home', url: '#', active: true }];

		res.render('front/home', {
			menu: 'santri',
			students,
			breadcrumbs,
			cabang,
			filterNav
		});
	},

	show: async (req, res) => {
		const [student] = await getData(
			getToken,
			`SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri WHERE uid='${req.params.id}'`
		);
		const breadcrumbs = [
			{ name: 'Home', url: '/', active: false },
			{ name: 'Details', url: '#', active: true },
			{ name: student.nama, url: '#', active: true }
		];
		res.render('front/single', { menu: 'santri', student, breadcrumbs });
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
