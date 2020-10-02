import model from "../db/models";

const { Battery } = model;

class BatteryService {
  /**
   *
   * @param {Object} batteryDetails
   * @returns {Object} created battery details
   */
  static async addBattery(batteryDetails) {
    const { serialNo, energyLevel } = batteryDetails;
    const newBattery = {
      serialNo,
      energyLevel,
    };
    const battery = (await Battery.create(newBattery)).get({ plain: true });
    return battery;
  }

  /**
   *
   * @param {Object} driverId
   * @returns {Object} driver details
   */
  static async getBattery(serialNo) {
    const battery = await Battery.findOne({
      raw: true,
      where: { serialNo },
    });

    return battery;
  }

  /**
   * @returns {Array.<Object>} a list of all batteries
   */
  static async getAllBattery() {
    const batteries = await Battery.findAll();

    return batteries;
  }
}

export default BatteryService;
