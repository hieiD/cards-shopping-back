const express = require('express');

const router = express.Router();

router.post('/suscribir', (req, res) => {
	const correo = req.body.correo;

	req.app.locals.db
		.collection('correo')
		.find({ correo: correo })
		.toArray(function (err, data) {
			if (data && data.length > 0) {
				res.send({ message: 'existe' });
			} else {
				req.app.locals.db.collection('correo').insertOne(
					{
						correo: correo,
					},
					function (err, result) {
						if (err !== undefined) {
							res.send({ message: 'error ' + err });
						} else {
							res.send({ message: 'correoRegistrado' });
						}
					}
				);
			}
		});
});

module.exports = router;
