class Revolute{

    constructor(engine, attRate){
        this._engine = engine;
        this._drawboard = engine.getContext('2d');
        this._updateUID = null;
        this._actualUID = 0;
        this._attRate = attRate;
        this._containerWorldEnvoriment = [];
        this._containerActionEnvoriment = [];
        this._physicEngine = null;
        this._physicCategory = {
            dinamic: this.addPhysicDinamic.bind(this)
        };
    }

    Drawing(){
    /* 
    Inicializa o loop de renderização baseado em uma lista de objetos
    { this._updateUID }, armazena o ID do loop de renderização iniciado
    */

        this._updateUID = setInterval(() => {
            this._drawboard.clearRect(0,0, this._engine.width, this._engine.height);
            for(const item of this._containerActionEnvoriment){
                this._drawboard.fillStyle = item.color;
                this._drawboard.fillRect(
                    item.px ? item.px : 0,
                    item.py ? item.py : 0,
                    item.dx ? item.dx : 0,
                    item.dy ? item.dy : 0
                );
                // this._physicEngine.dinamicPhysic(0);
                this._physicCategory[item.physic](item.UID);
            }
        }, this._attRate);
        
    }

    refreshDrawing(){
    // Recarrega o loop de repetição para alterações em parametros do motor
        if(this._updateUID !== null){
            clearInterval(this._updateUID);
            this.Drawing();
            console.log(`DONE: Loop de repetição reiniciado com o rate: ${this._attRate}ms`)
        }
        else{console.log('WARNING: Não a loops de repetição ativos');}
    }

    StopDrawing(){
    // Atraves do ID encherra o loop de renderização                                                                                                                                                                    
        if(this._updateUID !== null){
            try{
                clearInterval(this._updateUID);
            }
            catch(err){
                console.log('NOT: Não foi possivel encerrar o loop de desenho')
            }
        }
        else{console.log('WARNING: Não a loops de repetição ativos');}
    }

    setRendererScale(scale = []){
    // Modifica o tamanho da tela

        if(scale.length == 0){
            this._engine.width = document.body.clientWidth;
            this._engine.height = document.body.clientHeight;
        }
        else{
            this._engine.width = scale[0];
            this._engine.width = scale[1];
        }

    }

    setRateTo(rate){
    // Modifica o ratetime de renderização da pagina
        this._attRate = rate;
        this.refreshDrawing();
    }

    setPhysicEngine(instace){
    // Adiciona o motor fisico ao renderizador
        this._physicEngine = instace;
    }
    
    addPhysicDinamic(data){
        this._physicEngine.dinamicPhysic(data);
    }

    getActionObjects(){
    // Listar objetos que possuem ações
        return this._containerActionEnvoriment;
    }

    getWorldObjects(){
    // Listar objetos do bloco mundial
        return this._containerWorldEnvoriment;
    }

    addActionObject(item = {UID: this._actualUID, name: 'noname', px: 32, py: 32, dx: 32, dy: 32, color: 'black', physic: 'dinamic'}){
    // Cria um objeto interativo com base no objeto passado, por padrão gera um cubo preto.
        this._containerActionEnvoriment.push(item);
        this._actualUID += 1;
    }

}