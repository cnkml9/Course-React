import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notificationService = {
  success(message) {
    toast.success(message);
  },
  error(message) {
    toast.error(message);
  },
  info(message) {
    toast.info(message);
  },
  showSuccessMessage: 'Başarılı bir işlem gerçekleşti.',
  showErrorMessage: 'Bir hata oluştu!',
  showInfoMessage: 'Bu bir bilgi mesajıdır.',
  confirmAction(message, action) {
    if (window.confirm(message)) {
      action();
    }
  },
  confirmAndNotify(message, onConfirm, onCancel) {
    if (window.confirm(message)) {
      onConfirm();
      this.success('İşlem onaylandı!');
    } else {
      onCancel && onCancel();
      this.error('İşlem reddedildi.');
    }
  },
};

export default notificationService;