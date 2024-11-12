import editMeetupModel from '../models/meetups/insertMeetupModel.js';
import { invalidCredentialsError } from '../services/errorService.js';


// Función que comprueba si un user tiene privilegios para editar una entrada

const modifiedMeetup = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada en la cuál realizamos edición.
        const { entryId } = req.params;

        // Obtenemos los datos de la entrada.
        const entry = await editMeetupModel(entryId);

        // Si no somos los propietarios lanzamos error. He puesto invalidCredentialsError para no crear otro error.
        if (entry.userId !== req.user.id) {
            invalidCredentialsError();
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default modifiedMeetup;
