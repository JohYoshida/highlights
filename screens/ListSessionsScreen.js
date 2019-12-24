import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { AirbnbRating, ListItem } from "react-native-elements";

const moment = require("moment");

export default class ListSessionsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      sessions,
      purchases,
      products
    } = this.props.navigation.state.params;
    sessions.forEach(session => {
      products.forEach(product => {
        if (session.product_id === product.id) session.strain = product.name;
      });
    });
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={sessions}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.strain}
      subtitle={
        <View style={styles.iconContainer}>
          <Text>{moment(item.createAt).format("MMM D YYYY h:mma")}</Text>
          <AirbnbRating
            startingValue={item.rating}
            readonly
            showRating={false}
            size={12}
          />
        </View>
      }
      bottomDivider
      chevron
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 15
  }
});
