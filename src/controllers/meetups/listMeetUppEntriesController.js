import selectAllEntriesMeetUpService from '../../services/meetups/selectAllEntriesMeetUpService.js';

const listMeetUppEntriesController = async (req, res, next) => {
    try {
        const meetUpEntries = selectAllEntriesMeetUpService();
        res.send({
            status: 'ok',
            data: meetUpEntries,
        });
    } catch (error) {
        next(error);
    }
};

export default listMeetUppEntriesController;
