import getPool from '../../database/getPool.js';

const selectAllPhotoMeetupModel = async (meetupId) => {
    const pool = await getPool();

    const query = `
       SELECT * FROM meetupPhotos WHERE meetupId = ${meetupId}
    `;

    const [meetupPhotos] = await pool.query(query);

    return meetupPhotos;
};

export default selectAllPhotoMeetupModel;
