import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
dotenv.config()


const app: Express = express();

app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended: true}));
app.use(cors({
    origin:"*"
}));

app.use("/api",router);

app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.send("Hello World");
});

export default app;
