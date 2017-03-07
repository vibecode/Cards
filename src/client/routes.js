import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import Lobby from './components/Lobby';
import Game from './components/Game';
import AppContainer from './components/app';

export default function() {
	return (
      <Route path="/" component={AppContainer}>
        <IndexRoute components={Lobby} />
        <Route path="/game/:gameId" components={Game}/>
        <Redirect from="*" to="/" />
      </Route>
  );
}