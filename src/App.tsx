"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import LoginScreen from "./screens/auth/LoginScreen"
import RegisterScreen from "./screens/auth/RegisterScreen"
import PetListScreen from "./screens/pets/PetListScreen"
import {DashboardScreen} from "./screens/dashboard/DashboardScreen"
import { SplashScreen } from "./screens/splash/SplashScreen"
import * as SplashScreenExpo from "expo-splash-screen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Pet {
  id: number
  name: string
  breed: string
  ownerName: string
  isFavorite: boolean
}

SplashScreenExpo.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<"list" | "dashboard">("list")
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("userToken")
        if (token) {
          setIsLoggedIn(true)
        }
        await new Promise((resolve) => setTimeout(resolve, 2000))
        await SplashScreenExpo.hideAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }

    prepare()
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken")
    setIsLoggedIn(false)
    setCurrentScreen("list")
    setSelectedPet(null)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setShowRegister(false)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
  }

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet)
    setCurrentScreen("dashboard")
  }

  if (!isReady) {
    return <SplashScreen />
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        {showRegister ? (
          <RegisterScreen onClose={() => setShowRegister(false)} onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <LoginScreen onRegisterPress={() => setShowRegister(true)} onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {currentScreen === "list" ? (
          <PetListScreen onPetSelect={handlePetSelect} onLogout={handleLogout} />
        ) : (
          <DashboardScreen
            onBackToList={() => setCurrentScreen("list")}
            onLogout={handleLogout}
            selectedPet={selectedPet}
          />
        )}
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

