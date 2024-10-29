import getPool from '../../database/getPool.js';

const meetUpCategoryService = async () => {
    const pool = await getPool();

    const [categories] = await pool.query(`
            SELECT categoryId, name
            FROM category
        `);

    return categories;
};

export default meetUpCategoryService;
