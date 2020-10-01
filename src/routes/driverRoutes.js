import express from 'express';
import Validation from "../middleware/driverValidation";
import DriverController from "../controller/driverController";


const router = express.Router();

router.post('/', Validation.driverDetailsValidator, DriverController.registerDriver);
router.get('/:driverId', DriverController.getDriverDetails);

export default router;