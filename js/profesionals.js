'use strict'
const mentorsCards = document.getElementById('mentors__cards');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
let allCards = [];

const mainCategories = ['Clinical Psychology','Holistic Healing','Life Coaching','Meditation','Career Guidance'];
const areas = ['Anxiety & Depression','Trauma & PTSD','Relationship Coaching','Mindfulness'];

function createCard(dr) {
  const specialty = mainCategories[Math.floor(Math.random() * mainCategories.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const availableNow = Math.random() > 0.5;
  const availabilityType = availableNow ? 'now' : (Math.random() > 0.5 ? 'evenings' : 'both');

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.specialty = specialty;
  card.dataset.area = area;
  card.dataset.available = String(availableNow);
  card.dataset.availabilityType = availabilityType;

  card.innerHTML = `
    <img class="card__image" src="${dr.picture.large}" alt="${dr.name.first} ${dr.name.last}">
    <div class="card__info flex-column">
      <h3 class="text--sm">${dr.name.first} ${dr.name.last}</h3>
      <small class="mentor-specialty">${specialty} • <span class="mentor-area">${area}</span></small>
      <span>Age: ${dr.dob.age}</span>
      <span>Country: ${dr.location.country}</span>
      <span>Email: ${dr.email}</span>
    </div>
  `;

  return card;
}

fetch('https://randomuser.me/api/?results=12')
  .then(r => r.json())
  .then(data => {
    data.results.forEach(dr => {
      const card = createCard(dr);
      mentorsCards.appendChild(card);
    });
    allCards = Array.from(mentorsCards.querySelectorAll('.card'));
    filterCards();
  })
  .catch(err => console.error(err));

function filterCards() {
  if (!allCards.length) return;
  const q = searchInput.value.trim().toLowerCase();
  const activeBtn = document.querySelector('.mentors__categories .btn.active');
  const category = activeBtn ? activeBtn.textContent.trim() : 'All Mentors';
  const selectedAreas = Array.from(document.querySelectorAll('.filter-specialization:checked')).map(i => i.value);
  const wantAvailableNow = !!document.querySelector('.filter-availability[value="available_now"]')?.checked;
  const wantEvenings = !!document.querySelector('.filter-availability[value="evenings_weekends"]')?.checked;

  allCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const matchesQuery = q === '' || text.includes(q);
    const matchesCategory = category === 'All Mentors' || card.dataset.specialty === category;
    const matchesArea = selectedAreas.length === 0 || selectedAreas.includes(card.dataset.area);
    let matchesAvailability = true;

    if (wantAvailableNow && !wantEvenings) {
      matchesAvailability = card.dataset.available === 'true';
    } else if (!wantAvailableNow && wantEvenings) {
      matchesAvailability = card.dataset.availabilityType === 'evenings' || card.dataset.availabilityType === 'both';
    } else if (wantAvailableNow && wantEvenings) {
      matchesAvailability = card.dataset.available === 'true' || card.dataset.availabilityType === 'evenings' || card.dataset.availabilityType === 'both';
    }

    card.style.display = (matchesQuery && matchesCategory && matchesArea && matchesAvailability) ? '' : 'none';
  });
}

searchBtn.addEventListener('click', filterCards);
searchInput.addEventListener('input', filterCards);

document.querySelectorAll('.mentors__categories .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mentors__categories .btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCards();
  });
});

document.querySelectorAll('.filter-specialization, .filter-availability').forEach(cb => cb.addEventListener('change', filterCards));