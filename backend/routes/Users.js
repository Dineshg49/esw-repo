var express = require("express");
var router = express.Router();


// Load User model
// const User = require("../models/Users");
// const Session = require("../models/UserSession");

// GET request 
// Getting all the users
function callbackFunc(response) {
    // do something with the response
    
    console.log(response);
}

router.get("/getData", function(req, res) {
    
//     User.remove({}, function(err) { 
//    console.log('collection removed') 
// });
    // var check = ("100"<"101");
    // res.send(check)

    // User.find(function(err, users) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.json(users);
	// 	}
	// })

    var spawn = require("child_process").spawn;
      
    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    var process = spawn('python',["./testscript.py"] );
  
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        res.send(data.toString());
        })

});

module.exports = router;

