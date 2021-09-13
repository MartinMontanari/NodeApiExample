import CommonRoutes from "./common.routes";
import {Application, Request, Response} from "express";
import shortid from "shortid";
import {log} from 'debug';

class UserRoutes extends CommonRoutes{
    private users : any[];

    constructor(app: Application) {
        super(app, 'User');
        this.users = [];
        this.setUpRoutes();
    }

    setUpRoutes() : Application{
        this.app.get('/users', (_req: Request, res: Response) => {
            return res.json({users: this.users });
        });

        this.app.post('/users', (req: Request, res: Response) => {
            log(req.body);
            const user = req.body;

            if(!user.email || !user.password) {
                return res.status(400).json('Email or password missing.');
            }
            user.id = shortid.generate();
            this.users.push(user);
            return res.status(201).json({id: user.id});
        })

        this.app.put('/users/:id', (req: Request, res: Response) => {
            if(!req.params.id){
                return res.status(404).json({message: 'User id must be provided'})
            }

            const userId = req.params.id;
            const user = this.users.find(u => u.id === userId);

            if(!user){
                return res.status(404).json({message: 'User not found.'});
            }

            user.email = req.body.email;
            user.password = req.body.password;

            const index = this.users.findIndex((u) => u.id === user.id);

            this.users[index] = user;

            return res.status(200).json({message: `User ${user.id} has been updated successfully.`});
        });

        this.app.delete('/users/:id',(req: Request, res: Response) => {
            if(!req.params.id){
                return res.status(404).json({message: 'User id must be provided.'});
            }
            const userId = req.params.id;
            const user = this.users.find(u => u.id === userId);
            if(!user){
                return res.status(404).json({message: 'User not found.'});
            }
            this.users = this.users.filter(u => u.id !== userId);

            return res.status(200);
        });

        return this.app;
    }
}

export default UserRoutes;