import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const recoverPassSchema = joi
    .object({
        email: joi.string().email().required(),
    })
    .messages(joiErrorMessages);

export default recoverPassSchema;
