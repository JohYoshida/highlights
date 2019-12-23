import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

export default class ListProductsScreen extends React.Component {
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
          data={this.props.navigation.state.params.products}
          renderItem={({ item }) => <Item name={item.name} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    );
  }
}

function Item({ name }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
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
