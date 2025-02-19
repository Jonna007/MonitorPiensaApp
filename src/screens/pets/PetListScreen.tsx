"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Header } from "../../components/layout/Header"
import { BottomMenu } from "../../components/layout/BottomMenu"
import { PetList } from "../../components/features/pets/PetList"
import { AddPetForm } from "../../components/features/pets/AddPetForm"

interface Pet {
  id: number
  name: string
  breed: string
  ownerName: string
  isFavorite: boolean
  deviceId?: string
}

interface PetListScreenProps {
  onPetSelect: (pet: Pet) => void
  onLogout: () => void
}

export default function PetListScreen({ onPetSelect, onLogout }: PetListScreenProps) {
  const [showAddPet, setShowAddPet] = useState(false)
  const [pets, setPets] = useState<Pet[]>([
    {
      id: 1,
      name: "Holly",
      breed: "Golden Retriever",
      ownerName: "Johnathon Cabrine",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Tommy",
      breed: "Peguinés",
      ownerName: "Diego Peguero",
      isFavorite: true,
    },
    {
      id: 3,
      name: "Luna",
      breed: "Siamese Cat",
      ownerName: "Sarah Johnson",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Max",
      breed: "German Shepherd",
      ownerName: "Michael Brown",
      isFavorite: true,
    },
    {
      id: 5,
      name: "Bella",
      breed: "Labrador Retriever",
      ownerName: "Emily Davis",
      isFavorite: false,
    },
  ])

  const handleAddPet = (petData: Omit<Pet, "id" | "isFavorite">) => {
    const newPet: Pet = {
      id: pets.length + 1,
      ...petData,
      isFavorite: false,
    }
    setPets([...pets, newPet])
    setShowAddPet(false)
  }

  const handleToggleFavorite = (petId: number) => {
    setPets(pets.map((pet) => (pet.id === petId ? { ...pet, isFavorite: !pet.isFavorite } : pet)))
  }

  const handleAssignDevice = (petId: number, deviceId: string) => {
    setPets(pets.map((pet) => (pet.id === petId ? { ...pet, deviceId } : pet)))
  }

  const handleScreenChange = (screen: "list" | "dashboard" | "addPet") => {
    if (screen === "dashboard" && pets.length > 0) {
      onPetSelect(pets[0]) // Selecciona la primera mascota por defecto
    }
  }

  return (
    <View style={styles.container}>
      <Header onLogout={onLogout} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {showAddPet ? (
          <AddPetForm onClose={() => setShowAddPet(false)} onSubmit={handleAddPet} />
        ) : (
          <PetList
            pets={pets}
            onAddPet={() => setShowAddPet(true)}
            onPetSelect={(pet) => onPetSelect(pet)}
            onToggleFavorite={handleToggleFavorite}
            onAssignDevice={handleAssignDevice}
          />
        )}
      </ScrollView>
      <BottomMenu currentScreen={showAddPet ? "addPet" : "list"} onScreenChange={handleScreenChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
})

