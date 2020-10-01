import express from 'express';
import Validation from "../middleware/batteryValidation";
import BatteryController from "../controller/batteryController";

const router = express.Router();

router.post('/', Validation.batteryDetailsValidator, BatteryController.registerBattery);
router.get('/:serialNo', BatteryController.getBattery);

export default router;