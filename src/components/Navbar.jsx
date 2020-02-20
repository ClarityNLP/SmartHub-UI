import React, { Component } from 'react';
import { Icon } from 'antd';
import clsx from 'clsx';
import { Route, Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {

    function NavbarLink({to, icon, name}) {
      return (
        <Route
          path={to}
          children={({ match }) => (
            <li className={clsx(match && 'is-active')}>
              <Link
                to={to}
              >
                <Icon type={icon} />
                <span>{name}</span>
              </Link>
              <div className="bottom-border"></div>
            </li>
          )}
        />
      );
    }

    return (
      <nav className="navbar">
        <div className="navbar-brand">The Hub</div>
        <div className="navbar-start">
          <ul>
            <NavbarLink
              to={`/app/activities`}
              icon="profile"
              name="Activities"
            />
            <NavbarLink
              to={`/app/jobs`}
              icon="schedule"
              name="Jobs"
            />
          </ul>
        </div>
        <div className="navbar-end">
        Te
        </div>
      </nav>
    )
  }
}
