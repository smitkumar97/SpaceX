import React, { Component } from "react";
import Laucher from "./laucher";

class LauncherList extends Component {
  render() {
    return (
      <div>
        {this.props.launchers.map((launcher) => {
          return <Laucher key={launcher.mission_name} launcher={launcher} />;
        })}
      </div>
    );
  }
}

export default LauncherList;
