import React, { Component } from "react";
import axios from "../../config/config";
import ThreadForm from "./ThreadForm";
class NewCategory extends Component {
	handleSubmit = formData => {
		axios
			.post("/threads", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.props.history.push("/user/threads/");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<ThreadForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default NewCategory;
