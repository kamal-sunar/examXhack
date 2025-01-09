import { spawn } from "child_process";
import { Reply } from "./interfaces";

export const findSimilarity_py = (questions: string): Promise<{ statusCode: number; status: string; result: string }> => {
    return new Promise((resolve, reject) => {
        const response: Reply = {
            statusCode: 200,
            status: "",
            result: "",
        };

        const findSimilarity = spawn("python", ["src/python/main.py"]);

        findSimilarity.stdin.write(questions);
        findSimilarity.stdin.end();

        findSimilarity.stdout.on("data", (chunk) => {
            response.result += chunk.toString(); // Ensure it's a string
        });

        findSimilarity.stderr.on("data", (chunk) => {
            console.error("Error from Python script:", chunk.toString());
        });

        findSimilarity.on("close", (code) => {
            if (code !== 0) {
                console.error(`Python process exited with code ${code}`);
                response.statusCode = 500;
                response.status = "error";
                reject(response);
            } else {
                console.log("Python result:", response.result);
                response.statusCode = 200;
                response.status = "success";
                resolve(response);
            }
        });

        findSimilarity.on("error", (err) => {
            console.error("Error spawning Python process:", err);
            response.statusCode = 500;
            response.status = "Error spawning Python process";
            reject(response);
        });
    });
};
