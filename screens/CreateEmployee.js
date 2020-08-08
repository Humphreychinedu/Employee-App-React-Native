import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);

  const imagePickerHandler = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        const newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        imageUploadHandler(newFile);
      }
    } else {
      Alert.alert("You need to give us permision");
    }
  };
  const cameraHandler = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);

    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        const newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        imageUploadHandler(newFile);
      }
    } else {
      Alert.alert("You need to give us permision");
    }
  };

  const imageUploadHandler = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "EmpApp");
    data.append("cloud_name", "chinedu007");

    fetch("https://api.cloudinary.com/v1_1/chinedu007/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        label="Name"
        mode="outlined"
        theme={theme}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        label="PhoneNumber"
        mode="outlined"
        keyboardType="number-pad"
        theme={theme}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        label="Email"
        mode="outlined"
        theme={theme}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        label="Salary"
        mode="outlined"
        keyboardType="number-pad"
        theme={theme}
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />

      <Button
        style={styles.button}
        theme={theme}
        icon={picture == "" ? "upload" : "check"}
        mode="contained"
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
        style={styles.button}
        theme={theme}
        icon="content-save"
        mode="contained"
        onPress={() => console.log("saved")}
      >
        Save
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.cameraButton}>
            <Button
              theme={theme}
              icon="camera"
              mode="contained"
              onPress={() => cameraHandler()}
            >
              Camera
            </Button>
            <Button
              theme={theme}
              icon="image-area"
              mode="contained"
              onPress={() => imagePickerHandler()}
            >
              Gallery
            </Button>
          </View>
          <Button
            theme={theme}
            style={styles.button}
            onPress={() => setModal(false)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
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
  input: {
    margin: 5,
  },

  button: {
    margin: 5,
  },
  cameraButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
});

export default CreateEmployee;
