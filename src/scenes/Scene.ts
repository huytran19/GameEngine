import { Vector, CANVAS_SIZE } from "@/utils"
import { Game, GameObject } from "@/game"
import { Bird, Cactus, Cloud, Player, Road } from "@/sprites"

import TREX_IMAGE from '../images/trex.png'
import CACTUS_LARGE_IMAGE from '../images/cactus_large.png'
import CACTUS_SMALL_IMAGE from '../images/cactus_small.png'
import BIRD_DOWN_IMAGE from '../images/bird_down.png'
import ROAD_IMAGE from '../images/ground.png'
import CLOUD_IMAGE from '../images/cloud.png'

import { HandleUserInput } from "@/engine"
import { SceneManager } from "."
export class Scene {
    private size: Vector
    private _elm: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D
    _btn: HTMLButtonElement
    _score: HTMLDivElement
    _highScore: HTMLDivElement

    constructor() {
        this.size = CANVAS_SIZE
        const canvas = document.createElement('canvas')
        this._elm = canvas
        const context = this._elm.getContext('2d')!
        this._ctx = context

        this._score
        this._highScore
    }

    public get canvas(): HTMLCanvasElement {
        return this._elm
    }

    public get context(): CanvasRenderingContext2D {
        return this._ctx
    }

    initGameField(): void {
        this.initCanvas()
        this.initPlayBtn()
        this.initScore()
    }

    initCanvas(): void {
        
        this._elm.setAttribute('width', `${this.size.x}px`)
        this._elm.setAttribute('height', `${this.size.y}px`)
        document.body.appendChild(this._elm)
    }

    initScore(): void {
        const scoreDisplay = document.createElement('div')
        scoreDisplay.setAttribute('id', 'scoreDisplay')
        document.body.appendChild(scoreDisplay)

        const score = document.createElement('div')
        this._score = score
        this._score.setAttribute('id', 'score')
        document.getElementById('scoreDisplay')?.appendChild(this._score)

        const highScore = document.createElement('div')
        this._highScore = highScore
        this._highScore.setAttribute('id', 'highScore')
        document.getElementById('scoreDisplay')?.appendChild(this._highScore)

    }

    initPlayBtn(): void {
        const play = document.createElement('div')
        play.setAttribute('id', 'play')
        document.body.appendChild(play)

        const playBtn = document.createElement('button')
        this._btn = playBtn
        this._btn.setAttribute('id', 'playBtn')
        this._btn.innerHTML = 'PLAY!'
        document.getElementById('play')?.appendChild(this._btn)
    }

    update(
        keyPressed: string, 
        gameSpeed: number, 
        player: Player, 
        obstacles: Cactus[] | Bird[], 
        roads: Road[], 
        clouds: Cloud[]): void {
        
        gameSpeed += 0.0007
        

        // PLAYER
        player.playerRun(keyPressed)

        // CACTUS and BIRD
        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            o.move(gameSpeed)
            o.initSpawnObsTimer--
            
            if ((o.initSpawnObsTimer - Math.floor((Math.random() * (50 - 30) + 30))) <= 0 && obstacles.length < 2) {
                if (Math.round(Math.random() * (10 - 0) + 0) > 2 && Math.round(Math.random() * (10 - 0) + 0) <= 6) {
                    const newObstacle = new Cactus(25, 45, {x: Math.floor((Math.random() * (700 - 610) + 610)), y: 130}, CACTUS_LARGE_IMAGE)
                    obstacles.push(newObstacle)
                } else if (Math.round(Math.random() * (10 - 0) + 0) > 6 && Math.round(Math.random() * (10 - 0) + 0) <= 10) {
                    const newObstacle = new Cactus(18, 28, {x: Math.floor((Math.random() * (700 - 610) + 610)), y: 147}, CACTUS_SMALL_IMAGE)
                    obstacles.push(newObstacle)
                } 
                else {
                    const newObstacle = new Bird(35, 15, {x: 620, y: 120}, BIRD_DOWN_IMAGE)
                    obstacles.push(newObstacle)
                }
            }
            if (o.pos.x < -30) {
                obstacles.splice(i, 1)
            }
        }

        // ROAD
        for (let i = 0; i < roads.length; i++) {
            let r = roads[i]
            r.move(gameSpeed)
            if (r.pos.x < -200 && roads.length < 2) {
                const newRoad = new Road(800, 10, {x: 600, y: 160}, ROAD_IMAGE)
                roads.push(newRoad)
            }
            if (r.pos.x < -800) {
                roads.splice(i, 1)
            }
        }

        // CLOUD
        for (let i = 0; i < clouds.length; i++) {
            let c = clouds[i]
            c.move(gameSpeed)
            c.initSpawnObsTimer--
            if ((c.initSpawnObsTimer - Math.floor((Math.random() * (40 - 30) + 30))) <= -150 && clouds.length < 2) {
                const newCloud = new Cloud(45, 15, {x: 600 + Math.floor((Math.random() * (50 - 10) + 10)), y: 30 + Math.floor((Math.random() * (50 - 10) + 10))}, CLOUD_IMAGE)
                clouds.push(newCloud)
            }
            if (c.pos.x < -30) {
                clouds.splice(i, 1)
            }
        }
    }

    checkCollision(player: Player, obstacles: Cactus[] | Bird[]): boolean {
        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            if (
                player.pos.x < o.pos.x + o.width &&
                player.pos.x + player.width > o.pos.x &&
                player.pos.y < o.pos.y + o.height &&
                player.pos.y + player.height > o.pos.y
            ) {
                return true
            }
        }
        return false
    }
}