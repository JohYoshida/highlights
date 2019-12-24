import React from "react";
import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Input } from 'react-native-elements'

const { URL } = require("../constants/EnvironmentVariables");

export default class AddProducerScreen extends React.Component {
  static navigationOptions = {
    title: "Add Producer"
  };

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      producer: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          containerStyle={styles.input}
          label="Producer"
          placeholder="Aurora"
          onChangeText={producer => this.setState({ producer })}
        />
        <Button title="Add Producer" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { producer } = this.state;
    fetch(`${URL}/producers/${producer}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log("Error:\n", err);
        this.props.navigation.goBack();
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  input: {
    width: "80%"
  }
});
