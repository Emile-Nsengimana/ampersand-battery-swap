import joi from "joi";
import DriverService from "../services/driverServices";
import BatteryService from "../services/batteryService";
import StationService from "../services/stationService";

class SwappValidation {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async swappValidator(req, res, next) {
    try {
      const swapp = {
        oldBattery: req.body.oldBattery,
        newBattery: req.body.newBattery,
        distance: req.body.distance,
        stationId: req.body.stationId,
        driverId: req.body.driverId,
        currentEnergyLevel: req.body.currentEnergyLevel
      };

      // basic requirement rules for a swapp
      const schema = joi.object().keys({
        oldBattery: joi.string().min(3).max(16).required(),
        newBattery: joi.string().min(3).max(16).required(),
        distance: joi.number().required(),
        stationId: joi.number().integer().required(),
        currentEnergyLevel: joi.number().integer().required(),
        driverId: joi.string().alphanum().min(5).max(16),
      });

      // validate if the swapp payload meets the requirements
      const checkSwapp = schema.validate(swapp, { abortEarly: false });
      const errors = [];

      if (checkSwapp.error) {
        const { details } = checkSwapp.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', "").replace('"', ""));
        }
        return res.status(400).json({ message: errors });
      }

      // check if batteries to be swapped are recorded
      const oldBatteryExist = await BatteryService.getBattery(swapp.oldBattery);
      const newBatteryExist = await BatteryService.getBattery(swapp.newBattery);

      if (!oldBatteryExist)
        return res.status(404).json({
          message: `battery with serialNo: ${swapp.oldBattery} not found`,
        });

      if (!newBatteryExist)
        return res.status(404).json({
          message: `battery with serialNo: ${swapp.newBattery} not found`,
        });

      // check if swapp the same battery
      if (swapp.oldBattery === swapp.newBattery)
        return res.status(405).json({
          message: `can't swapp the same battery`,
        });

      // check if the driver is registered
      const driverExist = await DriverService.getDriverById(swapp.driverId);

      if (!driverExist)
        return res.status(404).json({
          message: `driver not registered`,
        });

      // check if the station is registered
      const stationExist = await StationService.getStationById(swapp.stationId);

      if (!stationExist)
        return res.status(404).json({
          message: `station with id: ${swapp.stationId} not found`,
        });

      req.oldBattery = oldBatteryExist;
      req.newBattery = newBatteryExist;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  }
}
export default SwappValidation;
