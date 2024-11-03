import meetUpCategoryModel from '../../models/meetups/meetUpCategoryModel.js';

const meetUpCategoryController = async (req, res, next) => {
    try {
        const { id } = req.body;

        const categories = await meetUpCategoryModel(id);

        res.send({
            sattus: 'ok',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

export default meetUpCategoryController;
