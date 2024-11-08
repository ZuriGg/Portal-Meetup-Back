import selectAllMeetupsModel from '../../models/meetups/selectAllMeetupsModel.js';

const listMeetUpController = async (req, res, next) => {
    try {

        const keyword = req.query;

        const meetUpEntries = await selectAllMeetupsModel(keyword);
        
        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetUpController;
