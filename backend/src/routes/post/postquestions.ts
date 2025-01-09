import express, { Router, Request, Response } from "express";
import { findSimilarity_py } from "../../utils/findSimilarity_py";
import { PostQuestionsRequest } from "../../utils/interfaces"

const router: Router = express.Router();

router.post("/postquestions", async (
    req: Request<{}, {}, PostQuestionsRequest>, 
    res: Response) => {
    const input: PostQuestionsRequest = req.body

    const response = await findSimilarity_py(input)

    res.status(response.statusCode).json({status: response.status, result: response.result})
});

export default router;
