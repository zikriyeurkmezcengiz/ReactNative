import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
  componentDidMount() {
    console.log("hello");
    console.log("ziko");
  }
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="ios-pizza" size={100} color="red" />
        {/* <Text>Hola I am here.</Text> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
