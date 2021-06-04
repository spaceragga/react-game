import React, { Component }  from 'react';
import { StyledSettingButton, StyledSettingHeader } from './styles/StyledSettings';

import Modal from './Modal.js';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      audio: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });

    this.props.stopGame(null);
  };

  hideModal = () => {
    this.setState({ show: false });

    this.props.stopGame(this.props.speedGame);
    this.props.startGame();

    document.getElementById("mainWrapp").focus();
  };

  render() {
    return (
      <div>
        <Modal 
        show={this.state.show} 
        other={this.props} 
        handleClose={this.hideModal}
        >
        </Modal>
        <StyledSettingButton type="button" onClick={this.showModal}>
        Settings
        </StyledSettingButton>
      </div>
    );
  }
}

export default Settings;