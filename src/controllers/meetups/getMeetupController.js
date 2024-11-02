import selectMeetupByIdModel from '../../models/meetups/selectMeetupByIdModel.js';

const getMeetupController = async (req, res, next) => {
    try {

        const {meetupId} = req.params;
        console.log(meetupId);
        

        const meetUpEntries = await selectMeetupByIdModel(meetupId);
        
        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default getMeetupController;
