import React from 'react';
import API from '../../RemoteAPI/API';
import useFetchData from '../../Hooks/useFetchData';

import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { useRouteMatch, withRouter } from 'react-router-dom';

import PostTable from '../../Components/PostTable';
import TablePaginator from '../../Components/TablePaginator';

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
            <TablePaginator
              rows={data}
              editPost={editPost}
              component={PostTable} 
            />
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
