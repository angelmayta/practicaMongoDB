const fs = require('fs'); //para leer archivos y carpetas del filesystem
const Usuario = require('../models/usuario.model');
const Area = require('../models/area.model');
const Consultor = require('../models/consultor.model');

const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipoColeccion,id, nombreArchivo) =>{
    let pathViejo = '';
    switch (tipoColeccion) {
        case 'consultores':
            const consultor = await Consultor.findById(id);
            if(!consultor){
                console.log('Id de consultor no encontrado');
                return false;
            }
            pathViejo = `./uploads/consultores/${consultor.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            consultor.img = nombreArchivo;
            await consultor.save();
            return true;
        break;
            
        case 'areas':
            const area = await Area.findById(id);
            if(!area){
                console.log('Id de area no encontrado');
                return false;
            }
            pathViejo = `./uploads/areas/${area.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            area.img = nombreArchivo;
            await area.save();
            return true;
            
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('Id de usuario no encontrado');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}