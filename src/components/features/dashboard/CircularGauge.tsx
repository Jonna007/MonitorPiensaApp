"use client"
import { View, StyleSheet } from "react-native"
import Svg, { Circle, Text as SvgText } from "react-native-svg"

interface CircularGaugeProps {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
}

export const CircularGauge = ({ value, maxValue = 100, size = 200, strokeWidth = 15 }: CircularGaugeProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (value / maxValue) * circumference
  const center = size / 2

  // Calcula el color basado en el valor
  const getColor = (value: number) => {
    if (value < 30) return "#2196F3" // Frío - azul
    if (value < 70) return "#4CAF50" // Normal - verde
    return "#FF5722" // Caliente - naranja/rojo
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Círculo de fondo */}
        <Circle cx={center} cy={center} r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />
        {/* Círculo de progreso */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {/* Valor central */}
        <SvgText x={center} y={center + 10} fontSize="40" fontWeight="bold" fill="#333" textAnchor="middle">
          {value}
        </SvgText>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
})

