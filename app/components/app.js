import React, { Component } from 'react';
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch
const Popular = require('./Popular')
const Nav = require('./Nav')
const Home = require('./Home')
const Battle = require('./Battle')


class App extends Component {
  render() {
    return (
      <Router>
          <div className="container">
            <Nav />
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path ="/battle" component={Battle} />
            <Route  path="/popular" component={Popular} />
            <Route render={ function() {
              return <p>Not Found</p>
            }} />
            </Switch>
          </div>
        </Router>
    )
  }

};

module.exports = App;