import React from "react";
import { StatusBar } from "react-native";

import { Provider } from "react-redux";

import Router from './router';

import store from './store';


export default function App() {
  return (
    <>
      <StatusBar  barStyle='light-content' backgroundColor="#AACE37"  />
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}