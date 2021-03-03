import React, { Component }  from 'react';

import Slider from './Slider';

import { StyledSettingButton, StyledSettingHeader } from './styles/StyledSettings';
import {StyledModal, StyledModalMain, StyledModalBtn, StyledModalBtnSmall} from './styles/StyledModal'

import { changeSize } from '../gameHelpers';
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
      control: false,
      statistics: false
    };
  }
  
  mainSettings = () => {

    return (
      <div>
        <StyledModalBtn type="button" onClick={() => {this.setState({ audio: true, main: false});}}>
          Audio
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={() => {this.setState({ game: true, main: false});}}>
          Game
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={() => {this.setState({ control: true, main: false});}}>
          Control
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={() => {this.setState({ statistics: true, main: false});}}>
          Statistics
        </StyledModalBtn>
      </div>
    );
  };

  showAudio = () => {

    const { changeVolumeMusic, changeVolumeSound, volumeMusic, volumeSound } = this.props.other;

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

    const { setImage, newGame, stopGame, setSpeedGame } = this.props.other;


    return (
      <div>
        <StyledSettingHeader>Stage Size</StyledSettingHeader>
        <StyledModalBtnSmall type="button" onClick={() => {
          changeSize(12, 20); 
          newGame(); 
          stopGame(null)}}>
          12x20
        </StyledModalBtnSmall>
        <StyledModalBtnSmall type="button" onClick={() => {
          changeSize(18, 30); 
          newGame(); 
          stopGame(null)}}>
          18x30
        </StyledModalBtnSmall>
        <StyledModalBtnSmall type="button" onClick={() => {
          changeSize(10, 16); 
          newGame(); 
          stopGame(null)}}>
          10x16
        </StyledModalBtnSmall>
        <StyledSettingHeader>Change Bg</StyledSettingHeader>
        <StyledModalBtnSmall style={{ fontSize: "2rem", padding: "0px" }} type="button" onClick={setImage}>
          ↻
        </StyledModalBtnSmall>
        <StyledSettingHeader>Change Speed</StyledSettingHeader>
        <StyledModalBtnSmall type="button" onClick={() => {
          setSpeedGame(1000);
        }}>
          x1
        </StyledModalBtnSmall>
        <StyledModalBtnSmall type="button" onClick={() => {
          setSpeedGame(700);
        }}>
          x0.7
        </StyledModalBtnSmall>
        <StyledModalBtnSmall type="button" onClick={() => {
          setSpeedGame(400);
        }}>
          x0.4
        </StyledModalBtnSmall>
        <StyledModalBtn type="button" onClick={() => {this.setState({ game: false, main: true})}}>
          Back
        </StyledModalBtn>
      </div>

    );
  }

  showControl = () => {

    return (
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

  showStatistics = () => {

    return (
      <div>
        <StyledSettingHeader>Statistics</StyledSettingHeader>
        <StyledSettingHeader>1. </StyledSettingHeader>
        <StyledSettingHeader>2. </StyledSettingHeader>
        <StyledSettingHeader>3. </StyledSettingHeader>
        <StyledSettingHeader>4. </StyledSettingHeader>
        <StyledSettingHeader>5. </StyledSettingHeader>
        <StyledSettingHeader>6. </StyledSettingHeader>
        <StyledSettingHeader>7. </StyledSettingHeader>
        <StyledSettingHeader>8. </StyledSettingHeader>
        <StyledSettingHeader>9. </StyledSettingHeader>
        <StyledSettingHeader>10. </StyledSettingHeader>
        <StyledModalBtn type="button" onClick={() => {this.setState({ statistics: false, main: true})}}>
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
          <StyledSettingHeader>~ Settings ~</StyledSettingHeader>

          {/* {audio ? children : ''} */}
       {children}
          {this.state.main ? this.mainSettings() : null}
          {this.state.audio ? this.showAudio() : null}
          {this.state.game ? this.showGame() : null}
          {this.state.control ? this.showControl() : null}
          {this.state.statistics ? this.showStatistics() : null}
          <StyledModalBtn type="button" onClick={handleClose}>
            Close
          </StyledModalBtn>
        </StyledModalMain>
      </StyledModal>
    );
  }
}

export default Modal;