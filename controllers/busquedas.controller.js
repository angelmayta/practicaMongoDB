//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Consultor = require('../models/consultor.model');
const Area = require('../models/area.model');



const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [usuarios, consultores, areas] = await Promise.all ([
        Usuario.find({nombre:miRegExp}), // la busqueda es por nombre
        Consultor.find({nombre:miRegExp}),
        Area.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        consultores,
        areas
    });

}

//estructura de la peticion 
const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({nombre:miRegExp})
                            
            break;
        case 'areas':
            data = await Area.find({nombre:miRegExp})
                    .populate('usuario','nombre img'); 
            break;    
        case 'consultores':
            data = await Investigador.find({nombre:miRegExp})
                    .populate('usuario','nombre img')
                    .populate('area','nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/areas/consultores"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}





module.exports ={
    busquedaTotal,
    busquedaColeccion
}