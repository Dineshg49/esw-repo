const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	no_of_apps:{
		type:Number,
		default:0
	},
	accepted:{
		type:Number,
		default:0
	},
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
	date:{
		type: Date,
		required: false
	},
	rating:{
		type: Number,
		"default": 0,
		required: false
	},
	no_of_raters:{
		type: Number,
		"default": 0
	},
	has_rated:[{
		email: String,
		rating: Number
  	}],
	skills:{
		type: Array,
		"default": []
	},
	education:[{
		Institute:{
			type: String,
			"default": 'iiit',
			required:true
		},
		StartYear:{
			type: Number,
			"default": 2019,
			required: true
		},
		EndYear:{
			type: Number,
			"default": 2023
		},
		// "default": [{Institute:'iiit', StartYear:2019, EndYear:2023}]
	}
	]
});

module.exports = User = mongoose.model("Users", UserSchema);
