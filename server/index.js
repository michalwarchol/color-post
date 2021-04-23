const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const result = require("dotenv").config();

if(result.error){
    console.log(result.error);
}

const authRoutes = require("./routes/authRoutes");
const paletteRoutes = require("./routes/paletteRoutes");
const {requireAuth} = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

//connection to MongoDB Atlas
const uri = process.env.ATLAS_URI; // look .env file
mongoose.connect(process.env.ATLAS_URI,
 {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch(err=>console.log('Error message: '+err)
 );

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection granted!");
})

//middleware
app.use(express.json());
app.use(express.static(DIST_DIR));
app.use(cookieParser());

//routes
app.use("/", authRoutes);
app.use("/api/v1/palette", paletteRoutes);

//responds index.html from dist folder
app.get('/*', (req, res) => {
    res.sendFile(HTML_FILE);
})


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});