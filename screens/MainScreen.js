import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default class MainScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Add Producer"
            onPress={() => {
              this.props.navigation.navigate("AddProducer");
            }}
          >
            <Icon name="md-flask" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#2cbb1a"
            title="Add Product"
            onPress={() => {
              this.props.navigation.navigate("AddProduct");
            }}
          >
            <Icon name="md-cube" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1a56bb"
            title="Add Purchase"
            onPress={() => {
              this.props.navigation.navigate("AddPurchase");
            }}
          >
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add Session"
            onPress={() => this.props.navigation.navigate("AddSession")}
          >
            <Icon name="md-cloud-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Add Strain"
            onPress={() => {
              this.props.navigation.navigate("AddStrain");
            }}
          >
            <Icon name="md-leaf" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fcfcfc"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
