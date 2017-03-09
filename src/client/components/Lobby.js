import './Lobby.scss';
import React, { Component } from 'react';

class LobbyContainer extends Component {
  render() {
    return <p>Lobby</p>;
  }
}

class LobbySidebar extends Component {
  constructor(props) {
    super(props);

    this.login = () => {
      console.log('TODO: Implement Login');
    };

    this.createGame = () => {
      console.log('TODO: Create game');
    };
  }

  render() {
    const canLogin = true;
    const canCreateGame = true;
    const createGameInProgress = false;

    return (
        <section className="sidebar__section">
          <div className="sidebar__buttons">
            {!canLogin
                ? null
                : <button
                 className="button sidebar__button button--primary"
                 onClick={this.login}
             >
               Login
             </button>}
            {!canCreateGame
                ? null
                : <button
                 className="button sidebar__button button--good"
                 onClick={this.createGame}
                 disabled={createGameInProgress}
             >
               CreateGame
             </button>}
          </div>
        </section>
    );
  }
}

function GameList({ games, joinGame }) {
  return (
      <section className="game-list">
        { games.length > 0 ? null : <div className="game__no-games">There are no games yet :( </div> }
        { games.map(game => <div className="game" key={game.id} onClick={() => joinGame(game)}>
          <div className="game__title">{game.title}</div>
          <div className="game__players">{game.players.join(', ')}</div>
          <div className="game__join">Join Game</div>
        </div>) }
      </section>
  );
}

export default {
  main: LobbyContainer,
  sidebar: LobbySidebar
};
