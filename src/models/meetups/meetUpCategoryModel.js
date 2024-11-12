import getPool from '../../database/getPool.js';

const meetUpCategoryModel = async () => {
    const pool = await getPool();

    const [categories] = await pool.query(
        `
            SELECT id, name
            FROM category
        `
    );

    return categories;
};

export default meetUpCategoryModel;
