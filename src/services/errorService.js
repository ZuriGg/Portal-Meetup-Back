//AGREGAR PATH DEL ERRORRRRRRRRRRRRRRRR!

import path from 'path';

export const cannotVoteOwnMeetupError = () => {
    const error = new Error('No puedes votar tu propio meetup', path);
    error.httpStatus = path;
    (error.httpStatus = '403'), // Conflict
        (error.code = 'CANNOT_VOTE_OWN_ENTRY');
    return error;
};

export const deleteFileError = () => {
    const error = new Error('error email, o contraseña incorrecta', path);
    error.httpStatus = path;
    return error;
};

export const emailAlreadyRegisteredError = () => {
    const error = new Error('error email, o contraseña incorrecta', path);
    error.httpStatus = path;
    (error.httpStatus = '409'), // Conflict
        (error.code = 'EMAIL_ALREADY_REGISTERED');
    return error;
};

export const invalidCredentialsError = () => {
    const error = new Error('error email, o contraseña incorrecta', path);
    error.httpStatus = path;
    return error;
};

export const invalidTokenError = () => {
    const error = new Error('error en el token', path);
    error.httpStatus = path;
    return error;
};

export const notAuthenticatedError = () => {
    const error = new Error('Debes enviar un token en el header', path);
    error.httpStatus = path;
    (error.httpStatus = '401'), // Conflict
        (error.code = 'NOT_AUTHENTICATED');
    return error;
};

export const notFoundError = (resource) => {
    const error = new Error(
        `El recurso requerido '${resource}' no existe`,
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '404'), // Forbbiden
        (error.code = 'RESOURCE_NOT_FOUND');
    return error;
};

export const pendingActivationError = () => {
    const error = new Error('error email, o contraseña incorrecta', path);
    error.httpStatus = path;
    return error;
};

export const photoLimitReachedError = () => {
    const error = new Error(
        'Se ha alcanzado el límite de tres fotos en el meetup',
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '409'), // Conflict
        (error.code = 'PHOTO_LIMIT_REACHED');
    return error;
};

export const recoveryCodeError = () => {
    const error = new Error(
        'Se ha alcanzado el límite de tres fotos en el meetup',
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '401'), // Unauthorized
        (error.code = 'INVALID_RECOVERY_CODE');
    return error;
};

export const saveFileError = () => {
    const error = new Error('Error al guardar el archivo en el disco', path);
    error.httpStatus = path;
    (error.httpStatus = '500'), // Internal Server Error
        (error.code = 'FILE_SAVE_FAILED');
    return error;
};

export const sendEmailError = () => {
    const error = new Error('Error al enviar el email', path);
    error.httpStatus = path;
    (error.httpStatus = '500'), // Internal Server Error
        (error.code = 'SEND_EMAIL_FAILED');
    return error;
};

export const userAlreadyRegisteredError = () => {
    const error = new Error('El nombre de usuario ya está registrado', path);
    error.httpStatus = path;
    (error.httpStatus = '409'), // Conflict
        (error.code = 'USER_ALREADY_REGISTERED');
    return error;
};

export const unauthorizedUserError = () => {
    const error = new Error(
        'El usuario no está autorizado para hacer esta operación',
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '409'), // Conflict
        (error.code = 'UNAUTHORIZED');
    return error;
};

export const voteAlreadyExistsError = () => {
    const error = new Error(
        'No se puede votar más de una vez la misma asistencia a un meetup',
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '409'), // Conflict
        (error.code = 'VOTE_ALREADY_EXISTS');
    return error;
};

export const cantVoteBeforeEventError = () => {
    const error = new Error(
        'No puedes votar un evento antes de que suceda.',
        path
    );
    error.httpStatus = '403'; // Forbidden
    error.code = 'CANT_VOTE_BEFORE_EVENT';
    return error;
};

export const invalidVoteValueError = () => {
    const error = new Error(
        'La calificación debe encontrarse entre 1 y 5.',
        path
    );
    error.httpStatus = '400'; // Bad Request
    error.code = 'INVALID_VOTE_VALUE';
    return error;
};

export const trueOrFalseError = () => {
    const error = new Error(
        'No se ha recibido un valor "true" o "false", no se ha podido realizar la operación',
        path
    );
    error.httpStatus = path;
    (error.httpStatus = '400')((error.code = 'INVALID_KEY'));
};
