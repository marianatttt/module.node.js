import {ESmsActionEnum} from "../enums";

export const smsTemplates: {
    [key: string]:  string } = {
        [ESmsActionEnum.WELCOME]: "Great to see you in our api",
        [ESmsActionEnum.FORGOT_PASSWORD]:  "We control your password",


    }
