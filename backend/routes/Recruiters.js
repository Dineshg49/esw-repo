var express = require("express");
var routerone = express.Router();

// Load model
const Recruiter = require("../models/Recruiters");
const Session = require("../models/RecruiterSession");

routerone.get("/", function(req, res) {

//         Recruiter.remove({}, function(err) { 
//    console.log('collection removed') 
// });
    Recruiter.find(function(err, recruiters) {
		if (err) {
			console.log(err);
		} else {
			res.json(recruiters);
		}
	})
});

//Registration

routerone.post("/register", (req, res) => {
    const newRec = new Recruiter({
        name: req.body.name,
		email: req.body.email,
		date: req.body.date,
        password: req.body.password
    });
    //console.log("hi");
    newRec.save()
        .then(user => {
            res.send("Created Recruiter With Username " + user.name);
        })
        .catch(err => {
            res.send("Error: Account With Given Email Exists");
        });
});


// Login
routerone.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Recruiter.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			res.send("Email Not Found");
        }
        else{
            const password=req.body.password;
            
           
            if(user.password==password)
            {
                res.send("Success");
                // res.send(user.date);
            }
            else
            {
                res.send("Password Mismatch");
            }
            //return user;
        }
	});
});

routerone.post("/contactno", (req, res) => {
    const email = req.body.email;
    
	// Find user by email
	Recruiter.update({email:email},{contact_no:req.body.number }, function (err, result) { 
        if (err){ 
            console.log(err) 
        }else{ 
            console.log("Result :", result)  
            res.send("yey");
        } 
    }); 
});

routerone.post("/bio", (req, res) => {
    const email = req.body.email;
    
	// Find user by email
	Recruiter.update({email:email},{bio:req.body.bio }, function (err, result) { 
        if (err){ 
            console.log(err) 
        }else{ 
            console.log("Result :", result)  
            res.send("yey");
        } 
    }); 
});

routerone.post("/findone", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Recruiter.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            // res.send("Email Found");
            res.json(user); 
            // const password=req.body.password;
            // console.log(password)
            
        }
	});
});

routerone.get("/session", function(req, res) {
    
//     User.remove({}, function(err) { 
//    console.log('collection removed') 
// });
    
    Session.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

routerone.get("/logout", function(req, res) {
    
    Session.remove({}, function(err) { 
        console.log('collection removed') 
        });
    
    // Session.find(function(err, users) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.json(users);
	// 	}
	// })
});

routerone.post("/session", (req, res) => {

    Session.remove({}, function(err) { 
        console.log('collection removed') 
    });
	const email = req.body.email;
	// Find user by email
	const newSession = new Session({
        email: req.body.email
    });
    // console.log(newUser)
    newSession.save()
        .then(user => {
            // res.status(200).json(user);
            res.send(user.email);
        })
        .catch(err => {
            // res.status(400).send(err);
            // console.log(err);
            res.send("Error: Account With Given Email Exists");
        });
});

module.exports = routerone;