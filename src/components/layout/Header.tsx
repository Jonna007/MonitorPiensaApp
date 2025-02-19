"use client"
import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"
import { ChevronDown, LogOut } from "lucide-react-native"

interface HeaderProps {
  userRole?: string
  onLogout: () => void
}

export const Header = ({ userRole = "Administrador", onLogout }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={styles.header}>
      <Image source={require("../../../assets/logo-small.png")} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.userInfo} onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.userId}>Usuario ID</Text>
        <ChevronDown size={20} color="#fff" />
        <Text style={styles.role}>{userRole}</Text>
      </TouchableOpacity>

      <Modal visible={showMenu} transparent={true} animationType="fade" onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false)
                onLogout()
              }}
            >
              <LogOut size={20} color="#483D8B" />
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#483D8B",
    padding: 15,
    paddingTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  userId: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  role: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginTop: 60,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    marginLeft: 10,
    color: "#483D8B",
    fontSize: 16,
  },
})

