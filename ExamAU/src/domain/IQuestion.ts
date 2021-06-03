export interface IQuestion {

    id?: string;
    questionText: string;
    isPoll: boolean;
    multipleChoice: boolean;
    quizId: string;
    dateAdded?: string;


} 