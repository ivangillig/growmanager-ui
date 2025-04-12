import { showMessage } from '../src/features/notifications/notificationActions'
import { logout } from '../src/features/auth/authActions'

export const handleApiErrors = (error, store) => {
  if (error.response) {
    const { status, data } = error.response
    let message = 'Error communicating with server'

    if (data && data.message) {
      message = data.message
    } else if (data && data.errors && data.errors.length > 0) {
      message = data.errors[0].msg
    }

    switch (status) {
      case 401:
        // Manejo de error 401 - No autorizado
        switch (data?.message) {
          case 'ERROR_ORGANIZATION_REQUIRED':
            window.location.href = '/register-organization'
            break
          case 'ERROR_SESSION_EXPIRED':
            store.dispatch(
              showMessage({
                type: 'error',
                summary: 'Session Expired',
                detail: 'Your session has expired. Please log in again.',
              })
            )
            store.dispatch(logout())
            break
          default:
            if (!error.response.config.url.includes('/auth/logout')) {
              store.dispatch(
                showMessage({
                  type: 'error',
                  summary: 'Error',
                  detail: message,
                })
              )
              store.dispatch(logout())
            }
            break
        }
        break
      case 403:
        // 403 - Forbbiden handler
        store.dispatch(
          showMessage({
            type: 'error',
            summary: 'Error',
            detail: 'You are not authorized to access the resource',
          })
        )
        break
      case 404:
        // 404 - Not found
        store.dispatch(
          showMessage({
            type: 'error',
            summary: 'Error 404',
            detail: 'The required resource was not found',
          })
        )
        break
      case 409:
        // 409 - Conflict
        store.dispatch(
          showMessage({
            type: 'error',
            summary: 'Error',
            detail: message,
          })
        )
        break
      case 422:
        // 422 - Validation error
        store.dispatch(
          showMessage({
            type: 'error',
            summary: 'Error',
            detail: message,
          })
        )
        break
      default:
        // Other errors handling
        store.dispatch(
          showMessage({
            type: 'error',
            summary: 'Error',
            detail: 'Error communicating with server',
          })
        )
        break
    }
  } else if (error.request) {
    // No response error handler (network error)
    store.dispatch(
      showMessage({
        type: 'error',
        summary: 'Error',
        detail: 'Network error. Please check your connection.',
      })
    )
  } else {
    // Unexpected error handler
    store.dispatch(
      showMessage({
        type: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred',
      })
    )
  }
}
