import './app.scss';
import React, { Component } from 'react';

class AppContainer extends Component {
  componentDidMount() {
    console.log('HEY THERE');
  }

  render() {
    const { main, sidebar } = this.props;
    return (
        <div className={`c-application`}>

        </div>
    );
  }

  _click() {
    console.log('STUFF');
  }
}

export default AppContainer;
