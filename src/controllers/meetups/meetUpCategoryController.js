import meetUpCategoryModel from '../../models/meetups/meetUpCategoryModel.js';

const meetUpCategoryController = async (req, res, next) => {
    try {
        const {categories} = req.params;
        console.log(categories);

        res.send({
            sattus: 'ok',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

export default meetUpCategoryController;
