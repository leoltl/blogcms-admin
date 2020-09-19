import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import useFetchData from '../Hooks/useFetchData';
import API from '../RemoteAPI/API';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1.5, 0, 0),
  },
  input: {
    marginBottom: theme.spacing(5),
  },
  header: {
    marginBottom: theme.spacing(2),
  }
}));

function EditPost({ post, isEdit, handleFormInput, handleSave, handleUnpublish, published, loading }) {
  const classes = useStyles();
  const header = (isEdit ? 'Edit': 'Create New') + ' Post'
  return (
    <Container maxWidth="md">
      { loading 
        ? 'loading...' 
        : (
          <>
            <Typography variant="h3" component="h2" className={classes.header}>
             {header}
            </Typography>
            <form>
              <TextField 
                id="title"
                className={classes.input}
                label="Blog Post Title"
                name="title"
                multiline
                rowsMax={4}
                value={post.title}
                onChange={handleFormInput}
                InputLabelProps={{ shrink:  Boolean(post.title) }} 
              />

              <TextField 
                id="body"
                className={classes.input}
                label="Blog Post Body"
                name="body"
                multiline
                fullWidth
                rows={4}
                rowsMax={10}
                value={post.body}
                onChange={handleFormInput}
                InputLabelProps={{ shrink: Boolean(post.body) }} 
              />

              <Container maxWidth="sm">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => handleSave(true)(event)}
                >
                  Save and Publish
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => handleSave(false)(event)}
                >
                  Save draft
                </Button>
                {
                  isEdit && published && (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      className={classes.submit}
                      onClick={handleUnpublish}
                    >
                      Unpublish
                    </Button>
                  )
                }
              </Container>
            </form>
          </>
        )}
    </Container>
  )
}

function EditPostContainer({ history }) {
  const { id } = useParams();
  const { data: post, loading } = useFetchData(API.detailPosts, id);
  const [postState, setPostState] = useState({});

  useEffect(() => {
    setPostState({ title: post?.title || "", body: post?.body || "" })
  }, [post]);

  function handleSave(publish) {
    return async function(event) {
      event.preventDefault();
      const _postState = {...postState}
      if (publish) {
        _postState.published = true;
      }
      try {
        if (id) {
          await API.updatePost(id, _postState)
        } else {
          await API.createPost(_postState)
        }

        history.push('/admin/posts')
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function handleUnpublish(event) {
    event.preventDefault()
    try {
      await API.updatePost(id, { published: false });
      history.push('/admin/posts')
    } catch (e) {
      console.log(e)
    }
  }

  function handleFormInput(e) {
    setPostState({ ...postState, [e.target.name]: e.target.value });
  }

  return (
    <EditPost 
      post={postState}
      isEdit={Boolean(id)}
      published={Boolean(post?.published)}
      handleFormInput={handleFormInput}
      handleSave={handleSave}
      handleUnpublish={handleUnpublish}
      loading={loading}
    />
  )
}

export default withRouter(EditPostContainer);
