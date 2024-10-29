const validateSchemaUtil = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (err) {
        err.httpStatus = 400; // Bad Request
        err.code = 'MISSING_FIELDS';
        throw err;
    }
};

export default validateSchemaUtil;

/* validateSchemaUtil, sirve para validar un objeto (body) según un esquema de datos definido (schema). Generalmente, se usa en el contexto de validaciones de entrada de datos, por ejemplo, para asegurarse de que los datos enviados a una API cumplan con ciertos requisitos antes de procesarlos. */
