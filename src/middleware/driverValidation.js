import joi from "joi";
import DriverService from "../services/driverServices";
import MotocycleService from "../services/motocycleService";

class DriverValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async driverDetailsValidator(req, res, next) {
    try {
      const {
        driverId,
        firstName,
        lastName,
        phoneNo,
        gender,
        motocycleSerialNo,
      } = req.body;
      const driver = {
        driverId,
        firstName,
        lastName,
        phoneNo,
        gender,
        motocycleSerialNo,
      };

      // basic requirement rules for driver details
      const schema = joi.object().keys({
        driverId: joi.string().alphanum().min(5).max(16),
        firstName: joi.string().alphanum().min(3).max(30),
        lastName: joi.string().alphanum().min(3).max(30),
        phoneNo: joi
          .string()
          .min(10)
          .max(12)
          .message("invalid phone number")
          .required(),
        gender: joi.any().valid("male", "female"),
        motocycleSerialNo: joi.string().alphanum().min(5).required(),
      });

      // validate if the driver details meets the requirements
      const checkDriver = schema.validate(driver, { abortEarly: false });
      const errors = [];

      if (checkDriver.error) {
        const { details } = checkDriver.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', "").replace('"', ""));
        }
        return res.status(400).json({ message: errors });
      }

      // check if driver's motocycle exist motocycleSerialNo
      const motocycleExist = await MotocycleService.getMotocycleBySerialNo(
        driver.motocycleSerialNo
      );
      if (!motocycleExist)
        return res.status(404).json({
          message: `driver's motocycle not found`,
        });
      // check if the driver already registered
      const driverExist = await DriverService.getDriverById(driver.driverId);
      if (driverExist)
        return res.status(409).json({
          message: `driver with id: ${driver.driverId} already registered`,
        });
      next();
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }
}
export default DriverValidation;
