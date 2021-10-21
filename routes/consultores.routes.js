/*
    Consultores
    ruta: '/api/consultores'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getConsultores, 
    crearConsultor,
    actualizarConsultor,
    eliminarConsultor
} = require('../controllers/consultores.controller')


const router = Router();

router.get( '/', getConsultores );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del Consultor es necesario').not().isEmpty(),
        check('area','El id del area debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearConsultor 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del consultor es necesario').not().isEmpty(),
        check('area','El id del area debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarConsultor
);

router.delete( '/:id',
    eliminarConsultor
);



module.exports = router;


