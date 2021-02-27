import {StyledModal, StyledModalMain, StyledModalBtn} from './styles/StyledModal'


const Modal = ({ handleClose, show, children }) => {

  return (
    <StyledModal show={show}>
      <StyledModalMain>
        {children}
     
        <StyledModalBtn type="button" onClick={(e) => {console.log(e)}}>
          Audio
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={handleClose}>
          Close
        </StyledModalBtn>
      </StyledModalMain>
    </StyledModal>
  );
};

export default Modal;