import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
import { DataManager, GameData } from './DataManager';
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
        console.log(`收到自定义参数: ${customEventData}`);
        let gameData: GameData = DataManager.inst.gameData;
        //更新bottompanel的数据显示 (todo 这里的代码需要整合到 bottompabel中 共用)
        let plantNameValueLabel: Label = this.bottomPanel.getChildByPath("plantNameValueLabel").getComponent(Label);
        let levelValueLabel: Label = this.bottomPanel.getChildByPath("levelValueLabel").getComponent(Label);
        let nextLevelValueLabel: Label = this.bottomPanel.getChildByPath("nextLevelValueLabel").getComponent(Label);
        plantNameValueLabel.string = customEventData;
        levelValueLabel.string = gameData.plants.find(o => o.name == customEventData).level.toString();
        nextLevelValueLabel.string = DataManager.inst.calcNextLevelNeed(customEventData).toString();

        this.enableBottomPanel(true);
    }
    //显示/隐藏BootomPanel下面的节点
    private enableBottomPanel(enable: boolean) {
        let children: Node[] = this.bottomPanel.children;
        children.forEach(o => {
            o.active = enable;
        });
    }
}


