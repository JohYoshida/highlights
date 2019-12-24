import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, AirbnbRating } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

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
      purchase_id: "",
      rating: "0"
    };
  }

  render() {
    const { products, purchases } = this.props.navigation.state.params;
    // Make picker items
    const Purchases = [];
    // const product = purchases.find(({ id }) => id === purchase_id);
    purchases.forEach(purchase => {
      let time = moment(purchase.createdAt).format("MMM D YYYY");
      let product = products.find(({ id }) => id === purchase.product_id);
      let name = product.name;
      Purchases.push({
        label: time + " - " + name,
        value: purchase.id
      });
    });
    return (
      <View style={styles.container}>
        <Dropdown
          label="Product"
          data={Purchases}
          value={this.state.purchase_id}
          containerStyle={styles.dropdown}
          onChangeText={value => {
            this.setState({ purchase_id: value });
          }}
        />
        <AirbnbRating
          startingValue={3}
          showRating={false}
          onFinishRating={rating => {
            this.setState({ rating });
          }}
        />
        <Button title="Add Purchase" onPress={this.post.bind(this)} />
      </View>
    );
  }

  post() {
    const { purchase_id, rating } = this.state;
    const { products, purchases } = this.props.navigation.state.params;
    const purchase = purchases.find(({ id }) => id === purchase_id);
    fetch(`${URL}/sessions/${purchase_id}/${purchase.product_id}/${rating}`, {
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
    width: "80%"
  }
});
