import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

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
      amount: -1,
      size: -1,
      moisture: -1,
      density: -1
    };
  }

  render() {
    const { producers, strains } = this.props.navigation.state.params;
    // Make picker items
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

    // Amount
    let component1 = () => <Text>Gram</Text>;
    let component2 = () => <Text>Eight</Text>;
    let component3 = () => <Text>Quarter</Text>;
    const amountButtons = [
      { element: component1 },
      { element: component2 },
      { element: component3 }
    ];
    // Size
    let component4 = () => <Text>Small</Text>;
    let component5 = () => <Text>Medium</Text>;
    let component6 = () => <Text>Large</Text>;
    const sizeButtons = [
      { element: component4 },
      { element: component5 },
      { element: component6 }
    ];
    // Moisture
    let component7 = () => <Text>Moist</Text>;
    let component8 = () => <Text>Average</Text>;
    let component9 = () => <Text>Dry</Text>;
    const moistureButtons = [
      { element: component7 },
      { element: component8 },
      { element: component9 }
    ];
    // Density
    let component10 = () => <Text>Moist</Text>;
    let component11 = () => <Text>Average</Text>;
    let component12 = () => <Text>Dry</Text>;
    const densityButtons = [
      { element: component10 },
      { element: component11 },
      { element: component12 }
    ];

    return (
      <ScrollView>
        <View style={styles.container}>
          <Dropdown
            label="Producer"
            data={Producers}
            value={this.state.producer}
            containerStyle={styles.dropdown}
            onChangeText={value => {
              this.setState({ producer: value });
            }}
          />

          <Dropdown
            label="Strain"
            data={Strains}
            value={this.state.strain}
            containerStyle={styles.dropdown}
            onChangeText={value => {
              this.setState({ strain: value });
            }}
          />
          <Text>Amount</Text>
          <ButtonGroup
            onPress={amount => this.setState({ amount })}
            selectedIndex={this.state.amount}
            buttons={amountButtons}
            containerStyle={styles.buttonGroup}
          />
          <Text>Size</Text>
          <ButtonGroup
            onPress={size => this.setState({ size })}
            selectedIndex={this.state.size}
            buttons={sizeButtons}
            containerStyle={styles.buttonGroup}
          />
          <Text>Moisture</Text>
          <ButtonGroup
            onPress={moisture => this.setState({ moisture })}
            selectedIndex={this.state.moisture}
            buttons={moistureButtons}
            containerStyle={styles.buttonGroup}
          />
          <Text>Density</Text>
          <ButtonGroup
            onPress={density => this.setState({ density })}
            selectedIndex={this.state.density}
            buttons={densityButtons}
            containerStyle={styles.buttonGroup}
          />

          <Button title="Add Purchase" onPress={this.post.bind(this)} />
        </View>
      </ScrollView>
    );
  }

  post() {
    const { products } = this.props.navigation.state.params;
    let { producer, strain, amount, size, moisture, density } = this.state;
    let product_id;
    products.forEach(item => {
      if (item.producer_id === producer) {
        if (item.strain_id === strain) {
          product_id = item.id;
        }
      }
    });
    if (amount === 0) amount = "Gram";
    if (amount === 1) amount = "Eight";
    if (amount === 2) amount = "Quarter";
    if (size === 0) size = "Small";
    if (size === 1) size = "Medium";
    if (size === 2) size = "Large";
    if (moisture === 0) moisture = "Moist";
    if (moisture === 1) moisture = "Average";
    if (moisture === 2) moisture = "Dry";
    if (density === 0) density = "Dense";
    if (density === 1) density = "Average";
    if (density === 2) density = "Loose";
    fetch(`${URL}/purchases/${product_id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount, size, moisture, density })
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
    width: "80%"
  },
  buttonGroup: {
    width: "80%"
  }
});
