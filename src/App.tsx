import React, { FC } from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/redux_store';
import { Header }  from './components/Header/Header';
import { Notes as NoteList }from './components/Notes/Notes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withNamespaces  } from 'react-i18next';

const App: FC<any> = (props) => {
  return (
    <div className="app">
        <Header i18n={props.i18n} t={props.t}/>
        <div className="app-holder">
            <Switch>
                <Route path='/notes/:id?' render={()=> <NoteList t={props.t} /> } />
                <Route path='/' exact><Redirect to='/notes'/></Route>
                <Route path='*' render={() => <div>404</div>} />
            </Switch>
        </div>
    </div>
  )
}

const AppNamespaces = withNamespaces()(App)

const Notes = () => {
  return (
      <BrowserRouter>
        <Provider store={store}>
            <AppNamespaces/>
        </Provider>
      </BrowserRouter>
  )
}

export default Notes
