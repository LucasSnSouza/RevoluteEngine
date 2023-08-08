class RevolutePhysic{
    
    constructor(instace){
        this._engine = instace;
        this._gravity = 9;
    }

    dinamicPhysic(UID){
    // Adiciona a fisica dinamica simples aos objetos
        let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
        this._engine._containerActionEnvoriment[findedIndex].py += this._gravity;
    }

}