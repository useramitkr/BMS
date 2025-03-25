export interface IsweetAlertProps {
  confirm: () => void;
  cancle: () => void;
  title: string;
  subtitle: string;
  type: "success" | "error" | "warning" | "info" | undefined;
  confirmBtnText: string;
  confirmBtnBsStyle: string;
  cancelBtnBsStyle: string;
  showCancel: string;
  user?: string;
  text?: string;
}
  
  export interface sweetAlertProps extends IsweetAlertProps {
    // user: IsweetAlertProps;
    user?: string;
  }
  