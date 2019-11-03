import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Import components
import TabBarIcon from '../components/TabBarIcon';
// Import StrainStack screens
import StrainScreen from '../screens/StrainScreen';
import AddStrainScreen from '../screens/AddStrainScreen';
// Import PurchaseStack screens
import PurchaseScreen from '../screens/PurchaseScreen';
import AddPurchaseScreen from '../screens/AddPurchaseScreen';
// Import SessionStack screens
import SessionScreen from '../screens/SessionScreen';
import AddSessionScreen from '../screens/AddSessionScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// StrainStack
const StrainStack = createStackNavigator(
  {
    Strain: StrainScreen,
    AddStrain: AddStrainScreen,
  },
  config
);

StrainStack.navigationOptions = {
  tabBarLabel: 'Strain',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-leaf${focused ? '' : '-outline'}`
          : 'md-leaf'
      }
    />
  ),
};

StrainStack.path = '';

// PurchaseStack
const PurchaseStack = createStackNavigator(
  {
    Purchase: PurchaseScreen,
    AddPurchase: AddPurchaseScreen,
  },
  config
);

PurchaseStack.navigationOptions = {
  tabBarLabel: 'Strain',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cube${focused ? '' : '-outline'}`
          : 'md-cube'
      }
    />
  ),
};

PurchaseStack.path = '';

// SessionStack
const SessionStack = createStackNavigator(
  {
    Session: SessionScreen,
    AddSession: AddSessionScreen,
  },
  config
);

SessionStack.navigationOptions = {
  tabBarLabel: 'Session',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cloud-outline${focused ? '' : '-outline'}`
          : 'md-cloud-outline'
      }
    />
  ),
};

SessionStack.path = '';

// Make export object
const tabNavigator = createBottomTabNavigator({
  SessionStack,
  StrainStack,
  PurchaseStack,
});

tabNavigator.path = '';

export default tabNavigator;
