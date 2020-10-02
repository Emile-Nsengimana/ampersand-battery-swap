import StationService from "../services/stationService";

class StationController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} created station details
   */
  static async registerStation(req, res) {
    try {
      const station = await StationService.addStation(req.body);

      return res.status(201).json({
        message: "station registered successful",
        station,
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
   * @returns {Object} station details
   */
  static async getStation(req, res) {
    try {
      const { stationId } = req.params;
      const station = await StationService.getStationById(stationId);

      if (!station)
        return res.status(404).json({ message: "station not found!" });

      return res.status(200).json({ station });
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
   * @returns {Array.Object} a list of all stations
   */
  static async getAllStation(req, res) {
    try {
      const stations = await StationService.getAllStations();

      if (stations.length === 0)
        return res.status(404).json({ message: "no station found!" });

      return res.status(200).json({ stations });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "server error" });
    }
  }
}

export default StationController;
