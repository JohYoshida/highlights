import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  View
} from "react-native";
import { Button } from "react-native-elements";
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
          <View style={styles.buttonContainer}>
            <Button
              title="Refresh Data"
              onPress={this.refreshData.bind(this)}
              style={styles.button}
            />
            <Button
              title="Add Producer"
              onPress={() => {
                this.props.navigation.navigate("AddProducer");
              }}
              style={styles.button}
            />
            <Button
              title="Add Product"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("AddProduct", {
                    producers: data.producers,
                    strains: data.strains
                  });
                });
              }}
              style={styles.button}
            />
            <Button
              title="Add Purchase"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("AddPurchase", {
                    producers: data.producers,
                    products: data.products,
                    strains: data.strains
                  });
                });
              }}
              style={styles.button}
            />
            <Button
              title="Add Session"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("AddSession", {
                    products: data.products,
                    purchases: data.purchases
                  });
                });
              }}
              style={styles.button}
            />
            <Button
              title="Add Strain"
              onPress={() => {
                this.props.navigation.navigate("AddStrain");
              }}
              style={styles.button}
            />
          </View>

          <ActionButton buttonColor="#e74c3c">
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="List Producers"
              onPress={() => {
                this.fetchProducers().then(() => {
                  this.props.navigation.navigate("ListProducers", {
                    producers,
                    refreshData: this.fetchProducers
                  });
                });
              }}
            >
              <Icon name="md-flask" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#2cbb1a"
              title="List Products"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("ListProducts", {
                    products: data.products,
                    producers: data.producers,
                    strains: data.strains,
                    refreshData: this.fetchProducts
                  });
                });
              }}
            >
              <Icon name="md-cube" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1a56bb"
              title="List Purchases"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("ListPurchases", {
                    purchases: data.purchases,
                    products: data.products,
                    strains: data.strains,
                    refreshData: this.fetchData
                  });
                });
              }}
            >
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="List Sessions"
              onPress={() => {
                this.fetchData().then(data => {
                  this.props.navigation.navigate("ListSessions", {
                    sessions: data.sessions,
                    products: data.products,
                    purchases: data.purchases,
                    refreshData: this.fetchData
                  });
                });
              }}
            >
              <Icon name="md-cloud-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="List Strains"
              onPress={() => {
                this.fetchStrains().then(strains => {
                  this.props.navigation.navigate("ListStrains", {
                    strains,
                    refreshData: this.fetchStrains
                  });
                });
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
    alignItems: "center",
    backgroundColor: "#fcfcfc"
  },
  buttonContainer: {
    flex: 1,
    width: "80%"
  },
  button: {
    marginBottom: 5
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
