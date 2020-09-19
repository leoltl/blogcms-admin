import React from 'react';
import { Switch, Route, useRouteMatch, Link as RouterLink, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NoteIcon from '@material-ui/icons/Note';
import Link from '@material-ui/core/Link';

import Posts from '../Posts';
import EditPost from '../../Components/EditPost';
import API from '../../RemoteAPI/API';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Home({ path, url, handleSignout }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to={`${url}`} color="inherit" component={RouterLink}>
              Blog CMS Admin
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to={`${url}/post/new`} color="inherit" component={RouterLink}>
              <ListItem button key='Create Post'>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary='Create Post' />
              </ListItem>
            </Link>
            <Link to={`${url}/posts`} color="inherit" component={RouterLink}>
              <ListItem button key='Posts'>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText primary='Posts' />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleSignout} key='Logout'>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        
          <Switch>
            <Route exact path={path}>
              <Typography paragraph>
                Select actions from side menu
              </Typography>
            </Route>
            <Route path={`${path}/post/new`}>
              <EditPost />
            </Route>
            <Route path={`${path}/posts/edit/:id`}>
              <EditPost />
            </Route>
            <Route path={`${path}/posts`}>
              <Posts />
            </Route>
          </Switch>

      </main>
    </div>
  );
}

function HomeContainer({ history }) {
  function handleSignout() {
    history.push('/');
    API.signout()
  }
  return (
    <Home 
      {...useRouteMatch()}
      handleSignout={handleSignout}
    />
  ) 
}

export default withRouter(HomeContainer);
