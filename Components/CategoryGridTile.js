import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const CategoryGridTile = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableComponent
        activeOpacity={0.8}
        onPress={props.onSelect}
        style={{ flex: 1 }}
      >
        <View
          style={{ ...styles.itemContainer, backgroundColor: props.item.color }}
        >
          <Text style={styles.title} numberOfLines={2}>
            {props.item.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 140,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 9,
    padding: 15,
  },
  title: {
    textAlign: "right",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default CategoryGridTile;
