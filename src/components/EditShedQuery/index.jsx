import React, { useState, useMemo, useEffect } from "react";
import { withFirebase } from "../Firebase";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { shedNames }from "../../constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditShedQuery(props) {
  const classes = useStyles();

  const {
    authUser,
    firebase,
    shedQuery,
    shedQueryKey,
    setEditing,
  } = props;
  const uid = authUser.uid;

  // Set default activity object
  const defaultShedQuery = useMemo(() => ({
    name: shedQuery.name,
    type: shedQuery.type,
    date: shedQuery.date,
    description: shedQuery.description,
    fixed: shedQuery.fixed,
  }), [shedQuery]);

  const [newShedQuery, setNewShedQuery] = useState(defaultShedQuery);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShedQuery({
        ...newShedQuery,
      [name]: value,
    });
  };

  const isValid = shedQuery.name === "";

  useEffect(() => {
      setNewShedQuery(defaultShedQuery)
  }, [shedQuery, defaultShedQuery])

  // Add the activity to firebase via the API made in this app
  const handleSubmit = (action) => {
    if (authUser) {
      firebase.updateShedQuery(uid, newShedQuery, shedQueryKey);
      setEditing(false);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Shed Name
          </Typography>
          <Typography id="discrete-slider" gutterBottom>
            {shedNames[shedQuery.name]}
          </Typography>
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Priority
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newShedQuery.type}
            style={{ minWidth: "100%" }}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
        </div>
        <Typography id="discrete-slider" gutterBottom>
          Location and Description
        </Typography>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Location & Description"
          value={newShedQuery.description}
          name="description"
          onChange={handleChange}
        />
        <p>
          For example: West Manure Belt North Side
        </p>
        </FormControl>
      <FormControl className={classes.formControl}>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Status
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newShedQuery.fixed}
            style={{ minWidth: "100%" }}
            name="fixed"
            onChange={handleChange}
          >
            <MenuItem value={1}>Fixed</MenuItem>
            <MenuItem value={2}>Fixing</MenuItem>
            <MenuItem value={3}>Needs Repair</MenuItem>
          </Select>
        </div>
      </FormControl>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleSubmit("add")}
        disabled={isValid}
      >
        Save Shed Query
      </Button>
    </form>
  );
}

export default withFirebase(EditShedQuery);
