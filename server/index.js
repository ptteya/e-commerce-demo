const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');
const seedFurnitureData = require('./seeders/furnitureSeeder.js');
const seedUsersData = require('./seeders/userSeeder.js');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(authentication);
app.use(routes);

mongoose.connect(DB_CONNECTION_STRING)
    .then(async () => {
        console.log('MongoDB connected');

        await seedFurnitureData();
        await seedUsersData();

        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    })
    .catch((error) => console.error('MongoDb connection error', error));
