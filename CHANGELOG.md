# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.25] - 2023-07-23

### Added
- Level complete screen for "Original Mode"
  - Triggered when the snake fills up the entire grid
  - Reuses the existing level complete screen from "Mission Mode"

### Changed
- Start screen now supports keyboard navigation
  - Use arrow keys to move between options
  - Press Enter to select an option
  - Difficulty can be changed using keyboard when focused

### Fixed
- Issue with difficulty selection changing unintentionally during keyboard navigation

### Technical
- Added `isGridFull()` function to check if the snake has filled the entire grid
- Modified `checkCollision()` function to include level complete condition for "Original Mode"
- Implemented keyboard event listener for start menu navigation
- Added logic to handle difficulty select focus state during keyboard navigation

## [1.24] - 2024-07-23

### Fixed
- In Mission mode, food (hamster) now always appears in visible locations, preventing it from spawning behind obstacles.

### Changed
- Improved food generation algorithm to consider obstacle positions in Mission mode.

### Developer Notes
- Modified the `generateFood` function to check for obstacle collisions when placing food in Mission mode.

## [1.23] - 2024-07-23

### Fixed

- Resolved an issue where the snake could move backwards and collide with its first body segment when two direction keys were pressed simultaneously. Implemented a direction queue system to ensure only valid moves are executed, maintaining the integrity of the snake's movement.

- Fixed a bug where obstacles from "Mission Mode" were persisting as invisible barriers in subsequent "Original Mode" games. Implemented a comprehensive game state reset function to ensure a clean slate for each new game, regardless of the previously played mode.

### Changed

- Improved the `changeDirection` function to use a queue system for handling rapid or simultaneous key presses, ensuring smoother and more predictable snake movement.

- Added a `resetGameState` function to properly initialize all game variables when starting a new game or switching between game modes.

- Modified the game initialization process to use a `startGame` function, which appropriately sets up the game based on the selected mode (Original or Mission).

### Developer Notes

- The direction queue system now prevents invalid backwards movement while still allowing responsive control of the snake.
- Game state reset now includes clearing obstacles, resetting snake position, food, score, and any mode-specific variables.
- Developers should ensure that `startGame(mode)` is called appropriately when initializing games or switching between modes.

## [1.22] - 2024-07-23

### Added

-   Implemented a pause feature that allows players to pause and resume the game.
-   Moved the music toggle and volume control to the pause menu for better accessibility.

## [1.21] - 2024-07-23

### Changed

-   Moved the version display from beneath the game grid to the bottom of the title screen.
-   Added a display for the current game mode beneath the game grid, replacing the previous version display.

## [1.20] - 2024-07-23

### Changed

-   Updated the start menu screen by removing the radio options for game modes and replacing them with two buttons: "Original Mode" and "Mission Mode".
-   Removed the "Start Game" button, integrating its functionality into the new mode buttons. Each button now directly initiates the game with the selected difficulty level.

## [1.19] - 2024-07-23

### Added

-   Introduced rocks as obstacles in the "mission" mode of the game. Rocks are drawn using the canvas API and appear as either gray or brown, with each rock retaining its color throughout the game session.

## [1.18] - 2024-07-22

### Changed

-   Improved the styling of the game's title screen for a cleaner and more game-like aesthetic.

## [1.17] - 2024-07-22

### Added

-   Game Mode Selection: Players can now choose between two game modes:
    -   **Original:** The classic Snake experience with no level completion.
    -   **Mission Mode:** The game ends with a "Level Complete" message when the player reaches a score of 10.

## [1.16] - 2024-07-22

### Added
- Level Complete Feature: The game now ends and displays a "Level Complete!" message when the player reaches a score of 10.

## [1.15] - 2024-07-22

### Fixed
- Fixed a bug where food could spawn inside the snake's body

## [1.14] - 2024-07-22

### Added
- Added a gradient background to the game grid
  - Gradient transitions from light green to dark green for a more dynamic look

## [1.13] - 2024-07-22

### Changed
- Improved snake body graphics
  - Added rounded corners to body segments
  - Implemented a gradient fill from lime green to forest green
  - Added a simple scale pattern to each body segment

## [1.12] - 2024-07-22

### Changed
- Improved snake head graphics to be more reptile-like
- Elongated the head shape, correcting the shape for vertical movement
- Replaced the snout with a cute, forked red tongue
- Maintained cute eyes that change position based on movement direction

## [1.11] - 2024-07-22

### Changed
- Updated audio file names:
  - "eat-sound.wav" to "392883__clif_creates__hard-candy-bone-crunch.wav"
  - "game-over.wav" to "415079__harrietniamh__video-game-death-sound-effect.wav"
  - "ustym_petrovych__8-bit-tune-short-sketch-adventure.wav" to "670772__ustym_petrovych__8-bit-tune-short-sketch-adventure.wav"

## [1.10] - 2024-07-22

### Fixed
- Corrected the orientation of the snake's tail to point in the opposite direction of movement

## [1.9] - 2024-07-22

### Fixed
- Implemented proper tail direction based on snake movement
- Corrected issues with tail visibility and wrapping around game borders

## [1.8] - 2024-07-22

### Added
- Background music feature
- Music controls (play/pause and volume adjustment)

### Changed
- Updated game over function to stop background music

## [1.7] - 2024-07-22

### Added
- Custom sound effect for when the snake eats food
- Game over sound effect

## [1.6] - 2024-07-22

### Changed
- Updated food appearance to resemble a hamster

## [1.5] - 2024-07-22

### Added
- Difficulty levels (Easy, Medium, Hard)
- Start menu for selecting difficulty

### Changed
- Snake head design to include eyes
- Snake tail design to a triangle shape

## [1.4] - 2024-07-22

### Added
- Score display
- Game over alert with final score

## [1.3] - 2024-07-22

### Added
- Basic snake movement
- Food generation
- Collision detection

## [1.2] - 2024-07-22

### Added
- Canvas setup for game rendering

## [1.1] - 2024-07-22

### Added
- Initial HTML structure
- Basic CSS styling

## [1.0] - 2024-07-22

### Added
- Initial project setup