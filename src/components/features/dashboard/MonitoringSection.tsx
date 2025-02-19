"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface MonitoringSectionProps {
  title: string
  children: React.ReactNode
}

export const MonitoringSection = ({ title, children }: MonitoringSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#483D8B",
    marginBottom: 10,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
})

