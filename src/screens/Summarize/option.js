import { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { styles } from "../../style/styles";
import { Button as RButton } from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Slider from "@react-native-community/slider";

const api = axios.create({ baseURL: "http://157.230.4.159:8091/api/" });

let chipsData = [
  { enabled: true, selected: true, id: "1", label: "AI in Daily Life" },
  { enabled: true, selected: false, id: "2", label: "Explained" },
  { enabled: true, selected: false, id: "3", label: "Hidden Gems" },
  { enabled: true, selected: false, id: "4", label: "Innovators" },
  { enabled: true, selected: false, id: "5", label: "Trending News" },
  { enabled: true, selected: false, id: "6", label: "Bitcoin News" },
  { enabled: true, selected: false, id: "7", label: "Crypto gaming" },
  { enabled: true, selected: false, id: "8", label: "eSports & Tournaments" },
  { enabled: true, selected: false, id: "9", label: "Gaming Hardware" },
  { enabled: true, selected: false, id: "10", label: "Industry News" },
  { enabled: true, selected: false, id: "11", label: "Reviews" },
  { enabled: true, selected: false, id: "12", label: "Investing" },
  { enabled: true, selected: false, id: "13", label: "Latest News" },
  { enabled: true, selected: false, id: "14", label: "Altcoin News" },
  { enabled: true, selected: false, id: "15", label: "Binance News" },
  { enabled: true, selected: false, id: "16", label: "Bitcoin Cash News" },
  { enabled: true, selected: false, id: "17", label: "Bitcoin News" },
  { enabled: true, selected: false, id: "18", label: "Blockchain News" },
  { enabled: true, selected: false, id: "19", label: "Cardano News" },
  { enabled: true, selected: false, id: "20", label: "Chainlink News" },
  { enabled: true, selected: false, id: "21", label: "Cyber Security News" },
  { enabled: true, selected: false, id: "22", label: "DeFi News" },
  { enabled: true, selected: false, id: "23", label: "Dogecoin News" },
  { enabled: true, selected: false, id: "24", label: "EOS News" },
  { enabled: true, selected: false, id: "25", label: "ETFs" },
  { enabled: true, selected: false, id: "26", label: "Ethereum News" },
  { enabled: true, selected: false, id: "27", label: "Exchange News" },
  { enabled: true, selected: false, id: "28", label: "Industry News" },
  { enabled: true, selected: false, id: "29", label: "Litecoin News" },
  { enabled: true, selected: false, id: "30", label: "Monero News" },
  { enabled: true, selected: false, id: "31", label: "NFT News" },
  { enabled: true, selected: false, id: "32", label: "Polkadot News" },
  { enabled: true, selected: false, id: "33", label: "Regulation News" },
  { enabled: true, selected: false, id: "34", label: "Research News" },
  { enabled: true, selected: false, id: "35", label: "Ripple News" },
  { enabled: true, selected: false, id: "36", label: "Scam News" },
  { enabled: true, selected: false, id: "37", label: "Token News" },
  { enabled: true, selected: false, id: "38", label: "Tron News" },
  { enabled: true, selected: false, id: "39", label: "Price Prediction" },
  { enabled: true, selected: false, id: "40", label: "Regulations" },
  { enabled: true, selected: false, id: "41", label: "Blockchain Gaming" },
  { enabled: true, selected: false, id: "42", label: "Metaverse" }
];

export default function Option() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentLabel, setCurrentLabel] = useState("AI in Daily Life");
  const [sliderValue, setSliderValue] = useState(24);
  const [chips, setChips] = useState(chipsData);

  useEffect(() => {
    // const _chips = await AsyncStorage.getItem("chips");
    // console.log(chips);
    // setChips(JSON.parse(_chips));
  }, [chips]);

  async function save(key, value) {
    await AsyncStorage.setItem(key, value);
  }

  const handleSave = () => {
    save("category", currentLabel);
    save("hours", sliderValue.toString());
    save("chips", JSON.stringify(chips));
    console.log(currentLabel, sliderValue.toString());
    navigation.navigate("Summarize");
  };

  const handleBackButtonPress = () => {
    console.log("Back button pressed");
    navigation.navigate("Summarize");
  };

  const SectionHeader = ({ title }) => (
    <Text h6 style={styles.sectionHeader}>
      {title}
    </Text>
  );

  function Chip({ label, id, _selected, _enabled }) {
    const [selected, setSelected] = useState(_selected);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: selected
            ? "#f1f1f1"
            : _enabled
            ? "#f1f1f1"
            : "#dddddd",
          borderColor: selected ? "#3333ee" : "#f1f1f1",
          borderWidth: 2,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={() => {
          // setSelected(!selected);
          setSelected(true);
          console.log(id);
          for (let i = 0; i < chipsData.length; i++) {
            if (id === chipsData[i]["id"]) {
              chipsData[i]["selected"] = true;
            } else {
              chipsData[i]["selected"] = false;
            }
          }
          setChips([...chipsData]);
          handleChipSelection(label, id);
        }}
        disabled={!_enabled}
      >
        {/* {selected && (
          <Ionicons
            name="checkmark"
            size={16}
            color="#000"
            style={{ marginRight: 5 }}
          />
        )} */}
        <Text style={{ color: _enabled ? "#000" : "#aaaaaa" }}>{label}</Text>
      </TouchableOpacity>
    );
  }
  // Implement the function to handle chip selection logic
  function handleChipSelection(label, id) {
    setCurrentLabel(label);
    setCurrentIndex(id);
  }

  function ChipList({ data }) {
    const scrollRef = useRef(null);
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.label}
        horizontal
        renderItem={({ item }) => (
          <View style={{ marginRight: 10 }}>
            <Chip
              label={item.label}
              id={item.id}
              _selected={item.selected}
              _enabled={item.enabled}
            />
          </View>
        )}
      />
    );
  }

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleRefresh = () => {
    // console.log(chips);
  };

  return (
    <View style={styles.background}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Option</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="md-refresh" size={24} color="#ffffff00" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.categoryContainer}>
          <Text style={styles.subOption}>Select category</Text>

          <SectionHeader title="AI" />
          <ChipList data={chips.slice(0, 5)} />

          <SectionHeader title="Bitcoin News" />
          <ChipList data={chips.slice(5, 6)} />

          <SectionHeader title="Gaming" />
          <ChipList data={chips.slice(6, 11)} />

          <SectionHeader title="Investing" />
          <ChipList data={chips.slice(11, 12)} />

          <SectionHeader title="Latest News" />

          <ChipList data={chips.slice(12, 13)} />

          <SectionHeader title="News" />
          <ChipList data={chips.slice(13, 38)} />

          <SectionHeader title="Price Prediction" />
          <ChipList data={chips.slice(38, 39)} />

          <SectionHeader title="Regulations" />
          <ChipList data={chips.slice(39, 40)} />

          <SectionHeader title="Technology" />
          <ChipList data={chips.slice(40, 42)} />

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginVertical: 15
            }}
          />

          <Text style={styles.subOption}>Select Time</Text>
          <Text>Time range: Latest {sliderValue} hours.</Text>
          <Slider
            style={{ width: "100%", marginTop: "5%", marginBottom: "5%" }}
            minimumValue={1}
            maximumValue={72}
            minimumTrackTintColor="#0044ee"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
        </ScrollView>
        <View
          style={{
            width: "100%"
          }}
        >
          <RButton title="Save" color={"#000080"} onPress={handleSave} />
        </View>
      </View>
    </View>
  );
}
