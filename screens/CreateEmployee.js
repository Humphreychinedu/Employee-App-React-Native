import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "position":
          return route.params.position;
        case "picture":
          return route.params.picture;
        case "salary":
          return route.params.salary;
      }
    }
    return "";
  };

  const [name, setName] = useState(getDetails("name"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [position, setPosition] = useState(getDetails("position"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [modal, setModal] = useState(false);
  const [enableShift, setEnableShift] = useState(false);

  const submitData = () => {
    console.log(picture);
    fetch("http://10.0.2.2:3000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        salary,
        position,
        picture,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        Alert.alert(`${data.name} was saved successfully`);
        setName("");
        setPhone("");
        setEmail("");
        setSalary("");
        setPosition("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("We are unable to process your request at this time");
      });
  };

  const updateData = () => {
    fetch("http://10.0.2.2:3000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        phone,
        email,
        salary,
        position,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} updated succesfully`);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("We are unable to process your request at this time");
      });
  };

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
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((error) => {
        Alert.alert("Unable to upload image");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableShift}
    >
      <View>
        <TextInput
          style={styles.input}
          label="Name"
          mode="outlined"
          theme={theme}
          value={name}
          onFocus={() => setEnableShift(false)}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          label="PhoneNumber"
          mode="outlined"
          keyboardType="number-pad"
          theme={theme}
          value={phone}
          onFocus={() => setEnableShift(false)}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          theme={theme}
          value={email}
          onFocus={() => setEnableShift(false)}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Salary"
          mode="outlined"
          keyboardType="number-pad"
          theme={theme}
          onFocus={() => setEnableShift(true)}
          value={salary}
          onChangeText={(text) => setSalary(text)}
        />

        <TextInput
          style={styles.input}
          label="Position"
          mode="outlined"
          theme={theme}
          value={position}
          onFocus={() => setEnableShift(true)}
          onChangeText={(text) => setPosition(text)}
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
        {route.params ? (
          <Button
            style={styles.button}
            theme={theme}
            icon="content-save"
            mode="contained"
            onPress={() => updateData()}
          >
            Update
          </Button>
        ) : (
          <Button
            style={styles.button}
            theme={theme}
            icon="content-save"
            mode="contained"
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}

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
    </KeyboardAvoidingView>
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
