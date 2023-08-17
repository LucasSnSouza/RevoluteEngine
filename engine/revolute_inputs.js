class RevoluteInputs{

    constructor(){
        this._keyPressed = {};

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);

    }

    handleKeyDown(event) {
        this._keyPressed[event.key] = true;
    }

    handleKeyUp(event) {
        this._keyPressed[event.key] = false;
    }

    isKeyPressed(key){
        return this._keyPressed[key] === true;
    }

}