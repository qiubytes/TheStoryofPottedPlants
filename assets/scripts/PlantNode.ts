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
                break;
            case "多肉":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[3];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[4];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[5];
                    }
                }
                break;
            case "薄荷":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[6];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[7];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[8];
                    }
                }
                break;
            case "薰衣草":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[9];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[10];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[11];
                    }
                }
                break;
            case "向日葵":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[12];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[13];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[14];
                    }
                }
                break;
            case "满天星":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[15];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[16];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[17];
                    }
                }
                break;
            case "魔法花":
                {
                    if (plant.level <= 3) {
                        this.plantSprite.spriteFrame = this.plantFrames[18];
                    } else if (plant.level > 3 && plant.level <= 9) {
                        this.plantSprite.spriteFrame = this.plantFrames[19];

                    } else if (plant.level >= 10) {
                        this.plantSprite.spriteFrame = this.plantFrames[20];
                    }
                }
                break;
        }
    }
}


