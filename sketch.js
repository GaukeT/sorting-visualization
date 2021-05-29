let arr = [];
let arrSize;
let StrokeWeight = 15;

let button;
let sort;
let curr;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB);
  resetButton();
  bubbleSortButton();
  createUnsortedArray();
}

function draw() {
  background(25);
  
  for(let i = 0; i < arr.length; i++) {
    if (curr !== i) stroke(arr[i], 255, 255);
    else stroke(0);
    
    line(i*StrokeWeight+StrokeWeight/2, height, i*StrokeWeight+StrokeWeight/2, height - arr[i]);
  }
  if (sort) sort();
}

function createUnsortedArray() {
  sort = undefined;
  curr = -1;
  
  strokeWeight(StrokeWeight);
  arrSize = width / StrokeWeight;
  
  for(let i = 0; i < arrSize; i++) {
    arr[i] = random(height*0.95);
  }
}

function resetButton() {
  button = createButton('Reset');
  button.position(10, 320);
  button.mousePressed(createUnsortedArray);

  button.style('border', 'none');
  button.style('padding', '6px 10px');
  button.style('border-radius', '6px');
  button.style('transition-duration', '0.4s');
}

function bubbleSortButton() {
  button = createButton('Bubble Sort');
  button.position(80, 320);
  button.mousePressed(startBubbleSort);

  button.style('border', 'none');
  button.style('padding', '6px 10px');
  button.style('border-radius', '6px');
  button.style('transition-duration', '0.4s');

}

function startBubbleSort() {
  sort = bubbleSort;
}

function bubbleSort() {
  if (arr[curr] > arr[curr+1]) {
    let copy = arr[curr];
    arr[curr] = arr[curr+1];
    arr[curr+1] = copy;
  }

  curr++;

  if (curr >= arrSize) {
    arrSize--;
    if (arrSize !== 0) curr = 0;
    else curr = -1;
  }

  if (arrSize < 0) {
    noLoop();
    noStroke();
    textSize(32);
    text('Sorted!', 10, 30);
  }
}
