import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 점수 기록 함수
function writeScore(userId, nickname, wpm, errors) {
  const scoresRef = ref(db, 'scores');
  push(scoresRef, { userId, nickname, wpm, errors, timestamp: Date.now() });
}

// --- index.html (참가자 페이지) 로직 ---
if (document.getElementById('typingArea')) {
  const promptEl = document.getElementById('prompt');
  const areaEl   = document.getElementById('typingArea');
  const startBtn = document.getElementById('startBtn');
  const nicknameInput = document.getElementById('nickname');

  const sample = "The quick brown fox jumps over the lazy dog.";
  promptEl.textContent = sample;

  startBtn.addEventListener('click', () => {
    areaEl.disabled = false;
    areaEl.focus();
    const startTime = Date.now();

    areaEl.addEventListener('input', () => {
      if (areaEl.value === sample) {
        const durationSec = (Date.now() - startTime) / 1000;
        const wpm = Math.round((sample.split(' ').length / durationSec) * 60);
        const errors = Array.from(areaEl.value).filter((c,i) => c !== sample[i]).length;
        const nickname = nicknameInput.value.trim() || '익명';
        writeScore(Date.now().toString(), nickname, wpm, errors);
        alert(`완료! WPM: ${wpm}, 오타: ${errors}`);
        areaEl.disabled = true;
      }
    }, { once: true });
  });
}

// --- scoreboard.html (랭킹 페이지) 로직 ---
if (document.getElementById('rankList')) {
  const tbody = document.getElementById('rankList');
  const scoresRef = ref(db, 'scores');

  onValue(scoresRef, snapshot => {
    const data = snapshot.val() || {};
    const arr = Object.values(data);
    arr.sort((a,b) => b.wpm - a.wpm || a.errors - b.errors);
    tbody.innerHTML = '';
    arr.forEach((s,i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${s.nickname}</td><td>${s.wpm}</td><td>${s.errors}</td>`;
      tbody.appendChild(tr);
    });
  });
}

// --- admin.html (운영자 대시보드) 로직 ---
if (document.getElementById('activeUsers')) {
  const activeEl = document.getElementById('activeUsers');
  const statusEl = document.getElementById('gameStatus');
  const scoresRef = ref(db, 'scores');

  onValue(scoresRef, snapshot => {
    const count = snapshot.size || Object.keys(snapshot.val()||{}).length;
    activeEl.textContent = `${count} 명`;
    statusEl.textContent = snapshot.exists() ? '진행 중' : '대기 중';
  });

  window.resetGame = () => {
    set(scoresRef, null);
    alert('게임이 초기화되었습니다');
  };
}
