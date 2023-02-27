const express = require('express');

const router = express.Router();

// router.post('/comprar', (req, res) => {
// 	let idProducto = req.body.id;
// 	let idUsuario = req.body.usuarioId;

// 	req.app.locals.db.collection('pedidos').insert({ idProducto: idProducto, idUsuario: idUsuario });
// 	res.send({ mensaje: 'Añadido al carrito' });
// });

router.post('/finalizarCompra', (req, res) => {
	let idProducto = req.body.id;
	let idUsuario = req.body.usuarioId;
	let nombre = req.body.nombre;
	let apellido = req.body.apellido;
	let direccion = req.body.direccion;
	let correoElectronico = req.body.correoElectronico;
	let telefono = req.body.telefono;

	req.app.locals.db.collection('pedidos').insert({ idProducto: idProducto, idUsuario: idUsuario, nombre: nombre, apellido: apellido, direccion: direccion, correoElectronico: correoElectronico, telefono: telefono });
	res.send({ message: 'Compra finalizada' });
});
module.exports = router;
