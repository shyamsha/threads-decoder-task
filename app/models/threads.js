const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const ThreadSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		requrired: true
	},
	title: {
		type: String,
		minlength: 3,
		requrired: true
	},
	description: {
		type: String,
		minlength: 3,
		requrired: true
	},
	tags: [{ type: String }],
	createdAt: {
		type: Date,
		default: Date.now
	}
});
const Thread = mongoose.model("Thread", ThreadSchema);
module.exports = {
	Thread
};
