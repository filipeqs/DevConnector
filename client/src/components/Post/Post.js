import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';

import { getPost } from '../../redux/actions/post';

const Post = ({ post: { loading, post }, getPost, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
