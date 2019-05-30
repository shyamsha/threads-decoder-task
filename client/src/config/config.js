import Axios from "axios";
const axios = Axios.create({
	baseURL: "/"
	//baseURL: "http://localhost:3001"
});
export default axios;
