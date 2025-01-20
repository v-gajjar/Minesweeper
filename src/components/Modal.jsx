function Modal({ modalId, message, buttonId, buttonText, onClick}){
    return (
        <dialog id={modalId}>
        <h1>{message}</h1>
        <button id={buttonId} onClick={onClick}>{buttonText}</button>
      </dialog>
    );
}

export default Modal;