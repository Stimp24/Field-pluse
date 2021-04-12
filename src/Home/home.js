import React, { Component, Fragment } from "react";
import TextInput from "../Global/Input/TextInput";
import axios from "axios";
import "./scss/home.scss";

export default class Home extends Component {
  state = {
    email: "admin@acme.com",
    password: "secret123",
    remember_me: true,
    res: ""
  };
  handleSubmit = e => {
    const data = this.state;
    e.preventDefault();
    axios
      .post(
        "https://fieldpulse.keystrokeconsulting.com/api/sessions/create",
        data
      )
      .then(response => this.setState({ res: response.data.success }));
    console.log(this.state.res.status);
  };

  handleRedirect = () => {
    const { res } = this.state;
    if (res.status === 200) {
      const serializedState = JSON.stringify(res);
      window.sessionStorage.setItem("state", serializedState);
      return this.props.history.push("/Dashboard");
    }
  };

  render() {
    const { email, password, res } = this.state;
    this.handleRedirect();
    return (
      <Fragment>
        <section className="fp-home">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto mt-5 formContainer">
                <div className="col-12 text-center mt-3">
                  <h1>Login</h1>
                </div>
                <div className="container mt-3 login-outline p-0">
                  <div className="text-center login">
                    <div>
                      <form className="col-12" onSubmit={this.handleSubmit}>
                        <div className="form-group mt-4 pl-2">
                          <TextInput
                            labelname="Email: "
                            type="email"
                            value={email}
                            id="email"
                            className="ml-2"
                            onChange={event => {
                              this.setState({ email: event.target.value });
                            }}
                          />
                        </div>
                        <div className="form-group mt-4">
                          <TextInput
                            labelname="Password: "
                            type="password"
                            value={password}
                            id="password"
                            className="ml-2"
                            onChange={event => {
                              this.setState({ password: event.target.value });
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col-8 col-md-4 mx-auto mb-5">
                            <button type="submit" className="btn btn-primary">
                              Log In
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
