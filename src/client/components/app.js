import './app.scss';
import React, { Component } from 'react';

class AppContainer extends Component {
  componentDidMount() {
    console.log('HEY THERE');
  }

  render() {
    const { main, sidebar } = this.props;
    return (
        <div className="app">
          <div className="dialogs">
            hello
          </div>
          <div className="app__inner">
            <div className="sidebar">
              {sidebar}
            </div>
            <div className="main">
              {main}
            </div>
          </div>
        </div>
    );
  }

  click() {
    console.log('STUFF');
  }
}

export default AppContainer;
