import { Vector } from "@/utils";
import { GameObject } from "@/game";

export class Cloud extends GameObject {

    move(gameSpeed: number): void {
        this.position.x -= gameSpeed * 0.25
    }
}