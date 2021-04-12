import React, { Component } from "react";
import axios from "axios";
import TimeClock from "../Dashboard/Component/TimeClock";
import moment from "moment";
import "./scss/dashboard.scss";
import MastheadWithImg from "../Global/Hero/MastheadWithImg";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      countDownTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      date: moment().format("MMMM Do YYYY"),
      time: moment().format("h:mm:ss a"),
      startAt: moment.utc().format(),
      endAt: moment.utc().format(),
      clockInTime: [],
      clockOutTime: [],
      totalTime: [],
      isClockedIn: false
    };
  }

  componentDidMount() {
    const getEmployee = sessionStorage.getItem("state");
    const parseGetEmployee = JSON.parse(getEmployee);
    this.setState({ client: parseGetEmployee });
    //     setTimeout(() => {
    //       const client_id = this.state.client.data.auth.client_id;
    //       console.log(client_id);
    //       axios
    //         .get(`https://fieldpulse.keystrokeconsulting.com/api/clients/1/users`)
    //         .then(response => this.setState({ res: response }))
    //         .catch(err => {
    //           console.log("Error", err.response);
    //         });
    //     }, 500);

    this.interval = setInterval(() => {
      this.setState({
        countDownTime: moment().format("MMMM Do YYYY, h:mm:ss a")
      });
    }, 1000);
  }

  handleClockIn = e => {
    e.preventDefault();
    const { clockInTime, date, countDownTime } = this.state;
    this.setState({ startAt: countDownTime });
    this.setState({
      clockInTime: [
        ...clockInTime,
        {
          time: moment().format("h:mm:ss a"),
          date: moment().format("MMMM Do YYYY")
        }
      ]
    });
    this.setState({ isClockedIn: true });
    //     axios
    //       .post("https://fieldpulse.keystrokeconsulting.com/api/sessions/create", {
    //         started_at: clockInTime
    //       })
    //       .then(response => this.setState({ res: response }))
    //       .catch(err => {
    //         console.log("Error", err.response);
    //       });
    //     console.log(this.state);
  };

  handleClockOut = e => {
    e.preventDefault();
    const { clockOutTime, countDownTime } = this.state;
    this.setState({ endAt: countDownTime });

    this.setState({
      clockOutTime: [
        ...clockOutTime,
        {
          time: moment().format("h:mm:ss a"),
          date: moment().format("MMMM Do YYYY")
        }
      ]
    });
    this.calculateTotalHours();
    this.setState({ isClockedIn: false });
  };

  calculateTotalHours = () => {
    const { endAt, startAt, totalTime } = this.state;
    var now = moment(startAt);
    var end = moment(endAt);
    var duration = moment.duration(now.diff(end));
    var seconds = moment.duration(duration).seconds();
    this.setState({
      totalTime: [...totalTime, seconds]
    });
    console.log(now);
    console.log(end);
  };
  render() {
    const {
      clockInTime,
      isClockedIn,
      countDownTime,
      clockOutTime
    } = this.state;
    return (
      <section className="fp-dashboard">
        <div>
          <div className="container-fluid">
            <div className="row">
              <MastheadWithImg
                sectionClass="heroImg col-12"
                title="Time Log"
                titleClass="text-center pl-5 title"
              />
              <div className="col-12 text-center pl-2 title">
                <h2>Time Log</h2>
                {this.state.client ? (
                  <h4>
                    Welcome {this.state.client.data.auth.first_name}{" "}
                    {this.state.client.data.auth.last_name}
                  </h4>
                ) : null}
              </div>
              <div className="col-12 col-6 text-center">
                <TimeClock time={countDownTime} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                {isClockedIn ? (
                  <div className="col-12 text-center">
                    <div className="col-12 mx-auto">
                      <h5>You're clocked in </h5>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        onClick={e => {
                          this.handleClockOut(e);
                        }}
                        className="btn btn-success"
                      >
                        Clock Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-12 text-center">
                    <div className="col-12 mx-auto">
                      <h5>You're clocked Out </h5>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        onClick={e => {
                          this.handleClockIn(e);
                        }}
                        className="btn btn-primary"
                      >
                        Clock In
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="col-9 text-center sub-header">Clock In</div>
                <div className="row outterContainer">
                  <div className="col-5 offset-1">
                    <div className="row">
                      <div className="col-12">Date</div>
                    </div>
                    <ui>
                      {clockInTime &&
                        clockInTime.map((item, i) => {
                          return <li key={i}>{item.date}</li>;
                        })}
                    </ui>
                  </div>
                  <div className="col-5 offset-1">
                    <div className="row">
                      <div className="col-12">Time</div>
                    </div>
                    <ui>
                      {clockInTime &&
                        clockInTime.map((item, i) => {
                          return <li key={i}>{item.time}</li>;
                        })}
                    </ui>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="col-9 text-center sub-header">Clock Out</div>
                <div className="row outterContainer">
                  <div className="col-5 offset-1">
                    <div className="row">
                      <div className="col-12">Date</div>
                    </div>
                    {clockOutTime &&
                      clockOutTime.map((item, i) => {
                        return (
                          <ui>
                            <li key={i}>{item.date}</li>
                          </ui>
                        );
                      })}
                  </div>
                  <div className="col-5 offset-1">
                    <div className="row">
                      <div className="col-12">Time</div>
                    </div>
                    {clockOutTime &&
                      clockOutTime.map((item, i) => {
                        return (
                          <ui>
                            <li key={i}>{item.time}</li>
                          </ui>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
