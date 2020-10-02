import express from 'express';
import MotocycleController from "../controllers/motocycleController";
import Validation from "../middleware/motocycleValidation";

const router = express.Router();

router.post('/', Validation.motocycleDetailsValidator, MotocycleController.registerMotocycle);
router.get('/', MotocycleController.getAllMotocycle);
router.get('/:serialNo', MotocycleController.getMotocycle);

export default router;