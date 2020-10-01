import express from 'express';
import driver from './driverRoutes';
import battery from './batteryRoutes';
import station from './stationRoutes';
import swapp from './swappRoutes';

const router = express.Router();

router.use('/api/driver', driver);
router.use('/api/battery', battery);
router.use('/api/station', station);
router.use('/api/swapp', swapp);

export default router;