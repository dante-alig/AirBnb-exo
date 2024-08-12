import React from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import logoBnb from "../assets/images/logo-airbnb.png";
import { ActivityIndicator } from "react-native-paper";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------FETCH-----------------
  const fetchData = async () => {
    try {
      setLoading(true);
      const formData = {
        email: username,
        password: password,
      };

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        formData
      );

      console.log(response.data);
      alert("connecté");
      // const userToken = "secret-token";
      // setToken(userToken);
    } catch (error) {
      console.log(error);
      setUserError(
        "votre adress email ou votre mot de passe ne sont pas correct"
      );
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      {/* LOGO */}
      {loading && <ActivityIndicator style={styles.loading} />}
      <View>
        <View style={styles.imageBox}>
          <Image style={styles.imageBnb} source={logoBnb} />
          <Text style={styles.logoText}>Sign In</Text>
        </View>

        {/* FORMULAIRE */}
        <View style={styles.formBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <View style={styles.errorUserBox}>
            <Text style={styles.errorUser}>{userError}</Text>
          </View>

          {/* BOUTON du formulaire */}
          <View style={styles.buttonBox}>
            <Pressable
              style={
                loading ? styles.buttonPressableFalse : styles.buttonPressable
              }
              onPress={async () => {
                if (username && password) {
                  fetchData();
                } else {
                  setUserError("Please fill all fields");
                }
              }}
              disabled={loading}
            >
              <Text style={loading && styles.textButton}>sign In</Text>
            </Pressable>
          </View>

          {/* No account ? Register     */}
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
    </KeyboardAwareScrollView>
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
  buttonPressableFalse: {
    borderColor: "#C6C6C8",
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
  errorUser: {
    color: "red",
  },
  errorUserBox: {
    alignItems: "center",
  },
  loading: {
    top: 15,
    margin: "auto",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: 0 }],
  },
  textButton: {
    color: "#C4C4C6",
  },
});
