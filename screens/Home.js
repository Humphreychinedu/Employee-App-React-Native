import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = (props) => {
  const data = [
    {
      id: "1",
      name: "chinedu",
      email: "chinedu.mefendja@gmail",
      salary: "$400",
      phone: "08099446354",
      position: "engineer",
      picture:
        "https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=821&q=80",
    },
    {
      id: "2",
      name: "chinedu",
      email: "chinedu.mefendja@gmail",
      salary: "$400",
      phone: "08099446354",
      position: "engineer",
      picture:
        "https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=821&q=80",
    },
    {
      id: "3",
      name: "chinedu",
      email: "chinedu.mefendja@gmail",
      salary: "$400",
      phone: "08099446354",
      position: "engineer",
      picture:
        "https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=821&q=80",
    },
    {
      id: "4",
      name: "chinedu",
      email: "chinedu.mefendja@gmail",
      salary: "$400",
      phone: "08099446354",
      position: "engineer",
      picture:
        "https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=821&q=80",
    },
  ];

  const renderList = (item) => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => {
          props.navigation.navigate("Profile", { item });
        }}
      >
        <View style={styles.detailContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.picture,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.displayText}> {item.name}</Text>
            <Text style={styles.displayText}> {item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return renderList(item);
        }}
        // keyExtractor={(item, index) => item.id}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => props.navigation.navigate("Create")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  container: {
    flex: 1,
  },

  detailContainer: {
    flexDirection: "row",
    padding: 5,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  textContainer: {
    marginLeft: 10,
  },

  displayText: {
    fontSize: 18,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
