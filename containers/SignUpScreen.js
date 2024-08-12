import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import logoBnb from "../assets/images/logo-airbnb.png";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------FETCH-----------------
  const fetchData = async () => {
    console.log(email, username, description, password);
    try {
      setLoading(true);
      const formData = {
        email: email,
        username: username,
        description: description,
        password: password,
      };

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
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
    <ScrollView>
      <KeyboardAwareScrollView extraScrollHeight={20}>
        {loading && <ActivityIndicator style={styles.loading} />}
        <View style={styles.imageBox}>
          <Image style={styles.imageBnb} source={logoBnb} />
          <Text style={styles.logoText}>Sign Up</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={10}
            placeholder="description"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="confirm password"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          />

          <View style={styles.errorUserBox}>
            <Text style={styles.errorUser}>{userError}</Text>
          </View>

          <View style={styles.buttonBox}>
            <Pressable
              style={
                loading ? styles.buttonPressableFalse : styles.buttonPressable
              }
              onPress={async () => {
                if (email && username && password) {
                  fetchData();
                } else {
                  setUserError("Please fill all fields");
                }
              }}
              disabled={loading}
            >
              <Text style={loading && styles.textButton}>sign Up</Text>
            </Pressable>
          </View>
          <View style={styles.buttonSubTitleBox}>
            <Text style={styles.buttonSubTitle}>
              Already have an account ? Sign in
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
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
    marginTop: 10,
  },
  logoText: {
    fontSize: 22,
    color: "#717171",
  },
  input: {
    margin: 30,
    paddingBottom: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  textArea: {
    margin: 30,
    padding: 10,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 120,
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
    marginTop: 35,
  },
  buttonSubTitle: {
    marginTop: 20,
    fontSize: 15,
    color: "#717171",
    marginBottom: 70,
  },
  buttonSubTitleBox: {
    alignItems: "center",
  },
  loading: {
    top: 15,
    margin: "auto",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: 0 }],
    zIndex: 10,
  },
  textButton: {
    color: "#C4C4C6",
  },
  errorUser: {
    color: "red",
  },
  errorUserBox: {
    alignItems: "center",
  },
});
