export const stageSize = {
  width: 12,
  height: 20
};

export const changeSize = (width, height) => {
  stageSize.width = width; 
  stageSize.width = height;
};

export const createStage = () => 
    Array.from(Array(stageSize.height), () =>
        new Array(stageSize.width).fill([0, 'clear'])
);

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        // 1. Check that we're on an actual Tetromino cell
        if (player.tetromino[y][x] !== 0) {
          if (
            // 2. Check that our move is inside the game areas height (y)
            // We shouldn't go through the bottom of the play area
            !stage[y + player.pos.y + moveY] ||
            // 3. Check that our move is inside the game areas width (x)
            !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            // 4. Check that the cell wer'e moving to isn't set to clear
            stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
              'clear'
          ) {
            return true;
          }
        }
      }
    }
  };