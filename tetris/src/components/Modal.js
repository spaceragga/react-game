import React, { Component }  from 'react';

import Slider from './Slider';

import { StyledSettingButton, StyledSettingHeader } from './styles/StyledSettings';
import {StyledModal, StyledModalMain, StyledModalBtn} from './styles/StyledModal'

// const Modal = ({ handleClose, show, audio, children }) => {
// console.log(children)
//   return (
//     <StyledModal show={show}>
//       <StyledModalMain>
//         {/* {audio ? children : ''} */}
//      {children}
//         <StyledModalBtn type="button" onClick={(e) => {console.log(e)}}>
//           Audio
//         </StyledModalBtn>
//         <StyledModalBtn type="button" onClick={handleClose}>
//           Close
//         </StyledModalBtn>
//       </StyledModalMain>
//     </StyledModal>
//   );
// };

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      main: true,
      audio: false,
      game: false,
      control: false
    };
  }
  
  mainSettings = () => {

    return (
      <div>
        <StyledModalBtn type="button" onClick={() => {this.setState({ audio: true, main: false});}}>
          Audio
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={(e) => {this.setState({ game: true, main: false});}}>
          Game
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={(e) => {this.setState({ control: true, main: false});}}>
          Control
        </StyledModalBtn>
      </div>
    );
  };

  showAudio = () => {

    const { changeVolumeMusic, changeVolumeSound, volumeMusic, volumeSound } = this.props.audio;

    return (
      <div>
          <Slider title='Music sound' handleVolume={changeVolumeMusic} volume={volumeMusic} />
          <Slider title='Sound effect' handleVolume={changeVolumeSound} volume={volumeSound} />
          <StyledModalBtn type="button" onClick={() => {this.setState({ audio: false, main: true})}}>
            Back
          </StyledModalBtn>
      </div>
    );
  };

  showGame = () => {

    return (
      <div>
        <StyledModalBtn type="button" onClick={(e) => {console.log(e)}}>
          Game
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={(e) => {console.log(e)}}>
          Game
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={(e) => {console.log(e)}}>
          Game
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={() => {this.setState({ game: false, main: true})}}>
          Back
        </StyledModalBtn>
      </div>

    );
  }

  showControl = () => {

    return(
      <div>
        <StyledSettingHeader>Rotate: Up Arrow (↑) or "W"</StyledSettingHeader>
        <StyledSettingHeader>Right: Right Arrow (→) or "D"</StyledSettingHeader>
        <StyledSettingHeader>Left: Left Arrow (←) or "A"</StyledSettingHeader>
        <StyledSettingHeader>Drop: Down Arrow (↓) or "S"</StyledSettingHeader>
        <StyledModalBtn type="button" onClick={() => {this.setState({ control: false, main: true})}}>
          Back
        </StyledModalBtn>
      </div>
    );
  }

  render() {
    const { handleClose, show, children } = this.props;

    console.log(this.props)

    return (
      <StyledModal show={show}>
        <StyledModalMain>
          <StyledSettingHeader>Settings</StyledSettingHeader>

          {/* {audio ? children : ''} */}
       {children}
          {this.state.main ? this.mainSettings() : console.log('!')}
          {this.state.audio ? this.showAudio() : console.log('!')}
          {this.state.game ? this.showGame() : console.log('!')}
          {this.state.control ? this.showControl() : console.log('!')}
          <StyledModalBtn type="button" onClick={handleClose}>
            Close
          </StyledModalBtn>
        </StyledModalMain>
      </StyledModal>
    );
  }
}

export default Modal;