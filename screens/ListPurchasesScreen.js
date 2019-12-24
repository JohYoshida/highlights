import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

const moment = require("moment");

export default class ListPurchasesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const { purchases, products } = this.props.navigation.state.params;
    // Cross-reference name
    purchases.forEach(purchase => {
      products.forEach(product => {
        if (purchase.product_id === product.id) purchase.name = product.name;
      });
    });
    this.state = {
      purchases,
      refreshing: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.purchases}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
          />
        </ScrollView>
        <ActionButton
          buttonColor="#e74c3c"
          onPress={() =>
            this.props.navigation.navigate("AddPurchase", {
              products: this.props.navigation.state.params.products,
              refreshData: this.refresh
            })
          }
        >
          <Icon name="md-add" />
        </ActionButton>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      title={item.name}
      subtitle={
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Icon name="md-time" color="#000" size={12} />
            <Text style={styles.text}>
              {moment(item.createdAt).format("MMM D YYYY")}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="md-add-circle" color="#23aa13" size={12} />
            <Text style={styles.text}>{item.amount}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="md-water" color="#6ab5c9" size={12} />
            <Text style={styles.text}>{item.moisture}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="md-square" color="#000" size={12} />
            <Text style={styles.text}>{item.density}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="md-resize" color="#000" size={12} />
            <Text style={styles.text}>{item.size}</Text>
          </View>
        </View>
      }
    />
  );

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.navigation.state.params.refreshData().then(data => {
        const { purchases, products } = data;
        // Cross-reference name
        purchases.forEach(purchase => {
          products.forEach(product => {
            if (purchase.product_id === product.id)
              purchase.name = product.name;
          });
        });
        this.setState({ refreshing: false, purchases });
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {},
  iconContainer: {
    flex: 1,
    alignItems: "center",
    textAlign: "center"
  }
});
