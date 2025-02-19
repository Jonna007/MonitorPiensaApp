"use client"
import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native"
import { Header } from "../../components/layout/Header"
import { BottomMenu } from "../../components/layout/BottomMenu"
import { PetInfo } from "../../components/features/dashboard/PetInfo"
import { MonitoringSection } from "../../components/features/dashboard/MonitoringSection"
import { CircularGauge } from "../../components/features/dashboard/CircularGauge"
import { PulseGraph } from "../../components/features/dashboard/PulseGraph"
import { fetchPetVitalSigns } from "../../api/petApi"

interface Pet {
  id: number
  name: string
  breed: string
  ownerName: string
  isFavorite: boolean
}

interface DashboardScreenProps {
  onBackToList: () => void
  onLogout: () => void
  selectedPet: Pet | null
}

interface VitalSigns {
  temperature: number
  heartRate: number
  timestamp: string
}

export { DashboardScreen }

const DashboardScreen = ({ onBackToList, onLogout, selectedPet }: DashboardScreenProps) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVitalSigns = useCallback(async () => {
    if (!selectedPet) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchPetVitalSigns(selectedPet.id)
      setVitalSigns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al obtener datos vitales")
    } finally {
      setLoading(false)
    }
  }, [selectedPet])

  useEffect(() => {
    fetchVitalSigns()
    const interval = setInterval(fetchVitalSigns, 5000)
    return () => clearInterval(interval)
  }, [fetchVitalSigns])

  const handleScreenChange = (screen: "list" | "dashboard") => {
    if (screen === "list") {
      onBackToList()
    }
  }

  return (
    <View style={styles.container}>
      <Header onLogout={onLogout} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <PetInfo name={selectedPet?.name || "No seleccionada"} patientCount={30} onPatientListPress={onBackToList} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>MONITOREO DE MASCOTA</Text>
          <View style={styles.titleUnderline} />
        </View>

        {loading && <ActivityIndicator size="large" color="#483D8B" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {vitalSigns && (
          <>
            <MonitoringSection title="TEMPERATURA">
              <CircularGauge value={vitalSigns.temperature} maxValue={50} />
              <Text style={styles.measurementText}>{vitalSigns.temperature.toFixed(1)}°C</Text>
            </MonitoringSection>

            <MonitoringSection title="RITMO CARDÍACO">
              <PulseGraph />
              <Text style={styles.measurementText}>{vitalSigns.heartRate} BPM</Text>
            </MonitoringSection>

            <Text style={styles.timestampText}>
              Última actualización: {new Date(vitalSigns.timestamp).toLocaleString()}
            </Text>
          </>
        )}
      </ScrollView>
      <BottomMenu currentScreen="dashboard" onScreenChange={handleScreenChange} />
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
  titleContainer: {
    alignItems: "center",
    marginVertical: 15,
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  measurementText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#483D8B",
    marginTop: 10,
  },
  timestampText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
})

