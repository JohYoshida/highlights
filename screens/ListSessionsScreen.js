import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { AirbnbRating, ListItem } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

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
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.sessions}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
          />
        </ScrollView>
        <ActionButton
          buttonColor="#e74c3c"
          onPress={() => this.props.navigation.navigate("AddSession", {
            products: this.props.navigation.state.params.products,
            purchases: this.props.navigation.state.params.purchases,
            refreshData: this.refresh
          })}
          >
          <Icon name="md-add" />
        </ActionButton>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.strain}
      subtitle={
        <View style={styles.iconContainer}>
          <Text>{moment(item.createdAt).format("MMM D YYYY h:mma")}</Text>
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
