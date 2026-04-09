import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //生命能量
    @property(Label)
    hpValueLabel:Label;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


