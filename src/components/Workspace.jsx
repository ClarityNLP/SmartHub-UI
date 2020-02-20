import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Activity from './Activity';
import Navbar from './Navbar';
import Job from './Job';

export default class Workspace extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="workspace">
        <Navbar/>
        <Switch>
          <Route path="/app/activities">
            <Activity/>
          </Route>
          <Route path="/app/jobs">
            <Job/>
          </Route>
          <Redirect to="/app/activities"/>
        </Switch>
      </div>
    )
  }
}
