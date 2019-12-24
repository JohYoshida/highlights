import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

export default class ListProducersScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      producers: this.props.navigation.state.params.producers,
      refreshing: false
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.producers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.refresh}
          refreshing={this.state.refreshing}
        />
      </ScrollView>
    );
  }

  renderItem = ({ item }) => (
    <ListItem title={item.name} bottomDivider chevron />
  );

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.navigation.state.params.refreshData().then(data => {
        this.setState({ refreshing: false, producers: data });
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
