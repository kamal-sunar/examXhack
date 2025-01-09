import express, {Express} from "express"
import dotenv from "dotenv"
import { use } from "./utils/use"; // app.use.. configs

dotenv.config();

const app: Express = express()
const port = process.env.PORT || 8000;

use(app)

app.listen(port, () => {
    console.log(`[server]: listenting on http://localhost:${port}`)
})