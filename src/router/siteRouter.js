//Libraries
import React, { Component, Fragment, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "../Global/Spinner/spinner";
//Pages
const Home = lazy(() => import("../Home/home"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Footer = lazy(() => import("../Global/Navigation/Footer"));
const Navbar = lazy(() => import("../Global/Navigation/Navbar"));

class SiteRouter extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route path="/Dashboard" component={Dashboard} />
              <Route exact path="/" component={Home} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Suspense>
    );
  }
}

export default SiteRouter;
