import { CronJob } from 'cron';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import {Token} from "../models";

dayjs.extend(utc)
const tokenRemover = async():Promise<void>=>{
    const previousMonth = dayjs().utc().subtract(1, 'day')
    // console.log(previousMonth.toISOString())
    // const previousMonth = dayjs().utc().format("DD/MM/YYYY")
    // console.log(previousMonth)

    await Token.deleteMany({
        createdAt:{$lte:previousMonth}
    })

}

export const removeOldTokens = new CronJob ("* * * * * *", tokenRemover);


