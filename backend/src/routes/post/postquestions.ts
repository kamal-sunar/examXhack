import express, { Router, Request, Response } from "express";
import { findSimilarity_py } from "../../utils/findSimilarity_py";
import { PostQuestionsRequest } from "../../utils/interfaces"

const router: Router = express.Router();

router.post("/postquestions", async (
    req: Request<{}, {}, PostQuestionsRequest>, 
    res: Response) => {
    const {university, course, subject, questions} = req.body
    console.log(req.body)
    const response = await findSimilarity_py("questions")

    res.status(response.statusCode).json({status: response.status, result: response.result})
});

export default router;
