"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { X } from "lucide-react-native"
import { CustomInput } from "../../ui/CustomInput"
import { DeviceManager } from "../device/DeviceManager"

interface Pet {
  name: string
  species: string
  breed: string
  ownerName: string
  deviceId?: string
}

interface AddPetFormProps {
  onClose: () => void
  onSubmit: (petData: Pet) => void
}

export const AddPetForm = ({ onClose, onSubmit }: AddPetFormProps) => {
  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [breed, setBreed] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined)

  const handleSubmit = () => {
    onSubmit({ name, species, breed, ownerName, deviceId })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#483D8B" />
        </TouchableOpacity>

        <Image source={require("../../../../assets/logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>REGISTRO DE MASCOTA</Text>
          <View style={styles.titleUnderline} />
        </View>

        <View style={styles.form}>
          <CustomInput placeholder="Nombre de Mascota" value={name} onChangeText={setName} />
          <CustomInput placeholder="Especie" value={species} onChangeText={setSpecies} />
          <CustomInput placeholder="Raza" value={breed} onChangeText={setBreed} />
          <CustomInput placeholder="Nombre de Dueño" value={ownerName} onChangeText={setOwnerName} />

          <DeviceManager onSelectDevice={setDeviceId} selectedDeviceId={deviceId} />

          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>REGISTRAR MASCOTA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#483D8B",
    marginBottom: 8,
  },
  titleUnderline: {
    width: 180,
    height: 2,
    backgroundColor: "#483D8B",
  },
  form: {
    paddingHorizontal: 20,
    gap: 15,
  },
  registerButton: {
    backgroundColor: "#483D8B",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

