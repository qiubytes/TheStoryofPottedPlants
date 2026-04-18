import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
import { DataManager, GameData } from './DataManager';
import { BottomPanel } from './BottomPanel';
const { ccclass, property } = _decorator;

//给盆栽ICON的脚本 现共七个都使用这个脚本
@ccclass('PlantIcon')
export class PlantIcon extends Component {
    //底部显示
    //当前等级显示的Label
    //@property(Label)
    //currentLevel: Label;
    //升级所需Label
    //@property(Label)
    //nextLevelLabel: Label;

    //底部Node节点
    @property(Node)
    bottomPanel: Node;
    start() {

    }

    update(deltaTime: number) {

    }
    //点击植物ICON 更新底部详细数据显示
    public onICONClick(event: Event, customEventData: string) {
        //console.log(`收到自定义参数: ${customEventData}`);
        let gameData: GameData = DataManager.inst.gameData;
        let plant = gameData.plants.find(o => o.name == customEventData);
        //更新bottompanel的数据显示 
        let bottompanelscript = this.bottomPanel.getComponent(BottomPanel);
        if (plant.isUnLocked) {
            bottompanelscript.displayUpgradeInfo(customEventData);

        } else {
            bottompanelscript.displayUnlockInfo(customEventData);
        }
    }

}


