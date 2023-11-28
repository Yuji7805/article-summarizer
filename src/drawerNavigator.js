// DrawerNavigator.js
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Summarize from "./screens/Summarize/main";
import Option from "./screens/Summarize/option";
// import Profile from "./screens/profile";
import { Image, View } from "react-native";
import { styles } from "./style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function SignOut() {
  AsyncStorage.removeItem("token");
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image source={require("./assets/cryptopolitan.png")} />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          props.navigation.navigate("SignIn");
          SignOut();
        }}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Summarize"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props}></CustomDrawerContent>
      )}
    >
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="Summarize" component={Summarize} />
      <Stack.Screen name="Option" component={Option} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
