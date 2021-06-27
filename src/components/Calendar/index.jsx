import React, { useState, useCallback, useEffect } from "react";
import { WithAuthentication } from "../Session";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

import AddShedQuery from "../AddShedQuery/AddShedQuery";
import ListQueries from "../ListQueries/ListQueries";
import EditShedQuery from "../EditShedQuery/index";

function Calendar(props) {

  const [shedQuery, setShedQuery] = useState(true);
  const [loading, setLoading] = useState([]);

  const { firebase, authUser } = props;

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };
  const [selectedDay] = useState(defaultSelectedDay);
  const retrieveData = useCallback(() => {
    let ref = firebase.db.ref("queries");
    ref.on("value", (snapshot) => {
      let data = snapshot.val();
      setShedQuery(data);
      setLoading(false);
    });
  }, [firebase.db]);
  useEffect(() => retrieveData(), [retrieveData]);

  /*** Hooks */

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [shedQueryKey, setShedQueryKey] = useState(null);

  const editShedQuery = (query, i) => {
    setShedQueryKey(Object.keys(shedQuery)[i]);
    setEditing(true);
    setActivity(query);
  };

  return (
    <article>
      <h1>Logger</h1>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className="paper">
            {editing ? (
              <>
                <h3>Edit Shed Query</h3>
                <EditShedQuery
                  shedQuery={activity}
                  shedQueryKey={shedQueryKey}
                  selectedDay={selectedDay}
                  authUser={authUser}
                  setEditing={setEditing}
                  editQueries={true}
                />
              </>
            ) : (
              <>
                <h3>Add Query</h3>
                <AddShedQuery
                  selectedDay={selectedDay}
                  authUser={authUser}
                />
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className="paper">
            <h3>Recent Faults</h3>
            <ListQueries
              loading={loading}
              shedQuery={shedQuery}
              authUser={authUser}
              setEditing={setEditing}
              editShedQuery={editShedQuery}
              editQueries={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </article>
  );
}

export default WithAuthentication(Calendar);
