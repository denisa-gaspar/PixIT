let video;
let isSketchStarted = false;
let pixelSizeSlider;
let selectedButton = null;
let slider = false;
let overUI = false;


function setup() {
  createCanvas(2084, 1800).id('sketchCanvas');
  video = createCapture(VIDEO);
  video.size(width, height);  
  video.hide(); // Hide the captured video feed
  imageMode(CENTER);
 

  // Get the button element by its ID
  let button = document.getElementById('startButton');
  // Add an event listener to the button for the 'click' event
  button.addEventListener('click', startSketch);


}

function draw() {
  if (isSketchStarted) {
    drawPixels();
  
  }

}


function createButtons() {
  let container = document.getElementById('filterButtons');
  container.style.display = 'flex';
  container.addEventListener('mouseenter', function() { overUI = true; });
  container.addEventListener('mouseleave', function() { overUI = false; });

  let labels = ['invert','threshold','posterize','grayscale','blur','multiply','exclusion','remove drawing','no filter'];
  labels.forEach(function(label, i) {
    let btn = createButton(label);
    btn.class('filterButton');
    btn.parent(container);
    btn.mousePressed(function() {
      selectedButton = String(i + 1);
    });
  });
}

function drawPixels() {
  let pixelSize = slider.value();
  //let pixelSize = random(50, 150); //random sized rect
  let pixelInfo = video.get(mouseX, mouseY, pixelSize, pixelSize); 

  if (mouseIsPressed && !overUI) {
    
    pixelInfo = finalFilter(pixelInfo, selectedButton); // Pass selectedButton to finalFilter
    image(pixelInfo, mouseX, mouseY, pixelSize, pixelSize);
    
  }
}


function finalFilter(input, button) {
  let resultImg = createImage(input.width, input.height);
  resultImg.copy(input, 0, 0, input.width, input.height, 0, 0, input.width, input.height);

  blendMode(BLEND); // Reset blend mode to default after any other blend mode selected

  if (button === "1") {
    resultImg.filter(INVERT);

  } else if (button === "2") {
    resultImg.filter(THRESHOLD);

  } else if (button === "3") {
    resultImg.filter(POSTERIZE, 5);

  } else if (button === "4") {
    resultImg.filter(GRAY,8);

  } else if (button === "5") {
    resultImg.filter(BLUR,7);

  } else if (button === "6") {
    blendMode(MULTIPLY);

  } else if (button === "7") {
    blendMode(EXCLUSION);
  
  } else if (button === "8") {
    blendMode(REMOVE);
  
  } else if (button === "9"){

    return input;
  }
  return resultImg;
  
}


function startSketch() {
  isSketchStarted = true;
  // Hide the homepage
  document.getElementById('homepage').style.display = 'none';
  // Show the sketch canvas
  document.getElementById('sketchCanvas').style.display = 'block';
  document.querySelector('video').classList.add('hidden');
  createButtons();

  if (!slider) {
    slider = createSlider(50, 220);
    slider.style('position', 'fixed');
    slider.style('bottom', '20px');
    slider.style('right', '20px');
    slider.style('z-index', '10');
    slider.addClass("slider");
    slider.elt.addEventListener('mouseenter', function() { overUI = true; });
    slider.elt.addEventListener('mouseleave', function() { overUI = false; });
  }

}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'png'); 
  }
}
