import React, { Component } from "react";
import axios from "../../config/config";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap"
	},
	fabs: {
		margin: theme.spacing.unit
	},
	iconButton: {
		padding: 10
	},
	chip: {
		margin: theme.spacing.unit
	},
	icon: {
		marginRight: theme.spacing.unit * 2
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: "0 auto",
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing.unit * 3,
			width: "auto"
		}
	}
});
class Threads extends Component {
	constructor(props) {
		super(props);
		this.state = {
			threads: [],
			username: "",
			search: ""
		};
	}
	componentDidMount() {
		axios
			.get("/threads", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				let name = "";
				response.data.forEach(username => {
					name = username.user.username;
				});
				this.setState(() => ({
					threads: response.data,
					username: name
				}));
			})
			.catch(err => {
				console.log(err);
			});
	}
	searchHandle = e => {
		e.persist();
		e.preventDefault();
		this.setState(() => ({ search: e.target.value.toLowerCase() }));
	};
	render() {
		const { classes } = this.props;
		// eslint-disable-next-line no-unused-vars
		let threads = [];
		if (this.state.search) {
			let searchThreads = [];
			this.state.threads.forEach(thread => {
				let threadTitle = thread.title.toLowerCase();
				if (threadTitle.search(this.state.search) >= 0) {
					searchThreads.push(thread);
				}
			});

			if (searchThreads[0]) {
				threads = searchThreads;
			}
		} else {
			threads = this.state.threads;
		}
		if (localStorage.getItem("token")) {
			return (
				<div>
					<span
						style={{
							float: "right",
							marginRight: "20px",
							marginTop: "7px",
							fontSize: "2vw",
							fontFamily: "Lucida Console",
							fontWeight: 800
						}}
					>
						{this.state.username}
					</span>
					<CssBaseline />
					<main>
						<div>
							<center>
								<Typography>
									<input
										style={{
											marginTop: "20px",
											marginLeft: "5rem",
											borderRadius: "5px",
											height: "40px",
											width: "700px",
											backgroundColor: "smokewhite",
											WebkitBorderRadius: "15px",
											MozBorderRadius: "15px",
											MsBorderRadius: "15px",
											OBorderRadius: "15px",
											fontSize: "18px",
											textAlign: "center"
										}}
										type="search"
										name="search"
										placeholder="Search Threads"
										value={this.state.search}
										onChange={this.searchHandle}
									/>
									<IconButton
										className={classes.iconButton}
										aria-label="Search"
									>
										<SearchIcon />
									</IconButton>
								</Typography>
							</center>
						</div>
						<div className={classNames(classes.layout, classes.cardGrid)}>
							<Grid container spacing={4}>
								{threads.map(thread => (
									<Grid item key={thread._id} md={6}>
										<Card className={classes.card}>
											<CardContent className={classes.cardContent}>
												<Typography>
													<span
														style={{
															fontFamily: "Courier New",
															fontSize: "20px",
															fontWeight: "700"
														}}
													>
														Title
													</span>
													:{" "}
													<span style={{ fontFamily: "Courier New" }}>
														{thread.title}
													</span>
												</Typography>
												<Typography>
													<span
														style={{
															fontFamily: "Courier New",
															fontSize: "20px",
															fontWeight: "700"
														}}
													>
														Description
													</span>
													:{" "}
													<span style={{ fontFamily: "Courier New" }}>
														{thread.description}
													</span>
												</Typography>
												{thread.tags.map((tag, i) => {
													return (
														<Chip
															key={i}
															style={{ fontFamily: "Courier New" }}
															label={tag}
															color="secondary"
															className={classes.chip}
															variant="default"
														/>
													);
												})}
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						</div>
					</main>
					<Fab
						color="secondary"
						style={{ float: "right", marginRight: "10rem" }}
						className={classes.fab}
					>
						<Link to="/user/thread/add" style={{ color: "white" }}>
							<AddIcon />
						</Link>
					</Fab>
				</div>
			);
		} else {
			return <div>{this.props.history.push("/user/login")}</div>;
		}
	}
}
Threads.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Threads);
