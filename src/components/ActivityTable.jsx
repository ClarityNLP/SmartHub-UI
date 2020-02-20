import React, { Component } from 'react';
import { Row, Col, Table, Divider, Button, Progress, Card, Typography } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
const { Title } = Typography;

// const dataSource = [
//   {
//     key: '1',
//     id: '1234',
//     patientName: 'Ned',
//     formSlug: '4100',
//     status: 'sdfsd'
//   },
//   {
//     key: '2',
//     id: '5678',
//     patientName: 'Timmy',
//     formSlug: '4100',
//     status: 'in progress',
//   },
// ];

const columns = [
  {
    title: 'Patient',
    dataIndex: 'patientName',
    key: 'patientName',
    render: (name, row) => <a target="_blank" href={`${window._env_.SMARTCHART_URL}/app/a/${row._id}`}>{name}</a>
  },
  {
    title: 'Form',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (progress) => <Progress percent={progress}/>
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

export default class ActivityTable extends Component {

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
    return axios
      .get(`${window._env_.SMARTHUB_URL}/activities`)
      .then(res => {
        const { data: activities } = res;
        return this.setState({ activities })
      })
      .catch(error => {
        console.log('ERR: ',error);
      });
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
            <Card className="activity-table">
              <Title className="activity-table-title" level={4}>Activities</Title>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => this.reset(selectedRowKeys)} disabled={!hasSelected} loading={resetting}>
                  Reset
                </Button>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} activities` : ''}
                </span>
              </div>
              <Table
                rowKey={(row) => row._id}
                rowSelection={rowSelection}
                dataSource={activities}
                columns={columns}
              />
            </Card>
          </Col>
      </Row>
    )
  }
}
