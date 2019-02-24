import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import LoginPage from "./app/pages/login";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./app/store/configureStore";

export default class App extends Component {
  render() {
    // const store = configureStore();
    return (
      <Text>Test</Text>
      // <Provider store={store.store}>
      //   <PersistGate loading={null} persistor={store.persistor}>
      //     {LoginPage}
      //   </PersistGate>
      // </Provider>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  }
});
