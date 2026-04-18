import { _decorator, Component, game, Game, Label, Node } from 'cc';
import { DataManager, Plant, PlantLevel } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //生命能量
    @property(Label)
    hpValueLabel: Label;
    //收益速度
    @property(Label)
    speedValueLabel: Label;
    //植物ScrollView
    @property(Node)
    plantScrollView: Node;
    //单例引用
    public static inst: GameManager;

    //数据刷新计时器
    private dataTimer: number = 0;
    start() {
        if (!GameManager.inst) {
            GameManager.inst = this;
        }
    }

    update(deltaTime: number) {
        this.dataTimer += deltaTime;
        if (this.dataTimer >= 1) {
            //时间到了刷新一次UI

            let gameData = DataManager.inst.gameData;
            let gameLevelDef = DataManager.inst.gamePlatLevelDef;
            let speed = gameData.baseSpeed;
            //收益速度根据 植物等级查询数值策划表来获得

            gameData.plants.forEach((o, index, arr) => {
                //speed += o.speed;
                let plantLevel: PlantLevel | undefined = gameLevelDef.find(t => t.name == o.name);
                if (plantLevel != undefined) {
                    //当前植物收益=当前等级x基础每级收益
                    speed += o.level * plantLevel.baseHpPerSec;
                }
            });
            //每秒收益结算
            gameData.hpValue += speed;
            gameData.hpValue = parseInt(gameData.hpValue.toFixed(0));
            //显示UI
            //HP
            if (gameData.hpValue < 10000) {
                this.hpValueLabel.string = gameData.hpValue.toString();

            } else {
                let hpW: number = gameData.hpValue / 10000;
                this.hpValueLabel.string = hpW.toString() + '万';
            }
            //速度
            this.speedValueLabel.string = "+" + speed.toString() + "/s";
            //更新scrollView里面的icon数据
            this.updatePlantScrollView();
            //重置计时器
            this.dataTimer = 0;

            //存入数据gameData
            DataManager.inst.saveGameData();
        }
    }
    //根据数据更新 scrollView里面的植物的Icon等级、收益速度
    private updatePlantScrollView() {
        let content: Node = this.plantScrollView.getChildByPath("view/content");
        let gameData = DataManager.inst.gameData;
        let platLevelDef = DataManager.inst.gamePlatLevelDef;
        // console.log("获取conent节点");
        // console.log(content);
        let plantIcons: Node[] = content.children;
        for (let i = 0; i < plantIcons.length; i++) {
            let name: string = plantIcons[i].getChildByPath("NameLabel").getComponent(Label).string;
            let plant: Plant = gameData.plants.find(t => t.name == name);
            if (plant) {
                plantIcons[i].getChildByPath("LevelLabel").getComponent(Label).string = "Lv." + plant.level;
                plantIcons[i].getChildByPath("LevelLabel").getComponent(Label).string = "Lv." + plant.level;
                let plantLevel = platLevelDef.find(t => t.name == name);
                let speed = plant.level * plantLevel.baseHpPerSec;
                plantIcons[i].getChildByPath("SpeedLabel").getComponent(Label).string = speed + "/s";
            }
        }
    }
}


