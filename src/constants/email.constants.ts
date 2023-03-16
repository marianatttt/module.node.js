
export enum EEmailActions {
    WELCOME ,
    FORGOT_PASSWORD
}
export const allTemplates = {
    [EEmailActions.WELCOME]:{
        subject: "Great to see you in our appi",
        templateName: "register"
    },
    [EEmailActions.FORGOT_PASSWORD]:{
        subject: "We control your password",
        templateName: "forgotPassword"
    }

}


