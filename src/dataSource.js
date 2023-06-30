import axios from 'axios';


//use this section while running Topic-0/MusicAPI
//this is based on the data from the activity
export default axios.create({
    baseURL: 'http://localhost:5000'
});