import React, { Component } from 'react';
import Transient from './Transient';
import Workspace from './Workspace';
import { SocketManager } from './SocketManager';

export default class SmartHub extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return false ? (
      <Transient/>
    ) : (
      <SocketManager>
        <Workspace/>
      </SocketManager>
    );
  }
}
