
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	rating:{
		type: Number,
		"default": 0,
		required: false
    },
    contact_no:{
        type: String,
        required: false
	},
	bio:{
		type:String
	}
});

module.exports = Recruiter = mongoose.model("Recruiter", RecruiterSchema);