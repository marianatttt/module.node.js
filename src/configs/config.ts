import { config } from "dotenv";

config();

export const configs ={
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,

    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'aaa' ,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'bbb',

    FORGOT_SECRET: process.env.JWT_FORGOT_SECRET ,
    ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

    NO_REPLY_EMAIL:process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD:process.env.NO_REPLY_EMAIL_PASSWORD,

    TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
    TWILIO_SERVICE_SID:process.env.TWILIO_SERVICE_SID,

    FRONT_URL: process.env.FRONT_URL,


    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY,

    AWS_S3_NAME:process.env.AWS_S3_NAME,
    AWS_S3_URL:process.env.AWS_S3_URL,
    AWS_S3_REGION:process.env.AWS_S3_REGION,
    AWS_S3_ALC:process.env.AWS_S3_ALC,

}