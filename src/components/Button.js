import { TouchableOpacity, Text } from "react-native";

export const Button = ({ title, color, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: "center"
      }}
      onPress={onPress}
      // disabled={disabled}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
