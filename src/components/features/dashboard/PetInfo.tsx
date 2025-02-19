"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { PawPrint } from "../../icons"

interface PetInfoProps {
  name: string
  patientCount: number
  onPatientListPress: () => void
}

export const PetInfo = ({ name, patientCount, onPatientListPress }: PetInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <PawPrint size={24} color="#483D8B" />
        <Text style={styles.label}>Mascota Actual</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <TouchableOpacity style={styles.infoCard} onPress={onPatientListPress}>
        <Text style={styles.number}>{patientCount}</Text>
        <Text style={styles.label}>Lista Pacientes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#483D8B",
    marginTop: 2,
  },
  number: {
    fontSize: 24,
    fontWeight: "600",
    color: "#483D8B",
  },
})

