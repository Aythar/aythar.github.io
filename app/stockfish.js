document.getElementById('app').innerHTML = `
  <button onclick="startGame()">ابدأ اللعبة</button>
`;

function startGame() {
  alert("تم بدء لعبة الشطرنج!");
  initGame();
}

let game; // لتخزين حالة اللعبة

// تهيئة اللعبة
function initGame() {
  game = new Chess(); // استخدام مكتبة chess.js
  renderBoard();
}

// تهيئة اللوحة وعرضها
function renderBoard() {
  const board = document.getElementById('app');
  board.innerHTML = `
    <div>
      <h2>الآن العب ضد الذكاء الاصطناعي</h2>
      <button onclick="playerMove('e2', 'e4')">إبدأ النقلات</button>
    </div>
  `;
}

// عملية نقلة اللاعب
function playerMove(from, to) {
  const move = game.move({ from, to });

  if (move) {
    renderBoard();
    setTimeout(aiMove, 2000); // تأخير نقلة الذكاء الاصطناعي
  } else {
    alert("النقلة غير صالحة");
  }
}

// نقلة الذكاء الاصطناعي (باستخدام مكتبة Stockfish أو Chess.js AI)
function aiMove() {
  const bestMove = game.ugly_move(game.analysedMoves());
  game.ugly_move(bestMove);
  renderBoard();
}
