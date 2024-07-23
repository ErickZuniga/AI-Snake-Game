# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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