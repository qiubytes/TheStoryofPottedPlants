import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
import { DataManager, GameData } from './DataManager';
const { ccclass, property } = _decorator;

//给盆栽ICON的脚本 现共七个都使用这个脚本
@ccclass('PlantIcon')
export class PlantIcon extends Component {
    //底部显示
    //当前等级显示的Label
    @property(Label)
    currentLevel: Label;
    //升级所需Label
    @property(Label)
    nextLevelLabel: Label;

    start() {

    }

    update(deltaTime: number) {

    }
    public onICONClick(event: Event, customEventData: string) {
        console.log(`收到自定义参数: ${customEventData}`);
        let gameData: GameData = DataManager.inst.gameData;
        this.currentLevel.string = gameData.plants.find(o => o.name == customEventData).level.toString();
        this.nextLevelLabel.string = DataManager.inst.calcNextLevelNeed(customEventData).toString();
    }
}


