import randomstring from 'randomstring';

import insertUserModel from '../../models/users/insertUserModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import newUserSchema from '../../schemas/users/newUserSchema.js';

// Función que crea un nuevo usuario:
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, email, password, firstName, lastname } = req.body;
        console.log(firstName, lastname);

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
                'Usuario creado. Por favor, verifica el mensaje que has recibido en tu email',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
