export interface PostQuestionsRequest {
    university  : string;
    course      : string;
    subject     : string;
    questions   : Question[];           // Array of interface question
    total_marks : number;
    year        : string;
}

interface Question {
    index       : string;
    subquestion : string;
    marks       : number;
}

export interface Reply {
    statusCode  : number;
    status      : string;
    result      : string;
}