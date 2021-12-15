import { Vector } from "@/utils";
import { GameObject } from "@/game";

export class Road extends GameObject {

    move(gameSpeed: number): void {
        this.position.x -= gameSpeed
    }
}