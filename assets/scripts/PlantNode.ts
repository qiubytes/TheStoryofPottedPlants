import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { Plant } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('PlantNode')
export class PlantNode extends Component {
    //中间盆栽精灵
    @property(Sprite)
    plantSprite: Sprite;

    @property({ type: [SpriteFrame] })
    plantFrames: SpriteFrame[] = []

    start() {

    }

    update(deltaTime: number) {

    }
    //更新中间植物的精灵
    public switchPlantSprite(plant: Plant) {
        switch (plant.name) {
            case "绿萝":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[0];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[1];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[2];
                    }
                }
        }
    }
}


