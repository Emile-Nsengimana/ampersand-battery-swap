import express from 'express';
import StationController from "../controllers/stationController";

const router = express.Router();

router.post('/', StationController.registerStation);
router.get('/', StationController.getAllStation);
router.get('/:stationId', StationController.getStation);


export default router;