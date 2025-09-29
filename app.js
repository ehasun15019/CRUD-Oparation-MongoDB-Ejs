const express = require("express");
const app = express();
// require path for public folder
const path = require("path")
// server port 
const PORT = 3000;
// import user-model
const userModel = require("./models/user")


// view engine with ejs
app.set("view engine", "ejs") 
// requested middleware
app.use(express.json());
// from data handling middleware 
app.use(express.urlencoded({ extended:true }));
// for public folder path 
app.use(express.static(path.join(__dirname, "public")));



// get request
app.get("/", (req, res)=> {
    res.render("index");
});

app.get("/read", async (req, res)=> {
    let user = await userModel.find();
    res.render("read", {user});
});

// post request for create user
app.post("/create", async (req, res)=> {    
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name: name,
        email: email,
        image: image,
    });

    res.redirect("/read");
});


// Delete any user 
app.get("/delete/:id", async (req, res) => {
    let user = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")
})

// Edit any user
app.get("/edit/:id", async (req, res) => {
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", {user})
})

// updated user 
app.post("/update/:id", async (req, res) => {
    let {name, email, image} = req.body;

    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image}, {new: true});
    res.redirect("/read")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);  
})