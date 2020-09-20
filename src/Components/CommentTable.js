import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link, TablePagination } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  row: {
    cursor: 'pointer',
  },
  icon: {
    opacity: 0.4,
  },
  good: {
    color: 'green',
    opacity: 0.4,
  },
  comments: {
    maxWidth: '450px',
    fontSize: '0.8rem',
    wordWrap: 'break-word'  
  }
});

export default function SimpleTable({ rows, handleClickOpen, handleChangePage, handleChangeRowsPerPage, rowsPerPage, page, count }) {
  const classes = useStyles();
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">In response to</TableCell>
              <TableCell align="right">Submitted on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow className={classes.row} key={row._id} onClick={() => handleClickOpen(row._id)} hover>
                <TableCell>
                  {row.published 
                    ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlineIcon className={classes.good} /> 
                      </Tooltip>
                    )
                    : (
                      <Tooltip title="Unpublished">
                       <HighlightOffIcon color="error" className={classes.icon}/>
                      </Tooltip>
                    )
                  }
                </TableCell>
                <TableCell className={classes.comments}>
                  {row.body}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.commenter}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    <Tooltip title={<strong>{row.post.body.slice(0, 60) + '...'}</strong>} arrow>
                      <Link to={`/admin/posts/edit/${row.post._id}`} component={RouterLink}>
                          {row.post.title}
                        </Link>
                    </Tooltip>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {new Date(row.created_at).toDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
