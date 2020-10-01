import joi from "joi";
import DriverService from "../services/driverServices";

/**
 *  driver validatons
 */
class DriverValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async driverDetailsValidator(req, res, next) {
    try {
      const { driverId, firstName, lastName, phoneNo, gender } = req.body;
      const driver = {
        driverId,
        firstName,
        lastName,
        phoneNo,
        gender,
      };

      // basic requirement rules for driver details
      const schema = joi.object().keys({
        driverId: joi.string().min(5).max(16),
        firstName: joi.string().min(3).max(30),
        lastName: joi.string().min(3).max(30),
        phoneNo: joi
          .string()
          .min(10)
          .max(12)
          .message("invalid phone number")
          .required(),
        gender: joi.string().min(3).max(30),
      });

      // validate if the driver details meets the requirements
      const checkDriver = schema.validate(driver, { abortEarly: false });
      const Errors = [];

      if (checkDriver.error) {
        const { details } = checkDriver.error;
        for (let i = 0; i < details.length; i += 1) {
          Errors.push(details[i].message.replace('"', "").replace('"', ""));
        }
        return res.status(400).json({ message: Errors });
      }

      // check if the driver already registered
      const driverExist = await DriverService.getDriverById(driver.driverId);
      if (driverExist)
        return res.status(409).json({
          message: `Driver with id: ${driver.driverId} already registered`,
        });
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  }
}
export default DriverValidation;
