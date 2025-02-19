"use client"
import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { PlusCircle } from "lucide-react-native"

interface Device {
  id: string
  name: string
  isAssigned: boolean
}

interface DeviceManagerProps {
  onSelectDevice: (deviceId: string) => void
  selectedDeviceId?: string
}

export const DeviceManager: React.FC<DeviceManagerProps> = ({ onSelectDevice, selectedDeviceId }) => {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Dispositivo 1", isAssigned: false },
    { id: "2", name: "Dispositivo 2", isAssigned: false },
    { id: "3", name: "Dispositivo 3", isAssigned: false },
  ])

  const handleDeviceSelect = (deviceId: string) => {
    onSelectDevice(deviceId)
    setDevices(
      devices.map((device) =>
        device.id === deviceId
          ? { ...device, isAssigned: true }
          : { ...device, isAssigned: device.id === selectedDeviceId ? false : device.isAssigned },
      ),
    )
  }

  const renderDevice = ({ item }: { item: Device }) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        item.id === selectedDeviceId && styles.selectedDevice,
        item.isAssigned && styles.assignedDevice,
      ]}
      onPress={() => handleDeviceSelect(item.id)}
      disabled={item.isAssigned && item.id !== selectedDeviceId}
    >
      <Text style={styles.deviceName}>{item.name}</Text>
      {item.isAssigned && <Text style={styles.assignedText}>Asignado</Text>}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Disponibles</Text>
      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButton}>
        <PlusCircle size={24} color="#483D8B" />
        <Text style={styles.addButtonText}>Añadir Dispositivo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#483D8B",
    marginBottom: 10,
  },
  deviceItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    minWidth: 120,
    alignItems: "center",
  },
  selectedDevice: {
    borderColor: "#483D8B",
    borderWidth: 2,
  },
  assignedDevice: {
    opacity: 0.5,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  assignedText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 5,
    color: "#483D8B",
    fontSize: 14,
    fontWeight: "500",
  },
})

