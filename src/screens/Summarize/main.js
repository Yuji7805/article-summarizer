//use...
import { useCallback, useEffect, useState } from "react";

//view components
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { Chip } from "react-native-paper";
import { Button as RButton } from "../../components/Button";

//styling
import { styles } from "../../style/styles";

//material
import { Ionicons } from "@expo/vector-icons";

//navigation
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//storage
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
const api = axios.create({ baseURL: "http://157.230.4.159:8091/api/" });

export default function Summarize() {
  const navigation = useNavigation();
  const [summary, setSummary] = useState("SUMMARIZE NOW");
  const [category, setCategory] = useState("AI in Daily Life");
  const [hours, setHours] = useState(24);
  const [summarizing, setSummarizing] = useState(false);
  const [summarizeCompleted, setSummarizeCompleted] = useState(false);

  const [token, setToken] = useState("");

  const handleSummarize = () => {
    setSummary("SUMMARIZING...");
    setSummarizing(true);
    setSummarizeCompleted(false);
    api
      .post(
        "v1/summarize-articles",
        {
          category: category,
          period: hours
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then((response) => {
        console.log("accepting...");
        setSummary(response.data["summary"]);
        setSummarizing(false);
        setSummarizeCompleted(true);
        if (response.status !== 200) {
          console.log(response.status);
          console.log(response);
        } else {
          console.log("Post created successfully:", response.data);
          if (response.data["summary"] === "No matching content") {
            setSummarizing(true);
            setSummarizeCompleted(false);
          }
        }
      })
      .catch((error) => {
        console.log("Error creating post:", error);
        setSummary("CONNECTING SERVER ERROR\nTRY AGAIN");
        setSummarizing(false);
        setSummarizeCompleted(false);
      });
  };

  const handleMenuButtonPress = () => {
    console.log("Menu button pressed");
    navigation.openDrawer();
  };

  const handleSettingButtonPress = () => {
    console.log("Setting button pressed");
    navigation.navigate("Option");
  };

  async function getValue() {
    const hours = await AsyncStorage.getItem("hours");
    console.log(hours);
    if (hours !== null) {
      setHours(hours);
    }
    const category = await AsyncStorage.getItem("category");
    console.log(category);
    if (category !== null) {
      setCategory(category);
    }

    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token != null) {
      setToken(token);
    }
  }

  const handleSpeak = () => {
    console.log("Speaking...");
  };

  useFocusEffect(
    useCallback(() => {
      console.log("loading...main summarize");
      getValue();
      // setSummary("SUMMARIZE NOW");
    })
  );

  useEffect(() => {
    getValue();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={handleMenuButtonPress}>
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Summarize</Text>
        <TouchableOpacity onPress={handleSettingButtonPress}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.summarize_info}>
          <View style={styles.summarize_info_row}>
            <Text style={styles.summarize_info_element}>Category:</Text>
            <Chip
              disabled
              onPress={() => console.log("Pressed")}
              style={{ backgroundColor: "#eeeeee" }}
              textStyle={{ color: "#000000" }}
            >
              {category}
            </Chip>
          </View>
          <View style={styles.summarize_info_row}>
            <Text style={styles.summarize_info_element}>Hours:</Text>
            <Chip
              disabled
              onPress={() => console.log("Pressed")}
              style={{ backgroundColor: "#eeeeee" }}
              textStyle={{ color: "#000000" }}
            >
              {hours} hours
            </Chip>
          </View>
        </View>
        <ScrollView
          style={styles.summaryContainer}
          contentContainerStyle={!summarizeCompleted && styles.summaryPreview}
        >
          {!summarizing && !summarizeCompleted && (
            <Image
              source={require("../../assets/preview.png")}
              style={{ width: "80%", height: "36%" }}
            />
          )}
          {summary !== "No matching content" &&
            summarizing &&
            !summarizeCompleted && (
              <Image
                source={require("../../assets/summarizing.png")}
                style={{ width: "90%", height: "40%" }}
              />
            )}
          {summary === "No matching content" && (
            <Image
              source={require("../../assets/nocontent.png")}
              style={{ width: "90%", height: "40%" }}
            />
          )}
          {!summarizeCompleted && (
            <Text style={{ textAlign: "center" }}>{summary}</Text>
          )}
          {summarizeCompleted && <Text style={styles.summary}>{summary}</Text>}
        </ScrollView>
        <View
          style={{
            width: "100%"
          }}
        >
          <RButton
            title="Summarize"
            color={"#f02020"}
            onPress={handleSummarize}
            disabled={!summarizing}
          />
          {/* <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 42,
              width: 70,
              height: 70
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={handleSpeak}
            >
              <Image
                source={require("../../assets/speaker.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
}
