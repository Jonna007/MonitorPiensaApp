"use client"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Heart, Smartphone } from "lucide-react-native"
import { PawPrint } from "../../icons"
import { DeviceManager } from "../device/DeviceManager"

interface Pet {
  id: number
  name: string
  breed: string
  ownerName: string
  isFavorite: boolean
  deviceId?: string
}

interface PetListProps {
  pets: Pet[]
  onAddPet: () => void
  onPetSelect: (pet: Pet) => void
  onToggleFavorite: (petId: number) => void
  onAssignDevice: (petId: number, deviceId: string) => void
}

export const PetList = ({ pets, onAddPet, onPetSelect, onToggleFavorite, onAssignDevice }: PetListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={onAddPet}>
          <Text style={styles.addButtonText}>Agregar +</Text>
          <Text style={styles.addButtonSubtext}>Nueva Mascota</Text>
        </TouchableOpacity>
        <View style={styles.patientsCount}>
          <Text style={styles.countNumber}>{pets.length}</Text>
          <Text style={styles.countText}>Mis Pacientes</Text>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>LISTA DE MASCOTAS</Text>
        <View style={styles.titleUnderline} />
      </View>

      <ScrollView style={styles.list}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.petItem}>
            <TouchableOpacity style={styles.petInfo} onPress={() => onPetSelect(pet)}>
              <PawPrint size={24} color="#483D8B" />
              <View style={styles.petDetails}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{`${pet.ownerName} • ${pet.breed}`}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.petActions}>
              <TouchableOpacity onPress={() => onToggleFavorite(pet.id)}>
                <Heart
                  size={24}
                  color={pet.isFavorite ? "#ff4081" : "#666"}
                  fill={pet.isFavorite ? "#ff4081" : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPetSelect(pet)}>
                <Smartphone size={24} color={pet.deviceId ? "#483D8B" : "#666"} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <DeviceManager
        onSelectDevice={(deviceId) => {
          if (pets.length > 0) {
            onAssignDevice(pets[0].id, deviceId)
          }
        }}
        selectedDeviceId={pets.length > 0 ? pets[0].deviceId : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#483D8B",
  },
  addButtonSubtext: {
    fontSize: 12,
    color: "#666",
  },
  patientsCount: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  countNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#483D8B",
  },
  countText: {
    fontSize: 12,
    color: "#666",
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
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
  list: {
    flex: 1,
  },
  petItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  petDetails: {
    marginLeft: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  petBreed: {
    fontSize: 14,
    color: "#666",
  },
  petActions: {
    flexDirection: "row",
    alignItems: "center",
  },
})

