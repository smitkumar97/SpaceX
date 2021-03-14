import React, { Component } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal({
  flightName,
  details,
  missionId,
  launchYear,
  launchDate,
  launchTime,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{`Name: ${flightName}`}</h2>
      <p id="simple-modal-description">{`Details: ${details}`}</p>
      <p>{`Mission ID: ${missionId}`}</p>
      <p>{`Launch Year: ${launchYear}`}</p>
      <p>{`Launch Date: ${launchDate}`}</p>
      <p>{`Launch Time: ${launchTime}`}</p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Link to="#" onClick={handleOpen}>
        {flightName}
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
class LaucherTable extends Component {
  renderTableHeader = () => {
    return (
      <>
        <th>Flight No.</th>
        <th>Flight Name</th>
        <th>Date</th>
      </>
    );
  };

  renderTableRows = () => {
    const { data } = this.props;

    return data.map((res, i) => {
      return (
        <tr key={res.mission_name}>
          <td>{res.flight_number}</td>

          <td>
            <SimpleModal
              flightName={res.mission_name}
              details={res.details}
              missionId={res.mission_id}
              launchYear={res.launch_year}
              launchDate={new Date(res.launch_date_utc).toDateString()}
              launchTime={new Date(res.launch_date_utc).toLocaleTimeString()}
            />
          </td>

          {/* <td>{new Date(res.launch_date_utc).toLocaleString()}</td> */}
          <td>{res.launch_date_utc}</td>
        </tr>
      );
    });
  };

  render() {
    const { data } = this.props;

    return data.length > 0 ? (
      <div>
        <table className="table table-border">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </div>
    ) : (
      <div>No users.</div>
    );
  }
}

export default LaucherTable;
