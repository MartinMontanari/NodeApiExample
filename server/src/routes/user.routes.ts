import CommonRoutes from "./common.routes";
import {Application, Request, Response} from "express";
import shortid from "shortid";

export default class UserRoutes extends CommonRoutes{
    private users : any[];

    constructor(app: Application) {
        super(app, 'User');
        this.users = [];
    }

    setUpRoutes(){

        this.app.get('/users', (_req: Request, res: Response) => {
            return res.json({users: this.users });
        });

        this.app.post('/users', (req: Request, res: Response) => {
            const user = req.body;

            if(!user.email && user.password) {
                return res.status(400).json('Email or password missing.');
            }
            user.id = shortid.generate();
            this.users.push(user);
            return res.status(201).json({id: user.id});
        })

        this.app.put('/users/:id', (req: Request, res: Response) => {
            if(!req.params.id){
                return res.status(404).json({message: 'Id must be required.'})
            }

            const id = req.params.id;
            const user = this.users.find(u => u.id === id);

            if(!user){
                return res.status(404).json({message: 'User not found.'});
            }

            user.email = req.body.email;
            user.password = req.body.password;

            const index = this.users.findIndex((u) => u.id === user.id);

            this.users[index] = user;

            return res.status(200).json({message: `User ${user.id} has been updated successfully.`});
        });
        return this.app;
    }
}