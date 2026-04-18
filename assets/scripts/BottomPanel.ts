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
            //刷新底部显示的升级信息
            this.displayUpgradeInfo(plantName);
        }
    }
    //底部显示升级信息
    public displayUpgradeInfo(plantName: string) {
        let plantNameValueLabel: Label = this.node.getChildByPath("plantNameValueLabel").getComponent(Label);
        let levelValueLabel: Label = this.node.getChildByPath("levelValueLabel").getComponent(Label);
        let nextLevelValueLabel: Label = this.node.getChildByPath("nextLevelValueLabel").getComponent(Label);
        plantNameValueLabel.string = plantName;
        levelValueLabel.string = DataManager.inst.gameData.plants.find(o => o.name == plantName).level.toString();
        nextLevelValueLabel.string = DataManager.inst.calcNextLevelNeed(plantName).toString();
        //只显示关于升级信息的node
        this.enableUpgradeInfo(true);
    }
    //底部显示升级信息面板(切换)
    private enableUpgradeInfo(enable: boolean) {

        //先全部隐藏
        let children: Node[] = this.node.children;
        children.forEach(o => {
            o.active = false;
        });
        //只显示升级部分
        this.node.getChildByName("Bg").active = enable;
        this.node.getChildByName("upgradeButton").active = enable;
        this.node.getChildByName("plantNameLabel").active = enable;
        this.node.getChildByName("plantNameValueLabel").active = enable;
        this.node.getChildByName("levelLabel").active = enable;
        this.node.getChildByName("levelValueLabel").active = enable;
        this.node.getChildByName("nextLevelLabel").active = enable;
        this.node.getChildByName("nextLevelValueLabel").active = enable;

        //最大等级10级
        if (parseInt(this.node.getChildByName("levelValueLabel").getComponent(Label).string) >= 10) {
            this.node.getChildByName("upgradeButton").active = false;
        }
    }
    //底部显示解锁信息
    public displayUnlockInfo(plantName: string) {
        let unlockSeedNameLabel: Label = this.node.getChildByPath("unlockSeedNameLabel").getComponent(Label);
        let unlockSeedCountLabel: Label = this.node.getChildByPath("unlockSeedCountLabel").getComponent(Label);
        let plant: Plant = DataManager.inst.gameData.plants.find(o => o.name == plantName);
        unlockSeedNameLabel.string = plant.unLockNeedSeedName;
        unlockSeedCountLabel.string = "1";
        //只显示关于升级信息的node
        this.enableUnUnlockInfo(true);
    }
    //底部显示解锁信息面板(切换)
    private enableUnUnlockInfo(enable: boolean) {

        //先全部隐藏
        let children: Node[] = this.node.children;
        children.forEach(o => {
            o.active = false;
        });
        //只显示解锁部分
        this.node.getChildByName("Bg").active = enable;
        this.node.getChildByName("unlockLabel").active = enable;
        this.node.getChildByName("unlockSeedNameLabel").active = enable;
        this.node.getChildByName("unlockSeedCountLabel").active = enable;
        this.node.getChildByName("unlockSeedUnitLabel").active = enable;
        this.node.getChildByName("unlockButton").active = enable;

    }
}


