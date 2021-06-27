import React from "react";
import { withFirebase } from "../Firebase";
import loader from "./loader.gif";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import {shedNames, fixingStatus, priorityLevel }from "../../constants";


function ListQueries(props) {
  const {
    loading,
    shedQuery,
    editShedQuery,
    editQueries
  } = props;

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {shedQuery === "not set" || shedQuery === null ? (
        <p>No queries added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Fixed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(shedQuery).map((shedQuery, i) => {
                let { name, type, description, fixed } = shedQuery;
                return (
                  <TableRow key={i}>
                    <TableCell>{shedNames[name]}</TableCell>
                    <TableCell>{priorityLevel[type-1]}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{fixingStatus[fixed-1]}</TableCell>
                    {editQueries ?
                    <TableCell>
                      <EditIcon
                        onClick={(e) => editShedQuery(shedQuery, i)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell>: null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
export default withFirebase(ListQueries);
