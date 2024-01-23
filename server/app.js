
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./Utils/database');
const userRoutes = require('./routes/user');


const app = express();
let corsOptions = {
    origin: ['http://localhost:3000'],
}
app.use(cors({
    origin: '*',
    methods:['GET','POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(3000,() => {
            console.log("app is running");
        });
        
    })
    .catch(err => console.log(err));