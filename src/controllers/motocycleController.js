import MotocycleService from "../services/motocycleService";

class MotocycleController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} created motocycle details
   */
  static async registerMotocycle(req, res) {
    try {
      const motocycle = await MotocycleService.addMotocycle(req.body);

      return res.status(201).json({
        message: "motocycle registered successful",
        motocycle,
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
   * @returns {Object} motocycle details
   */
  static async getMotocycle(req, res) {
    try {
      const { serialNo } = req.params;
      const motocycle = await MotocycleService.getMotocycleBySerialNo(serialNo);

      if (!motocycle)
        return res.status(404).json({ message: "motocycle not found!" });

      return res.status(200).json({ motocycle });
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
   * @returns {Array.Object} a list of all motocycles
   */
  static async getAllMotocycle(req, res) {
    try {
      const motocycles = await MotocycleService.getAllMotocycles();

      if (motocycles.length === 0)
        return res.status(404).json({ message: "no motocycle found!" });

      return res.status(200).json({ motocycles });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }
}

export default MotocycleController;
