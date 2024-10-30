
import randomstring from 'randomstring';

// --------     A la espera de importar modelos  ------   !!!!!!!
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';

import { invalidCredentialsError } from '../../services/errorService.js';


const sendRecoverPassController = async (req, res, next) => {
    try {
       
        const { email } = req.body;

        const user = await selectUserByEmailModel(email);

        if (!user) {
            invalidCredentialsError();
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

