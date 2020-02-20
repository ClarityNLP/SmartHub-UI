import React from "react";
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import { connect } from 'react-redux';
import { updateJobStatus } from '../actions/job';
const io = sailsIOClient(socketIOClient)
io.sails.autoConnect = false;

export const SocketContext = React.createContext({
  prices: {}
});

export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    // prices: {} NOTE: not doing anything
    // w/ components internal state yet...
  }

  socket = null;

  constructor (props) {
    super(props);

    this.socket = io.sails.connect(process.env.NODE_ENV === 'development'
      ? `http://localhost:1338`
      : `https://api.mydomain.com/`
      , {
        transports: ['websocket']
      });

    this.socket.on('receive job status', (payload) => {

      // Redux store updates
      this.props.updateJobStatus(payload);

      // Component state updates
      // NOTE again...not doing anything w/ component's
      // internal state yet...
      // this.setState({
      //   prices: payload.markets
      // });
    });
  }

  componentWillUnmount () {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  // <SocketContext.Provider value={{
  //   prices: this.state.prices
  // }}>
  //   {this.props.children}
  // </SocketContext.Provider>

  render () {
    return (
      <SocketContext.Provider>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}


const mapDispatchToProps = {
  updateJobStatus,
  // updateActivity
};

export const SocketManager = connect(
  null,
  mapDispatchToProps
)(WrappedSocketManager);

export default SocketManager;
