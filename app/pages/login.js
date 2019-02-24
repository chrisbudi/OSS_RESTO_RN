import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Axios from "axios";
import { connect } from "react-redux";
import urlPublic from "../urlPublic";
import { addToken } from "../store/actions/configAction";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      validation: false,
      _isMounted: false
    };
  }

  loginPress = () => {
    console.log(this.state);
    const { userid, password } = this.state;

    const data = {
      userid: userid,
      pass: password
    };

    console.log(urlPublic.API_URL + "api/users/auth", "user url", data);

    Axios.post(urlPublic.API_URL + "api/users/auth", data, urlPublic.config)
      .then(res => this.loginResponse(res))
      .catch(err => this.errorLoginResponse(err));
  };

  loginResponse = response => {
    console.log(response);
    if (response.status == 200) {
      const data = response.data;
      this.props.onAddToken(data);
      console.log(this.props);
      this.props.navigation.navigate("Main");
    } else {
      Alert.alert("Warning", response.data.msg + ", Please check your input", [
        {
          text: "Ok",
          onPress: () => console.log(response.data.msg),
          style: "cancel"
        }
      ]);
    }
  };

  errorLoginResponse = err => {
    console.log(err);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("./assets/images/logo/download.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              onChangeText={userid => this.setState({ userid: userid })}
              returnKeyType="next"
              placeholder="User ID"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />

            <TextInput
              style={styles.input}
              returnKeyType="go"
              ref={input => (this.passwordInput = input)}
              onChangeText={pass => this.setState({ password: pass })}
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.loginPress()}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

const mapStatestoProps = state => {
  // console.log(state)
  return {
    token: state.config.token
  };
};

const dispatchToProps = dispatch => {
  return {
    onAddToken: token => dispatch(addToken(token))
  };
};

export default connect(
  mapStatestoProps,
  dispatchToProps
)(login);
