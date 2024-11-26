import selectAllPhotoMeetupModel from '../../models/meetups/selectAllPhotoMeetupModel.js';

const listMeetupPhotoController = async (req, res, next) => {
    try {
        const { meetupId } = req.params;

        const meetUpPhotos = await selectAllPhotoMeetupModel(meetupId);

        console.log(meetUpPhotos);

        res.send({
            status: 'ok',
            data: meetUpPhotos,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetupPhotoController;
