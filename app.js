const express = require('express')
var pageRoutes = require('./routes/pageRoute')
require('dotenv').config();

const app = express()

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static("public"));

//Routes
app.use('/', pageRoutes);

//Port
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));