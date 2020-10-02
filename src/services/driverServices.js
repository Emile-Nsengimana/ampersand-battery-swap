import model from "../db/models";

const { Driver } = model;

/**
 * Driver service
 */
class DriverService {
  /**
   *
   * @param {Object} driverDetails
   * @returns {Object} created driver details
   */
  static async createDriver(driverDetails) {
    const { driverId, firstName, lastName, phoneNo, gender, motocycleSerialNo } = driverDetails;
    const newDriver = {
      driverId,
      firstName,
      lastName,
      phoneNo,
      gender,
      MotocycleId: motocycleSerialNo
    };
    const driver = (await Driver.create(newDriver)).get({ plain: true });
    return driver;
  }

  /**
   *
   * @param {Object} driverId
   * @returns {Object} driver details
   */
  static async getDriverById(driverId) {
    const driver = await Driver.findOne({
      raw: true,
      where: { driverId },
    });

    return driver;
  }

  /**
   *
   * @returns {Array.Object} a list of all drivers
   */
  static async getAllDrivers() {
    const drivers = await Driver.findAll();

    return drivers;
  }
}

export default DriverService;
