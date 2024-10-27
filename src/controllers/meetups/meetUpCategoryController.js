const meetUpCategoryController = async (req, res, next) => {
    try {
        const categories = await meetUpCategorySevice();

        res.send({
            sattus: 'ok',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

export default meetUpCategoryController;
