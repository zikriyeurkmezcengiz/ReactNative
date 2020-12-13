import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";

//StatusBar
function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

//Tab Nav
const RouteConfigs = {
  History: {
    name: "History",
    component: History,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: "History",
    },
  },
  AddEntry: {
    component: AddEntry,
    name: "Add Entry",
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: "Add Entry",
    },
  },
};
const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs["History"]} />
    <Tab.Screen {...RouteConfigs["AddEntry"]} />
  </Tab.Navigator>
);

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen",
};
const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: { headerShown: false },
  },
  EntryDetail: {
    name: "EntryDetail",
    component: EntryDetail,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: "Entry Detail",
    },
  },
};

const Stack = createStackNavigator();
const MainNav = () => (
  <NavigationContainer>
    <Stack.Navigator {...StackNavigatorConfig}>
      <Stack.Screen {...StackConfig["TabNav"]} />
      <Stack.Screen {...StackConfig["EntryDetail"]} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />

        <MainNav />
      </Provider>
    );
  }
}
