// 공통 네비게이션 로직 (현재 페이지 표시)
document.addEventListener('DOMContentLoaded', () => {
  const page = document.documentElement.dataset.page;
  document.querySelectorAll('.navbar a').forEach(a => {
    if (a.getAttribute('href').includes(page)) a.classList.add('active');
  });

  // 페이지별 분기
  switch (page) {
    case 'home': initHome(); break;
    case 'users': initUsers(); break;
    case 'prov': initProv(); break;
    case 'administrators': initAdmins(); break;
    case 'info': /* 별도 로직 없음 */ break;
  }
});

// Home 페이지
function initHome() {
  document.getElementById('startContestBtn')
    .addEventListener('click', () => location.href = 'prov.html');
}

// Users 페이지
async function initUsers() {
  const data = await fetch('js/data/users.json').then(r => r.json());
  const container = document.getElementById('usersList');
  data.forEach(u => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<h3>${u.name}</h3><p>Score: ${u.score}</p>`;
    container.appendChild(card);
  });
}

// Prov 페이지
async function initProv() {
  const data = await fetch('js/data/prov.json').then(r => r.json());
  const container = document.getElementById('provList');
  data.forEach(p => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<h3>${p.id}. ${p.title}</h3><p>${p.desc}</p>`;
    container.appendChild(card);
  });
  document.getElementById('addProvBtn')
    .addEventListener('click', () => alert('Problem 추가 기능 준비 중'));
}

// Admins 페이지
async function initAdmins() {
  await initUsers(); // 사용자 목록
  await initProv();  // 문제 목록
}
