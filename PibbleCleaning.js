// Indica se o Pibble ainda está sujo (controle do jogo)
let dirty = true; 

function main() {
  // Aguarda o carregamento completo do DOM antes de executar o código
  document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os elementos principais do jogo
    const dirt = document.getElementById("dirt");      // Sujeira sobre o Pibble
    const bubble = document.getElementById("bubble");  // Espuma que aparece ao limpar
    const water = document.getElementById("water");    // Água que aparece ao enxaguar
    const utensils = [
      document.getElementById("soap"),                 // Sabão
      document.getElementById("shower"),               // Chuveiro
      document.getElementById("towel"),                // Toalha
    ];

    // Variáveis para controle do arrasto e opacidade dos elementos
    let offsetX, offsetY, isDragging = false, currentUtensil = null;
    let dirtOpacity = 1.0, bubbleOpacity = 0, waterOpacity = 0;

    // Adiciona evento de arrastar para cada utensílio
    utensils.forEach(utensil => {
      if (!utensil) return; // Ignora utensílios não encontrados

      // Quando o usuário clica para arrastar o utensílio
      utensil.addEventListener("mousedown", startDrag);
    });

    // Evento para quando o usuário solta o mouse (termina o arrasto)
    document.addEventListener("mouseup", stopDrag);

    // Evento para movimentar o utensílio enquanto arrasta
    document.addEventListener("mousemove", moveUtensil);

    // Função chamada ao iniciar o arrasto de um utensílio
    function startDrag(e) {
      if (!dirty) return; // Não faz nada se o Pibble já estiver limpo
      isDragging = true; // Ativa o modo de arrasto
      currentUtensil = e.target; // Guarda o utensílio atual
      offsetX = e.clientX - currentUtensil.offsetLeft; // Calcula o deslocamento X
      offsetY = e.clientY - currentUtensil.offsetTop;  // Calcula o deslocamento Y
      currentUtensil.style.position = "absolute";      // Muda para posição absoluta durante o arrasto
      currentUtensil.style.zIndex = 10;                // Garante que fique acima dos outros elementos
      currentUtensil.style.cursor = "grabbing";        // Muda o cursor para "grabbing"
    }

    // Função chamada ao soltar o utensílio
    function stopDrag() {
      if (currentUtensil) {
        currentUtensil.style.cursor = "grab";     // Volta o cursor para "grab"
        currentUtensil.style.zIndex = "";         // Remove o z-index extra
        currentUtensil.style.position = "";       // Volta para o layout original do flexbox
        currentUtensil.style.left = "";           // Remove a posição X
        currentUtensil.style.top = "";            // Remove a posição Y
      }
      isDragging = false;       // Desativa o modo de arrasto
      currentUtensil = null;    // Limpa o utensílio atual
    }

    // Função chamada enquanto arrasta o utensílio
    function moveUtensil(e) {
      if (!isDragging || !currentUtensil || !dirty) return; // Só executa se estiver arrastando e sujo

      // Calcula nova posição do utensílio
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      currentUtensil.style.left = x + "px";
      currentUtensil.style.top = y + "px";

      // Sabão faz a sujeira sumir e a espuma aparecer
      if (currentUtensil.id === "soap" &&
        checkCollision(currentUtensil.getBoundingClientRect(), dirt.getBoundingClientRect())) {
        dirtOpacity = Math.max(0, dirtOpacity - 0.01); // Diminui a opacidade da sujeira
        dirt.style.opacity = dirtOpacity;
        bubbleOpacity = Math.min(1, bubbleOpacity + 0.01); // Aumenta a opacidade da espuma
        bubble.style.opacity = bubbleOpacity;
      }

      // Chuveiro faz a espuma sumir e aparece água
      if (currentUtensil.id === "shower" &&
        checkCollision(currentUtensil.getBoundingClientRect(), bubble.getBoundingClientRect())) {
        bubbleOpacity = Math.max(0, bubbleOpacity - 0.02); // Diminui a opacidade da espuma
        bubble.style.opacity = bubbleOpacity;
        waterOpacity = Math.min(1, waterOpacity + 0.02);   // Aumenta a opacidade da água
        water.style.opacity = waterOpacity;
      }

      // Toalha faz a água sumir
      if (currentUtensil.id === "towel" &&
        checkCollision(currentUtensil.getBoundingClientRect(), water.getBoundingClientRect())) {
        waterOpacity = Math.max(0, waterOpacity - 0.02); // Diminui a opacidade da água
        water.style.opacity = waterOpacity;

        // Verifica se todos os elementos estão limpos/invisíveis
        if (dirtOpacity === 0 && bubbleOpacity === 0 && waterOpacity === 0) {
          dirty = false; // Marca como limpo
          endGame();     // Chama função de fim de jogo
        }
      }
    }

    // Função para verificar colisão entre dois elementos (retângulos)
    function checkCollision(rect1, rect2) {
      return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    }

    // Função chamada quando o Pibble está limpo
    function endGame() {
      console.log("✨ O Pibble está limpinho! ✨");

      // Remove todos os eventos para “parar o jogo”
      utensils.forEach(u => u.removeEventListener("mousedown", startDrag));
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("mousemove", moveUtensil);

      // Mostra mensagem final
      alert("O Pibble está limpo! 😄");
    }
  });
}

// Inicia o jogo apenas se o Pibble estiver sujo
if (dirty) { 
    alert("Pibble está sujo, limpe-o! 🧼");
  main();
} else {
    console.log("O Pibble já está limpo!");
}