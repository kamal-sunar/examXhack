import express, {Request, Response, Router} from "express"
import { Reply } from "../../utils/interfaces";

const router: Router = express.Router()

router.get("/:university/:course/:subject", (req: Request, res: Response) => {
    const { university, course, subject } = req.params;
    const response: Reply = {
        statusCode: 200,
        status: "success",
        result: "" // results are the questions
    }
    res.status(200).json(response)
})

export default router