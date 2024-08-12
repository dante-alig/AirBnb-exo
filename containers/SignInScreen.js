import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import logoBnb from "../assets/images/logo-airbnb.png";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.imageBox}>
        <Image style={styles.imageBnb} source={logoBnb} />
        <Text style={styles.logoText}>Sign In</Text>
      </View>
      <View style={styles.formBox}>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={styles.buttonBox}>
          <Pressable
            style={styles.buttonPressable}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={styles.textButton}>sign in</Text>
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View style={styles.buttonSubTitleBox}>
            <Text style={styles.buttonSubTitle}>No account ? Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBnb: {
    height: 137,
    width: 90,
    resizeMode: "contain",
  },
  imageBox: {
    alignItems: "center",
    marginTop: 50,
  },
  logoText: {
    fontSize: 22,
    color: "#717171",
  },
  formBox: {
    marginTop: 70,
  },
  input: {
    margin: 30,
    paddingBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  buttonPressable: {
    borderColor: "#F9575C",
    borderWidth: 3,
    width: 150,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    alignItems: "center",
    marginTop: 70,
  },
  buttonSubTitle: {
    marginTop: 20,
    fontSize: 15,
    color: "#717171",
  },
  buttonSubTitleBox: {
    alignItems: "center",
  },
});
