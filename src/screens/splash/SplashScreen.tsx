import { View, StyleSheet, Image } from "react-native"

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#483D8B",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
})

