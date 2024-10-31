import selectAllMeetupsModel from '../../models/meetups/selectAllMeetupsModel.js';

const listMeetUpController = async (req, res, next) => {
    try {
        const meetUpEntries = selectAllMeetupsModel();
        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetUpController;
