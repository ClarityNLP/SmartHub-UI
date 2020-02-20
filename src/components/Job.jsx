import React, { Component } from 'react';
import JobTable from '../containers/job_table_container';
import JobView from './JobView';
import { Switch, Route, Redirect } from "react-router-dom";

export default class Job extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/app/jobs">
          <JobTable/>
        </Route>
        <Route path="/app/jobs/:jobId">
          <JobView/>
        </Route>
        <Redirect to="/app/jobs"/>
      </Switch>
    )
  }
}
