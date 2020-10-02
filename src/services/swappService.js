import model from "../db/models";

const { Swapp } = model;

class SwappService {
  static async swapp(swappDetails) {
    const swapp = (await Swapp.create(swappDetails)).get({
      plain: true,
    });
    return swapp;
  }

  /**
   *
   * @param {String} driverId
   * @returns {Array.Object} a list of all swapp made for the driver
   */
  static async getSwappsByDriverId(driverId) {
    const swapps = await Swapp.findAll({
      raw: true,
      where: {
        DriverId: driverId,
      },
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    return swapps;
  }

  /**
   * @returns {Array.Object} a list of battery swapps
   */
  static async getAllSwapps() {
    const swapps = await Swapp.findAll();
    return swapps;
  }
}

export default SwappService;
