import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    _id,
    name,
    email,
    phone,
    salary,
    position,
    picture,
  } = props.route.params.item;

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  deleteEmployee = () => {
    console.log(_id);
    fetch("http://10.0.2.2:3000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("We are unable to process your request at this time");
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#5b86e5", "#36d1dc"]}
        style={styles.linearGradient}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={styles.detailContainer}>
        <Title>{name}</Title>
        <Text style={styles.text}>{position}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.profileText}>{email}</Text>
        </View>
      </Card>
      <Card
        style={styles.myCard}
        onPress={() => {
          openDial();
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.profileText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.profileText}>{salary}</Text>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          theme={theme}
          icon="account-edit"
          mode="contained"
          onPress={() => {
            props.navigation.navigate("Create", {
              _id,
              name,
              email,
              phone,
              salary,
              position,
              picture,
            });
          }}
        >
          Edit
        </Button>
        <Button
          style={styles.button}
          theme={theme}
          icon="delete"
          mode="contained"
          onPress={() => deleteEmployee()}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  linearGradient: {
    height: "20%",
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 140 / 2,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -50,
  },
  detailContainer: {
    alignItems: "center",
    margin: 15,
  },
  text: {
    fontSize: 18,
  },
  profileText: {
    fontSize: 18,
    marginLeft: 5,
    marginTop: 3,
  },
  myCard: {
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Profile;
