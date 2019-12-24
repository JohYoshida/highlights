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
    const { sessions, products } = this.props.navigation.state.params;
    // Cross-reference name
    sessions.forEach(session => {
      products.forEach(product => {
        if (session.product_id === product.id) session.strain = product.name;
      });
    });
    this.state = {
      sessions,
      refreshing: false
    };
  }

  render() {
    console.log(this.state.sessions);
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.sessions}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.refresh}
          refreshing={this.state.refreshing}
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
            defaultRating={item.rating}
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

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.navigation.state.params.refreshData().then(data => {
        const { sessions, products } = data;
        // Cross-reference name
        sessions.forEach(session => {
          products.forEach(product => {
            if (session.product_id === product.id)
              session.strain = product.name;
          });
        });
        this.setState({ refreshing: false, sessions });
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
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 15
  }
});
