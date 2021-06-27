import React, { useState, useEffect } from "react";

import { AuthUserContext, WithAuthentication } from "../components/Session";
import { withRouter } from "react-router-dom";

import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Copyright from "../components/Copyright";

import useStyles from "../config/theme.dashboard";

import MappedQueries from "../components/ListQueries/MappedQueries";
import Sidebar from "../components/Sidebar";
import { shedNames }from "../constants";

import Map from "../components/Map";

function CurrentFaults(props) {

  const classes = useStyles();
  const { firebase } = props;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [queryData, setQueryData] = useState([]);


  const signOut = () => {
    firebase.auth.signOut();
    firebase.history.push("/");
  };

  const callbackListData = (childData) => {;
    setQueryData(childData);
  };

  useEffect(() => {
    document.title = `Current Faults`;
  }, [queryData]);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <div className={classes.root}>
                <CssBaseline />
                <AppBar
                  position="absolute"
                  className={clsx(classes.appBar, open)}
                >
                  <Toolbar className={classes.toolbar}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      className={clsx(
                        classes.menuButton,
                        open && classes.menuButtonHidden
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      className={classes.title}
                    >
                      Current Faults
                    </Typography>
                    <IconButton color="inherit">
                      <Badge badgeContent={0} color="secondary">
                        <Typography
                          component="p"
                          style={{ paddingRight: "15px" }}
                        >
                         {authUser.displayName}
                        </Typography>
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={signOut}>
                      <Badge badgeContent={0} color="secondary">
                        <LogoutIcon />
                      </Badge>
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Sidebar
                  signOut={signOut}
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {queryData.current !== undefined ? (
                      <Map shedsWithFaults={queryData} />
                    ) : null}
                  </Grid>
                  <Grid item xs>
                    <MappedQueries
                      authUser={props.authUser}
                      parentCallback={callbackListData}
                    />
                  </Grid>
                  <Grid item xs>
                    { queryData.current !== undefined ? (
                      <ul>
                        {queryData.current.map((location) => (
                          <li key={location}>{shedNames[location]}</li>
                        ))}
                      </ul>): null
                    }
                  </Grid>
                </Grid>
                
              </div>
            ) : (
              <p>Not authorized.</p>
            )
          }

        </AuthUserContext.Consumer>
      </Container>
      <Copyright />
    </main>
  );
}

export default withRouter(WithAuthentication(CurrentFaults));
