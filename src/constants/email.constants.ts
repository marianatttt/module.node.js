
export enum EEmailActions {
    WELCOME ,
    FORGOT_PASSWORD
}
export const allTemplates: {
    [key: string]: { subject: string; templateName: string; }
} =
{
    [EEmailActions.WELCOME]: {
        subject: "Great to see you in our api",
        templateName: "register"
    },
    [EEmailActions.FORGOT_PASSWORD]: {
        subject: "We control your password",
        templateName: "forgotPassword"
    }
}


