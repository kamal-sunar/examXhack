export interface PostQuestionsRequest {
    university: string;
    course: string;
    subject: string;
    questions: string;
}

export interface Reply {
    statusCode: number,
    status: string,
    result: string
}