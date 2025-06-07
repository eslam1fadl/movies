
import axios from 'axios';

export default axios.create({
    baseURL:'https://www.googlelapapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResult:5,
        key:['API KEY']
    }
})