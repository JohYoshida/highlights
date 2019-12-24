import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Button, ButtonGroup, Input } from 'react-native-elements'
import { Dropdown } from "react-native-material-dropdown"


const { URL } = require("../constants/EnvironmentVariables");

export default class AddSessionScreen extends React.Component {
  static navigationOptions = {
    title: "Add Strain"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: -1
    };
  }

  render() {
    const component1 = () => <Text>Indica</Text>;
    const component2 = () => <Text>Hybrid</Text>;
    const component3 = () => <Text>Sativa</Text>;
    const buttons = [
      { element: component1 },
      { element: component2 },
      { element: component3 }
    ];
    return (
      <View style={styles.container}>
        <Input
          label="Name"
          placeholder="Purple Kush"
          containerStyle={styles.input}
          onChangeText={name => this.setState({ name })}
        />
        <ButtonGroup
          onPress={type => this.setState({ type })}
          selectedIndex={this.state.type}
          containerStyle={styles.buttonGroup}
          buttons={buttons}
        />
        <Button title="Add Strain" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    let { type, name } = this.state;
    if (type === 0) type = "Indica";
    if (type === 1) type = "Hybrid";
    if (type === 2) type = "Sativa";
    fetch(`${URL}/strains/${type}/${name}`, {
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
  },
  buttonGroup: {
    width: "80%"
  }
});
