import React, { Component } from "react";

class Launcher extends Component {
  render() {
    return (
      <div>
        {this.props.launcher.flight_number}
        {this.props.launcher.mission_name}
        {this.props.launcher.launch_year}
        {this.props.launcher.launch_date_local}
      </div>
    );
  }
}

export default Launcher;
