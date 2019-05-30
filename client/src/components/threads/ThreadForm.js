import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
	root: {
		display: "flex"
	},
	formControl: {
		margin: theme.spacing.unit * 3
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	group: {
		margin: `${theme.spacing.unit}px 0`
	},
	main: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class ThreadForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			tags: ""
		};
		this.handleTitle = this.handleTitle.bind(this);
	}
	handleTitle(e) {
		e.persist();
		this.setState(() => ({ title: e.target.value }));
	}
	handleDescription = e => {
		e.persist();
		this.setState(() => ({ description: e.target.value }));
	};
	handleTags = e => {
		e.persist();
		const tags = e.target.value;
		this.setState(() => ({ tags: tags }));
	};

	handleSubmit = e => {
		e.preventDefault();
		const tags = this.state.tags;
		let arrayTags = tags.split(",");
		arrayTags.forEach(tag => {
			if (tag === "") {
				arrayTags.pop(tag);
			}
		});
		const formData = {
			title: this.state.title,
			description: this.state.description,
			tags: arrayTags
		};
		this.props.handleSubmit(formData);
		this.setState(() => ({
			title: "",
			description: "",
			tags: ""
		}));
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<SupervisorAccountIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Create a Thread
						</Typography>
						<form className={classes.form}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="title">Thread Title</InputLabel>
								<Input
									type="text"
									name="title"
									value={this.state.title}
									onChange={this.handleTitle}
									placeholder="Write Thread Title"
									required
									error={this.state.tError}
								/>
								<span style={{ color: "red" }}>{this.state.titleError}</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="description">
									Thread Description
								</InputLabel>
								<Input
									name="description"
									value={this.state.description}
									onChange={this.handleDescription}
									multiline={true}
									required
									placeholder="Write Thread Descrition"
									error={this.state.dError}
								/>
								<span style={{ color: "red" }}>
									{this.state.descriptionError}
								</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="tags">
									Write Your Tags sparated by comma
								</InputLabel>
								<Input
									type="text"
									name="tags"
									value={this.state.tags}
									onChange={this.handleTags}
									required
									placeholder="Write Your Tags sparated by comma"
								/>
							</FormControl>
							<br />
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								color="secondary"
								size="small"
								className={classes.submit}
								onClick={this.handleSubmit}
							>
								Create
							</Button>
						</form>
					</Paper>
				</main>
			</div>
		);
	}
}
ThreadForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThreadForm);
