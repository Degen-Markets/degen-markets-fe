import { useEffect, useRef, useState } from "react";
import {
  CHALLENGE_SQUARE,
  CHALLENGE_ZONE,
  COLLISIONS,
  COLLISION_SQUARE,
  FRAME_COUNT,
  MOVE_STEP,
  ORIGINAL_HEIGHT,
  ORIGINAL_WIDTH,
  SCALE,
  SHOW_BOUNDARIES,
  TILES_PER_ROW,
  TILE_SIZE,
} from "../lib/utils/game/constants";
import { useRouter } from "next/navigation";

enum Direction {
  Down,
  Up,
  Left,
  Right,
}

const directionSpriteMap = {
  [Direction.Down]: "./PlayerDown.png",
  [Direction.Up]: "./PlayerUp.png",
  [Direction.Left]: "./PlayerLeft.png",
  [Direction.Right]: "./PlayerRight.png",
};

const GameCanvas = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [direction, setDirection] = useState(Direction.Up);
  const [playerX, setPlayerX] = useState(540); // Initial X position
  const [playerY, setPlayerY] = useState(720); // Initial Y position
  const [currentFrame, setCurrentFrame] = useState(0);
  const [inChallengeZone, setInChallengeZone] = useState(false);

  const checkCollisions = (
    playerSprite: any,
    newX: number,
    newY: number,
    direction: Direction,
  ) => {
    const spriteWidth = (playerSprite.width / FRAME_COUNT) * 0.5;
    const spriteHeight = playerSprite.height * 0.5;
    let checkX = newX;
    let checkY = newY;

    switch (direction) {
      case Direction.Right:
        checkX += spriteWidth / 2; // Use the rightmost point for rightward movement
        break;
      case Direction.Left:
        checkX -= spriteWidth / 2; // Use the leftmost point for leftward movement
        break;
      case Direction.Up:
        /// Use the  middle of the sprite sheet
        break;
      case Direction.Down:
        checkY += spriteHeight / 2; // Use the bottommost point for downward movement
        break;
    }

    // Calculate the tile index based on the adjusted player position
    const xIndex = Math.floor(checkX / (TILE_SIZE * SCALE));
    const yIndex = Math.floor(checkY / (TILE_SIZE * SCALE));
    const tileIndex = yIndex * TILES_PER_ROW + xIndex;

    // Check if the tile index corresponds to a non-walkable tile
    const collision = COLLISIONS[tileIndex] === COLLISION_SQUARE;
    return collision;
  };

  const checkChallengeZone = (x: number, y: number) => {
    const xIndex = Math.floor(x / (TILE_SIZE * SCALE));
    const yIndex = Math.floor(y / (TILE_SIZE * SCALE));
    const tileIndex = yIndex * TILES_PER_ROW + xIndex;
    const inZone = CHALLENGE_ZONE[tileIndex] === CHALLENGE_SQUARE;
    setInChallengeZone(inZone);
    if (inZone) {
      console.log("can challenge");
    }
    return inZone;
  };
  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = "./map54.png";

    const playerSprite = new Image();
    playerSprite.src = directionSpriteMap[direction];

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      canvas.width = ORIGINAL_WIDTH * SCALE;
      canvas.height = ORIGINAL_HEIGHT * SCALE;

      const drawCollisions = () => {
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        COLLISIONS.forEach((tile, index) => {
          if (tile === COLLISION_SQUARE) {
            const x = (index % TILES_PER_ROW) * TILE_SIZE * SCALE;
            const y = Math.floor(index / TILES_PER_ROW) * TILE_SIZE * SCALE;
            context.fillRect(x, y, TILE_SIZE * SCALE, TILE_SIZE * SCALE);
          }
        });
      };

      const drawChallengeZone = () => {
        context.fillStyle = "rgba(0, 0, 255, 0.5)";
        CHALLENGE_ZONE.forEach((tile, index) => {
          if (tile === CHALLENGE_SQUARE) {
            const x = (index % TILES_PER_ROW) * TILE_SIZE * SCALE;
            const y = Math.floor(index / TILES_PER_ROW) * TILE_SIZE * SCALE;
            context.fillRect(x, y, TILE_SIZE * SCALE, TILE_SIZE * SCALE);
          }
        });
      };

      const drawPlayer = () => {
        const frameWidth = playerSprite.width / FRAME_COUNT;
        const frameHeight = playerSprite.height;
        const playerScaledWidth = frameWidth * 0.5;
        const playerScaledHeight = frameHeight * 0.5;

        context.drawImage(
          playerSprite,
          frameWidth * currentFrame,
          0,
          frameWidth,
          frameHeight,
          playerX - playerScaledWidth / 2,
          playerY - playerScaledHeight / 2,
          playerScaledWidth,
          playerScaledHeight,
        );

        if (SHOW_BOUNDARIES) {
          drawHitbox(playerX, playerY, playerScaledWidth, playerScaledHeight);
        }
      };

      const drawHitbox = (
        x: number,
        y: number,
        width: number,
        height: number,
      ) => {
        context.fillStyle = "rgba(0, 255, 0, 0.5)"; // Use a semi-transparent green color
        context.fillRect(x - width / 2, y - height / 2, width, height);
      };

      const gameLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        if (SHOW_BOUNDARIES) {
          drawCollisions();
          drawChallengeZone();
        }
        drawPlayer();
        requestAnimationFrame(gameLoop);
      };

      backgroundImage.onload = () => {
        gameLoop();
      };
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      let newDirection = direction;
      let frameChangeOccurred = false;
      let newX = playerX;
      let newY = playerY;

      switch (event.key) {
        case "ArrowRight":
        case "d":
          newDirection = Direction.Right;
          newX += MOVE_STEP;
          break;
        case "ArrowLeft":
        case "a":
          newDirection = Direction.Left;
          newX -= MOVE_STEP;
          break;
        case "ArrowUp":
        case "w":
          newDirection = Direction.Up;
          newY -= MOVE_STEP;
          break;
        case "ArrowDown":
        case "s":
          newDirection = Direction.Down;
          newY += MOVE_STEP;
          break;
        case "Enter":
          if (inChallengeZone) {
            router.push("/create-bet");
          }
          break;
      }

      if (frameChangeOccurred) {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
      }
      // Check for collisions at the new position
      if (!checkCollisions(playerSprite, newX, newY, newDirection)) {
        if (newDirection !== direction) {
          setDirection(newDirection);
        }

        checkChallengeZone(newX, newY);

        setPlayerX(newX);
        setPlayerY(newY);
        setCurrentFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, FRAME_COUNT, MOVE_STEP, playerX, playerY]);

  return (
    <canvas
      ref={canvasRef}
      className="bg-blue-dark pt-14 flex w-auto h-screen mx-auto"
    />
  );
};

export default GameCanvas;
