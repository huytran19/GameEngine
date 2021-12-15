import { SceneManager } from "@/scenes";
import { Player } from "@/sprites";


export class Game {

    constructor() {

    }

    initGame(): void {
        const sceneManager = new SceneManager()
        sceneManager.initScene()
    }
}