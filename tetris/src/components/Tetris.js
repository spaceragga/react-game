import React, { useState } from 'react';

import useSound from 'use-sound';
import { useBeforeunload } from 'react-beforeunload';

import sound from '../sound/19.mp3';
import revert from '../sound/revert.mp3';
import moveBr from '../sound/leftRight.mp3';
import down from '../sound/down.mp3';

import image from '../img/bg.jpg';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

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
  const [speedTime, setSpeedTime] = useState(1000);

  const [play, { stop, isPlaying }] = useSound(sound, { volume: volumeMusic, loop: true });
  const [moveBrick] = useSound(moveBr, { volume: volumeSound });
  const [revertBrick] = useSound(revert, { volume: volumeSound });
  const [revertDown] = useSound(down, { volume: volumeSound });

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  // console.log('re-render');
  useBeforeunload(() => {
    localStorage.setItem('savedAllStats', JSON.stringify([speedTime, score, rows, level, stage]));
  });

  window.onload = () => {
    const scoreLast = JSON.parse(localStorage.getItem('savedAllStats'));

    setStage(scoreLast[4]);
    setDropTime(scoreLast[0]);
    resetPlayer();
    setScore(scoreLast[1]);
    setLevel(scoreLast[3]);
    setRows(scoreLast[2]);
    setGameOver(false);
    if(!isPlaying) play();
  }

  const changeBg = () => {
    const image = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));
    
    function importAll(r) {

      return r.keys().map(r);
    }

    setImage(image[Math.floor(Math.random() * Math.floor(9))].default);
    console.log(stage)
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
        setDropTime(speedTime / (level + 1));
      }
    }
  };

  const startGame = () => {
    // reset everything
    setStage(createStage());
    setDropTime(speedTime);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    if(!isPlaying) play();
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
      setDropTime(speedTime / (level + 1) + 200);
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
        revertDown();
      } else if (keyCode === 38 || keyCode === 87) {
        playerRotate(stage, 1);
        revertBrick();
      }
    }
  };

  return (
    <StyledTetrisWrapper
      id="mainWrapp"
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
      style={{ background: `url(${bgImage})` }}
      // load={() => console.log('!')}
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
           setImage={changeBg}
           stopGame={setDropTime} 
           speedGame={speedTime}
           setSpeedGame={setSpeedTime}
           startGame={drop}
           newGame={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;