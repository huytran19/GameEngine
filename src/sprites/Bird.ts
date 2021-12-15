import { Vector } from "@/utils";
import { GameObject } from "@/game";

import BIRD_UP_IMAGE from '../images/bird_up.png'
import BIRD_DOWN_IMAGE from '../images/bird_down.png'

export class Bird extends GameObject {
    
    flyTime: number = 0
    deltaTime: number = 0.0625
    isFlyDown: boolean = false

    move(gameSpeed: number): void {
        this.flyTime += this.deltaTime
        this.position.x -= gameSpeed
        if (this.flyTime > 0.8) {
            this.flyTime = 0
            this.fly()
        }
    }

    fly(): void {
        if (this.isFlyDown) {
            this.objImage.src = BIRD_UP_IMAGE
            this.isFlyDown = false
            return
        }
        if (!this.isFlyDown) {
            this.objImage.src = BIRD_DOWN_IMAGE
            this.isFlyDown = true
            return
        }
    }
}

