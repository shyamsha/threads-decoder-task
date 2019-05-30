import React from "react";
import axios from "../../config/config";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const styles = theme => ({
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
class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			conformPwd: "",
			emailError: "",
			nameError: "",
			nError: false,
			eError: false,
			passwordError: "",
			pError: false,
			showPassword: false,
			signupError: ""
		};
	}
	usernameHandle = e => {
		const username = e.target.value;
		this.setState(() => ({ username }));
	};
	emailHandle = e => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	passwordHandle(e) {
		const password = e.target.value;
		this.setState(() => ({ password }));
	}
	conformHandle = () => {};
	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !this.state.showPassword }));
	};
	handleSubmit = e => {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};
		const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(
			this.state.email
		);
		const passwordReg = /(?=^.{8,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/.test(
			this.state.password
		);
		const usernameReg = /^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/.test(
			this.state.username
		);
		if (!usernameReg && !emailReg && !passwordReg) {
			this.setState(() => ({
				nameError: "Write Your Name > 3 Chracters",
				nError: true,
				emailError: "Write Your Valid Email Format",
				eError: true,
				passwordError:
					"Must be alphanumeric with at least one number, one letter and captial letter, one special Character and be between 8-15 character in length.",
				pError: true
			}));
		} else if (!usernameReg) {
			this.setState(() => ({
				nameError: "Write Your Name > 3 Chracters",
				nError: true
			}));
		} else if (!emailReg) {
			this.setState(() => ({
				nameError: "",
				nError: false,
				emailError: "Write Your Valid Email Format",
				eError: true
			}));
		} else if (!passwordReg) {
			this.setState(() => ({
				nameError: "",
				nError: false,
				emailError: "",
				eError: false,
				passwordError:
					"Must be alphanumeric with at least one number, one letter and captial letter, one special Character and be between 8-15 character in length.",
				pError: true
			}));
		} else {
			this.setState(() => ({
				nameError: "",
				nError: false,
				emailError: "",
				eError: false,
				passwordError: "",
				pError: false
			}));
			axios
				.post("/users/register", formData)
				.then(response => {
					const valid = response.data.name;
					if (valid === "MongoError") {
						this.setState(() => ({ signupError: "User alerady registerd" }));
					} else if (valid === "ValidationError") {
						this.setState(() => ({
							signupError: "Please Write Your Details In Proper Format"
						}));
					} else {
						this.props.history.push("/user/login");
						this.setState(() => ({ signupError: "" }));
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<AccountCircleIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Register with us
						</Typography>

						<form className={classes.form}>
							<span style={{ color: "red" }}>{this.state.signupError}</span>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="username">User Name</InputLabel>
								<Input
									type="text"
									name="username"
									value={this.state.username}
									onChange={this.usernameHandle}
									placeholder="Write Your Username"
									required
									error={this.state.nError}
								/>
								<span style={{ color: "red" }}>{this.state.nameError}</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Email Address</InputLabel>
								<Input
									type="text"
									name="email"
									value={this.state.email}
									onChange={this.emailHandle}
									required
									placeholder="Write Your Valid Email"
									error={this.state.eError}
								/>
								<span style={{ color: "red" }}>{this.state.emailError}</span>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input
										type={this.state.showPassword ? "text" : "password"}
										name="password"
										value={this.state.password}
										onChange={this.passwordHandle.bind(this)}
										required
										placeholder="Write Your Password"
										error={this.state.pError}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="Toggle password visibility"
													onClick={this.handleClickShowPassword}
												>
													{this.state.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
									<span style={{ color: "red" }}>
										{this.state.passwordError}
									</span>
								</FormControl>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								color="secondary"
								size="small"
								className={classes.submit}
								onClick={this.handleSubmit}
							>
								Sign up
							</Button>
						</form>
					</Paper>
				</main>
				<center>
					<br />
					<Typography>OR</Typography>
					<br />
					<Button
						variant="outlined"
						color="secondary"
						size="small"
						className={classes.button}
						style={{ width: "20rem" }}
					>
						<Link
							to="/user/login"
							style={{ color: "#F50057", textDecoration: "none" }}
						>
							LogIn
						</Link>
					</Button>
				</center>
			</div>
		);
	}
}
Register.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
