import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

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
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={strains}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
          />
        </ScrollView>
        <ActionButton
          buttonColor="#e74c3c"
          onPress={() => this.props.navigation.navigate("AddStrain", {
            refreshData: this.refresh
          })}
          >
          <Icon name="md-add" />
        </ActionButton>
      </View>

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
  };
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
