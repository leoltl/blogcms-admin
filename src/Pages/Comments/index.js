import React, { useState } from 'react';
import API from '../../RemoteAPI/API';
import useFetchData from '../../Hooks/useFetchData';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';

import CommentTable from '../../Components/CommentTable';
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

function Comments({ data, loading, error, editComment, open, handleClickOpen, handleClose }) {
  const classes = useStyles()
  return (
    <Box className={classes.tableWrapper}>
      { loading
        ? <CircularProgress />
        : (
          <>
            <Typography variant="h2" className={classes.header}>
              Comments
            </Typography>
            <TablePaginator rows={data} handleClickOpen={handleClickOpen} component={CommentTable} />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Change visibility of this user comment?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Set approve or unapprove this comment. If set to unapprove, this comment will be invisible on your blog, but will still exist in the database.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => editComment(true)} color="primary">
                  Approve
                </Button>
                <Button onClick={() => editComment(false)} color="primary">
                  Unapprove
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }
    </Box>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function CommentsContainer() {
  let listComments = API.listComments
  const { data, loading, error } = useFetchData(listComments);
  const [open, setOpen] = useState(false);
  const [selectedCommentId, setSelectedComment] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedComment(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComment(null);
  };

  async function editComment(publish) {
    await API.updateComment(selectedCommentId, publish);
    (data.find(({_id }) => {
      return _id === selectedCommentId
    })).published = publish;
    setOpen(false);
  }

  return (
    <Comments 
      {...{data, loading, error, editComment, open, handleClickOpen, handleClose}}
    />
  )
}

export default CommentsContainer;
