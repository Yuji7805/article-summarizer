import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button, Input } from "react-native-elements";

import { useEffect, useState } from "react";
import { Button as RButton } from "../../components/Button";

//material
import { Ionicons } from "@expo/vector-icons";

//styling
import { styles } from "../../style/styles";

//axios request
import axios from "axios";

//navigation
import { useNavigation } from "@react-navigation/native";

//toast
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://157.230.4.159:8091/api";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [token, setToken] = useState("");

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSignIn = async () => {
    console.log("signing in...");
    let checked = true;
    // password check
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters ");
      checked = false;
    } else {
      setPasswordError("");
    }
    // email check
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      checked = false;
    } else {
      setEmailError("");
    }

    if (checked) {
      // validate successed
      console.log("validated...");
      console.log(BASE_URL + "/signin");
      try {
        const response = await axios({
          method: "post",
          url: BASE_URL + "/signin",
          headers: {
            "Content-Type": "application/json"
          },
          data: { email: email, password: password }
        });
        if (response.status !== 200) {
          Toast.show({
            type: "error",
            position: "top",
            text1: response["data"]["msg"],
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          });
        } else {
          console.log(response["data"]["access_token"]);
          navigation.navigate("Home");
          await AsyncStorage.setItem("token", response["data"]["access_token"]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function getToken() {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token != null) {
      try {
        setToken(token);
        const response = await axios({
          method: "post",
          url: "http://192.168.142.193:8091/api/verify-token",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            token: token
          }
        });
        if (response.status !== 200) {
          Toast.show({
            type: "error",
            position: "top",
            text1: response["data"]["msg"],
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          });
        } else {
          navigation.navigate("Home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Image source={require("../../assets/cryptopolitan.png")} />
      </View>
      <View style={{ width: "90%" }}>
        <Input
          placeholder="email@address.com"
          value={email}
          onChangeText={(value) => setEmail(value)}
          errorMessage={emailError}
          onEndEditing={() => {
            if (!isValidEmail(email))
              setEmailError("Please enter a valid email address");
            else setEmailError("");
          }}
          leftIcon={
            <Ionicons
              style={{ marginRight: "5%" }}
              name="mail-outline"
              size={24}
              color={styles.authColor.color}
            />
          }
        />
      </View>
      <View style={{ width: "90%" }}>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          errorMessage={passwordError}
          onEndEditing={() => {
            if (password.length < 6) {
              setPasswordError("Password must be at least 6 characters ");
            } else {
              setPasswordError("");
            }
          }}
          leftIcon={
            <Ionicons
              style={{ marginRight: "5%" }}
              name="key-outline"
              size={24}
              color={styles.authColor.color}
            />
          }
        />
      </View>
      <View
        style={{
          width: "80%",
          marginTop: "6%"
        }}
      >
        <RButton title="Sign In" color={"#8040e0"} onPress={handleSignIn} />
      </View>
      <View style={{ margin: 10, flexDirection: "row" }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default SignIn;
