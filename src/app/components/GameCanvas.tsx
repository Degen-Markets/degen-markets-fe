"use client";
import React, { useRef, useEffect, useState } from "react";
import { COLLISIONS, SHOW_BOUNDARIES } from "../lib/utils/game/constants";
enum Direction {
  Down,
  Up,
  Left,
  Right,
}

const directionSpriteMap: Record<Direction, string> = {
  [Direction.Down]: "./PlayerDown.png",
  [Direction.Up]: "./PlayerUp.png",
  [Direction.Left]: "./PlayerLeft.png",
  [Direction.Right]: "./PlayerRight.png",
};

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<
    HTMLImageElement | undefined
  >();
  const [viewport, setViewport] = useState({ x: 735, y: 600 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [direction, setDirection] = useState(Direction.Down);
  const [sprites, setSprites] = useState<
    Record<Direction, HTMLImageElement> | undefined
  >();

  const [playerSprite, setPlayerSprite] = useState<
    HTMLImageElement | undefined
  >();

  const frameCount = 4;

  const [collisions, setCollisions] = useState<number[][]>([[]]);
  const [playerHitbox, setPlayerHitbox] = useState({
    x: 0,
    y: 0,
    width: 48,
    height: 48,
  });

  const checkCollisions = (
    hitbox: { x: number; y: number; width: number; height: number },
    direction: Direction,
    moveStep: number,
  ) => {
    let adjustedHitbox = { ...hitbox };
    switch (direction) {
      case Direction.Right:
        adjustedHitbox.x += moveStep;
        break;
      case Direction.Left:
        adjustedHitbox.x -= moveStep;
        break;
      case Direction.Up:
        adjustedHitbox.y -= moveStep;
        break;
      case Direction.Down:
        adjustedHitbox.y += moveStep;
        break;
      default:
        break;
    }

    return boundaries.some(
      (boundary: { position: { x: number; y: number } }) => {
        if (
          adjustedHitbox.x < boundary.position.x + 48 &&
          adjustedHitbox.x + adjustedHitbox.width > boundary.position.x &&
          adjustedHitbox.y < boundary.position.y + 48 &&
          adjustedHitbox.y + adjustedHitbox.height > boundary.position.y
        ) {
          console.log("collision happened", direction);
          return true; // Collision detected
        }
        return false;
      },
    );
  };

  useEffect(() => {
    if (COLLISIONS) {
      const collisionsMap = [];
      for (let i = 0; i < COLLISIONS.length; i += 70) {
        collisionsMap.push(COLLISIONS.slice(i, 70 + i));
      }
      setCollisions(collisionsMap);
    }
  }, [COLLISIONS]);

  const [boundaries, setBoundaries] = useState<any>([]);

  useEffect(() => {
    const boundaries: any = [];
    const offset = { x: -735, y: -650 }; // Adjust based on your game's layout

    collisions.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          // Check for your boundary tile value
          boundaries.push({
            position: {
              x: j * 48 + offset.x,
              y: i * 48 + offset.y,
            },
          });
        }
      });
    });

    setBoundaries(boundaries);
  }, [collisions]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        setBackgroundImage(new Image());
        setPlayerSprite(new Image());
        const img = new Image();
        img.src = "./PelletTown.png";
        img.onload = () => {
          setBackgroundImage(img);
          context.drawImage(img, 0, 0);
        };

        const loadedSprites: Record<Direction, HTMLImageElement> = {
          [Direction.Down]: new Image(),
          [Direction.Up]: new Image(),
          [Direction.Left]: new Image(),
          [Direction.Right]: new Image(),
        };

        Object.values(Direction).forEach((direction) => {
          if (typeof direction === "number") {
            const spriteImage = new Image();
            spriteImage.src = directionSpriteMap[direction];
            loadedSprites[direction] = spriteImage;
          }
        });

        setSprites(loadedSprites);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newDirection = direction;
      let newX = viewport.x;
      let newY = viewport.y;
      // const moveStep = 15; // Pixels to move per key press
      let moveStep = event.shiftKey ? 30 : 15;

      if (canvasRef.current)
        switch (event.key) {
          case "ArrowRight":
          case "d":
            newDirection = Direction.Right;
            const playerHitBoxMovingRight = {
              x: canvasRef.current.width / 2 - playerHitbox.width / 2,
              y: canvasRef.current.height / 2 - playerHitbox.height / 2,
              width: playerHitbox.width,
              height: playerHitbox.height,
            };
            const collisionRight = checkCollisions(
              playerHitBoxMovingRight,
              newDirection,
              moveStep,
            );
            if (collisionRight) break;
            newX += moveStep;
            break;
          case "ArrowLeft":
          case "a":
            newDirection = Direction.Left;
            const playerHitBoxMovingLeft = {
              x: canvasRef.current.width / 2 - playerHitbox.width / 2,
              y: canvasRef.current.height / 2 - playerHitbox.height / 2,
              width: playerHitbox.width,
              height: playerHitbox.height,
            };
            const collisionLeft = checkCollisions(
              playerHitBoxMovingLeft,
              newDirection,
              moveStep,
            );
            if (collisionLeft) break;
            newX -= moveStep;
            break;

          case "ArrowUp":
          case "w":
            newDirection = Direction.Up;
            const playerHitBoxMovingUp = {
              x: canvasRef.current.width / 2 - playerHitbox.width / 2,
              y: canvasRef.current.height / 2 - playerHitbox.height / 2,
              width: playerHitbox.width,
              height: playerHitbox.height,
            };
            const collisionUp = checkCollisions(
              playerHitBoxMovingUp,
              newDirection,
              moveStep,
            );
            if (collisionUp) break;
            newY -= moveStep; // Move the world down when moving up
            break;
          case "ArrowDown":
          case "s":
            newDirection = Direction.Down;
            const playerHitBoxMovingDown = {
              x: canvasRef.current.width / 2 - playerHitbox.width / 2,
              y: canvasRef.current.height / 2 - playerHitbox.height / 2,
              width: playerHitbox.width,
              height: playerHitbox.height,
            };
            const collisionDown = checkCollisions(
              playerHitBoxMovingDown,
              newDirection,
              moveStep,
            );
            if (collisionDown) break;
            newY += moveStep; // Move the world down when moving up
            break;
        }

      if (newDirection !== direction) {
        setDirection(newDirection);
      }

      setViewport({ x: newX, y: newY });
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);

      // Also update the positions of the boundaries
      const newBoundaries = boundaries.map(
        (boundary: { position: { x: number; y: number } }) => ({
          ...boundary,
          position: {
            x: boundary.position.x - (newX - viewport.x),
            y: boundary.position.y - (newY - viewport.y),
          },
        }),
      );
      setBoundaries(newBoundaries);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, viewport, boundaries, playerHitbox]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (
      canvas &&
      context &&
      backgroundImage?.complete &&
      sprites &&
      sprites[direction]?.complete
    ) {
      const gameLoop = () => {
        drawBackground(context, backgroundImage, viewport, canvas);
        if (SHOW_BOUNDARIES) {
          boundaries.forEach((boundary: any) => {
            context.fillStyle = "red";
            context.fillRect(
              boundary.position.x,
              boundary.position.y + 48,
              48,
              48,
            );
          });
        }

        drawPlayer(
          context,
          sprites[direction],
          currentFrame,
          frameCount,
          canvas,
        );

        // Update the player's hitbox position to the center of the screen
        setPlayerHitbox({
          x: canvas.width / 2 - playerHitbox.width / 2,
          y: canvas.height / 2 - playerHitbox.height / 2,
          width: playerHitbox.width,
          height: playerHitbox.height,
        });

        // Check for collisions after drawing everything
        // checkCollisions();

        requestAnimationFrame(gameLoop);
      };

      requestAnimationFrame(gameLoop);
    }
  }, [backgroundImage, currentFrame, direction, sprites, viewport]);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    bgImage: HTMLImageElement,
    viewport: { x: number; y: number },
    canvas: HTMLCanvasElement,
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      bgImage,
      viewport.x,
      viewport.y,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    frame: number,
    frameCount: number,
    canvas: HTMLCanvasElement,
  ) => {
    const frameWidth = sprite.width / frameCount;
    const frameHeight = sprite.height;
    const playerX = canvas.width / 2 - frameWidth / 2;
    const playerY = canvas.height / 2 - frameHeight / 2;

    ctx.drawImage(
      sprite,
      frameWidth * frame,
      0,
      frameWidth,
      frameHeight,
      playerX,
      playerY,
      frameWidth,
      frameHeight,
    );
  };

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
