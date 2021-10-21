const { response } = require('express');

const Consultor = require('../models/consultor.model');

const getConsultores = async(req, res = response) => {

    const consultores = await Consultor.find()
                                .populate('usuario','nombre img')
                                .populate('area','nombre img')


    res.json({
        ok: true,
        consultores: consultores
    })
}

const crearConsultor= async (req, res = response) => {

    const uid = req.uid;
    const consultor = new consultor({
        usuario: uid,
        ...req.body
    });


    try {

        const consultorDB = await consultor.save();

        
        res.json({
            ok: true,
            consultor: consultorDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear consultor, consulte con el administrador'
        })
    }


}

const actualizarConsultor = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const consultor = await Consultor.findById( id );

        if ( !consultor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Consultor no encontrado por id',
            });
        }

        const cambiosConsultor = {
            ...req.body,
            usuario: uid
        }

        const consultorActualizado = await Consultor.findByIdAndUpdate( id, cambiosConsultor, { new: true } );


        res.json({
            ok: true,
            consultor: consultorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar consultor, consulte con el administrador'
        })
    }

}

const eliminarConsultor = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const consultor = await Consultor.findById( id );

        if ( !consultor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Consultor no encontrado por id',
            });
        }

        await Consultor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Consultor borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Consultor no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getConsultores,
    crearConsultor,
    actualizarConsultor,
    eliminarConsultor
}