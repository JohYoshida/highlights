import React from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  View
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

const { URL } = require("../constants/EnvironmentVariables");

export default class MainScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetchingData: false,
      producers: [],
      products: [],
      purchases: [],
      sessions: [],
      strains: []
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  render() {
    if (this.state.isFetchingData) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3fe73c" />
          <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
        </View>
      );
    } else {
      const { producers, products, purchases, strains, sessions } = this.state;

      return (
        <View style={styles.container}>
          <Button title="Refresh Data" onPress={this.refreshData.bind(this)} />
          <Button
            title="List Producers"
            onPress={() => {
              this.props.navigation.navigate("ListProducers", { producers });
            }}
          />
          <Button
            title="List Products"
            onPress={() => {
              this.props.navigation.navigate("ListProducts", { products });
            }}
          />
          <Button
            title="List Purchases"
            onPress={() => {
              this.props.navigation.navigate("ListPurchases", { purchases });
            }}
          />
          <Button
            title="List Sessions"
            onPress={() => {
              this.props.navigation.navigate("ListSessions", { sessions });
            }}
          />
          <Button
            title="List Strains"
            onPress={() => {
              this.props.navigation.navigate("ListStrains", {
                strains
              });
            }}
          />

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
                this.refreshData().then(() => {
                  this.props.navigation.navigate("AddProduct", {
                    producers,
                    strains
                  });
                });
              }}
            >
              <Icon name="md-cube" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1a56bb"
              title="Add Purchase"
              onPress={() => {
                this.fetchData().then(() => {
                  this.props.navigation.navigate("AddPurchase", {
                    producers,
                    products,
                    strains
                  });
                });
              }}
            >
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Add Session"
              onPress={() => {
                this.fetchData().then(() => {
                  this.props.navigation.navigate("AddSession", {
                    products,
                    purchases
                  });
                });
              }}
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

  refreshData() {
    return new Promise((resolve, reject) => {
      this.setState({ isFetchingData: true }, () => {
        this.fetchData()
          .then(data => {
            this.setState({
              isFetchingData: false,
              producers: data.producers,
              products: data.products,
              purchases: data.purchases,
              sessions: data.sessions,
              strains: data.strains
            });
            resolve(data);
          })
          .catch(err => {
            console.log("Error: \n", err);
            this.setState({ isFetchingData: false });
            reject(err);
          });
      });
    });
  }

  fetchData = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };

  fetchProducers = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/producers`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(producers => {
          resolve(producers);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };

  fetchProducts = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/products`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(products => {
          resolve(products);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };

  fetchPurchases = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/purchases`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(purchases => {
          resolve(purchases);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };

  fetchSessions = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/sessions`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(sessions => {
          resolve(sessions);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };

  fetchStrains = () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL}/strains`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(strains => {
          resolve(strains);
        })
        .catch(err => {
          console.log("Error: \n", err);
          reject(err);
        });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fcfcfc"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
