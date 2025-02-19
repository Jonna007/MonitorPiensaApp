"use client"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

interface PulseGraphProps {
  width?: number
  height?: number
}

export const PulseGraph = ({ width = 300, height = 150 }: PulseGraphProps) => {
  // Simulación de un pulso cardíaco
  const generatePulsePath = () => {
    const baseline = height / 2
    const amplitude = height / 4
    const frequency = width / 4

    let path = `M 0 ${baseline}`

    // Genera un patrón de ECG simplificado
    for (let x = 0; x < width; x += frequency) {
      path += ` L ${x} ${baseline}` // Línea base
      path += ` L ${x + 10} ${baseline - amplitude}` // Pico P
      path += ` L ${x + 20} ${baseline}` // Vuelta a línea base
      path += ` L ${x + 25} ${baseline + amplitude * 1.5}` // Pico QRS
      path += ` L ${x + 30} ${baseline - amplitude / 2}` // Onda T
      path += ` L ${x + 40} ${baseline}` // Vuelta a línea base
    }

    return path
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Path d={generatePulsePath()} stroke="#2196F3" strokeWidth="2" fill="none" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a237e",
    borderRadius: 8,
    padding: 10,
  },
})

