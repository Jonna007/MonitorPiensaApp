"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail, Lock } from "lucide-react-native"
import { CustomInput } from "../../components/ui/CustomInput"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login } from "../../api/petApi"

interface LoginScreenProps {
  onRegisterPress: () => void
  onLoginSuccess: () => void
}

export default function LoginScreen({ onRegisterPress, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const token = await login(email, password)
      await AsyncStorage.setItem("userToken", token)
      console.log("Token guardado:", token) // Para depuración
      onLoginSuccess()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Error desconocido al iniciar sesión")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>ACCESO DE USUARIO</Text>
          <View style={styles.titleUnderline} />
        </View>

        <View style={styles.form}>
          <CustomInput
            placeholder="Usuario"
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>INGRESAR</Text>}
          </TouchableOpacity>

          <View style={styles.links}>
            <TouchableOpacity onPress={onRegisterPress}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>

            <View style={styles.forgotContainer}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña? </Text>
              <TouchableOpacity>
                <Text style={styles.recoverLink}>Recuperar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  loginButton: {
    backgroundColor: "#483D8B",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  links: {
    alignItems: "center",
    marginTop: 30,
    gap: 15,
  },
  registerLink: {
    color: "#007AFF",
    fontSize: 16,
  },
  forgotContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotText: {
    color: "#666",
    fontSize: 14,
  },
  recoverLink: {
    color: "#007AFF",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
})

