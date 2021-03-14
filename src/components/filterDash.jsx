// import React, { Component } from "react";
// import LaucherTable from "./laucherTable";
// // import * as userService from "../services/userService";
// // import auth from "../services/authService";
// import Joi from "joi-browser";

// class FilterDash extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       startDate: "",
//       endDate: "",
//       errors: "",
//     };
//   }

//   validate = () => {
//     const option = { abortEarly: false };
//     const { error } = Joi.validate(this.props.data, this.schema, option);

//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   handleStartDateChange = (e) => {
//     // console.log(e.target.value);
//     if (e.target.value.length > 0) {
//       this.setState({ startDate: e.target.value });
//       // console.log(this.state.startDate);
//     }
//   };
//   handleEndDateChange = (e) => {
//     this.setState({ endDate: e.target.value });
//   };
//   handleFilterChange = () => {
//     const { data } = this.props;
//     let mydata = [];

//     let { startDate, endDate } = this.state;
//     // console.log(startDate);
//     // console.log(data);
//     let filter = data.filter((obj) => {
//       return (
//         obj.launch_date_utc >= "2006-03-24T22:30:00.000Z" &&
//         obj.launch_date_utc <= "2017-09-07T13:50:00.000Z"
//       );
//     });
//     console.log(filter);

//     // launchDate.forEach((e) => {
//     //   console.log(e.launch_date_utc);
//     // });
//     <LaucherTable data={mydata} />;
//   };
//   handleUpcomingChange = () => {
//     console.log("Handleupcomingchange");
//   };
//   handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   render() {
//     // console.log(this.state.startDate);
//     return (
//       <>
//         <form className="d-flex me-2" onSubmit={this.handleSubmit}>
//           <input
//             className="form-control me-2 "
//             type="search"
//             value={this.state.date}
//             onChange={this.handleStartDateChange}
//             placeholder="Start Date"
//             aria-label="Search"
//           />
//           <br />
//           <input
//             className="form-control me-2"
//             type="search"
//             value={this.state.date}
//             onChange={this.handleEndDateChange}
//             placeholder="End Date"
//             aria-label="Search"
//           />
//           <button
//             className="btn btn-primary "
//             type="submit"
//             onClick={this.handleFilterChange}
//           >
//             Filter
//           </button>
//           <button
//             className="btn btn-primary btn-sm"
//             type="submit"
//             onClick={this.handleUpcomingChange}
//           >
//             Upcoming
//           </button>
//         </form>
//       </>
//     );
//   }
// }
// export default FilterDash;
