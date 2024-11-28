import randomstring from 'randomstring';

import insertUserModel from '../../models/users/insertUserModel.js';

//necesario validateSchemaUtil para usar joi
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

//importamos el esquema concreto
import newUserSchema from '../../schemas/users/newUserSchema.js';

// Función que crea un nuevo usuario:
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, email, password, firstName, lastname } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(newUserSchema, req.body);

        // Creamos el código de registro.
        const registrationCode = randomstring.generate(10);

        // Insertamos el usuario.
        await insertUserModel(
            username,
            email,
            password,
            registrationCode,
            firstName,
            lastname
        );

        res.send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifique el mensaje que ha recibido en su email',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
