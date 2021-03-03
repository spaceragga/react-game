import React, { useState } from 'react';

import useSound from 'use-sound';

import sound from '../sound/19.mp3';
import revert from '../sound/revert.mp3';
import moveBr from '../sound/leftRight.mp3';

import image from '../img/bg.png';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import Settings from './Settings';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [volumeMusic, setVolumeMusic] = useState(0.25);
  const [volumeSound, setVolumeSound] = useState(0.25);
  const [bgImage, setImage] = useState(image);

  const [play] = useSound(sound, { volume: volumeMusic, loop: true });
  const [moveBrick] = useSound(moveBr, { volume: volumeSound });
  const [revertBrick] = useSound(revert, { volume: volumeSound });

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log('re-render');

  
  const changeBg = () => {
    const image = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));
    
    function importAll(r) {

      return r.keys().map(r);
    }

    setImage(image[Math.floor(Math.random() * Math.floor(6))].default)
    console.log(image[Math.floor(Math.random() * Math.floor(6))].default)
  }

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    play();
  };

  const changeVolumeMusic = (value) => {
    setVolumeMusic(value);
  }

  const changeVolumeSound = (value) => {
    setVolumeSound(value);
  }

  const drop = () => {
    // increase level when cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // game over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {

    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37 || keyCode === 65) {
        movePlayer(-1);
        moveBrick();
      } else if (keyCode === 39 || keyCode === 68) {
        movePlayer(1);
        moveBrick();
      } else if (keyCode === 40 || keyCode === 83) {
        dropPlayer();
      } else if (keyCode === 38 || keyCode === 87) {
        playerRotate(stage, 1);
        revertBrick();
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
      style={{ background: `url(${bgImage})` }}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
          <Settings
           changeVolumeMusic={changeVolumeMusic}
           changeVolumeSound={changeVolumeSound}
           volumeMusic={volumeMusic}
           volumeSound={volumeSound}
           setImage={changeBg} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;