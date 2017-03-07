import './Game.scss';
import React, { Component } from 'react';

class GameConainer extends Component {

  render() {
    return <p>GAME</p>;
  }
}

class GameSidebar extends Component {

  render() {
    return <p>Game Sidebar</p>;
  }
}

export default {
  main: GameConainer,
  sidebar: GameSidebar
};
