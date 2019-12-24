import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

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
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.producers}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
          />
        </ScrollView>
        <ActionButton
          buttonColor="#e74c3c"
          onPress={() =>
            this.props.navigation.navigate("AddProducer", {
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
    <ListItem title={item.name} bottomDivider chevron />
  );

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.navigation.state.params.refreshData().then(data => {
        this.setState({ refreshing: false, producers: data });
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
