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
          value={this.state.purchase}
          containerStyle={styles.dropdown}
          onChangeText={value => {
            this.setState({ purchase: value });
          }}
        />
        <AirbnbRating
          startingValue={3}
          showRating={false}
          onFinishRating={rating => {
            console.log(rating);
            this.setState({ rating });
          }}
        />
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
  },
  dropdown: {
    width: "80%"
  }
});
