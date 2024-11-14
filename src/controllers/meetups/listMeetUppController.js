import selectAllMeetupsModel from '../../models/meetups/selectAllMeetupsModel.js';

const listMeetUpController = async (req, res, next) => {
    try {
        const keyword = req.query;

        const meetUpEntries = await selectAllMeetupsModel(keyword);

        console.log(meetUpEntries);

        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetUpController;
