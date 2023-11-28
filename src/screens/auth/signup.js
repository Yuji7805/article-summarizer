import { View, Image, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button as RButton } from "../../components/Button";

//styling
import { styles } from "../../style/styles";

//net communication
import axios from "axios";

//navigation
import { useNavigation } from "@react-navigation/native";

//toast
import Toast from "react-native-toast-message";

//password hash
// import bcrypt from "react-native-bcrypt";

const BASE_URL = "http://157.230.4.159:8091/api";

const SignUp = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSignUp = async () => {
    console.log("sign up called");
    // check input validation
    let hashedPassword = "";
    let checked = true;
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters ");
      checked = false;
    } else {
      // const saltRounds = 10;
      // bcrypt.genSalt(saltRounds, (err, salt) => {
      //   bcrypt.hash(password, salt, (err, hash) => {
      //     // Now store hash (i.e., hashed password) in your password DB.
      //     console.log("@@@ ", hash);
      //     hashedPassword = hash;
      //   });
      // });
      setPasswordError("");
    }
    if (fullName.length == 0) {
      setNameError("Please enter your name");
      checked = false;
    } else {
      setNameError("");
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      checked = false;
    } else {
      setEmailError("");
    }
    // console.log(fullName, email, password, hashedPassword);
    // make sign up post request
    if (checked) {
      console.log("requesting...");
      try {
        const response = await axios({
          method: "post",
          url: "http://157.230.4.159:8091/api/signup",
          headers: { "Content-Type": "application/json" },
          data: { username: fullName, email: email, password: password }
        });
        console.log("=====response=====");
        console.log(response);
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
          navigation.navigate("SignIn");
          Toast.show({
            type: "success",
            position: "top",
            text1: "Sign up successfully",
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.authContainer}>
      {/* <Text>Sign UP</Text> */}
      <View style={styles.authHeader}>
        <Image source={require("../../assets/cryptopolitan.png")} />
      </View>
      {/* full name input */}
      <View style={{ width: "90%" }}>
        <Input
          placeholder="Full name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          errorMessage={nameError}
          onEndEditing={() => {
            if (fullName.length == 0) {
              setNameError("Please enter your name");
            } else {
              setNameError("");
            }
          }}
          leftIcon={
            <Ionicons
              style={{ marginRight: "5%" }}
              name="person-outline"
              size={24}
              color={"#3333ee"}
            />
          }
        />
      </View>

      {/* email input */}
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
              color={"#3333ee"}
            />
          }
        />
      </View>

      {/* password input */}
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
              color={"#3333ee"}
            />
          }
        />
      </View>

      {/* SIGN UP Button */}
      <View
        style={{
          width: "80%",
          marginTop: "6%"
        }}
      >
        <RButton title="Sign Up" color={"#000080"} onPress={handleSignUp} />
      </View>
      <View style={{ margin: 10, flexDirection: "row" }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default SignUp;
