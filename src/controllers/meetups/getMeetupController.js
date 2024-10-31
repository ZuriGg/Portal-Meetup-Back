import selectMeetupByIdModel from '../../models/meetups/selectMeetupByIdModel.js';

const getMeetupController = async (req, res, next) => {
    try {
        const meetUpEntries = selectMeetupByIdModel(keyword);
        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default getMeetupController;
