require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/posts")
const port = 7000;
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use("/uploads",express.static("./upload"));
app.use(router)

app.listen(port,()=>{
    console.log("server start")
})
