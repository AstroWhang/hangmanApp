const Board = ( () => {

  // state
  let livesLeft = null;
  // dynamic doesn't exist yet until actually running, this is why we can't cache the dom yet
  let canvas;
  let context;

  const init = () => {
    canvas = document.querySelector('.hangman__board');
    context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.strokeStyle = "white";
    basePlatform();
  }

  const basePlatform = () => {
    line1();
    line2();
    line3();
  }

  const draw = (startX, startY, endX, endY) => {
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }

  const line1 = () => draw(0, 150, 150, 150);

  const line2 = () => draw(10, 0, 10, 300);

  const line3 = () => draw(0, 5, 70, 5);

  const rope = () => draw(60, 5, 60, 15)

  const torso = () => draw(60, 36, 60, 70);

  const rightArm = () => draw(60, 46, 100, 50);

  const leftArm = () => draw(60, 46, 20, 50);

  const rightLeg = () => draw(60, 70, 100, 100);

  const leftLeg = () => draw(60, 70, 20, 100);

  const head = () => {
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2);
    context.stroke();
  }

  const parts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, rope];

  const render = () => {
    parts[livesLeft]();
  }

  // const state = {
  //   livesLeft: null
  // }

  // const setState = (obj) => {
  //   state.livesLeft = obj.newLives
  // }

  const setLives = newLives => {
    livesLeft = newLives;
    render();
  }


  return {
    setLives,
    init
    // setState
  }
  
})();

export default Board