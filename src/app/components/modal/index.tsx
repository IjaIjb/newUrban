import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

interface ModalProps {
  isOpen: boolean;
  hideClose?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children, hideClose }: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <div className="">
      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center rounded-xl  justify-center overflow-auto bg-gray-500 bg-opacity-75">
          <div className="relative w-full  max-w-[453px] min-h-1/3 mx-auto my-8 bg-white rounded-lg shadow-lg">
            {!hideClose && (
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <GrFormClose size={24} />
                </button>
              </div>
            )}
            <div className="my-12  mx-6 h-full">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
