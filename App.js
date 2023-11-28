import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens to navigate
import SignUp from "./src/screens/auth/signup";
import SignIn from "./src/screens/auth/signin";
import Summarize from "./src/screens/Summarize/main";
import Option from "./src/screens/Summarize/option";

// Drawer navigator
import DrawerNavigator from "./src/drawerNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Summarize" component={Summarize} />
        <Stack.Screen name="Option" component={Option} />

        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
