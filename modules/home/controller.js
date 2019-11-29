// const students = require('../../data.json');
const fetch = require('node-fetch');
const FormData = require('form-data');

const BODY_FOR_GET_TOKEN = [
	{ key: 'go', value: 'get_token' },
	{ key: 'domain', value: 'localhost' },
	{ key: 'size', value: '3159' },
	{ key: 'k', value: 'XzI0Ll9fOC5fXzMuX182Ll9fMy40OC5fOl8uX18zLl9fXw==' }
];

const getToken = async params => {
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
};

const getData = async (param, sqlParam) => {
	const token = await param(BODY_FOR_GET_TOKEN);
	const body = new FormData();
	const BODY_FOR_GET_SANTRI = [
		{ key: 'go', value: 'eskiel' },
		{
			key: 'token',
			value: token
		},
		{ key: 'data', value: sqlParam },
		{ key: 'k', value: 'XzI0Ll9fOC5fXzMuX182Ll9fMy40OC5fOl8uX18zLl9fXw==' }
	];
	BODY_FOR_GET_SANTRI.forEach(param => body.append(param.key, param.value));
	try {
		return await (await fetch('http://qodr.or.id/route.php', {
			method: 'POST',
			body,
			headers: body.getHeaders()
		})).json();
	} catch (err) {
		console.log('Error Bro', err);
	}
};

module.exports = {
	home: async (req, res) => {
		const students = await getData(
			getToken,
			'SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri'
		);
		const breadcrumbs = [{ name: 'Home', url: '#', active: true }];
		res.render('front/home', { menu: 'santri', students, breadcrumbs });
	},

	show: async (req, res) => {
		const [student] = await getData(
			getToken,
			`SELECT uid, foto, nama, cabang_sekarang, panggilan, kota_asal, no_telp, nama_ortu, alamat, email, status_santri, fb FROM santri WHERE uid='${req.params.id}'`
		);
		console.log(student);
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
