import model from "../db/models";

const { Motocycle } = model;

/**
 * motocycle service
 */
class MotocycleService {
    /**
     *
     * @param {Object} motocycleDetails
     * @returns {Object} created motocycle details
     */
    static async addMotocycle(motocycleDetails) {

        const { serialNo, odometer, status, plate } = motocycleDetails;
        const newMotocycle = {
            serialNo, odometer, status, plate
        };
        const motocycle = (await Motocycle.create(newMotocycle)).get({ plain: true });
        return motocycle;
    }

    /**
     *
     * @param {Object} driverId
     * @returns {Object} driver details
     */
    static async getMotocycleBySerialNo(serialNo) {
        const motocycle = await Motocycle.findOne({
            raw: true,
            where: { serialNo },
        });
        return motocycle;
    }
}

export default MotocycleService;
