import React from "react";
import { Route, Redirect } from "react-router-dom";

const EmployeePrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.isCustomerLoggedIn === true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default EmployeePrivateRoutes;
