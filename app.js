//requiring the stuff
const  express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//setting up the app
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

//constants and variables to be used
const users = [];
let user = {username: "goyalharshit79", password: "goyalharshit79"};
users.push(user);
const days = ["Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"];
const timetable = {monday: ["UBBA-401" , "UBBA-402" ,"UBBA-403" , "UGEN-401" , "Free" , "Sec Lang"],
                   tuesday: ["UGEN-401" , "UBBA-403" ,"Sec Lang" , "UBBA-404" , "UBBA-404" , "UBBA-402"],
                    wednessday: ["UAWR-400" , "UBBA-402" ,"INTERNET" , "Sec Lang" , "UBBA-402" , "UGEN-401"],
                    thursday: ["UBBA" , "UBBA" ,"UBBA" , "UBBA" , "UBBA" , "UBBA"],
                    friday: ["UBBA" , "UBBA" ,"UBBA" , "UBBA" , "UBBA" , "UBBA"],
                    saturday: ["UBBA" , "UBBA" ,"UBBA" , "UBBA" , "UBBA" , "UBBA"],
                    before: ["Class" , "Class" ,"Class" , "Class" , "Class" , "Class"]};



app.get("/" , (req,res)=>{
    res.render("signin");
});
app.get("/signup" , (req,res)=>{
    res.render("signup");
});

app.get("/timetable" , (req,res)=>{
    res.render("timetable",{days:days});
});
app.get("/timetable/:day" , (req,res)=>{

    switch (req.params.day) {
        case "Monday":
            res.render("schedule",{days:days , timetable: timetable.monday});        
            break;
        case "Tuesday":
            res.render("schedule",{days:days , timetable: timetable.tuesday});        
            break;
        case "Wednessday":
            res.render("schedule",{days:days , timetable: timetable.wednessday});        
            break;
        case "Thursday":
            res.render("schedule",{days:days , timetable: timetable.thursday});        
            break;
        case "Friday":
            res.render("schedule",{days:days , timetable: timetable.friday});        
            break;
        case "Saturday":
            res.render("schedule",{days:days , timetable: timetable.saturday});        
            break;
        default:
            res.render("schedule",{days:days , timetable: timetable.before}); 
            break;
    }
    
});

app.post("/" , (req,res)=>{
    let userFound = false;
    users.forEach(user => {
        if (req.body.usernameTyped === user.username && req.body.passwordTyped === user.password) {
            userFound = true;
            res.redirect("/timetable");
        }
    });
    if (userFound === false) {
        res.redirect("/");
    }
});
app.post("/signup" , (req,res)=>{

    if (req.body.password === req.body.confirmPassword) {
        user = {username: req.body.username, password: req.body.password};
        users.push(user);
        res.redirect("/");

    } else {
        res.redirect("/signup");
        console.log("Passowrds dont match");
    } 
});


app.listen(3000 , ()=>{
    console.log("The server is running on the port 3000");
});