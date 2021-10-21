/*
    Path: /api/proyectos
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

const { getAreas, crearArea, actualizarArea, eliminarArea } = require ('../controllers/areas.controller')
const router = Router();

router.get('/', getAreas);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del Area es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearArea);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Area es obligatorio').not().isEmpty(),
        validarCampos,   
    ] ,
    actualizarArea);

router.delete('/:id',validarJWT, eliminarArea);

module.exports = router;


