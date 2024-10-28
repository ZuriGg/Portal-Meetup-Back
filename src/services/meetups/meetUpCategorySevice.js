import getPool from '../../database/getPool.js';

const meetUpCategorySevice = async () => {
    const pool = await getPool();

    const [categories] = await pool.query(`
            SELECT categoryId, name
            FROM category
        `);

    return categories;
};

export default meetUpCategorySevice;
