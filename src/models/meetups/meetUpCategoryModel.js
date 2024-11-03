import getPool from '../../database/getPool.js';

const meetUpCategoryModel = async (id) => {
    const pool = await getPool();

    const [categories] = await pool.query(
        `
            SELECT name
            FROM category
            WHERE ?
        `,
        [id]
    );

    return categories;
};

export default meetUpCategoryModel;
