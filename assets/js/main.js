document.addEventListener('DOMContentLoaded', () => {
  // --- 요소 참조 ---
  const nameModal      = document.getElementById('nameModal');
  const nameInput      = document.getElementById('nameInput');
  const saveNameBtn    = document.getElementById('saveNameBtn');
  const greeting       = document.getElementById('greeting');

  const setterSection  = document.getElementById('setterSection');
  const targetInput    = document.getElementById('targetInput');
  const setTargetBtn   = document.getElementById('setTargetBtn');

  const contestSection = document.getElementById('contestSection');
  const targetText     = document.getElementById('targetText');
  const userInput      = document.getElementById('userInput');
  const highlighted    = document.getElementById('highlighted');
  const passButton     = document.getElementById('passButton');

  // --- 1) 이름 등록 ---
  let userName = localStorage.getItem('userName');
  if (!userName) {
    nameModal.style.display = 'flex';
  } else {
    initUser(userName);
  }

  saveNameBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
      localStorage.setItem('userName', name);
      nameModal.style.display = 'none';
      initUser(name);
    }
  });

  function initUser(name) {
    greeting.textContent = `${name}님, 환영합니다!`;
    setterSection.classList.remove('hidden');
  }

  // --- 2) 출제자가 문제 설정 ---
  let target = '';
  setTargetBtn.addEventListener('click', () => {
    target = targetInput.value;
    if (target) {
      setterSection.classList.add('hidden');
      contestSection.classList.remove('hidden');
      targetText.textContent = target;
      userInput.focus();
    }
  });

  // --- 3) 참가자 입력 실시간 채점 ---
  userInput.addEventListener('input', () => {
    const val = userInput.value;
    highlighted.innerHTML = '';
    let allMatch = true;

    for (let i = 0; i < val.length; i++) {
      const span = document.createElement('span');
      // 문자 비교
      if (i < target.length && val[i] === target[i]) {
        span.className = 'correct';
      } else {
        span.className = 'incorrect';
        allMatch = false;
      }
      span.textContent = val[i];
      highlighted.appendChild(span);
    }
    // 길이가 맞지 않으면 아직 완성 아님
    if (val.length !== target.length) allMatch = false;
    passButton.disabled = !allMatch;
  });
});
