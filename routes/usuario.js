const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/login', (req, res) => {
	const usuario = req.body.usuario;
	const password = req.body.password;
	try {
		req.app.locals.db
			.collection('usuario')
			.find({ usuario: usuario })
			.toArray(function (err, data) {
				if (err) {
					console.log('err:', err);
				} else if (data && data.length > 0) {
					if (bcrypt.compareSync(password, data[0].password)) {
						res.send({ message: 'logueado' });
					} else {
						res.send({ message: 'no existe' });
					}
				} else {
					res.send({ message: 'no existe' });
				}
			});
	} catch (e) {
		res.send({ message: 'error ' + e });
	}
});

router.post('/register', (req, res) => {
	const { usuario, password } = req.body;
	let cryptedPassword = bcrypt.hashSync(password, 10);
	try {
		req.app.locals.db
			.collection('usuario')
			.find({ usuario: usuario })
			.toArray(function (err, data) {
				if (data && data.length > 0) {
					res.send({ message: 'existe' });
				} else {
					req.app.locals.db.collection('usuario').insertOne(
						{
							usuario: usuario,
							password: cryptedPassword,
						},
						function (err, result) {
							if (err !== undefined) {
								res.send({ message: 'error ' + err });
							} else {
								res.send({ message: 'registrado' });
							}
						}
					);
				}
			});
	} catch (e) {
		res.send({ message: 'error ' + e });
	}
});

module.exports = router;
