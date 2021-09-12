import express from 'express';
import cors from 'express';
import {log} from 'debug';
import CommonRoutes from './routes/common.routes';
import UserRoutes from './routes/user.routes';
import expressWinston from 'express-winston';
import winston from "winston";

const app = express();

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};
if(!process.env.DEBUG){
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const routes: Array<CommonRoutes> = [];
app.use(cors());
app.use(express.json());

routes.push(new UserRoutes(app));

app.listen(3000, () => {
    routes.forEach((route: CommonRoutes) => {
        log(`Routes configured for ${route.getName()}`)
    });
    console.log('server listening on port 3000');
});