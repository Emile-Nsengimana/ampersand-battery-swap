import joi from "joi";
import BatteryService from "../services/batteryService";

class BatteryValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async batteryDetailsValidator(req, res, next) {
    try {
      const { serialNo, energyLevel } = req.body;
      const battery = {
        serialNo, energyLevel
      };

      // basic requirement rules for battery details
      const schema = joi.object().keys({
        serialNo: joi.string().min(3).max(16).required(),
        energyLevel: joi.number().required()
      });

      // validate if the battery details meets the requirements
      const checkBattery = schema.validate(battery, { abortEarly: false });
      const errors = [];

      if (checkBattery.error) {
        const { details } = checkBattery.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', "").replace('"', ""));
        }
        return res.status(400).json({ message: errors });
      }

      // check if the battery already registered
      const batteryRegistered = await BatteryService.getBattery(battery.serialNo);
      if (batteryRegistered)
        return res.status(409).json({
          message: `battery with serialNo: ${battery.serialNo} already registered`,
        });
      next();
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }
}
export default BatteryValidation;
