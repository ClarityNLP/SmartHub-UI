import { connect } from 'react-redux'
import JobTable from '../components/JobTable'

import {
  getJobs
} from '../actions/job';

function mapStateToProps(state) {
  return {
    dataSource: state.jobs.flat
  };
}

const jobTableContainer = connect(mapStateToProps, {
  getJobs
})(JobTable);

export default jobTableContainer;
