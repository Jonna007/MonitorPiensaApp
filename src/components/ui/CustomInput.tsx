import type React from "react"
import { View, TextInput, StyleSheet, type TextInputProps } from "react-native"

interface CustomInputProps extends TextInputProps {
  icon?: React.ReactNode
}

export const CustomInput = ({ icon, ...props }: CustomInputProps) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput style={styles.input} placeholderTextColor="#666" {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
})

