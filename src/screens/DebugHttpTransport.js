// @flow

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import type { NavigationScreenProp } from "react-navigation";
import { addKnownDevice } from "../actions/ble";
import colors from "../colors";
import { getFontStyle } from "../components/LText";
import TextInput from "../components/TextInput";
import KeyboardView from "../components/KeyboardView";
import Button from "../components/Button";

const forceInset = { bottom: "always" };

class DebugHttpTransport extends Component<
  {
    navigation: NavigationScreenProp<*>,
    addKnownDevice: (*) => void,
  },
  {
    text: string,
  },
> {
  static navigationOptions = {
    title: "Debug Http Transport",
  };

  state = {
    text: "",
  };

  onChangeText = (text: string) => {
    this.setState({ text });
  };

  onAdd = () => {
    const m = this.state.text
      .trim()
      .match(/^((?:[0-9]{1,3}\.){3}[0-9]{1,3})(:([0-9]+))?/);
    if (!m) return;
    let [, ip, , port] = m; // eslint-disable-line prefer-const
    if (!port) port = 8435;
    this.props.addKnownDevice({
      id: `httpdebug|ws://${ip}:${port}`,
      name: ip,
    });
    this.props.navigation.navigate("Manager");
  };

  render() {
    const { text } = this.state;
    return (
      <SafeAreaView style={styles.root} forceInset={forceInset}>
        <KeyboardView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={text}
                onChangeText={this.onChangeText}
                autoFocus
                autoCorrect
                selectTextOnFocus
                clearButtonMode="always"
                placeholder="192.168.0.1"
                returnKeyType="done"
                style={[getFontStyle({ semiBold: true }), styles.input]}
              />
              <View style={styles.buttonContainer}>
                <Button
                  event="DebugHttpTransportAdd"
                  type="primary"
                  title="Add"
                  containerStyle={styles.continueButton}
                  onPress={this.onAdd}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  continueButton: {
    alignSelf: "stretch",
  },
  container: {
    flex: 1,
  },
  input: {
    fontSize: 22,
  },
});

export default connect(
  null,
  {
    addKnownDevice,
  },
)(DebugHttpTransport);
