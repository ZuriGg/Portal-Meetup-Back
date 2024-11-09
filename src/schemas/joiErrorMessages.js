const joiErrorMessages = {
    //objeto que define una lista de mensajes de error personalizados, asignados a tipos específicos de errores de validación que Joi puede detectar.
    'any.required': 'El campo "{#key}" es requerido', //any.required es para campos requeridos
    'string.base': 'El valor de "{#key}" debe ser una cadena', //string.base es para campos que deben ser una cadena
    'string.empty': 'El campo "{#key}" no debe estar vacío', //string.empty es para campos q no deben estar vacíos
    'number.base': 'El valor de "{#key}" debe ser un número', //number.base, cuando se espera un número y se entrega otro dato
    'number.max': 'El archivo no debe exceder los 5 MB',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'any.only': 'Solo se permiten fotos jpeg o png',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

export default joiErrorMessages;

//Esto se hace para mejorar la experiencia del usuario, haciendo que los mensajes de error sean más claros y comprensibles.
