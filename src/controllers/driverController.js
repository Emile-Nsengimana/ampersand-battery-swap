import { string } from "joi";
import { JSONB } from "sequelize";
import DriverService from "../services/driverServices";

class DriverController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} created driver details
   */
  static async registerDriver(req, res) {
    try {
      const driver = await DriverService.createDriver(req.body);

      return res.status(201).json({
        message: "driver registered successful",
        driver,
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);

      return res.status(500).json({ message: "server error" });
    }
  }
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} driver details
   */
  static async getDriverDetails(req, res) {
    try {
      const { driverId } = req.params;
      const driver = await DriverService.getDriverById(driverId);

      if (!driver)
        return res.status(404).json({ message: "driver not found!" });

      return res.status(200).json({ driver });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }

  /**
   * @param {Object} res 
   * @param {Object} req 
   * @returns {Array.Object} a list of all drivers
   */

  static async getAllDrivers(req, res) {
    try {
      const drivers = await DriverService.getAllDrivers();

      if (drivers.length === 0)
        return res.status(404).json({ message: "no driver found!" });

      return res.status(200).json({ drivers });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }
}

export default DriverController;
