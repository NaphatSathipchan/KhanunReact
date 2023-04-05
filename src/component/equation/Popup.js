import { useRef,useEffect } from 'react';
import { Modal } from 'bootstrap';


const Popup = () => {
  const modalRef = useRef(null);
  useEffect(() => {
    const modal = new Modal(modalRef.current);
    modal.show();
  }, []);
  
  return (
    <div>
      <div
        className="modal fade bd-example-modal-sm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        {console.log("รันนะ")}
        <div className="modal-dialog modal-sm">
          <div className="modal-content">น่าจะมีอะไรผิดพลาดนะ</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
