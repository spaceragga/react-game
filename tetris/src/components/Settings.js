import React, { Component }  from 'react';
import { StyledSettingButton, StyledSettingHeader } from './styles/StyledSettings';

import Modal from './Modal.js';

// const SettingButton = ({ callback }) => (
//   <StyledSettingButton onClick={callback}>Settings</StyledSettingButton>
// )

// export default SettingButton;

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
  };

  hideModal = (e) => {
    e.preventDefault();

    this.setState({ show: false });
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <Modal show={this.state.show} audio={this.props} handleClose={this.hideModal} >
        </Modal>
        <StyledSettingButton type="button" onClick={this.showModal}>
        Settings
        </StyledSettingButton>
      </div>
    );
  }
}

export default Settings;