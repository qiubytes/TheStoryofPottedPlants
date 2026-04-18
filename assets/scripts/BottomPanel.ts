import { _decorator, Component, Label, Node } from 'cc';
import { DataManager, Plant } from './DataManager';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BottomPanel')
export class BottomPanel extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    //升级
    public onUpgradeClick(event: Event, customEventData: string) {
        let plantName = this.node.getChildByPath("plantNameValueLabel").getComponent(Label).string;
        console.log(plantName);
        let nextLevelNeed = DataManager.inst.calcNextLevelNeed(plantName);
        if (DataManager.inst.gameData.hpValue >= nextLevelNeed) {
            //升级植物、更新等级、GameManager会在下一帧自动刷新等级
            let plant: Plant = DataManager.inst.gameData.plants.find(o => o.name == plantName);
            plant.level = plant.level + 1;
            DataManager.inst.gameData.hpValue -= nextLevelNeed;
            DataManager.inst.gameData.hpValue = parseInt(DataManager.inst.gameData.hpValue.toFixed(0));

            //更新bottompanel的数据显示
            let plantNameValueLabel: Label = this.node.getChildByPath("plantNameValueLabel").getComponent(Label);
            let levelValueLabel: Label = this.node.getChildByPath("levelValueLabel").getComponent(Label);
            let nextLevelValueLabel: Label = this.node.getChildByPath("nextLevelValueLabel").getComponent(Label);
            plantNameValueLabel.string = plantName;
            levelValueLabel.string = DataManager.inst.gameData.plants.find(o => o.name == plantName).level.toString();
            nextLevelValueLabel.string = DataManager.inst.calcNextLevelNeed(plantName).toString();
        }
    }
}


