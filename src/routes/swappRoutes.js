import express from 'express';
import SwappController from "../controllers/swappController";
import Validation from "../middleware/swappValidation";

const router = express.Router();

router.post('/', Validation.swappValidator, SwappController.swappBattery);
router.get('/', SwappController.getSwaps);

export default router;