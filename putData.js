



const mongoose = require("mongoose");

module.exports.putData = ()=> {
        mongoose.connect("mongodb://127.0.0.1:27017/timetableDB" , { useNewUrlParser: true });

    //making the collections

    const userSchema = {
        username: String,
        password: String,
        class: String
    };
    const User = mongoose.model("User", userSchema);

    const classTimetableSchema = {
        class: String,
        monday: [],
        tuesday: [],
        wednessday: [],
        thursday: [],
        friday: [],
        saturday: []
    };
    const ClassTimetable = mongoose.model("ClassTimetable", classTimetableSchema);


    //creating the bba2 timetable
    ClassTimetable.find({class: "BBA-II"} , (err,classFound)=>{
        if (classFound.length === 0){
            const BBA2 = new ClassTimetable({
                class: "BBA-II",
                monday: ["UBBA-401" , "UBBA-402" ,"UBBA-403" , "UGEN-401" , "Free" , "Sec Lang"],
                tuesday: ["UGEN-401" , "UBBA-403" ,"Sec Lang" , "UBBA-404" , "UBBA-404" , "UBBA-402"],
                wednessday: ["UAWR-400" , "UBBA-402" ,"INTERNET" , "Sec Lang" , "UBBA-402" , "UGEN-401"],
                thursday: ["Moral Class" , "UBBA-403" ,"UBBA-401" , "UBBA-403" , "UBBA-401" , "Colloquium"],
                friday: ["UBBA" , "UBBA-404" ,"UBBA-404" , "UBBA" , "UBBA" , "UAWR-400"],
                saturday: ["UGEN-401" , "Free" ,"Free" , "Free" , "Free" , "Free"],
                before: ["Class" , "Class" ,"Class" , "Class" , "Class" , "Class"]
            });
            BBA2.save();
        }
    })
    ClassTimetable.find({class: "BBA-I"} , (err,classFound)=>{
        if (classFound.length === 0){
            const BBA2 = new ClassTimetable({
                class: "BBA-I",
                monday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                tuesday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                wednessday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                thursday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                friday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                saturday: ["UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101", "UBBA-101"],
                before: ["Class" , "Class" ,"Class" , "Class" , "Class" , "Class"]
            });
            BBA2.save();
        }
    })
    ClassTimetable.find({class: "BBA-III"} , (err,classFound)=>{
        if (classFound.length === 0){
            const BBA2 = new ClassTimetable({
                class: "BBA-III",
                monday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                tuesday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                wednessday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                thursday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                friday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                saturday: ["UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601", "UBBA-601"],
                before: ["Class" , "Class" ,"Class" , "Class" , "Class" , "Class"]
            });
            BBA2.save();
        }
    })
    //creating the first user
    User.find({},(err,userFound)=>{
        if (userFound.length === 0) {
            const user = new User({
                username: "goyalharshit79",
                password: "goyalharshit79",
                class: "BBA-II"
            });
            user.save();
        }
    })
    models = [];
    models.push(ClassTimetable);
    models.push(User);
    return models;
}