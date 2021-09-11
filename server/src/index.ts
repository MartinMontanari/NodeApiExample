import express from 'express';
import cors from 'express';
import UserRoutes from "./routes/user.routes";
import CommonRoutes from "./routes/common.routes";
import {log} from "winston";

const app = express();

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