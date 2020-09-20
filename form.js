class Form {

    constructor() {
      this.button = createButton('Ready');
      this.greeting = createElement('h2');
    }
    hide(){
      this.button.hide();
    }
  
    display(){
      var title = createElement('h2')
      title.html("Monkey-Go-Hungry");
      title.position(displayWidth/2+225,5);

      this.button.position(displayWidth/2+30, displayHeight/2);
  
      this.button.mousePressed(()=>{
          gameState="play";
      });
    }
  }