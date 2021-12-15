import { GameObject } from "@/game";
import { Scene } from "@/scenes";
import { Player, Cactus, Bird, Road, Cloud } from "@/sprites";

export class Render {
    private _elm: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    constructor(scene: Scene) {
        this._elm = scene.canvas
        this._ctx = scene.context
    }

    render(scene: Scene, player: Player, cactuses: Cactus[] | Bird[], roads: Road[], clouds: Cloud[], score: number): void {
        this.clear()
        this.drawSprite(player)
        cactuses.forEach(cactus => {
            this.drawSprite(cactus)
        })
        roads.forEach(road => {
            this.drawSprite(road)
        })
        clouds.forEach(cloud => {
            this.drawSprite(cloud)
        })
        this.drawScore(scene, score)
    }

    drawSprite(entity: Player | Cactus | Road | Cloud): void {
        this._ctx.drawImage(
            entity.image,
            entity.pos.x,
            entity.pos.y,
            entity.width,
            entity.height
        )
    }


    clear(): void {
        this._ctx.clearRect(0, 0, this._elm.width, this._elm.height)
    }

    drawGameOver(gameOver: HTMLImageElement) {
        this._ctx.drawImage(
            gameOver,
            215,
            95,
            170,
            10
        )
    }

    drawRestartBtn(restart: HTMLImageElement) {
        this._ctx.drawImage(
            restart,
            285,
            120,
            30,
            30
        )
    }

    drawScore(scene: Scene, score: number) {
        scene._score.innerHTML = 'Score: ' + score.toString()
    }

    drawHighScore(scene: Scene, highScore: number) {
        scene._highScore.innerHTML = 'Highscore: ' + highScore.toString()
    }
}