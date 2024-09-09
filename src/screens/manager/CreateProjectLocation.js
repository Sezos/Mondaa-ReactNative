import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Appbar, IconButton } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import services from "../../services/service";

export default function CreateLocation({ navigation }) {
  const [name, setName] = React.useState("");

  const [address, setAddress] = React.useState("");

  const handleFinish = async () => {
    await services.addProjectLocation({
      name,
      formanId: 8,
      address,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <IconButton
            icon="arrow-left"
            iconColor="#04092199"
            size={18}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text>Create Project Location</Text>
          <Button onPress={handleFinish}>Done</Button>
        </View>
      </View>

      <TextInput
        label="Project Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ backgroundColor: "white" }}
      />

      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setAddress(data.description);
        }}
        query={{
          key: "AIzaSyAedG3JXI5i_r51I9Mydkb5SwRiQkOuiAo",
          language: "en",
          // components: 'country:au',
        }}
        textInputProps={{
          InputComp: TextInput,
          onChangeText: (text) => {
            setAddress(text);
          },
          value: address,
          label: "Address:",
          errorStyle: { color: "red" },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "95%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
});
