import model from "../db/models";

const { Motocycle } = model;

class MotocycleService {
  /**
   *
   * @param {Object} motocycleDetails
   * @returns {Object} created motocycle details
   */
  static async addMotocycle(motocycleDetails) {
    const { serialNo, status, registrationPlate } = motocycleDetails;
    const newMotocycle = {
      serialNo,
      status,
      registrationPlate,
    };
    const motocycle = (await Motocycle.create(newMotocycle)).get({
      plain: true,
    });
    return motocycle;
  }

  /**
   *
   * @param {Object} serialNo
   * @returns {Object} motocycle details
   */
  static async getMotocycleBySerialNo(serialNo) {
    const motocycle = await Motocycle.findOne({
      raw: true,
      where: { serialNo },
    });
    return motocycle;
  }

  /**
   * @returns {Array.Object} a list of motocycles
   */
  static async getAllMotocycles() {
    const motocycles = await Motocycle.findAll();
    return motocycles;
  }
}

export default MotocycleService;
