import React from "react";
import { Button, Picker, StyleSheet, Text, View } from "react-native";

const { URL } = require("../constants/EnvironmentVariables");

export default class AddPurchaseScreen extends React.Component {
  static navigationOptions = {
    title: "Add Purchase",
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      strain: "",
      producer: "",
      amount: "",
      size: "",
      moisture: "",
      density: ""
    };
  }

  render() {
    const { producers, strains } = this.props.navigation.state.params;
    // Make picker items
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
        <Text>Strain</Text>
        <Picker
          selectedValue={this.state.strain}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ strain: itemValue })
          }
        >
          {Strains}
        </Picker>

        <Text>Producer</Text>
        <Picker
          selectedValue={this.state.producer}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ producer: itemValue })
          }
        >
          {Producers}
        </Picker>

        <Text>Amount</Text>
        <Picker
          selectedValue={this.state.amount}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ amount: itemValue })
          }
        >
          <Picker.Item label="Gram" value="1g" />
          <Picker.Item label="Eight" value="3.5g" />
          <Picker.Item label="Quarter" value="7g" />
        </Picker>

        <Text>Size</Text>
        <Picker
          selectedValue={this.state.size}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ size: itemValue })
          }
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>

        <Text>Moisture</Text>
        <Picker
          selectedValue={this.state.moisture}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ moisture: itemValue })
          }
        >
          <Picker.Item label="Moist" value="moist" />
          <Picker.Item label="Average" value="average" />
          <Picker.Item label="Dry" value="dry" />
        </Picker>

        <Text>Density</Text>
        <Picker
          selectedValue={this.state.density}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ density: itemValue })
          }
        >
          <Picker.Item label="Dense" value="dense" />
          <Picker.Item label="Average" value="average" />
          <Picker.Item label="Light" value="light" />
        </Picker>

        <Button title="Add Purchase" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { producer, strain } = this.state;
    const { producers, products, strains } = this.props.navigation.state.params;
    let product;
    products.forEach(item => {
      if (item.producer_id === producer) {
        if (item.strain_id === strain) {
          product = item.id;
        }
      }
    });
    fetch(`${URL}/purchases/${product}`, {
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
