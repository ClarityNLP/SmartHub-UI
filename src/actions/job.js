import axios from 'axios';

export const updateJobStatus = val => ({
  type: 'JOB_STATUS',
  jobId: val.id,
  status: val.status
});

export function getJobs() {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: 'GET_JOBS_REQUESTED',
      });

      return axios
        .get(`${window._env_.SMARTHUB_URL}/jobs`)
        .then(res => {
          const { data: jobs } = res;
          dispatch({
            type: 'GET_JOBS_FULFILLED',
            jobs: jobs
          });
          return resolve();
        })
        .catch(error => {
          dispatch({
            type: 'GET_JOBS_REJECTED',
            error: error.message
          });
          return reject();
        });
    });
  }
}
