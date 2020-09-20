import React from 'react';
import API from '../../RemoteAPI/API';
import useFetchData from '../../Hooks/useFetchData';

import PostTable from '../../Components/PostTable';
import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { useRouteMatch, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    tableWrapper: {
      margin: '0 auto',
      maxWidth: '1000px',
    },
    header: {
      marginBottom: theme.spacing(2)
    },
  })
);

function Posts({ data, loading, error, editPost }) {
  const classes = useStyles()
  return (
    <Box className={classes.tableWrapper}>
      { loading
        ? <CircularProgress />
        : (
          <>
            <Typography variant="h2" className={classes.header}>
              Your Posts
            </Typography>
            <PostTable rows={data} editPost={editPost} />
          </>
        )
      }
    </Box>
  )
}

function PostsContainer({ history }) {
  const { data, loading, error } = useFetchData(API.listPosts);
  const { path } = useRouteMatch();
  function editPost(id) {
    return function() {
      history.push(`${path}/edit/${id}`);
    }
  }

  return (
    <Posts 
      {...{data, loading, error, editPost}}
    />
  )
}

export default withRouter(PostsContainer);
