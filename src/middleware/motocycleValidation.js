import joi from "joi";
import MotocycleService from "../services/motocycleService";

class MotocycleValidation {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async motocycleDetailsValidator(req, res, next) {
    try {
      const { serialNo, odometer, status, registrationPlate } = req.body;
      const motocycle = {
        serialNo,
        odometer,
        status,
        registrationPlate,
      };

      // basic requirement rules for a motocycle
      const schema = joi.object().keys({
        serialNo: joi.string().alphanum().min(5).required(),
        odometer: joi.number().required(),
        status: joi.any().valid("inservice", "inactive"),
        registrationPlate: joi.string().alphanum(),
      });

      // validate if the motocycle meets the requirements
      const checkMotocycle = schema.validate(motocycle, { abortEarly: false });
      const errors = [];

      if (checkMotocycle.error) {
        const { details } = checkMotocycle.error;
        for (let i = 0; i < details.length; i += 1) {
          errors.push(details[i].message.replace('"', "").replace('"', ""));
        }
        return res.status(400).json({ message: errors });
      }

      // check if the motocycle already registered
      const motocycleRegistered = await MotocycleService.getMotocycleBySerialNo(
        motocycle.serialNo
      );
      if (motocycleRegistered)
        return res.status(409).json({
          message: `motocycle with serialNo: ${motocycle.serialNo} already registered`,
        });
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  }
}
export default MotocycleValidation;
