import React from "react";
import { Text } from "react-native";

const CustomText = (props) => {
  return (
    <Text style={{ fontFamily: "open-sans" }} {...props}>
      {props.children}
    </Text>
  );
};

export default CustomText;
