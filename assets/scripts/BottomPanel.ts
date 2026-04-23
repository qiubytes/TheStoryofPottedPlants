import { _decorator, Component, Label, Node } from 'cc';
import { BagItem, DataManager, Plant, PlantLevel } from './DataManager';
import { GameManager } from './GameManager';
import { PlantNode } from './PlantNode';
const { ccclass, property } = _decorator;

@ccclass('BottomPanel')
export class BottomPanel extends Component {
    //中间盆栽显示节点
    @property(Node)
    plantNode: Node;

    //当前展示的植物名称
    private currentDisplayPlantName: string;
    start() {

    }

    update(deltaTime: number) {

    }
    //升级
    public onUpgradeClick(event: Event, customEventData: string) {
        let plantName = this.node.getChildByPath("plantNameValueLabel").getComponent(Label).string;
        //console.log(plantName);
        let nextLevelNeed = DataManager.inst.calcNextLevelNeed(plantName);
        if (DataManager.inst.gameData.hpValue >= nextLevelNeed) {
            let plant: Plant = DataManager.inst.gameData.plants.find(o => o.name == plantName);
            //如果是获取种子
            if (this.node.getChildByPath("upgradeButton/Label").getComponent(Label).string == "获取种子") {
                //等级重置
                plant.level = 1;
                //存入种子背包
                let targetBagItem: BagItem = DataManager.inst.gameData.bag.find(o => o.name == `${plantName}种子`);
                if (!targetBagItem) {
                    DataManager.inst.gameData.bag.push(new BagItem(`${plantName}种子`, 1));
                } else {
                    targetBagItem.count++;
                }
            } else {
                //升级植物、更新等级、GameManager会在下一帧自动刷新等级
                plant.level = plant.level + 1;
                DataManager.inst.gameData.hpValue -= nextLevelNeed;
                DataManager.inst.gameData.hpValue = parseInt(DataManager.inst.gameData.hpValue.toFixed(0));

            }
            //刷新底部显示的升级信息
            this.displayUpgradeInfo(plantName);
            //更新中间盆栽显示节点显示 
            this.plantNode.getComponent(PlantNode).switchPlantSprite(plant);
            //升到十级显示获取种子
            if (plant.level == 10) {
                this.node.getChildByPath("upgradeButton/Label").getComponent(Label).string = "获取种子";
            } else {
                this.node.getChildByPath("upgradeButton/Label").getComponent(Label).string = "升级";
            }
        }
        //console.log(DataManager.inst.gameData);
    }
    //底部显示升级信息
    public displayUpgradeInfo(plantName: string) {
        this.currentDisplayPlantName = plantName;

        let plantNameValueLabel: Label = this.node.getChildByPath("plantNameValueLabel").getComponent(Label);
        let levelValueLabel: Label = this.node.getChildByPath("levelValueLabel").getComponent(Label);
        let nextLevelValueLabel: Label = this.node.getChildByPath("nextLevelValueLabel").getComponent(Label);
        plantNameValueLabel.string = plantName;
        levelValueLabel.string = DataManager.inst.gameData.plants.find(o => o.name == plantName).level.toString();
        nextLevelValueLabel.string = DataManager.inst.calcNextLevelNeed(plantName).toString();

        let targetPlant: Plant = DataManager.inst.gameData.plants.find(o => o.name == plantName);
        if (targetPlant.level == 10) {
            this.node.getChildByPath("upgradeButton/Label").getComponent(Label).string = "获取种子";
        } else {
            this.node.getChildByPath("upgradeButton/Label").getComponent(Label).string = "升级";
        }
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
        // if (parseInt(this.node.getChildByName("levelValueLabel").getComponent(Label).string) >= 10) {
        //     this.node.getChildByName("upgradeButton").active = false;
        // }
    }
    //底部显示解锁信息
    public displayUnlockInfo(plantName: string) {
        this.currentDisplayPlantName = plantName;

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
    //解锁盆栽
    public onUnlockClick(event: Event, customEventData: string) {
        if (this.currentDisplayPlantName) {
            console.log(this.currentDisplayPlantName);
            let plant: Plant = DataManager.inst.gameData.plants.find(o => o.name == this.currentDisplayPlantName);
            if (plant) {
                let bagitem = DataManager.inst.gameData.bag.find(o => o.name == `${plant.unLockNeedSeedName}种子`);
                //  console.log(plant.unLockNeedSeedName);
                // console.log(bagitem);
                //减扣种子，解锁植物
                if (bagitem && bagitem.count > 0) {
                    bagitem.count--;
                    if (bagitem.count <= 0) {
                        const idx = DataManager.inst.gameData.bag.indexOf(bagitem);
                        if (idx !== -1) DataManager.inst.gameData.bag.splice(idx, 1);
                    }
                    plant.isUnLocked = true;
                    //显示升级面板
                    this.displayUpgradeInfo(this.currentDisplayPlantName);
                    //刷新中间盆栽
                    this.plantNode.getComponent(PlantNode).switchPlantSprite(plant);
                }
            }
        }
    }

}


