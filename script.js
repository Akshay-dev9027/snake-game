let playground = document.getElementById('playground')
let startbutton = document.getElementById("btn");
let CurrentScore = document.getElementById("score")
let hscore = document.getElementById("highscore")
console.log(playground)

let score = 0;
let highScore = Number(localStorage.getItem("score")) || 0;
CurrentScore.textContent = score;
hscore.textContent = highScore;


//column
let VerticalBoxes = Math.floor(playground.clientHeight/50);
//row
let HorizontalBoxes = Math.floor(playground.clientWidth/50);
let grid = []


for(let i=0; i<VerticalBoxes; i++){
    for(let j=0; j<HorizontalBoxes; j++){
    let box = document.createElement('div')
   
    // box.classList.add("box")

    grid[j + "," + i] = box;
  // box.textContent = `${j},${i}`;
    playground.append(box)
    
    }
}


let snake = [
    {x: 2, y:1},
    {x: 1, y:1},
    {x: 0, y:1}
];
let direction = "right";

let foodX;
let foodY;




function renderSnake(){
    snake.forEach((segment)=>{
    grid[segment.x + "," + segment.y].classList.add('snake');
    })
}

let gameInterval

// let head = {...snake[0]}

function startGame(){

    startbutton.setAttribute("disabled" , "true")

   snake = [
        {x: 2, y:1},
        {x: 1, y:1},
        {x: 0, y:1}
    ];
   direction = "right";
   score = 0;
   CurrentScore.textContent = score;
   Object.values(grid).forEach((box) => {
        box.classList.remove("snake", "food");
    });

   renderSnake(); 
   GenerateFood();

    gameInterval = setInterval(()=>{
    let head = {...snake[0]}
    switch(direction){
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
    }
    snake.unshift(head);

     if(head.x < 0 || head.y < 0 || head.x >= HorizontalBoxes || head.y >= VerticalBoxes){
        clearInterval(gameInterval);
        startbutton.removeAttribute("disabled");
        alert("game over")
        return;
    }

    snake.forEach((segment)=>{
          grid[segment.x + "," + segment.y].classList.remove("snake");
    })
    if(foodX===head.x && foodY === head.y){
        grid[foodX + "," + foodY].classList.remove("food");
        score ++;
        CurrentScore.textContent = score;
        if (score > highScore) {
            highScore = score;
            hscore.textContent = highScore;
            localStorage.setItem("score", String(highScore));
        }
        GenerateFood()
    }
    else{
        
        snake.pop();
    }
    renderSnake();

   
   },180)

}

function GenerateFood(){

   // console.log( foodX, foodY ,HorizontalBoxes,VerticalBoxes);

   foodX = Math.floor(Math.random()* HorizontalBoxes);
    foodY = Math.floor(Math.random()* VerticalBoxes);
    
    let onSnake = true;

    while(onSnake){
            foodX = Math.floor(Math.random()* HorizontalBoxes);
    foodY = Math.floor(Math.random()* VerticalBoxes);

    onSnake = snake.some((seg)=> seg.x === foodX && seg.y === foodY);
    }

    if(!onSnake){
        grid[foodX + "," + foodY].classList.add("food")
    }
   
}

window.addEventListener("keydown",(evt)=>{
    console.log(evt.key);
    if(evt.key =="ArrowLeft" && direction != "right") direction = "left";
    if(evt.key =="ArrowRight" && direction != "left") direction = "right";
    if(evt.key =="ArrowDown" && direction != "up") direction = "down";
    if(evt.key =="ArrowUp" && direction != "down") direction = "up";
    
})

