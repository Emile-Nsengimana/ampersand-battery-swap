import DriverService from '../services/driverServices';

class MotocycleController {
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} created motocycle details
     */
    static async registerMotocycle(req, res) {
        try {
            const motocycle = await DriverService.createDriver(req.body);

            return res.status(201).json({
                message: 'Driver registered successful',
                driver
            });
        } catch (error) {
            if (error.errors) {
                return res.status(400).json({ message: error.errors[0].message });
            }
            return res.status(500).json({ message: 'server error' });
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {object} driver details
     */
    static async getDriverDetails(req, res) {
        try {
            const { driverId } = req.params;
            const driver = await DriverService.getDriverById(driverId);

            if (!driver) return res.status(404).json({ message: "driver not found!" });

            return res.status(200).json({ driver });
        } catch (error) {
            if (error.errors) {
                return res.status(400).json({ message: error.errors[0].message });
            }
            return res.status(500).json({ message: 'server error' });
        }
    }

}

export default MotocycleController;

