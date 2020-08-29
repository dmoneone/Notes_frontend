import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/redux_store';
import { Header } from './components/Header/Header';
import { Notes as NoteList }from './components/Notes/Notes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="app">
        <Header/>
        <div className="app-holder">
            <Switch>
                <Route path='/notes/:id?' render={()=> <NoteList/> } />
                <Route path='/' exact><Redirect to='/notes'/></Route>
                <Route path='*' render={() => <div>404</div>} />
            </Switch>
        </div>
    </div>
  )
}

const Notes = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <App/>
      </Provider>
    </BrowserRouter>
  )
}

export default Notes
