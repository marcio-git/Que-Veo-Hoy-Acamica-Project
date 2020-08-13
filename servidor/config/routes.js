let controladorBuscador = require('../controladores/controlador')

module.exports = function (app) {
	app.get('/peliculas', controladorBuscador.peliculas)
	app.get('/peliculas/recomendacion', controladorBuscador.recomendaciones)
	app.get('/peliculas/:id', controladorBuscador.infoPelicula)
	app.get('/generos', controladorBuscador.genero)
}
