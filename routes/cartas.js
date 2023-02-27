const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	let db = req.app.locals.db;
	db.collection('cartas')
		.find()
		.toArray((err, data) => {
			if (err) {
				res.send({ msg: 'Error' });
			} else {
				res.send(data);
			}
		});
});

module.exports = router;
