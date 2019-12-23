import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const moment = require("moment");

export default class ListPurchasesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.navigation.state.params.purchases}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    );
  }
}

function Item({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.moisture}</Text>
      <Text style={styles.title}>{item.density}</Text>
      <Text style={styles.title}>{item.size}</Text>
      <Text style={styles.title}>{item.amount}</Text>
      <Text style={styles.title}>{moment(item.createdAt).format("MMM D YYYY")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15
  }
});
