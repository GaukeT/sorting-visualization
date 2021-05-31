let fullArray = [];
let fullArraySize;
let sW = 20;

let button;
let slider;
let sort;
let done;
let curr;

function setup() {
  createCanvas(600, 300);
  textSize(32);
  colorMode(HSB);
  setupSlider();
  resetButton();
  bubbleSortButton();
//  quickSortButton();
  createUnsortedArray();
}

function draw() {
  background(25);

  let val = slider.value();
  if (val !== sW) {
    sW = val;
    createUnsortedArray();
  }

  for(let i = 0; i < fullArray.length; i++) {
    if (curr !== i) stroke(fullArray[i], 255, 255);
    else stroke(0);
    
    line(i*sW+sW/2, height, i*sW+sW/2, height - fullArray[i]);
  }
  if (sort) sort();
  if (done) finished();
}

function createUnsortedArray() {
  done = false;
  sort = undefined;
  curr = -1;
  
  strokeWeight(sW);
  fullArraySize = width / sW;
  
  for(let i = 0; i < fullArraySize; i++) {
    fullArray[i] = random(height*0.95);
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

// bubble sort
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
  if (fullArray[curr] > fullArray[curr+1]) {
    swap(curr, curr+1);
  }

  curr++;

  if (curr >= fullArraySize) {
    fullArraySize--;
    if (fullArraySize !== 0) curr = 0;
    else curr = -1;
  }

  if (fullArraySize < 0) {
    done = true;
  }
}

// quick sort
function quickSortButton() {
  button = createButton('Quick Sort');
  button.position(185, 320);
  button.mousePressed(startQuickSort);

  button.style('border', 'none');
  button.style('padding', '6px 10px');
  button.style('border-radius', '6px');
  button.style('transition-duration', '0.4s');
}

function startQuickSort() {
  sort = quickSort;
}

function quickSort() {
  qSort(0, fullArray.length - 1);
}

function qSort(start, end) {
    if (start >= end) return;

    let index = partition(start, end);
    qSort(start, index - 1);
    qSort(index + 1, end)
}

function partition(arr, start, end) {
    let pivotIndex = start;
    let pivotValue = fullArray[end];

    for(let i = start; i <= end; i++) {
        if(fullArray[i] < pivotValue) {
            swap(i, pivotIndex);
            pivotIndex++;
        }
    }
    swap(end, pivotIndex);
    return pivotIndex;
}

// array swapping
function swap(first, second) {
    let copy = fullArray[first];
    fullArray[first] = fullArray[second];
    fullArray[second] = copy;
}

// finished sorting
function finished() {
  curr = -1;
  sort = undefined;
  noStroke();
  fill(0, 100, 150);
  text('Sorted!', 10, 35);
}

function setupSlider() {
  // createSlider(min, max, default, step_size);
  slider = createSlider(5, 50, 20, 5);
  slider.position(10, 360);
  slider.style('width', '100px');
}
