import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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

// Add like
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: POST_ERROR,
            payload: { msg: statusText, status },
        });
    }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch({
            type: POST_ERROR,
            payload: { msg: statusText, status },
        });
    }
};
