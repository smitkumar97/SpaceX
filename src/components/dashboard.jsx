import React, { Component } from "react";
import { apiUrl } from "../config.json";
import axios from "axios";
import LaucherTable from "./laucherTable";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      startDate: "",
      endDate: "",
      mydata: [],
      cdata: [],
    };
  }
  async componentDidMount() {
    const { data } = await axios.get(apiUrl);
    this.setState({ mydata: data, cdata: data });
    // console.log(this.state.mydata);
  }

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };
  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
    console.log(this.state.endDate);
  };
  handleFilterChange = () => {
    const { mydata } = this.state;
    let filter = [];

    let { startDate, endDate } = this.state;
    filter = mydata.filter((obj) => {
      return obj.launch_date_utc >= startDate && obj.launch_date_utc <= endDate;
    });
    this.setState({
      mydata: filter,
    });
  };

  handleUpcomingChange = () => {
    let { mydata } = this.state;
    const filter = 0;
    let uplcomingLauncher = mydata.filter((data) => data.upcoming);
    const pastLauncher = mydata.filter((data) => !data.upcoming);
    if (filter === 0) {
      this.setState({
        mydata: uplcomingLauncher,
      });
    } else {
      mydata = pastLauncher;
    }
  };
  handlePastChange = () => {
    let { mydata } = this.state;
    const filter = 1;
    const pastLauncher = mydata.filter((data) => !data.upcoming);
    if (filter === 1) {
      this.setState({
        mydata: pastLauncher,
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <>
          <form className="d-flex me-2" onSubmit={this.handleSubmit}>
            <input
              className="form-control me-2 "
              type="search"
              value={this.state.date}
              onChange={this.handleStartDateChange}
              placeholder="Start Date"
              aria-label="Search"
            />
            <br />
            <input
              className="form-control me-2"
              type="search"
              value={this.state.date}
              onChange={this.handleEndDateChange}
              placeholder="End Date"
              aria-label="Search"
            />
            <button
              className="btn btn-primary "
              type="submit"
              onClick={this.handleFilterChange}
            >
              Filter
            </button>
            <button
              className="btn btn-primary btn-sm"
              type="submit"
              onClick={this.handleUpcomingChange}
            >
              Upcoming
            </button>
            <button
              className="btn btn-primary btn-sm"
              type="submit"
              onClick={this.handlePastChange}
            >
              Past
            </button>
          </form>
        </>
        <LaucherTable data={this.state.mydata} />
      </div>
    );
  }
}

export default Dashboard;
