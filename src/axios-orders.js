import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-88a41.firebaseio.com/'
});

export default instance;