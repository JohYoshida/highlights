import React from 'react';
import { Button, Picker, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ActionButton from "react-native-action-button";
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddPurchaseScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Purchase',
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      strain: "",
      producer: "",
      type: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Strain</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
