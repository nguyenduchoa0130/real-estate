import Swal from 'sweetalert2';

const AlertUtil = {
  showSuccess: (text?: string) => {
    return Swal.fire({
      title: 'Successfully',
      icon: 'success',
      text,
    });
  },
  showError: (text?: string) => {
    return Swal.fire({
      title: 'Error',
      icon: 'error',
      text,
    });
  },
};
export default AlertUtil;
