import React, { Component } from 'react';
import ActivityTable from './ActivityTable';
import ActivityView from './ActivityView';
import { Switch, Route, Redirect } from "react-router-dom";

export default class Activity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/app/activities">
          <ActivityTable/>
        </Route>
        <Route path="/app/activities/:activityId">
          <ActivityView/>
        </Route>
        <Redirect to="/app/activities"/>
      </Switch>
    )
  }
}
