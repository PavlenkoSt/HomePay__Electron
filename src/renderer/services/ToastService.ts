import { toast } from 'react-toastify'

const ToastService = {
  showError: (message: string) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      bodyStyle: {
        zIndex: 10000000,
      },
    }),
  showSuccess: (message: string) =>
    toast(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        top: 60,
      },
    }),
}

export default ToastService
