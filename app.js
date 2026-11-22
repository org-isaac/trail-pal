// ------------------------------------------------------------
// Tabs: show one calculator panel at a time.
// ------------------------------------------------------------
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function activateTab(activeTab, moveFocus = false) {
  tabs.forEach((tab) => {
    const isActive = tab === activeTab;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));

    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    panel.hidden = !isActive;
  });

  if (moveFocus) {
    activeTab.focus();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));

  // Support left/right arrows and Home/End for keyboard users.
  tab.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(tab);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

// ------------------------------------------------------------
// Shared helpers for displaying results and validation messages.
// ------------------------------------------------------------
function showError(element, message) {
  element.textContent = message;
  element.hidden = message.length === 0;
}

function clearResult(resultElement, noteElement, note) {
  resultElement.textContent = '—';
  noteElement.textContent = note;
}

function formatMetres(metres, decimalPlaces = 1) {
  return `${new Intl.NumberFormat(undefined, {
    maximumFractionDigits: decimalPlaces,
  }).format(metres)} m`;
}

// ------------------------------------------------------------
// Treadmill calculator.
// Assumption: incline level is a percentage grade (e.g. 5 = 5%).
// The result recalculates whenever either input changes.
// ------------------------------------------------------------
const inclineInput = document.getElementById('incline-level');
const distanceInput = document.getElementById('distance-km');
const treadmillError = document.getElementById('treadmill-error');
const treadmillResult = document.getElementById('treadmill-result');
const treadmillNote = document.getElementById('treadmill-note');

function updateTreadmillResult() {
  showError(treadmillError, '');

  const inclineValue = inclineInput.value;
  const distanceValue = distanceInput.value.trim();

  // Nothing entered yet: keep the initial prompt visible.
  if (inclineValue === '' && distanceValue === '') {
    clearResult(
      treadmillResult,
      treadmillNote,
      'Enter your incline and distance to see your climb.'
    );
    return;
  }

  // If a distance has been entered, an incline is also required.
  if (inclineValue === '' && distanceValue !== '') {
    clearResult(treadmillResult, treadmillNote, 'Choose an incline to complete the calculation.');
    showError(treadmillError, 'Choose an incline level from 1% to 12%.');
    return;
  }

  // An incline can be selected before the distance is entered.
  if (distanceValue === '') {
    clearResult(treadmillResult, treadmillNote, 'Now enter your distance in kilometres.');
    return;
  }

  const distanceKm = Number(distanceValue);

  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    clearResult(treadmillResult, treadmillNote, 'Enter a valid distance to calculate your climb.');
    showError(treadmillError, 'Distance must be greater than 0 km.');
    return;
  }

  const inclinePercent = Number(inclineValue);
  const distanceMetres = distanceKm * 1000;
  const elevationGain = distanceMetres * (inclinePercent / 100);

  treadmillResult.textContent = formatMetres(elevationGain, 1);
  treadmillNote.textContent = `${distanceKm.toLocaleString()} km at ${inclinePercent}% incline.`;
}

// 'input' updates as the user types; 'change' also covers dropdown selection.
inclineInput.addEventListener('change', updateTreadmillResult);
distanceInput.addEventListener('input', updateTreadmillResult);
distanceInput.addEventListener('change', updateTreadmillResult);

// ------------------------------------------------------------
// Stair stepper calculator: 3.25 metres per floor.
// The result recalculates whenever the floor count changes.
// ------------------------------------------------------------
const floorInput = document.getElementById('floor-count');
const stairsError = document.getElementById('stairs-error');
const stairsResult = document.getElementById('stairs-result');
const stairsNote = document.getElementById('stairs-note');
const METRES_PER_FLOOR = 3.25;

function updateStairsResult() {
  showError(stairsError, '');

  const floorsValue = floorInput.value.trim();

  // Keep the default prompt until the user enters something.
  if (floorsValue === '') {
    clearResult(stairsResult, stairsNote, 'Enter your floors to see your climb.');
    return;
  }

  const floors = Number(floorsValue);

  if (!Number.isSafeInteger(floors) || floors < 0) {
    clearResult(stairsResult, stairsNote, 'Enter a whole number of floors to calculate your climb.');
    showError(stairsError, 'Enter a whole number of floors (zero or more).');
    return;
  }

  const elevationGain = floors * METRES_PER_FLOOR;
  stairsResult.textContent = formatMetres(elevationGain, 2);
  stairsNote.textContent = `${floors.toLocaleString()} floors × 3.25 m per floor.`;
}

floorInput.addEventListener('input', updateStairsResult);
floorInput.addEventListener('change', updateStairsResult);
