import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import e from 'express';
const app = express();

const pool = new Pool({
    user: 'doja',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'users'
});

app.use(cors({'origin':"*"}));
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, resp) => {
    console.log('request hit');
    resp.send('kwpqooekjqpwo');
});
const checkUserExistsForSignUp=async (req:Request,resp:Response,next:NextFunction)=>{
    const user=req.body.obj;
    const result=await pool.query('SELECT * FROM users WHERE email=($1)',[req.body.obj.email])
    console.log(result);
    if (result.rowCount){
        resp.status(409).send('User already Exists')
    } else{
        next();
    }
}
app.post('/signupuser',checkUserExistsForSignUp, async (req: Request, resp: Response) => {
    console.log('link hitted')
    const new_obj =req.body.obj;   
    new_obj.ID=Math.floor(Math.random()*100000000)+1;
    
    try {
    
            const result = await pool.query(
            'INSERT INTO users (ID, email, password) VALUES ($1, $2, $3)',
            [new_obj.ID, new_obj.email, new_obj.password]
        );

        resp.json({ success: true, message: 'User successfully registered' });
    } catch (error) {
        console.error('Error executing query', error);
        resp.status(500).json({ success: false, message: 'Internal Server Error' });
    }

resp.json(JSON.stringify(new_obj));

});

// Error handling middleware
app.use((err, req, resp, next) => {
    console.error(err.stack);
    resp.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});