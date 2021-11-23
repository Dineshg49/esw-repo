const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
	title: {
		type: String,
		required: true
  },
  name: {
    type: String,
    required: true
	},
	email: {
		type: String,
		// unique: true,
		required: true
	},
	max_app: {
		type: Number,
		required: true
  },
  applicants:{
    type: Array,
    default: []
  },
  rejected:{
    type: Array,
    default: []
  },
  accepted:{
    type: Array,
    default: []
  },
  shortlisted:{
    type: Array,
    default:[]
  },
	max_pos:{
		type: Number,
		// "default": 0,
		required: false
  },
  date:{
  type: Date,
  required: false
  },
  deadline:{
  type: String,
  required: false
  },
  skills:{
  type: Array,
  "default": []
  },
  job_type: String,
  duration: Number,
  salary: Number,
  rating: {
    type: Number,
    default:0
  },
  no_of_raters:{
		type: Number,
		default: 0
	},
  contact_no:{
      type: String,
      required: false
  },
  doa: [{
    email: String, 
    date: String
  }],
  doj: [{
    email: String, 
    date: String
  }],
  sop: [{
    email: String, 
    text: String
  }],
  has_rated:[{
    email: String,
    rating: Number
  }]
});

module.exports = Job = mongoose.model("Jobs", JobSchema);