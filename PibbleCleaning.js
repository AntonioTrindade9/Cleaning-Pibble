function main() {
    document.addEventListener("DOMContentLoaded", function () {
        const dirt = document.getElementById("dirt");
        const bubble = document.getElementById("bubble");
        const utensils = [
            document.getElementById("soap"),
            document.getElementById("shower"),
            document.getElementById("towel"),
        ];

        let offsetX, offsetY, isDragging = false, currentUtensil = null;
        let dirtOpacity = 1.0;
        let bubbleOpacity = 1.0;

        utensils.forEach(utensil => {
            if (!utensil) return;

            utensil.addEventListener("mousedown", (e) => {
                isDragging = true;
                currentUtensil = utensil;
                offsetX = e.clientX - utensil.offsetLeft;
                offsetY = e.clientY - utensil.offsetTop;
                utensil.style.position = "absolute"; // Só vira absoluto ao arrastar
                utensil.style.zIndex = 10;
                utensil.style.cursor = "grabbing";
            });
        });

       document.addEventListener("mouseup", () => {
    if (currentUtensil) {
        currentUtensil.style.cursor = "grab";
        currentUtensil.style.zIndex = "";
        currentUtensil.style.position = "";
        currentUtensil.style.left = "";
        currentUtensil.style.top = "";
    }
    isDragging = false;
    currentUtensil = null;
});

        document.addEventListener("mousemove", (e) => {
            if (!isDragging || !currentUtensil) return;
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            currentUtensil.style.left = x + "px";
            currentUtensil.style.top = y + "px";

            if (checkCollision(currentUtensil.getBoundingClientRect(), dirt.getBoundingClientRect())) {
                if (dirtOpacity > 0) {
                    dirtOpacity = Math.max(0, dirtOpacity - 0.01);
                    dirt.style.opacity = dirtOpacity;
                }
            }

            if (checkCollision(currentUtensil.getBoundingClientRect(), bubble.getBoundingClientRect())) {
                if (bubbleOpacity < 1) {
                    bubbleOpacity = Math.min(1, bubbleOpacity + 0.2);
                    bubble.style.opacity = bubbleOpacity;
    }
}
        });



        function checkCollision(rect1, rect2) {
            return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom);
        }
    });
}
main();