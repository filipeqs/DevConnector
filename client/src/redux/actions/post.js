import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

import { setAlert } from './alert';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: POST_ERROR,
            payload: { msg: statusText, status },
        });
    }
};
