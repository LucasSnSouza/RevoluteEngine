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
            dinamic: this.addPhysicDinamic.bind(this),
            static: this.addPhysicStatic.bind(this)
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
                if(item.physic !== null){
                    this._physicCategory[item.physic](item.UID);
                }                
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

    addPhysicStatic(data){
        this._physicEngine.staticPhysic(data);
    }

    getObjects(target = null){
    /* 
    Listar todos os objetos da cena
    {target} Caso passe um valor ele ira procurar a informação no objeto solicitado
    */
        if(target !== null){
            return this._containerActionEnvoriment.filter((item) => 
                item.name === target ||
                item.color === target ||
                item.physic === target ||
                item.UID === target ||
                item.px === target ||
                item.py === target ||
                item.dx === target ||
                item.dy === target
            );
        }
        else{
            return this._containerActionEnvoriment;
        }
    }

    addObject(
        name = null,
        px = null,
        py = null,
        dx = null,
        dy = null,
        color = null,
        physic = null,
        instance = null,
    ){
    /* 
    Cria um objeto na cena com base nos parametros passados
    {instance} Nessa variavel opcional você passa um objeto montado que será usado para gerar um objeto
    */
        if(instance != null){
            instance['UID'] = this._actualUID;
            this._containerActionEnvoriment.push(instance);
        }
        else{
            const dataObject = {
                UID : this._actualUID,
                name : name != null ? name : "NoName",
                px : px != null ? px : 0,
                py : py != null ? py : 0,
                dx : dx != null ? dx : 32,
                dy : dx != null ? dy : 32,
                color : color != null ? color : 'black',
                physic : physic != null ? physic : null,
            };
            this._containerActionEnvoriment.push(dataObject);
        }
        this._actualUID += 1;        
    }

    setScene(data){
        for(const item of data){
            item['UID'] = this._actualUID;
            this._containerActionEnvoriment.push(item)
            console.log(`ADD: ${item.name} adicionado com o UID ${item.UID}`);
            this._actualUID += 1;
        }
        console.log('DONE: Cenario carregado com sucesso');
    }

}