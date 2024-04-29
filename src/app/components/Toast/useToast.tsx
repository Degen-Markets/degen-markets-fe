import { useState } from "react";
import Toast from "@/app/components/Toast/Toast";

const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const ToastComponent = toast && (
    <Toast
      id={`toast-${Date.now()}`}
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
    />
  );

  return { showToast, hideToast, ToastComponent };
};

export default useToast;
