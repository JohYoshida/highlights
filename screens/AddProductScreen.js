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

export default class AddProductScreen extends React.Component {
  static navigationOptions = {
    title: "Add Product",
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      producer_id: "",
      strain_id: ""
    };
  }

  render() {
    const { producers, strains } = this.props.navigation.state.params;
    const Producers = [];
    producers.forEach(item => {
      Producers.push(
        <Picker.Item label={item.name} value={item.id} key={item.id} />
      );
    });
    const Strains = [];
    strains.forEach(item => {
      Strains.push(
        <Picker.Item
          label={item.name + " - " + item.type}
          value={item.id}
          key={item.id}
        />
      );
    });

    return (
      <View style={styles.container}>
        <Text>Producer</Text>
        <Picker
          selectedValue={this.state.producer_id}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ producer_id: itemValue })
          }
        >
          {Producers}
        </Picker>
        <Text>Strain</Text>
        <Picker
          selectedValue={this.state.strain_id}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ strain_id: itemValue })
          }
        >
          {Strains}
        </Picker>
        <Button title="Add Product" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { producer_id, strain_id } = this.state;
    console.log(producer_id, strain_id);
    fetch(`${URL}/products/${producer_id}/${strain_id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log("Error:\n" + err);
        console.log(err);
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
