import { notFoundError } from '../../services/errorService.js';

const notFound = (req, res, next) => {
    next(notFoundError('ruta'));
};

export default notFound;
