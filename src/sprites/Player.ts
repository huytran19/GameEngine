import { Vector } from "@/utils";
import { GameObject } from "@/game";
import { TREX } from "@/utils";

import PLAYER_IDLE_IMAGE from '../images/trex.png'
import PLAYER_RUN_1_IMAGE from '../images/trex_run_1.png'
import PLAYER_RUN_2_IMAGE from '../images/trex_run_2.png'
import PLAYER_DUCK_1_IMAGE from '../images/trex_duck_1.png'
import PLAYER_DUCK_2_IMAGE from '../images/trex_duck_2.png'

export class Player extends GameObject {

    private jumpTimer: number = 0
    private runTimer: number = 0
    private duckTimer: number = 0
    deltaTime: number = 0.0625
    private jumpForce: number = 10
    private dy: number = 0
    private gravity: number = 0.7

    isJump: boolean = false
    isDuck: boolean = false
    isRun: boolean = false
    isRun1: boolean = false
    isDuck1: boolean = false

    playerRun(keyPressed: string): void {
        this.runTimer += this.deltaTime
        this.duckTimer += this.deltaTime

        if (keyPressed == 'JUMP') {
            this.isDuck = false
            this.isJump = true
        }
        else if (keyPressed == 'DUCK') {
            this.isDuck = true
            this.isJump = false
        }
        else {
            this.isJump = false
            this.isDuck = false
        }
        
        if (this.isJump && !this.isDuck) {
            this.jump()
        } else {
            this.jumpTimer = 0
        }

        if (this.isDuck) {
            if (this.duckTimer > 0.5 && this.isRun) {
                this.duckTimer = 0
                this.switch('duck')
            }
        } else {
            if (this.runTimer > 0.5) {
                this.objWidth = TREX.width
                this.objHeight = TREX.height
            }
        }

        

        this.position.y += this.dy
        if (this.position.y + this.objHeight < 175) {
            this.dy += this.gravity
            this.isRun = false
            this.isRun1 = false
            this.isDuck1 = false
            this.objImage.src = PLAYER_IDLE_IMAGE
        } else {
            this.dy = 0
            this.isRun = true
            this.position.y = 175 - this.objHeight
            if (this.runTimer > 0.5 && this.isRun && !this.isDuck) {
                this.runTimer = 0
                this.switch('run')
            }
        } 
        
    }

    jump(): void {
        if (this.isRun && this.jumpTimer == 0) {
            this.jumpTimer = 2
            this.dy = -this.jumpForce
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 5) {
            this.jumpTimer++
            this.dy = -this.jumpForce - (this.jumpTimer/50)
        }
    }

    switch(type: string): void {
        if (type === 'run') {
            if (this.isRun1) {
                this.objImage.src = PLAYER_RUN_2_IMAGE
                this.isRun1 = false
                return
            }
            if (!this.isRun1) {
                this.objImage.src = PLAYER_RUN_1_IMAGE
                this.isRun1 = true
                return
            }
        }

        else if (type === 'duck') {
            this.objWidth = 54
            this.objHeight = 27
            this.position.y = 148
            if (this.isDuck1) {
                this.objImage.src = PLAYER_DUCK_2_IMAGE
                this.isDuck1 = false
                return
            } 
            if (!this.isDuck1) {
                this.objImage.src = PLAYER_DUCK_1_IMAGE
                this.isDuck1 = true
                return
            }
        }
    }
}