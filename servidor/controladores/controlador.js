const con = require('../lib/conexionbd');

function allPeliculas (req, res) {
    let sql_total = 'select * from pelicula where 1=1 ';
    let sql_filtros = '';
    let anio = req.query.anio;
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let columna_orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    cantidad = parseInt(cantidad)


    if (titulo) {
        sql_filtros = `and titulo like '%${titulo}%' `
    }
    if (anio) {
        sql_filtros += `and anio = ${anio} `
    }
    if (genero) {
        sql_filtros += `and genero_id = ${genero} `
    }
    sql_filtros += `order by ${columna_orden} ${tipo_orden} `;
    
    sql_total += sql_filtros

    con.query(sql_total, (error, resultado, fields) => {
        if (error) {
            console.log('Hubo un error ', error.message );
            return res.status(404).send('Hubo un error en su consulta: total');
        }
        let response = {
            'total': resultado.length
        };

        let sql_peliculas = sql_total + `limit ${(pagina - 1) * cantidad}, ${cantidad};`;
        con.query(sql_peliculas, (error, resultado, fields) => {
            if (error) {
                console.log('Hubo un error ', error.message );
                return res.status(404).send('Hubo un error en su consulta: peliculas');
            }
            response.peliculas = resultado
            res.send(JSON.stringify(response))
        })
    })
}

/* -------------------------------------------------------------------------- */

function filtroGeneros (req ,res) {
    let sql =  'select * from genero';
    con.query(sql, (error, resultado, fields) => {
        if (error) {
            console.log('Hubo un error ', error.message);
            return res.status(404).send('Hubo un error en su consulta: generos')
        }
        let response = {
            'generos': resultado
        }
        res.send(JSON.stringify(response))
    })
};

/* ----------------------------------------------------------------------- */

function informacionPelicula(req, res) {
    let id = req.params.id;
    let sql_pelicula = `select * from pelicula join genero on genero_id = genero.id where pelicula.id = ${id}`;
    let sql_actores = `select nombre from actor join actor_pelicula on actor.id = actor_id where pelicula_id = ${id}`
    
    con.query(sql_pelicula, (error, resultado, fields) => {
        if (error) {
            console.log('Hubo un error ', error.message);
            return res.status(404).send('Hubo un error en su consulta: info')
        }
        let response = {
            'pelicula': resultado[0]
        }
        con.query(sql_actores, (error, resultado, fields) => {
            if (error) {
                console.log('Hubo un error ', error.message);
                return res.status(404).send('Hubo un error en su consulta: info')
            }
            response.actores = resultado
            res.send(JSON.stringify(response))
        })
    })
}

/* -------------------------------------------------------------------------- */

function recomendaciones (req, res) {
    //correccion de la query para mostrar el detalle de la película
    let sql = `select pelicula.id,
    pelicula.poster,
    pelicula.trama,
    pelicula.titulo,
    genero.nombre 
    from pelicula join genero on genero_id=genero.id 
    where 1=1 `;
    let sql_genero = req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let sql_puntuacion = req.query.puntuacion;

    if (sql_genero) {
        sql += `and nombre = '${sql_genero}' `
    }
    if (anio_inicio || anio_fin) {
        sql += `and anio between ${anio_inicio} and ${anio_fin} `
    }
    if (sql_puntuacion) {
        sql += `and puntuacion = ${sql_puntuacion}`
    }
    con.query(sql, (error, resultado, fields) => {
        if(error){
            console.log('Hubo un error ', error.message);
            return res.status(404).send('Hubo un error en su consulta: recomendacion')
        }
        let response = {
            'peliculas': resultado
        }
        res.send(JSON.stringify(response))
    })
}


module.exports = {
    peliculas: allPeliculas,
    genero: filtroGeneros,
    infoPelicula: informacionPelicula,
    recomendaciones: recomendaciones
}