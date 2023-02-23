//requiring the stuff
const  express= require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const data = require(__dirname + "/putData.js")

//setting up the app
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

//putting the data
const models = data.putData();
const ClassTimetable = models[0];
const User = models[1]

//constants and variables to be used
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var userLoggedIn = [];

let today = new Date();
let options = {
    weekday : "long",
};

let day = today.toLocaleDateString("en-US",options);


app.get("/" , (req,res)=>{

    
    userLoggedIn = [];
    res.render("signin");
});

app.get("/signup" , (req,res)=>{
    res.render("signup");
});

app.get("/timetable" , (req,res)=>{
    if (userLoggedIn.length === 0) {
        res.redirect("/");
    } else {
        res.redirect("/timetable/" + day);
    }
    
});

app.get("/timetable/:day" , (req,res)=>{
    const classNeeded = userLoggedIn[0].class;
    ClassTimetable.find({class: classNeeded} , (err,foundTimetable)=>{
        if(err){
            console.log(err);
        }
        else{
            switch (req.params.day) {
                case "Monday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].monday});
                
                    break;
                case "Tuesday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].tuesday});
                
                    break;
                case "Wednesday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].wednesday});        
                    break;
                case "Thursday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].thursday});
            
                    break;
                case "Friday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].friday});
                
                    break;
                case "Saturday":
                    res.render("schedule" , {days: days, timetable : foundTimetable[0].saturday});
                
                    break;
                default:
                    break;
                }   
        }
    });
    
});

app.post("/" , (req,res)=>{
    usernameTyped = req.body.usernameTyped;
    passwordTyped= req.body.passwordTyped;
    User.find({username: usernameTyped} , (err,userFound)=>{
        if(!err){
            if (userFound.length === 1) {
                if (userFound[0].password === passwordTyped) {
                    userLoggedIn.push(userFound[0]);
                    res.redirect("/timetable");
                }else{
                    console.log("Wrong Password!");
                    res.redirect("/");
                }
            } else {
                console.log("User Not Found!");
                res.redirect("/");
            }
        }
    })
});

//adding a new user
app.post("/signup" , (req,res)=>{
    username = req.body.username;
    password = req.body.password;
    User.find({username: username , password: password} , (err,userFound)=>{
        if (userFound.length === 1) {
            console.log("User already exists!");
            res.redirect("/signup");
        } else {
            if (password === req.body.confirmPassword) {
                const user = new User({
                    username: username,
                    password: password,
                    class: req.body.class
                });
                user.save();
                res.redirect("/");
            } else {
                console.log("Passwords don't match!");
                res.redirect("/signup");
            }
        }
    })
});


app.listen(3000 , ()=>{
    console.log("The server is running on the port 3000");
});