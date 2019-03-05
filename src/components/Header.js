import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  render (){
    return <header>
      <NavLink to="/" exact replace>Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/antd">AntdMobile</NavLink>
    </header>
  }
}