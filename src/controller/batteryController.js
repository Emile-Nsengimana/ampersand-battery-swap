import { string } from "joi";
import { JSONB } from "sequelize";
import BatteryService from "../services/batteryService";

class BatteryController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} created battery details
   */
  static async registerBattery(req, res) {
    try {
      const battery = await BatteryService.addBattery(req.body);

      return res.status(201).json({
        message: "Battery registered successful",
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
   * @param {object} req
   * @param {object} res
   * @returns {object} battery details
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
}

export default BatteryController;
