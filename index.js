const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const cajas = require('./routes/cajas');
const cartas = require('./routes/cartas');
const pedidos = require('./routes/pedidos');
const usuario = require('./routes/usuario');
const correo = require('./routes/correo');

const app = express();
const MongodbClient = mongodb.MongoClient;
app.listen(8000);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

MongodbClient.connect('mongodb://127.0.0.1/27017', (err, client) => {
	if (err != undefined) {
		console.log(err);
	} else {
		app.locals.db = client.db('bluedragon');
		console.log('conectado');
	}
});

app.use('/cajas', cajas);
app.use('/cartas', cartas);
app.use('/pedidos', pedidos);
app.use('/usuario', usuario);
app.use('/correo', correo);
