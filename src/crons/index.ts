import  { removeOldTokens} from "./remove.old.tokens.cron";
import {removeOldPasswords} from "./remove.old.password.cron";

export const cronRunner =()=>{
    removeOldTokens.start();
    removeOldPasswords.start()
}