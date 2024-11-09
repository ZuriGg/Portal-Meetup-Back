import randomstring from 'randomstring';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';

import { notFoundError } from '../../services/errorService.js';

//para validar el body con el esquema proporcionado
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import recoverPassSchema from '../../schemas/users/recoverPassSchema.js';

// Validamos a un usuario recién registrado:
const sendRecoverPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        // aplicamos la validacion con joi antes de seguir con el controlador
        await validateSchemaUtil(recoverPassSchema, req.body);

        const user = await selectUserByEmailModel(email);

        if (!user) {
            notFoundError('usuario');
        }

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoverPassController;
