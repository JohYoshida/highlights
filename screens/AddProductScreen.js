import React from "react";
import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Input } from 'react-native-elements'
import { Dropdown } from "react-native-material-dropdown"

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
      Producers.push({ label: item.name, value: item.id });
    });
    const Strains = [];
    strains.forEach(item => {
      Strains.push({
        label: item.name + " - " + item.type,
        value: item.id
      });
    });

    return (
      <View style={styles.container}>
        <Dropdown
          label="Producer"
          data={Producers}
          value={this.state.producer_id}
          containerStyle={styles.dropdown}
          onChangeText={(value)=> {
            this.setState({ producer_id: value });
          }}
        />
        <Dropdown
          label="Strain"
          data={Strains}
          value={this.state.strain_id}
          containerStyle={styles.dropdown}
          onChangeText={(value)=> {
            this.setState({ strain_id: value });
          }}
        />
        <Button title="Add Product" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { producer_id, strain_id } = this.state;
    const { producers, strains } = this.props.navigation.state.params;
    let name;
    producers.forEach(producer => {
      if (producer_id === producer.id) name = producer.name + " ";
    });
    strains.forEach(strains => {
      if (strain_id === strains.id) name += strains.name;
    });
    fetch(`${URL}/products/${producer_id}/${strain_id}/${name}`, {
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
  },
  dropdown: {
    width: "80%",
  }
});
