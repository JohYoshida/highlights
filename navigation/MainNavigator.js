import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

// Import MainScreen stack components
import MainScreen from "../screens/MainScreen";
import AddProducerScreen from "../screens/AddProducerScreen";
import AddProductScreen from "../screens/AddProductScreen";
import AddPurchaseScreen from "../screens/AddPurchaseScreen";
import AddSessionScreen from "../screens/AddSessionScreen";
import AddStrainScreen from "../screens/AddStrainScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

// Make export object
const standardNavigator = createStackNavigator(
  {
    Main: MainScreen,
    AddProduct: AddProductScreen,
    AddProducer: AddProducerScreen,
    AddPurchase: AddPurchaseScreen,
    AddSession: AddSessionScreen,
    AddStrain: AddStrainScreen
  },
  config
);

standardNavigator.path = "";

export default standardNavigator;
