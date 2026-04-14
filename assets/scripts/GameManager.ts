import { _decorator, Component, Game, Label, Node } from 'cc';
import { DataManager, PlantLevel } from './DataManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //生命能量
    @property(Label)
    hpValueLabel: Label;
    //收益速度
    @property(Label)
    speedValueLabel: Label;
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

            //重置计时器
            this.dataTimer = 0;
        }
    }
}


