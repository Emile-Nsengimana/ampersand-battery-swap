import { string } from "joi";
import { JSONB } from "sequelize";
import BatteryService from "../services/batteryService";

class BatteryController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} created battery details
   */
  static async registerBattery(req, res) {
    try {
      const battery = await BatteryService.addBattery(req.body);

      return res.status(201).json({
        message: "battery registered successful",
        battery,
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} battery details
   */
  static async getBattery(req, res) {
    try {
      const { serialNo } = req.params;
      const battery = await BatteryService.getBattery(serialNo);

      if (!battery)
        return res.status(404).json({ message: "battery not found!" });

      return res.status(200).json({ battery });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Array.<Object>} a list of all batteries
 */
  static async getAllBattery(req, res) {
    try {
      const batteries = await BatteryService.getAllBattery();

      if (batteries.length === 0)
        return res.status(404).json({ message: "no battery found!" });

      return res.status(200).json({ batteries });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }
}

export default BatteryController;
