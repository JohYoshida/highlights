import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionButton from "react-native-action-button";
import Icon from 'react-native-vector-icons/Ionicons';

export default class SessionScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Session"
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate("AddSession");
          }}
        />
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
