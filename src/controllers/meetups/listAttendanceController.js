import selectAllAttendanceModel from '../../models/meetups/selectAllAttendanceModel.js';

const listAttendanceController = async (req, res, next) => {
    try {
        const attendanceData = await selectAllAttendanceModel();

        if (attendanceData.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay asistencias registradas.',
            });
        }

        res.send({
            status: 'ok',
            data: attendanceData,
        });
    } catch (error) {
        next(error);
    }
};

export default listAttendanceController;
