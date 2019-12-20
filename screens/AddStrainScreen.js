import React from "react";
import {
  Button,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const { URL } = require("../constants/EnvironmentVariables");

export default class AddSessionScreen extends React.Component {
  static navigationOptions = {
    title: "Add Strain"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
          placeholder="Purple Kush"
          onChangeText={name => this.setState({ name })}
        />
        <Text>Type</Text>
        <Picker
          selectedValue={this.state.type}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ type: itemValue })
          }
        >
          <Picker.Item label="Indica" value="Indica" key="Indica" />
          <Picker.Item label="Sativa" value="Sativa" key="Sativa" />
          <Picker.Item label="Hybrid" value="Hybrid" key="Hybrid" />
        </Picker>
        <Button title="Add Strain" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { type, name } = this.state;
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
  }
});
