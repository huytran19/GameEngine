import { Vector } from "@/utils";

export class GameObject {

    public objImage: HTMLImageElement = new Image()
    initSpawnObsTimer: number
    public flyTime: number
    public deltaTime: number
    public isFlyDown: boolean
    constructor(
        public objWidth: number,
        public objHeight: number,
        public position: Vector,
        public objImageSrc: string
    ) {
        this.objWidth = objWidth
        this.objHeight = objHeight
        this.position = position
        this.objImage.src = objImageSrc
        this.initSpawnObsTimer = 100
    }

    public get image(): HTMLImageElement {
        return this.objImage
    }
    
    public get width(): number {
        return this.objWidth
    }

    public get height(): number {
        return this.objHeight
    }

    public get pos(): Vector {
        return this.position
    }

    move(speed: number): void {
        
    }

    playerRun(keyPressed: string): void {
        
    }

    fly (): void {

    }
}