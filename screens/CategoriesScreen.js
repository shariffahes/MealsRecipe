import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CategoryGridTile from "../Components/CategoryGridTile";
import { CATEGORIES } from "../Data/dummy_data";

const CategoriesScreen = (props) => {
  const renderGridItem = (data) => {
    return (
      <CategoryGridTile
        item={data.item}
        onSelect={() =>
          props.navigation.navigate("Meals", {
            categoryId: data.item.id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        renderItem={renderGridItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default CategoriesScreen;
