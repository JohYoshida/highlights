import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// Import components
import TabBarIcon from "../components/TabBarIcon";
// Import ProductStack screens
import ProductScreen from "../screens/ProductScreen";
import AddProductScreen from "../screens/AddProductScreen";
// Import PurchaseStack screens
import PurchaseScreen from "../screens/PurchaseScreen";
import AddPurchaseScreen from "../screens/AddPurchaseScreen";
// Import SessionStack screens
import SessionScreen from "../screens/SessionScreen";
import AddSessionScreen from "../screens/AddSessionScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

// ProductStack
const ProductStack = createStackNavigator(
  {
    Product: ProductScreen,
    AddProduct: AddProductScreen
  },
  config
);

ProductStack.navigationOptions = {
  tabBarLabel: "Product",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-leaf${focused ? "" : "-outline"}`
          : "md-leaf"
      }
    />
  )
};

ProductStack.path = "";

// PurchaseStack
const PurchaseStack = createStackNavigator(
  {
    Purchase: PurchaseScreen,
    AddPurchase: AddPurchaseScreen
  },
  config
);

PurchaseStack.navigationOptions = {
  tabBarLabel: "Purchase",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-cube${focused ? "" : "-outline"}`
          : "md-cube"
      }
    />
  )
};

PurchaseStack.path = "";

// SessionStack
const SessionStack = createStackNavigator(
  {
    Session: SessionScreen,
    AddSession: AddSessionScreen
  },
  config
);

SessionStack.navigationOptions = {
  tabBarLabel: "Session",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-cloud-outline${focused ? "" : "-outline"}`
          : "md-cloud-outline"
      }
    />
  )
};

SessionStack.path = "";

// Make export object
const tabNavigator = createBottomTabNavigator({
  SessionStack,
  ProductStack,
  PurchaseStack
});

tabNavigator.path = "";

export default tabNavigator;
