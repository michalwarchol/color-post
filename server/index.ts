import "dotenv-safe/config";
import express, {Application, Request, Response} from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import paletteRoutes from "./routes/paletteRoutes";

const app: Application = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

//connection to MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri as string,
 {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}).catch((err: Error) =>console.log('Error message: '+err)
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
app.use("/user", userRoutes);
app.use("/api/v1/palette", paletteRoutes);

//responds index.html from dist folder
app.get('/*', (_: Request, res: Response) => {
    res.sendFile(HTML_FILE);
})


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});