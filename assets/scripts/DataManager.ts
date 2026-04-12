import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    //单例对对象
    public static inst: DataManager;

    //游戏数据
    public gameData: GameData;
    start() {
        if (!DataManager.inst) {
            DataManager.inst = this;
        }
        if (!this.gameData) {
            let gamedata: GameData = new GameData();
            gamedata.hpValue = 0;
            gamedata.baseSpeed = 10;
            //todo实例化盆栽数组数据
            gamedata.plants = [];

            this.gameData = gamedata;
        }
    }

    update(deltaTime: number) {

    }
}


//数据定义 游戏数据
export class GameData {
    public hpValue: number;
    public baseSpeed: number; //基础收益
    public plants: Array<Plant> = [];
}
//数据定义 盆栽实体
export class Plant {
    public name: string;
    public level: number;
    public speed: number; //产生能量的速度
    public isUnLocked: boolean;//是否解锁
    public unLockPlantName: string;//解锁所需盆栽植物
    public unLockPlantNum: number;//解锁所需盆栽植物数量
}