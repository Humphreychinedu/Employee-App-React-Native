import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("http://10.0.2.2:3000/findAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("We are unable to process your request at this time");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => {
          navigation.navigate("Profile", { item });
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
        keyExtractor={(item) => item._id}
        onRefresh={() => {
          fetchData();
        }}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => navigation.navigate("Create")}
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
