import deletePhotoModel from '../../models/meetups/deletePhotoModel.js';

const deletePhotoController = async (req, res, next) => {
    try {
        const { photoId } = req.params;

        await deletePhotoModel(photoId);

        res.send({
            status: 'ok',
            message: `El meetup con id ${photoId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};

export default deletePhotoController;
