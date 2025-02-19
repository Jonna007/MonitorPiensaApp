"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail, Lock, User, X } from "lucide-react-native"
import { CustomInput } from "../../components/ui/CustomInput"
import { register } from "../../api/petApi"

interface RegisterScreenProps {
  onClose: () => void
  onRegisterSuccess: () => void
}

export default function RegisterScreen({ onClose, onRegisterSuccess }: RegisterScreenProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await register(username, email, password)
      onRegisterSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al registrar el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color="#483D8B" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>REGISTRO DE USUARIO</Text>
          <View style={styles.titleUnderline} />
        </View>

        <View style={styles.form}>
          <CustomInput
            placeholder="Nombre de Usuario"
            value={username}
            onChangeText={setUsername}
            icon={<User size={20} color="#666" />}
          />

          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={20} color="#666" />}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            icon={<Lock size={20} color="#666" />}
            secureTextEntry
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>REGISTRAR</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#483D8B",
    marginBottom: 8,
  },
  titleUnderline: {
    width: "100%",
    height: 2,
    backgroundColor: "#483D8B",
    marginTop: 4,
  },
  form: {
    width: "100%",
    gap: 20,
  },
  registerButton: {
    backgroundColor: "#483D8B",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
})

