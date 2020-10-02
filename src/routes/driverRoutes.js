import express from 'express';
import Validation from "../middleware/driverValidation";
import DriverController from "../controllers/driverController";


const router = express.Router();

router.post('/', Validation.driverDetailsValidator, DriverController.registerDriver);
router.get('/', DriverController.getAllDrivers);
router.get('/:driverId', DriverController.getDriverDetails);

export default router;