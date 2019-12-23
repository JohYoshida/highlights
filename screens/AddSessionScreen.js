import React from "react";
import { Button, Picker, StyleSheet, Text, View } from "react-native";

const { URL } = require("../constants/EnvironmentVariables");
const moment = require("moment");

export default class AddSessionScreen extends React.Component {
  static navigationOptions = {
    title: "Add Session",
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      purchase: "",
      rating: "0"
    };
  }

  render() {
    const { products, purchases } = this.props.navigation.state.params;
    // Make picker items
    const Purchases = [];
    purchases.forEach(purchase => {
      let time = moment(purchase.createdAt).format("MMM D YYYY");
      let name;
      products.forEach(product => {
        if (product.id === purchase.product_id) name = product.name;
      });
      Purchases.push(
        <Picker.Item
          label={time + " - " + name}
          value={purchase.id}
          key={purchase.id}
        />
      );
    });
    return (
      <View style={styles.container}>
        <Text>Product</Text>
        <Picker
          selectedValue={this.state.purchase}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ purchase: itemValue })
          }
        >
          {Purchases}
        </Picker>

        <Text>Rating</Text>
        <Picker
          selectedValue={this.state.rating}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ rating: itemValue })
          }
        >
          <Picker.Item label="-" value="-1" />
          <Picker.Item label="=" value="0" />
          <Picker.Item label="+" value="+1" />
        </Picker>

        <Button title="Add Purchase" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { purchase, rating } = this.state;
    fetch(`${URL}/sessions/${purchase}/${rating}`, {
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
