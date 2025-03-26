import { sweetAlertProps } from "@/typeScript/sweetalert.interface";
import SweetAlert from "react-bootstrap-sweetalert";

function SweetAlertComponent({
  confirm,
  cancle,
  title,
  subtitle,
  type,
}: sweetAlertProps) {
  return (
    // <SweetAlert
    //   type={type}
    //   showCancel={true}
    //   confirmBtnText="Yes, delete it!"
    //   confirmBtnBsStyle="danger"
    //   title={title}
    //   onConfirm={confirm}
    //   onCancel={cancle}
    //   focusCancelBtn
    // >
    //   {subtitle}
    // </SweetAlert>

    <SweetAlert
      type={type}
      showCancel={true}
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      title={title}
      onConfirm={confirm}
      onCancel={cancle}
      focusCancelBtn
{/*     customButtons={<div>{subtitle}</div>} */}
    />
  );
}

export default SweetAlertComponent;
