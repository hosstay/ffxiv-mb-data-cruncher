const express = require('express');

const app = module.exports = express.Router();

// app.use(compression());

const model = require('../models/data');

app.post('/api/data/addData', model.addData);
app.post('/api/data/getAllData', model.getAllData);