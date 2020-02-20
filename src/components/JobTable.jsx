import React, { Component } from 'react';
import { Row, Col, Table, Divider, Button, Progress, Card, Typography } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration'
  }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default class JobTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      selectedRowKeys: [],
      loading: true,
      resetting: false,
    }
  }

  componentDidMount() {
    return this.props.getJobs();
    // return axios
    //   .get(`${window._env_.SMARTHUB_URL}/activities`)
    //   .then(res => {
    //     const { data: activities } = res;
    //     return this.setState({ activities })
    //   })
    //   .catch(error => {
    //     console.log('ERR: ',error);
    //   });
  }

  reset = selectedRowKeys => {
    this.setState({
      resetting: true
    });

    return axios
      .put(`${window._env_.SMARTHUB_URL}/activities/reset`, selectedRowKeys)
      .then(() => {
        this.setState({
          resetting: false,
        });
      })
      .catch(error => {
        console.log('ERR: ',error);
      });
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {

    const {
      dataSource
    } = this.props

    const {
      loading,
      selectedRowKeys,
      activities,
      resetting
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Row>
          <Col span={16} offset={4}>
            <Card className="job-table">
              <Title className="job-table-title" level={4}>Jobs</Title>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => this.reset(selectedRowKeys)} disabled={!hasSelected} loading={resetting}>
                  Reset
                </Button>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} jobs` : ''}
                </span>
              </div>
              <Table
                rowKey={(row) => row._id}
                rowSelection={rowSelection}
                dataSource={dataSource}
                columns={columns}
              />
            </Card>
          </Col>
      </Row>
    )
  }
}
