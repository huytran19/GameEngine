import { Scene } from "./Scene";
import { GameLoop, HandleUserInput } from "@/engine";
import { Render } from "@/engine/Render";
import { Cactus, Player, Road, Cloud } from "@/sprites";

import TREX_IMAGE from '../images/trex.png'
import CACTUS_LARGE_IMAGE from '../images/cactus_large.png'
import ROAD_IMAGE from '../images/ground.png'
import CLOUD_IMAGE from '../images/cloud.png'


export class SceneManager {

    private _scene: Scene = new Scene()
    private _handleInput: HandleUserInput
    private _render: Render
    private _isPlayPressed: boolean
    _highScore: number
    private _score: number

    constructor() {
        const scene: Scene = new Scene()
        this._scene = scene
        this._handleInput
        this._render
        this._isPlayPressed = false
        this._score = 0
        this._highScore = this._score
    }

    initScene(): void {
        this._scene.initGameField()
        this._scene._btn.addEventListener('click', () => this.initGameLoop())
    }

    initGameLoop(): void {
        this._scene._btn.setAttribute("style", "visibility: hidden;")
        const handleUserInput: HandleUserInput = new HandleUserInput()
        const render = new Render(this._scene)
        const gameLoop = new GameLoop()
        this._handleInput = handleUserInput
        this._render = render

        this._score = 0

        const cactuses = []
        const roads = []
        const clouds = []
        const gameSpeed = 6

        const player = new Player(40, 45, {x: 30, y: 75}, TREX_IMAGE)
        const cactus = new Cactus(25, 45, {x: 620, y: 130}, CACTUS_LARGE_IMAGE)
        const road = new Road(800, 10, {x: 0, y: 160}, ROAD_IMAGE)
        const cloud = new Cloud(45, 15, {x: 620, y: 100}, CLOUD_IMAGE)

        cactuses.push(cactus)
        roads.push(road)
        clouds.push(cloud)
        gameLoop.gameLoop(this, this._handleInput, this._scene, this._render, gameSpeed, player, cactuses, roads, clouds, this._score)
    }

}