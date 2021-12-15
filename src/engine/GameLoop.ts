import { Scene, SceneManager } from "@/scenes"
import { Bird, Cactus, Cloud, Player, Road } from "@/sprites"
import { HandleUserInput } from "./HandleUserInput"
import { Render } from "./Render"

import { Game, GameObject } from "@/game"

import GAME_OVER_IMAGE from '../images/gameover_text.png'
import RESTART_IMAGE from '../images/restart.png'

export class GameLoop {
    keys: []
    keyPressed: string
    gameOverImage: HTMLImageElement = new Image()
    restartBtnImage: HTMLImageElement = new Image()

    constructor() {
        this.keys = []
        this.keyPressed
        this.gameOverImage.src = GAME_OVER_IMAGE
        this.restartBtnImage.src = RESTART_IMAGE
    }

    gameLoop(
        sceneManager: SceneManager,
        handleUserInput: HandleUserInput, 
        scene: Scene, 
        render: Render, 
        gameSpeed: number, 
        player: Player, 
        obstacles: Cactus[] | Bird[], 
        roads: Road[],
        clouds: Cloud[],
        score: number): void {
        
        scene._btn.setAttribute("style", "visibility: hidden;")
        score++
        this.keyPressed = handleUserInput.registerKeyPress(this.keys)[0]
        scene.update(this.keyPressed, gameSpeed, player, obstacles, roads, clouds)
        render.render(scene, player, obstacles, roads, clouds, score)

        const check = scene.checkCollision(player, obstacles)
        if (check) {
            if (score > sceneManager._highScore) {
                sceneManager._highScore = score
                render.drawHighScore(scene, sceneManager._highScore)
            }

            render.drawGameOver(this.gameOverImage)
            scene._btn.innerText = 'RESTART!'
            scene._btn.setAttribute("style", "visibility: visible;")
            scene._btn.addEventListener('click', () => {
                sceneManager.initGameLoop()
            })
        } else requestAnimationFrame(() => this.gameLoop(sceneManager, handleUserInput, scene, render, gameSpeed, player, obstacles, roads, clouds, score))
        
    }
}