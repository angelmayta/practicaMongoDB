const { response } = require('express');

const Area = require('../models/area.model');


const getAreas = async(req, res = response) => {

    const areas = await areas.find()
                                    .populate('usuario','nombre img');

    res.json({
        ok: true,
        areas
    })
}

const crearArea = async(req, res = response) => {

    const uid = req.uid;
    const area = new Area({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const areaDB = await area.save();
        
        res.json({
            ok: true,
            area: areaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar area, consulte con el administrador'
        })
    }

}

const actualizarArea = async (req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const area = await Area.findById( id );

        if ( !area ) {
            return res.status(404).json({
                ok: true,
                msg: 'Area no encontrada por id',
            });
        }

        const cambiosArea = {
            ...req.body,
            usuario: uid
        }

        const areaActualizada = await Area.findByIdAndUpdate( id, cambiosArea, { new: true } );


        res.json({
            ok: true,
            area: areaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el area, consulte con el administrador'
        })
    }

}

const eliminarArea = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const area = await Area.findById( id );

        if ( !area ) {
            return res.status(404).json({
                ok: true,
                msg: 'Area no encontrado por id',
            });
        }

        await Area.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'El Area se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el area, consulte con el administrador'
        })
    }
}

module.exports = {
    getAreas,
    crearArea,
    actualizarArea,
    eliminarArea
}