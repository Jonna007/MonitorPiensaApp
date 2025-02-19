"use client"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Search, Dog, Calendar, Plus } from "lucide-react-native"
import { PawPrint } from "../icons"

interface BottomMenuProps {
  currentScreen: "list" | "dashboard" | "addPet"
  onScreenChange: (screen: "list" | "dashboard") => void
}

export const BottomMenu = ({ currentScreen, onScreenChange }: BottomMenuProps) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem}>
        <Search size={24} color="#666" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Calendar size={24} color="#666" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onScreenChange("list")}>
        <Dog size={24} color={currentScreen === "list" ? "#483D8B" : "#666"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onScreenChange("dashboard")}>
        <PawPrint size={24} color={currentScreen === "dashboard" ? "#483D8B" : "#666"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Plus size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  menuItem: {
    padding: 10,
  },
})

