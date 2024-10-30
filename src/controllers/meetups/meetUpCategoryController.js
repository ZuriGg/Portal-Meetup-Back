import meetUpCategoryService from '../../services/meetups/meetUpCategoryService.js';

const meetUpCategoryController = async (req, res, next) => {
    try {
        const categories = await meetUpCategoryService();

        res.send({
            sattus: 'ok',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

export default meetUpCategoryController;
