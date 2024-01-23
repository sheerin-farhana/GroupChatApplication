const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const sequelize = require('./Utils/database');

const { User } = require('./models/User');
const userRoutes = require('./routes/user');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT || 3000);
        console.log("app is running");
    })
    .catch(err => console.log(err));