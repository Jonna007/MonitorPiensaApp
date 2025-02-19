import React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps {
  size?: number
  color?: string
}

export const PawPrint: React.FC<IconProps> = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.45 5.05L12 4L10.55 5.05C7.86 7.02 6 10.07 6 13.29V14.71C6 17.93 7.86 20.98 10.55 22.95L12 24L13.45 22.95C16.14 20.98 18 17.93 18 14.71V13.29C18 10.07 16.14 7.02 13.45 5.05Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

