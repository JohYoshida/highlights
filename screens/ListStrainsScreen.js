import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

export default class ListStrainsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      strains: this.props.navigation.state.params.strains,
      refreshing: false
    };
  }

  render() {
    const { strains } = this.state;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={strains}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.refresh}
          refreshing={this.state.refreshing}
        />
      </ScrollView>
    );
  }

  renderItem = ({ item }) => (
    <ListItem title={item.name} subtitle={item.type} bottomDivider chevron />
  );

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.navigation.state.params.refreshData().then(data => {
        this.setState({ refreshing: false, strains: data });
      });
    });
  }
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
    marginHorizontal: 16
  },
  title: {
    fontSize: 15
  }
});
