import model from "../db/models";

const { Station } = model;

class StationService {
  /**
   *
   * @param {Object} stationDetails
   * @returns {Object} created station details
   */
  static async addStation(stationDetails) {
    const { location, batteries } = stationDetails;
    const newStation = {
        location, batteries
    };
    const station = (await Station.create(newStation)).get({
      plain: true,
    });
    return station;
  }

  /**
   *
   * @param {Object} stationId
   * @returns {Object} station details
   */
  static async getStationById(stationId) {
    const station = await Station.findOne({
      raw: true,
      where: { id: stationId },
    });
    return station;
  }

  /**
   * @returns {Array.Object} a list of stations
   */
  static async getAllStations() {
    const stations = await Station.findAll();
    return stations;
  }
}

export default StationService;
