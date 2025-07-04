
let prevX = 0;
let prevY = 0;


function isOverlappingWithText(x, y) {
  
  const textElements = document.querySelectorAll('h1, ul, li, a, .section');
  
  
  const tempElement = document.createElement('div');
  tempElement.style.position = 'absolute';
  tempElement.style.left = x + 'px';
  tempElement.style.top = y + 'px';
  tempElement.style.width = '40px';
  tempElement.style.height = '40px';
  tempElement.style.pointerEvents = 'none';
  tempElement.style.visibility = 'hidden';
  document.body.appendChild(tempElement);
  
 
  const tempRect = tempElement.getBoundingClientRect();
  let isOverlapping = false;
  
  for (const element of textElements) {
    const rect = element.getBoundingClientRect();
    if (!(tempRect.right < rect.left || 
          tempRect.left > rect.right || 
          tempRect.bottom < rect.top || 
          tempRect.top > rect.bottom)) {
      isOverlapping = true;
      break;
    }
  }
  

  document.body.removeChild(tempElement);
  return isOverlapping;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randomPosition() {
  const emoji = document.getElementById('emoji');
  if (!emoji) return; // 
  
  // Используем viewport width/height с отступами для безопасности
  const maxX = window.innerWidth - 60;
  const maxY = window.innerHeight - 60;
  
  let x, y;
  let attempts = 0;
  let validPosition = false;
  
  while (!validPosition && attempts < 20) {
   
    // Ограничиваем координаты, чтобы смайлик всегда оставался в видимой области
    x = Math.max(20, Math.min(Math.random() * maxX, maxX));
    y = Math.max(20, Math.min(Math.random() * maxY, maxY));
    
    
    const distance = getDistance(x, y, prevX, prevY);
    if (!isOverlappingWithText(x, y) && (distance >= 300 || attempts > 15)) {
      validPosition = true;
    }
    
    attempts++;
  }
  
  
  prevX = x;
  prevY = y;
  

  emoji.style.position = 'fixed'; 
  emoji.style.transition = 'left 1s ease, top 1s ease, opacity 0.5s ease'; 
  emoji.style.left = x + 'px';
  emoji.style.top = y + 'px';
  emoji.style.zIndex = '1000';
  
 
  setTimeout(() => {
    emoji.style.opacity = '0.3';
    setTimeout(() => {
      emoji.style.opacity = '1';
    }, 500);
  }, 1000);
}


setInterval(randomPosition, 2000);

window.onload = function() {
 
  const emoji = document.getElementById('emoji');
  if (emoji) {
    
    emoji.style.position = 'fixed';
    emoji.style.zIndex = '1000';
    emoji.style.fontSize = '3dvh';
    emoji.style.pointerEvents = 'none';
    emoji.style.color = 'white';
    emoji.style.transition = 'left 1s ease, top 1s ease, opacity 0.5s ease'; 
    
    
    randomPosition();
  }
};