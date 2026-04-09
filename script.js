
const docID = "1KU9GaYjuekd0Lk457vTDkHoLQknf3g3mdXwpTbmIR1Y";
const docURL = `https://docs.google.com/document/d/${docID}/export?format=txt`;

async function loadContent() {
    try {
      const res = await fetch(docURL);
      const text = await res.text();
  
      const cleanText = text.replace(/^\ufeff/, ""); 
  
      const lines = cleanText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 2);
  
      const board = document.getElementById("board");
      const ticker = document.getElementById("tickerText");
  
    
      if (!board || !ticker) {
          console.warn("Billboard elements not found. Skipping update.");
          return;
      }
  
      // custom message for the ticker
      ticker.innerHTML = "✦ WELCOME TO THE BILLBOARD ✦ CLICK SUBMIT TO ADD TO THE BOARD! ✦";
  
      board.innerHTML = "";
      lines.reverse().forEach(line => {
       
        if(line.startsWith("==")) return; 
  
        const div = document.createElement("div");
        div.className = "post";
        div.innerText = line; 
        board.appendChild(div);
      });
    } catch (error) {
      console.error("Error fetching doc:", error);
    }
  }
  
  loadContent();
  setInterval(loadContent, 5000);

