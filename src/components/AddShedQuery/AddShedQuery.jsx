import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { shedNames, priorityLevel } from "../../constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddShedQuery(props) {
  const classes = useStyles();

  const { authUser, firebase, selectedDay } = props;
  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default activity object
  const defaultShedQuery = {
    name: "",
    type: 1,
    date: queryDate,
    description: "",
    fixed: 3,
  };

  const [shedQuery, setShedQuery] = useState(defaultShedQuery);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShedQuery({
      ...shedQuery,
      date: queryDate,
      [name]: value,
    });
  };

  const isValid = shedQuery.name === "";

  // Add the activity to firebase via the API made in this app
  const handleSubmit = () => {
    if (authUser) {
      firebase.addShedQuery(uid, shedQuery);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Shed Name
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shedQuery.name}
            style={{ minWidth: "100%" }}
            name="name"
            onChange={handleChange}
          >
            {shedNames.map((shedName, index) => {
              return <MenuItem value={index}>{shedName}</MenuItem>;
            })}
          </Select>
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
            value={shedQuery.type}
            style={{ minWidth: "100%" }}
            name="type"
            onChange={handleChange}
          >
            {priorityLevel.map((priorityLevel, index) => {
              return <MenuItem value={index+1}>{priorityLevel}</MenuItem>;
            })}
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
          value={shedQuery.description}
          name="description"
          onChange={handleChange}
        />
        <p>
          For example: West Manure Belt North Side
        </p>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add Shed Query
      </Button>
    </form>
  );
}

export default withFirebase(AddShedQuery);
