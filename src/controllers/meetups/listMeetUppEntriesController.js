import selectAllEntriesMeetUpService from '../../services/meetups/selectAllEntriesMeetUpService.js';

const listMeetUppEntriesController = async (req, res, next) => {
    try {
        const searchs = req.query;
        const meetUpEntries = selectAllEntriesMeetUpService(searchs);

        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetUppEntriesController;
