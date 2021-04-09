import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

import { getPosts } from '../../redux/actions/post';

const Posts = ({ post: { loading, posts }, getPosts }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return <div></div>;
};

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
