class RevolutePhysic{
    
    constructor(instace){
        this._engine = instace;
        this._gravity = 9;
    }

    setGravity(data){
    // Muda a gravidade do ambiente para um valor espeficiado
        this._gravity = data > 0 ? data : 0.001;
    }

    staticPhysic(UID){
    // Adiciona a fisica statica simples aos objetos
        let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
        let object = this._engine._containerActionEnvoriment[findedIndex];
    }

    dinamicPhysic(UID){
    // Adiciona a fisica dinamica simples aos objetos
        let findedIndex = this._engine._containerActionEnvoriment.findIndex((target) => target.UID === UID);
        let object = this._engine._containerActionEnvoriment[findedIndex];
        object.py += this._gravity;

        if (object.physic === "dinamic") {
            for (const item of this._engine._containerActionEnvoriment) {
                if (item !== object && item.physic === null) {
                    if (
                        object.px + object.dx > item.px &&
                        object.px < item.px + item.dx &&
                        object.py + object.dy > item.py &&
                        object.py < item.py + item.dy
                    ) {
                        object.py = item.py - object.dy;
                    }
                }
            }
        }

    }

}