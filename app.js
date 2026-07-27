const regions = [
  {
    id: "pacific",
    name: "Pacific Network",
    summary: "Strong oceans and trade routes, but high climate exposure.",
    stats: { climate: 68, resources: 58, population: 54, stability: 64 }
  },
  {
    id: "continental",
    name: "Continental Alliance",
    summary: "High population and industry with heavier resource pressure.",
    stats: { climate: 54, resources: 50, population: 72, stability: 62 }
  },
  {
    id: "southern",
    name: "Southern Coalition",
    summary: "Stable institutions and resilient food systems.",
    stats: { climate: 62, resources: 66, population: 48, stability: 70 }
  },
  {
    id: "equator",
    name: "Equatorial Compact",
    summary: "Rich biodiversity and young cities under climate stress.",
    stats: { climate: 50, resources: 70, population: 66, stability: 54 }
  }
];

const events = [
  {
    title: "Heatwave Chain",
    text: "Several regions report record heat. Food systems and public trust are under pressure.",
    pressure: { climate: -8, resources: -4, stability: -3 }
  },
  {
    title: "Energy Breakthrough",
    text: "A new storage method could reduce emissions, but rollout will stretch supply chains.",
    pressure: { climate: 4, resources: -5, stability: 2 }
  },
  {
    title: "Population Surge",
    text: "Cities grow faster than expected. Opportunity rises, but services need support.",
    pressure: { population: 6, resources: -6, stability: -4 }
  },
  {
    title: "Ocean Recovery Window",
    text: "Marine ecosystems show signs of recovery if protection is expanded quickly.",
    pressure: { climate: 5, resources: 3, stability: -2 }
  },
  {
    title: "Supply Shock",
    text: "A global transport disruption makes local production suddenly more important.",
    pressure: { resources: -8, stability: -5 }
  }
];

const actions = [
  {
    name: "Restore Nature",
    summary: "Boost climate resilience and food systems.",
    effect: { climate: 9, resources: 3, population: -1 }
  },
  {
    name: "Build Infrastructure",
    summary: "Strengthen cities and stability at a resource cost.",
    effect: { stability: 8, population: 3, resources: -5 }
  },
  {
    name: "Accelerate Science",
    summary: "Improve long-term options with short-term instability.",
    effect: { climate: 4, resources: 6, stability: -3 }
  },
  {
    name: "Share Resources",
    summary: "Protect stability and population, but spend reserves.",
    effect: { stability: 6, population: 5, resources: -6 }
  }
];

const state = {
  region: null,
  era: 1,
  stats: null,
  event: null,
  log: []
};

const setupPanel = document.querySelector("#setupPanel");
const gamePanel = document.querySelector("#gamePanel");
const regionGrid = document.querySelector("#regionGrid");
const eraTitle = document.querySelector("#eraTitle");
const regionLabel = document.querySelector("#regionLabel");
const meters = document.querySelector("#meters");
const eventCard = document.querySelector("#eventCard");
const actionGrid = document.querySelector("#actionGrid");
const turnSummary = document.querySelector("#turnSummary");
const log = document.querySelector("#log");
const resetButton = document.querySelector("#resetButton");

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function applyEffect(effect) {
  for (const [key, value] of Object.entries(effect)) {
    state.stats[key] = clamp(state.stats[key] + value);
  }
}

function start(region) {
  state.region = region;
  state.era = 1;
  state.stats = { ...region.stats };
  state.log = [`Earth begins with the ${region.name}.`];
  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  nextEvent();
}

function nextEvent() {
  state.event = pick(events);
  applyEffect(state.event.pressure);
  render();
}

function chooseAction(action) {
  applyEffect(action.effect);
  state.log.unshift(`Era ${state.era}: ${action.name}.`);

  if (Object.values(state.stats).some((value) => value <= 0)) {
    state.log.unshift("Earth failed to hold together. Start a new run.");
    render(true);
    return;
  }

  if (state.era >= 12) {
    const average = Math.round(Object.values(state.stats).reduce((sum, value) => sum + value, 0) / 4);
    state.log.unshift(average >= 60 ? "Invincible Earth achieved." : "Earth survived, but only just.");
    render(true);
    return;
  }

  state.era += 1;
  nextEvent();
}

function reset() {
  state.region = null;
  state.stats = null;
  state.event = null;
  state.era = 1;
  state.log = [];
  gamePanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
  renderRegions();
}

function renderRegions() {
  regionGrid.innerHTML = regions.map((region) => `
    <button class="region-card" type="button" data-region="${region.id}">
      <strong>${region.name}</strong>
      <span>${region.summary}</span>
    </button>
  `).join("");

  regionGrid.querySelectorAll("[data-region]").forEach((button) => {
    button.addEventListener("click", () => start(regions.find((region) => region.id === button.dataset.region)));
  });
}

function render(gameOver = false) {
  eraTitle.textContent = gameOver ? "Run Complete" : `Era ${state.era}`;
  regionLabel.textContent = state.region.name;
  turnSummary.textContent = gameOver ? "Start a new Earth or refine the rules." : "Choose your response.";

  meters.innerHTML = Object.entries(state.stats).map(([key, value]) => `
    <div>
      <div class="meter-label"><span>${key}</span><span>${value}</span></div>
      <div class="meter-track"><div class="meter-fill" style="width:${value}%"></div></div>
    </div>
  `).join("");

  eventCard.innerHTML = gameOver
    ? `<strong>End State</strong><p>${state.log[0]}</p>`
    : `<strong>${state.event.title}</strong><p>${state.event.text}</p>`;

  actionGrid.innerHTML = gameOver ? "" : actions.map((action, index) => `
    <button class="action-card" type="button" data-action="${index}">
      <strong>${action.name}</strong>
      <span>${action.summary}</span>
    </button>
  `).join("");

  actionGrid.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => chooseAction(actions[Number(button.dataset.action)]));
  });

  log.innerHTML = state.log.map((entry) => `<p>${entry}</p>`).join("");
}

resetButton.addEventListener("click", reset);
renderRegions();

