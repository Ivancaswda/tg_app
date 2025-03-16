import express from 'express'
import {
    getSpecificStatus,
    getStatuses,
    rateStatus,
    removeStatus,
    uploadStatus
} from "../controllers/statusController.js";
import {protectRoute} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";


const statusRouter = express.Router()

statusRouter.get('/get-statuses', protectRoute, getStatuses)

statusRouter.get('/get-status/:id', protectRoute, getSpecificStatus)

statusRouter.post("/rate", protectRoute, rateStatus)

statusRouter.post('/add-status', upload.single('file'),uploadStatus)

statusRouter.post('/remove-status', protectRoute, removeStatus)

export default statusRouter