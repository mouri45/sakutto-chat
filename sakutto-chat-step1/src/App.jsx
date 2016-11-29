import React from 'react';
import ReactDOM from 'react-dom';
import {Tabbar, Tab} from 'react-onsenui';

import HomePage from './HomePage';
import SettingsPage from './SettingsPage';

export default class App extends React.Component {
  renderTabs() {
    return [
      {
        content: <HomePage key='page1' />,
        tab: <Tab key='tab1' label='Home' icon='md-home' />
      },
      {
        content: <SettingsPage key='page2' />,
        tab: <Tab key='tab2' label='Settings' icon='md-settings' />
      }
    ]
  }

  render() {
    return (
      <Tabbar initialIndex={0} renderTabs={this.renderTabs.bind(this)} />
    );
  }
}
