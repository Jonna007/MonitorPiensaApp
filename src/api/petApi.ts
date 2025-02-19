import { API_BASE_URL } from "../config/api"
import AsyncStorage from '@react-native-async-storage/async-storage'

interface VitalSigns {
  temperature: number
  heartRate: number
  timestamp: string
}

interface ApiResponse<T> {
  ok: boolean
  status: number
  json: () => Promise<T>
}

const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))

const fetchWithTimeout = <T>(url: string, options: RequestInit, ms = 10000): Promise<ApiResponse<T>> =>
  Promise.race([
    fetch(url, options).then((response): ApiResponse<T> => ({
      ok: response.ok,
      status: response.status,
      json: () => response.json(),
    })),
    timeout(ms),
  ]) as Promise<ApiResponse<T>>;

export const fetchPetVitalSigns = async (petId: number): Promise<VitalSigns> => {
  try {
    console.log(`Obteniendo signos vitales para mascota con ID: ${petId}`)
    const token = await AsyncStorage.getItem("userToken")
    if (!token) {
      throw new Error("No se encontró el token de autenticación")
    }

    const response = await fetchWithTimeout<VitalSigns>(`${API_BASE_URL}/api/device/vitals/${petId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    console.log(`Respuesta del servidor para signos vitales: ${response.status}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No se encontraron datos vitales para esta mascota")
      } else if (response.status === 401) {
        throw new Error("Sesión expirada. Por favor, inicie sesión nuevamente")
      } else {
        throw new Error(`Error al obtener los datos vitales: ${response.status}`)
      }
    }

    const data: VitalSigns = await response.json()
    console.log("Signos vitales obtenidos correctamente")
    return data
  } catch (error) {
    console.error("Error detallado en fetchPetVitalSigns:", error)
    if (error instanceof Error) {
      if (error.message === "Timeout") {
        throw new Error("Tiempo de espera agotado al conectar con el servidor")
      }
      throw error
    }
    throw new Error("Error desconocido al obtener datos vitales")
  }
}

export const login = async (email: string, password: string): Promise<string> => {
  try {
    console.log(`Intentando iniciar sesión con email: ${email}`)
    const response = await fetchWithTimeout<{ token?: string; message?: string }>(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    console.log(`Respuesta del servidor: ${response.status}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error al iniciar sesión: ${response.status}`)
    }

    const data = await response.json()
    console.log("Inicio de sesión exitoso")
    if (!data.token) {
      throw new Error("Token no encontrado en la respuesta del servidor")
    }
    return data.token
  } catch (error) {
    console.error("Error detallado en login:", error)
    if (error instanceof Error) {
      if (error.message === "Timeout") {
        throw new Error("Tiempo de espera agotado al conectar con el servidor")
      }
      throw error
    }
    throw new Error("Error desconocido al iniciar sesión")
  }
}

export const register = async (username: string, email: string, password: string): Promise<void> => {
  try {
    console.log(`Intentando registrar usuario: ${username}, email: ${email}`)
    const response = await fetchWithTimeout<void>(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
    console.log(`Respuesta del servidor para registro: ${response.status}`)

    if (!response.ok) {
      throw new Error(`Error al registrar el usuario: ${response.status}`)
    }
    console.log("Registro exitoso")
  } catch (error) {
    console.error("Error detallado en register:", error)
    if (error instanceof Error) {
      if (error.message === "Timeout") {
        throw new Error("Tiempo de espera agotado al conectar con el servidor")
      }
      throw error
    }
    throw new Error("Error desconocido al registrar el usuario")
  }
}

