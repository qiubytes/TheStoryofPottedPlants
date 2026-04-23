import { _decorator, Component, game, Game, Node, setPropertyEnumType, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    //单例对对象
    public static inst: DataManager;

    //游戏数据
    public gameData: GameData;

    //盆栽游戏数值规划
    public gamePlatLevelDef: Array<PlantLevel> = [];
    async start() {
        if (!DataManager.inst) {
            DataManager.inst = this;
        }
        //sys.localStorage.setItem('gamedata', null); //清空测试数据
        // await Storage.setItem('gamedata', null); //清空测试数据
        // this.gameData = JSON.parse(sys.localStorage.getItem('gamedata'));
        this.gameData = JSON.parse(await Storage.getItem('gamedata'));

        if (!this.gameData) {
            let gamedata: GameData = new GameData();
            gamedata.hpValue = 0;
            gamedata.baseSpeed = 10;
            //实例化盆栽数组数据
            gamedata.plants = this.initPlants();
            gamedata.bag = [];//背包数据
            this.gameData = gamedata;
            // console.log("打印游戏数据");
            // console.log(this.gameData);
        }
        //初始化数值 todo这里后续加载json配置文件里面 resource读取
        if (this.gamePlatLevelDef.length <= 0) {
            this.initPlantLevel();
        }
    }

    update(deltaTime: number) {

    }
    //获取盆栽数组数据 todo此处要改为获取存储的数据
    private initPlants(): Array<Plant> {
        let plants = [
            new Plant("绿萝", 1, true, ""),
            new Plant("多肉", 1, false, "绿萝"),
            new Plant("薄荷", 1, false, "多肉"),
            new Plant("薰衣草", 1, false, "薄荷"),
            new Plant("向日葵", 1, false, "薰衣草"),
            new Plant("满天星", 1, false, "向日葵"),
            new Plant("魔法花", 1, false, "满天星")
        ];
        return plants;
    }
    //存入数据（plants）/gameData
    public async saveGameData() {
        let gamedata: GameData = this.gameData;
        //sys.localStorage.setItem('gamedata', JSON.stringify(gamedata));
        await Storage.setItem('gamedata', JSON.stringify(gamedata));
    }
    //传入植物名称获取下一等级所需能量
    public calcNextLevelNeed(name: string): number {
        let plant: Plant = this.gameData.plants.find(t => t.name == name);
        let plantlevel: PlantLevel = this.gamePlatLevelDef.find(t => t.name == name);
        let need: number = plantlevel.basePrice * Math.pow(1.25, plant.level - 1);
        return parseInt(need.toFixed(0));
    }
    //初始化盆栽收益、等级、价格数值
    private initPlantLevel() {
        let t1 = new PlantLevel();
        t1.name = "绿萝";
        t1.baseHpPerSec = 2;
        t1.basePrice = 30;
        t1.priceGrowthFactor = 1.25;
        let t2 = new PlantLevel();
        t2.name = "多肉";
        t2.baseHpPerSec = 5;
        t2.basePrice = 80;
        t2.priceGrowthFactor = 1.25;
        let t3 = new PlantLevel();
        t3.name = "薄荷";
        t3.baseHpPerSec = 12;
        t3.basePrice = 200;
        t3.priceGrowthFactor = 1.25;
        let t4 = new PlantLevel();
        t4.name = "薰衣草";
        t4.baseHpPerSec = 30;
        t4.basePrice = 500;
        t4.priceGrowthFactor = 1.25;
        let t5 = new PlantLevel();
        t5.name = "向日葵";
        t5.baseHpPerSec = 80;
        t5.basePrice = 1200;
        t5.priceGrowthFactor = 1.25;

        let t6 = new PlantLevel();
        t6.name = "满天星";
        t6.baseHpPerSec = 120;
        t6.basePrice = 2000;
        t6.priceGrowthFactor = 1.25;

        let t7 = new PlantLevel();
        t7.name = "魔法花";
        t7.baseHpPerSec = 300;
        t7.basePrice = 3000;
        t7.priceGrowthFactor = 1.25;

        this.gamePlatLevelDef.push(t1);
        this.gamePlatLevelDef.push(t2);
        this.gamePlatLevelDef.push(t3);
        this.gamePlatLevelDef.push(t4);
        this.gamePlatLevelDef.push(t5);
        this.gamePlatLevelDef.push(t6);
        this.gamePlatLevelDef.push(t7);
    }
}

//封装存储对象
export class Storage {
    //获取
    public static async getItem(key: string): Promise<string> {
        if (typeof window !== 'undefined' && window.api) {
            //electron环境
            return await window.api.storageGet(key)
        } else {
            return sys.localStorage.getItem(key)
        }
    }
    //存入
    public static async setItem(key: string, value: string): Promise<boolean> {
        if (typeof window !== 'undefined' && window.api) {
            //electron环境
            return await window.api.storageSet(key, value)
        } else {
            sys.localStorage.setItem(key, value);
            return true;
        }
    }
}
//数据定义 游戏数据
export class GameData {
    public hpValue: number;
    public baseSpeed: number; //基础收益
    public plants: Array<Plant> = [];//盆栽数据
    public bag: Array<BagItem> = [];//背包数据
}
//数据定义 盆栽实体
export class Plant {
    public name: string;
    public level: number;
    // public speed: number; //产生能量的速度 速度查询 数值策划数据获得根据等级来
    public isUnLocked: boolean;//是否解锁
    public seedCount: number;//拥有种子数
    public unLockNeedSeedName: string;//解锁所需种子名称 默认都只需要一个种子
    //public unLockPlantNum: number;//解锁所需盆栽植物数量

    public constructor(name: string, level: number, isUnLocked: boolean, unLockNeedSeedName: string) {
        this.name = name;
        this.level = level;
        //this.speed = speed;
        this.isUnLocked = isUnLocked;
        this.seedCount = 0;
        this.unLockNeedSeedName = unLockNeedSeedName;
        // this.unLockPlantName = unLockPlantName;
        // this.unLockPlantNum = unLockPlantNum;
    }
}
//盆栽等级数值策划
export class PlantLevel {
    public name: string;
    public baseHpPerSec: number;//基础每秒收益
    public basePrice: number;//初始价格
    public priceGrowthFactor: number;//价格增长因子(1.25)
}

//背包物品
export class BagItem {
    //物品名称
    public name: string; //xx种子
    //物品数量
    public count: number;
    //todo 后续扩展icon

    public constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
}