import CommonRoutes from "./common.routes";
import shortId from 'shortid';
import express from "express";

export default class UserRoutes extends CommonRoutes{
    private users: [];

    constructor(app) {
        super(app,'User');
        this.users = [];
    }

    setUpRoutes() {
        this.app.get('/users',(_req: express.Request, res: express.Response) =>{
            return res.json({users: this.users})
        });

        this.app.post('/users',(req: express.Request, res: express.Response) =>{
            const user = req.body.user;
            if(user.email && user.password){
                user.id = shortId.generate();
                this.users.push(user);
                res.status(201).json({id: user.id});
            }
            res.status(400).json({message: 'email or password missing'})
        });

        this.app.put('/users/:id',(req: express.Request, res: express.Response) =>{
            if(!req.params.id){
                return res.status(404);
            }

            const user = this.users.find(u => u.id === req.params.id);

            if(!user){
                return res.status(404);
            }

            user.email = req.body.email;
            user.password = req.body.password;

            const index = this.users.findIndex((u) => u.id === user.id);
            this.users[index] = user;

            return res.status(200);
        })

        return this.app;
    }
}