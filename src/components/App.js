import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import User from './User';
import Product from './Product';
import AntdMobile from './AntdMobile';
import Footer from './Footer';
import d from '../data/data';
import './App.css';

export default class App extends React.Component {
  render (){
    return <HashRouter>
      <div className="app-wrap">
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/users' component={User} />
          <Route path='/products' component={Product} />
          <Route path='/antd' component={AntdMobile} />
          <Redirect to='/' />
        </Switch>
        <Footer version={d.version} />
      </div>
    </HashRouter>
  }
}

