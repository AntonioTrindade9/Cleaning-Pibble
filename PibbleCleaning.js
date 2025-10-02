const dirt = document.getElementById("dirt");
const soap = document.getElementById("soap");

let offsetX, offsetY;
let isDragging = false;

soap.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - soap.offsetLeft;
    offsetY = e.clientY - soap.offsetTop;
    soap.style.cursor = 'grabbing';
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    soap.style.left = `${e.clientX - offsetX}px`;
    soap.style.top = `${e.clientY - offsetY}px`;

    const rect1 = dirt.getBoundingClientRect();
    const rect2 = soap.getBoundingClientRect();
    if (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
) {
    dirt.style.opacity = 0.1; 
} else {
    dirt.style.opacity = 1;
}
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    soap.style.cursor = 'grab';
});
// ...existing code...


