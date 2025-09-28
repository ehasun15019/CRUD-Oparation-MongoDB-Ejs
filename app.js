const express = require("express");
const app = express();
// require path for public folder
const path = require("path")

// server port 
const PORT = 3000;


// view engine with ejs
app.set("view engine", "ejs") 
// requested middleware
app.use(express.json());
// from data handling middleware 
app.use(express.urlencoded({ extended:true }));
// for public folder path 
app.use(express.static(path.join(__dirname, "public")));




app.get("/", (req, res)=> {
    res.render("index");
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);  
})