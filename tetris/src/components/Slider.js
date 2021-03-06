import React, { useState } from "react"
import { StyledModalBtn } from "./styles/StyledModal";
import { StyledSliderText } from "./styles/StyledSlider";


function Slider({ title, handleVolume, volume }) {
  const [muted, setMuted] = useState(false);
  const finalVolume = muted ? 0 : volume ** 2;

  return (
    <main>
      <section>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            handleVolume(event.target.valueAsNumber)
          }}
        />
        <StyledModalBtn onClick={() => setMuted(m => {
          m ? handleVolume(0.25) : handleVolume(0);
          return !m;
          })}>
        {/* <StyledModalBtn onClick={() => setMuted(m => !m)}> */}
          {muted ? "muted" : "unmuted"}
        </StyledModalBtn>
      </section>
      <section>
        <StyledSliderText>{title} {finalVolume.toFixed(3)}</StyledSliderText>
      </section>
    </main>
  );
}

export default Slider;