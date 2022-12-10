import "./style.css";

const sliderContainer = document.querySelector("#slider") as HTMLElement;
const slides = document.querySelector("#slides") as HTMLElement;

Array.from(slides.children).forEach((child: Element) => {
  (child as HTMLElement).style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
});

///// TODO: Add touch events for mobile devices

sliderContainer.addEventListener("pointerdown", startDrag);
sliderContainer.addEventListener("touchstart", startTouch);
let startPosX = 0,
  newPosX = 0;

function startDrag(e: Event) {
  e.preventDefault();

  startPosX = e.clientX;
  document.addEventListener("pointermove", mouseMove);
  document.addEventListener("pointerup", () => {
    document.removeEventListener("pointermove", mouseMove);
  });
}

function startTouch(e: TouchEvent) {
  e.preventDefault();

  startPosX = e.targetTouches[0].clientX;
  document.addEventListener("touchmove", touchMove);

  sliderContainer.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchstart", startTouch);
  });
  sliderContainer.addEventListener("touchcancel", () => {
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchstart", startTouch);
  });
}
function touchMove(e: TouchEvent) {
  newPosX = startPosX - e.targetTouches[0].clientX;
  startPosX = e.targetTouches[0].clientX;

  let left = slides.offsetLeft - newPosX;
  if (left > 0) {
    left = 0;
  } else if (left < -(slides.scrollWidth - window.innerWidth)) {
    left = -(slides.scrollWidth - window.innerWidth);
  }

  slides.style.left = `${left}px`;
}

function mouseMove(e: MouseEvent) {
  newPosX = startPosX - e.clientX;
  startPosX = e.clientX;

  let left = slides.offsetLeft - newPosX;
  if (left > 0) {
    left = 0;
  } else if (left < -(slides.scrollWidth - window.innerWidth)) {
    left = -(slides.scrollWidth - window.innerWidth);
  }

  slides.style.left = `${left}px`;
}
