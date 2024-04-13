"use client";
import React, { useRef, useEffect, useState } from "react";

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
      const moveStep = 16; // Pixels to move per key press

      switch (event.key) {
        case "ArrowRight":
        case "d":
          newDirection = Direction.Right;
          newX += moveStep;
          break;
        case "ArrowLeft":
        case "a":
          newDirection = Direction.Left;
          newX = Math.max(0, newX - moveStep);
          break;
        case "ArrowUp":
        case "w":
          newDirection = Direction.Up;
          newY = Math.max(0, newY - moveStep);
          break;
        case "ArrowDown":
        case "s":
          newDirection = Direction.Down;
          newY += moveStep;
          break;
      }

      if (newDirection !== direction) {
        setDirection(newDirection);
      }

      setViewport({ x: newX, y: newY });
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, viewport.x, viewport.y, setCurrentFrame, setViewport]);

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
        drawPlayer(
          context,
          sprites[direction],
          currentFrame,
          frameCount,
          canvas
        );
        requestAnimationFrame(gameLoop);
      };

      requestAnimationFrame(gameLoop);
    }
  }, [backgroundImage, currentFrame, direction, sprites, viewport]);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    bgImage: HTMLImageElement,
    viewport: { x: number; y: number },
    canvas: HTMLCanvasElement
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
      canvas.height
    );
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    frame: number,
    frameCount: number,
    canvas: HTMLCanvasElement
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
      frameHeight
    );
  };

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
