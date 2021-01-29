import Axios from 'axios';

let base_url = `http://localhost:4000/`;

if (process.env.NODE_ENV !== "development") {
    base_url = `${process.env.REACT_APP_API_URL}/`;
}

let axios = Axios.create({
    baseURL: base_url,  //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});

const token = JSON.parse(localStorage.getItem('token'));
axios.defaults.headers.common['Authorization'] = "Bearer " + token;
export default axios;
