class RevoluteBehavior{

    constructor(instance, keyinstance){
        this._engine = instance;
        this._inputs = keyinstance;
    }

    plataformMoviment(UID){
        if(this._inputs.isKeyPressed('ArrowRight')){
            let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
            let object = this._engine._containerActionEnvoriment[findedIndex];
            object.px += 3; 
        }
        if(this._inputs.isKeyPressed('ArrowLeft')){
            let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
            let object = this._engine._containerActionEnvoriment[findedIndex];
            object.px -= 3; 
        }
        if(this._inputs.isKeyPressed('ArrowUp')){
            let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
            let object = this._engine._containerActionEnvoriment[findedIndex];
            object.py -= 15; 
        }
    }

}