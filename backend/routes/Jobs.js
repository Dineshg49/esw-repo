var express = require("express");
var router = express.Router();

// Load User model
const Job = require("../models/Jobs");
const User = require("../models/Users")

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    
//     Job.remove({}, function(err) { 
//    console.log('collection removed') 
// });

    // var x= '5';
    // var y= parseInt(x,10);
    // console.log(y);
    // console.log(typeof y)
    
    Job.find(function(err, Jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(Jobs);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/addjob", (req, res) => {
    const newJob = new Job({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        max_app: req.body.max_app,
        // applicants: req.body.applicants,
        // rejected: req.body.rejected,
        // accepted: req.body.accepted,
        max_pos: req.body.max_pos,
        deadline: req.body.deadline,
        email: req.body.email,
        date: Date.now(),
        skills: req.body.skills,
        job_type: req.body.job_type,
        duration: req.body.duration,
        salary: req.body.salary,
        // rating: req.body.rating,
        contact_no : req.body.contact_no
    });
    console.log("hi");
    newJob.save()
        .then(job => {
            // res.status(200).json(Job);
            res.send("Success");
            console.log(req);
        })
        .catch(err => {
            res.status(400).send(err);
            console.log(err);
            // res.send("Failure");
        });
});

router.post("/getjobs", (req, res) => {
    Job.find({
        email: req.body.email
        }, 
        function(err, Jobs){
            if (err) {
                console.log(err);
            } 
            else {
                res.json(Jobs);
            }
	    })
});

router.post("/editjobs", (req, res) =>{
    const id = req.body.id;
    Job.update({_id:id},{max_app:req.body.max_app, max_pos:req.body.max_pos,deadline:req.body.deadline}, function (err, result) { 
        if (err){ 
            console.log(err) 
        }else{ 
            console.log("Result :", result)  
            res.send("yey");
        } 
    }); 
}); 

// router.post("/rejapps", (req, res) =>{
//     const id = req.body.id;
//     Job.findOne({ _id: id })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({
//                     error: "Job not found",
//                 });
//             }
//             else {
//                 vals = [];
//                 user.applicants.map(aname =>{
//                     vals.push({
//                         name: aname,
//                     });
//                 })
//             }
// 	    });
// });

// POST request 
// Login
router.post("/deljob", (req, res) => {
    const id = req.body.id;
	// Find user by email
	Job.findOne({ _id: id }).then(job => {
		// Check if user email exists
		if (!job) {
			return res.status(404).json({
				error: "Job not found",
			});
        }
        else{
            job.accepted.map( user => {
                User.findOneAndUpdate(
                    {email:user},
                    {$pull: {has_rated: {email:user}}},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                            // res.send("yey");
                        }
                    }
                );
            })

            job.applicants.map( user => {
                User.findOneAndUpdate(
                    {email:user},
                    {$inc:{no_of_apps:-1}},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                            // res.send("yey");
                        }
                    }
                );

            job.shortlisted.map( user => {
                User.findOneAndUpdate(
                    {email:user},
                    {$inc:{no_of_apps:-1}},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                            // res.send("yey");
                        }
                    }
                );
            })
            })

            job.remove();
            res.send("Deleted");
        }
	});
});

router.post("/applyjob", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const ssop = req.body.sop;
    
    User.findOneAndUpdate(
        {email:req.body.email},
        {$inc:{no_of_apps:1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("yey");
            }
        }
    );

    var da = new Date();
    var m = da.getMonth()+1;
    m = m.toString();
    var y = da.getFullYear();
    y = y.toString();
    var d = da.getDate();
    d = d.toString();
    var fin = d + '-' + m + '-' + y;

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{applicants:email}, 
          $inc:{max_app:-1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("Application Successful");
            }
        }
    );

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{doa:{email:email, date:fin}}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("Application Successful");
            }
        }
    );
    
    console.log("ssop"+ssop)
    console.log("in routes" + ssop);
    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{sop:{email:email, text:ssop}}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                res.send("Application Successful");
            }
        }
    );

        
});

router.post("/acceptapp", (req, res) => {
    const id = req.body.id;
	const email = req.body.email;
    
    User.findOneAndUpdate(
        {email:req.body.email},
        {$inc:{accepted:1},$set:{no_of_apps:0}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("yey");
            }
        }
    );

    var da = new Date();
    var m = da.getMonth()+1;
    m = m.toString();
    var y = da.getFullYear();
    y = y.toString();
    var d = da.getDate();
    d = d.toString();
    var fin = d + '-' + m + '-' + y;

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{doj:{email:email, date:fin}}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("Application Successful");
            }
        }
    );

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{accepted:email},
        $inc:{max_pos:-1},
          $pullAll:{shortlisted:[email]}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                res.send("Accepted Successfully");
            }
        }
    );
});

router.post("/ratejob", (req, res) => {
    const id = req.body.id;
	const email = req.body.email;
    var x= req.body.rating;
    var y=parseInt(x,10);
    console.log(y);
    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{has_rated:{email:email, rating:req.body.rating}},
        $inc:{rating:y,no_of_raters:1}},
        
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("Application Successful");
            }
        }
    );
});

router.post("/shortlistapp", (req, res) => {
    const id = req.body.id;
	const email = req.body.email;
    
    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{shortlisted:email},
          $pullAll:{applicants:[email]}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                res.send("Shorlisted Successfully");
            }
        }
    );
});

router.post("/rejectapp", (req, res) => {
    const id = req.body.id;
	const email = req.body.email;
    
    User.findOneAndUpdate(
        {email:req.body.email},
        {$inc:{no_of_apps:-1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("yey");
            }
        }
    );

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$push:{rejected:email},
         $pullAll:{shortlisted:[email],applicants:[email]},
        $inc:{max_app:-1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                res.send("Rejected Successfully");
            }
        }
    );
});



router.post("/pullapp", (req, res) => {
    const id = req.body.id;
	const email = req.body.email;
    
    User.findOneAndUpdate(
        {email:req.body.email},
        {$inc:{no_of_apps:-1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                // res.send("yey");
            }
        }
    );

    Job.findOneAndUpdate(
        {_id:req.body.id},
        {$pullAll:{shortlisted:[email],applicants:[email]},
         $inc:{max_app:-1}},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                res.send("Pulled Successfully");
            }
        }
    );
});

module.exports = router;