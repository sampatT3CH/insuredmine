import  express  from "express";
import { insertMessage } from "../controllers/task2.js";



const router = express.Router();

router.post('/insert-message',insertMessage);

export default router