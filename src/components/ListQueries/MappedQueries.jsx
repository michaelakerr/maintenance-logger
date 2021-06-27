import React, { useState, useRef, useCallback, useEffect } from "react";
import { withFirebase } from "../Firebase";
import loader from "./loader.gif";
import ListQueries from "../ListQueries/ListQueries";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { fixingStatus } from "../../constants";

function MappedQueries(props) {
  const [shedQuery, setShedQuery] = useState(true);
  const [loading, setLoading] = useState([]);
  const activeQueries = useRef([]);
  
  const { firebase, authUser } = props;

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };



  const [selectedDay] = useState(defaultSelectedDay);
  const retrieveData = useCallback(() => {
    let sendData = (values) => {
      props.parentCallback(values);
    };
    let activity = [];
    let ref = firebase.db.ref("queries");
    ref.on("value", (snapshot) => {
      let data = snapshot.val();
      setShedQuery(data);
      setLoading(false);

      if (data) {
        for (const query in data) {
          if (!activity.includes(data[query].name) && data[query].fixed !== fixingStatus[2]) {
            activity.push(data[query].name);
          }
        }
        activeQueries.current = activity;
        sendData(activeQueries);
      }
    });
  }, [firebase, props]);
  useEffect(() => retrieveData(), [selectedDay, retrieveData]);

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {shedQuery === "not set" || shedQuery === null ? (
        <p>No queries added yet.</p>
      ) : (
        <Grid item xs>
          <Paper className="paper">
            <h3>
              Recent Faults
            </h3>
            <ListQueries
              loading={loading}
              shedQuery={shedQuery}
              authUser={authUser}
              editQueries={false}
            />
          </Paper>
        </Grid>

  )
}      </>);
}

export default withFirebase(MappedQueries);
