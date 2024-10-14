import React, { useRef } from "react";

type ModalWrapperProps = {
  isIconBack?: boolean | null;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isIconBack,
  className,
  isOpen,
  onClose,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      ref={modalRef}
      className="s-modal"
      role="dialog"
      aria-hidden="false"
      onClick={handleBackgroundClick}
      {...rest}
    >
      <div
        className={`s-modal--dialog pe-auto ws-normal ${
          className ? className : "ws4"
        }`}
      >
        <button
          className="s-modal--close s-btn s-btn__muted"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <svg
            onClick={onClose}
            aria-hidden="true"
            className="svg-icon iconClearSm"
            width={
              isIconBack !== null && isIconBack !== undefined
                ? "18"
                : "14"
            }
            height={
              isIconBack !== null && isIconBack !== undefined
                ? "18"
                : "14"
            }
            viewBox={
              isIconBack !== null && isIconBack !== undefined
                ? "0 0 18 18"
                : "0 0 14 14"
            }
          >
            {isIconBack !== null && isIconBack !== undefined ? (
              <path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path>
            ) : (
              <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
            )}
          </svg>
        </button>
        {children}
        <div className="flex--item"></div>
      </div>
    </aside>
  );
};

export default ModalWrapper;
