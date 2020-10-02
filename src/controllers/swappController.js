import SwappService from "../services/swappService";

class SwappController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} created station details
   */
  static async swappBattery(req, res) {
    try {
      const { distance, stationId, driverId, currentEnergyLevel } = req.body;
      const swappDetails = {
        oldBattery: {
          serialNo: req.oldBattery.serialNo,
          energyLevel: req.oldBattery.energyLevel,
        },
        newBattery: {
          serialNo: req.newBattery.serialNo,
          energyLevel: req.newBattery.energyLevel,
        },
        energyUsed: req.oldBattery.energyLevel - currentEnergyLevel,
        distance: distance,
        StationId: stationId,
        DriverId: driverId,
      };

      // check if it's not the first time the driver comes for a swapp
      const swapped = await SwappService.getSwappsByDriverId(driverId)[0];
      if (swapped) {
        swappDetails['distance'] = distance - swapped[0].distance;
        swappDetails['energyUsed'] = swapped[0].newBattery.energyLevel - currentEnergyLevel ;
      }

      const swapp = await SwappService.swapp(swappDetails);

      return res.status(201).json({
        message: "swapped successful",
        swapp,
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
   * @returns {Array.Object} a list of battery swapps
   */
  static async getSwaps(req, res) {
    try {
      const swapps = await SwappService.getAllSwapps();

      if (swapps.length === 0)
        return res.status(404).json({ message: "no swap has been made!" });

      return res.status(200).json({ swapps });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  }
}

export default SwappController;
