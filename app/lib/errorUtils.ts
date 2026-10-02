import axios from "axios"

export interface ParsedError {
  title: string
  message: string
  actionHint?: string
  status?: number
}

/**
 * Extrae y formatea mensajes de error claros y pedagógicos tanto desde
 * respuestas HTTP de FastAPI (detail) como de errores de red o validación.
 */
export function parseApiError(err: unknown): ParsedError {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    const data = err.response?.data

    // 1. Extraer mensaje descriptivo enviado por el backend (FastAPI 'detail')
    let detailMessage: string | null = null
    if (data) {
      if (typeof data.detail === "string") {
        detailMessage = data.detail
      } else if (Array.isArray(data.detail)) {
        // Errores de validación de FastAPI (422)
        detailMessage = (data.detail as Array<{ msg?: string; message?: string }>)
          .map((e) => e.msg || e.message || "Dato inválido")
          .join(". ")
      } else if (typeof data.message === "string") {
        detailMessage = data.message
      }
    }

    // 2. Mapeo pedagógico según el código de estado HTTP
    switch (status) {
      case 400:
        return {
          title: "Archivo no válido para análisis",
          message: detailMessage || "La imagen seleccionada no cumple con los requisitos del sistema.",
          actionHint: "Asegúrate de subir una fotografía en formato JPG, PNG, WEBP, GIF, BMP o TIFF con un peso menor a 30MB.",
          status: 400,
        }

      case 401:
        return {
          title: "Sesión expirada o no autenticada",
          message: "Tu sesión ha vencido o necesitas iniciar sesión para realizar diagnósticos.",
          actionHint: "Por favor vuelve a iniciar sesión con tu cuenta.",
          status: 401,
        }

      case 403:
        return {
          title: "Acceso no autorizado",
          message: "No tienes los permisos requeridos para ejecutar esta acción.",
          status: 403,
        }

      case 413:
        return {
          title: "Imagen demasiado pesada",
          message: detailMessage || "El archivo supera el límite máximo de 30MB.",
          actionHint: "Por favor comprime la imagen o reduce su resolución antes de enviarla.",
          status: 413,
        }

      case 422:
        return {
          title: "Formato no procesable",
          message: detailMessage || "El servidor no pudo interpretar los datos del archivo enviado.",
          actionHint: "Intenta seleccionar nuevamente la imagen en formato JPG, PNG, WEBP, GIF, BMP o TIFF.",
          status: 422,
        }

      case 429:
        return {
          title: "Límite de consultas alcanzado",
          message: detailMessage || "Se han realizado demasiadas solicitudes en poco tiempo.",
          actionHint: "Espera unos momentos e inténtalo de nuevo.",
          status: 429,
        }

      case 500:
      case 502:
      case 503:
        return {
          title: "Error en el servidor de IA",
          message: detailMessage || "El servidor no pudo procesar la imagen en este momento.",
          actionHint: "Intenta de nuevo en unos momentos o verifica que el servicio backend esté activo.",
          status,
        }

      default:
        // Errores de red o conexión caída
        if (err.code === "ECONNABORTED" || err.message?.toLowerCase().includes("timeout")) {
          return {
            title: "Tiempo de espera agotado",
            message: "El servidor tardó demasiado en responder.",
            actionHint: "Comprueba tu conexión de red e intenta nuevamente.",
          }
        }
        if (!err.response || err.message === "Network Error") {
          return {
            title: "No se pudo conectar con el servidor",
            message: "El backend no responde en http://localhost:8000.",
            actionHint: "Verifica que el servidor de FastAPI esté iniciado con: uvicorn app.main:app --reload",
          }
        }
        return {
          title: "Error al procesar la solicitud",
          message: detailMessage || err.message || "Ocurrió un error inesperado al comunicarse con el backend.",
          status,
        }
    }
  }

  if (err instanceof Error) {
    return {
      title: "Error en la aplicación",
      message: err.message,
    }
  }

  return {
    title: "Error inesperado",
    message: "No fue posible procesar la imagen. Intenta nuevamente.",
  }
}
