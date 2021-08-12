import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import CustomText from "../Components/CustomText";

const MealItem = (props) => {
  const [widthDim, setAvailableWidthDim] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateLayout = () =>
      setAvailableWidthDim(Dimensions.get("window").width);
    Dimensions.addEventListener("change", updateLayout);
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onSelectMeal}>
      <View
        style={{
          ...styles.mealItem,
          width: widthDim * 0.9,
        }}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: props.item.imageURL,
            }}
            style={styles.imageStyle}
            resizeMode="cover"
          >
            <View style={styles.titleContainer}>
              <CustomText style={styles.title} numberOfLines={2}>
                {props.item.title}
              </CustomText>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <CustomText>{props.item.duration} min</CustomText>
          <CustomText>{props.item.complexity}</CustomText>
          <CustomText>{props.item.affordability}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 240,
    backgroundColor: "black",
    margin: 10,
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
  },
  imageContainer: {
    flex: 1,
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    backgroundColor: "grey",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.3,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontFamily: "open-sans-bold",

    color: "#fff",
    fontSize: 17,
    textAlign: "left",
  },
  titleContainer: {
    width: "70%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 20,
  },
});
export default MealItem;
