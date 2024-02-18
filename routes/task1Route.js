import  express  from "express";
import { aggregatedPolicy, policyInfo, uploadData } from "../controllers/task1.js";


const router = express.Router();

router.post('/upload',uploadData);
router.get('/policy-info/:username',policyInfo);
router.get('/aggregated-policy',aggregatedPolicy);

export default router