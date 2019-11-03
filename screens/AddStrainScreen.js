import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ActionButton from "react-native-action-button";
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddStrainScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Strain</Text>
    </View>
  );
}

AddStrainScreen.navigationOptions = {
  title: 'AddStrain',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
