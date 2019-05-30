import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../config/config";
import { Link } from "react-router-dom";
const styles = theme => ({
	main: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
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
		marginTop: theme.spacing(3)
	}
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			showPassword: false,
			loginError: "",
			emailError: "",
			passwordError: "",
			error: false,
			perror: false
		};
	}
	emailHandle = e => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	passwordHandle = e => {
		e.persist();
		this.setState(() => ({ password: e.target.value }));
	};
	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !this.state.showPassword }));
	};
	handleSubmit = e => {
		e.preventDefault();
		const formData = {
			email: this.state.email,
			password: this.state.password
		};
		if (this.state.email === "" && this.state.password === "") {
			this.setState(() => ({
				emailError: "give valid email format",
				error: true,
				passwordError: "please type the password",
				perror: true
			}));
		} else if (
			this.state.email.indexOf("@") === -1 ||
			this.state.email.indexOf(".") === -1 ||
			this.state.email === ""
		) {
			this.setState(() => ({
				emailError: "give valid email format",
				error: true
			}));
		} else if (this.state.password === "") {
			this.setState(() => ({
				emailError: "",
				error: false,
				passwordError: "please type the password",
				perror: true
			}));
		} else {
			this.setState(() => ({
				emailError: "",
				passwordError: "",
				error: false,
				perror: false
			}));

			axios
				.post("/users/login", formData)
				.then(response => {
					const token = response.data;
					this.setState(() => ({ loginError: token }));
					if (token !== "invalid email or password") {
						this.setState(() => ({ loginError: "" }));
						localStorage.setItem("token", token);
						this.props.history.push("/user/threads/");
						this.props.handleLogin();
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
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<form className={classes.form}>
							<span style={{ color: "red" }}>{this.state.loginError}</span>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Email Address</InputLabel>
								<Input
									type="text"
									name="email"
									value={this.state.email}
									onChange={this.emailHandle}
									placeholder="Your Email"
									required
									error={this.state.error}
								/>
								<span style={{ color: "red" }}>{this.state.emailError}</span>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Password</InputLabel>
								<Input
									type={this.state.showPassword ? "text" : "password"}
									name="password"
									value={this.state.password}
									onChange={this.passwordHandle}
									placeholder="Your Password"
									required
									error={this.state.perror}
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
								<span style={{ color: "red" }}>{this.state.passwordError}</span>
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
								Sign in
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
					>
						<Link
							to="/user/register"
							style={{ color: "#F50057", textDecoration: "none" }}
						>
							Create Your Account with us
						</Link>
					</Button>
				</center>
			</div>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
