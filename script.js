let menuItems = [
  {
    id: 1,
    category: 'Burgers',
    name: 'Classic Burger',
    price: 119,
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    description: 'Smörad brioche, ost, pickles och McDonalds hemliga sås.'
  },
  {
    id: 2,
    category: 'Burgers',
    name: 'Double Smash',
    price: 159,
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    description: 'Två grillade burgare, cheddar, lök och crispy bacon.'
  },
  {
    id: 3,
    category: 'Burgers',
    name: 'Chicken Burger',
    price: 129,
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=80',
    description: 'Krispig kyckling, ranch, sallad och tomat.'
  },
  {
    id: 4,
    category: 'Drinks',
    name: 'Fanta Zero',
    price: 29,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
    description: 'Kall och fräsch dryck perfekt till burgaren.'
  },
  {
    id: 5,
    category: 'Drinks',
    name: 'Coca-Cola',
    price: 29,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f2b7420a?auto=format&fit=crop&w=1200&q=80',
    description: 'Klassisk coladryck med iskallt lager.'
  },
  {
    id: 6,
    category: 'Drinks',
    name: 'Ice Tea',
    price: 34,
    emoji: '🧊',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Lätt och uppfriskande te med citron.'
  },
  {
    id: 7,
    category: 'Fries',
    name: 'Fries Deluxe',
    price: 59,
    emoji: '🍟',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1200&q=80',
    description: 'Krispiga pommes med parmesan och örtsalt.'
  },
  {
    id: 8,
    category: 'Fries',
    name: 'Loaded Fries',
    price: 69,
    emoji: '🔥',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
    description: 'Pommes med ost, bacon och BBQ-sås.'
  },
  {
    id: 9,
    category: 'Extras',
    name: 'Dip Box',
    price: 19,
    emoji: '🥫',
    image: 'https://images.unsplash.com/photo-1604908814940-4d2d1d33d9d6?auto=format&fit=crop&w=1200&q=80',
    description: 'Kryddig dip mix med aioli, BBQ och chili.'
  },
  {
    id: 10,
    category: 'Extras',
    name: 'Onion Rings',
    price: 39,
    emoji: '🧅',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    description: 'Lökringar med krispig panering och dip.'
  },
  {
    id: 11,
    category: 'Extras',
    name: 'McDonalds Combo',
    price: 179,
    emoji: '🍔',
    image: '',
    description: 'Burger, pommes och dryck i ett komplett combo.'
  }
];

const cart = [];
const adminUsers = [
  { username: 'shiftadmin', password: 'admin123', role: 'Shift Admin' },
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'superadmin', password: 'superadmin123', role: 'Super-Admin' },
  { username: 'erkanbra', password: 'erkan123', role: 'Owner' }
];

// Load employees from localStorage
function loadEmployees() {
  const stored = localStorage.getItem('employees');
  return stored ? JSON.parse(stored) : [];
}

// Save employees to localStorage
function saveEmployees(employees) {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Load orders from localStorage
function loadOrders() {
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
}

// Save orders to localStorage
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

let employees = loadEmployees();
let orders = loadOrders();
let applications = JSON.parse(localStorage.getItem('applications') || '[]');
let shiftRecords = JSON.parse(localStorage.getItem('shiftRecords') || '[]');
let events = JSON.parse(localStorage.getItem('events') || '[]');
let currentEmployee = null;
let currentShift = null;

const savedMenuItems = localStorage.getItem('menuItems');
if (savedMenuItems) {
  try {
    const parsedMenuItems = JSON.parse(savedMenuItems);
    if (Array.isArray(parsedMenuItems)) {
      menuItems = parsedMenuItems.map((item) => ({
        ...item,
        name: String(item.name || '').replace(/Rakas|Raka/gi, 'McDonalds'),
        description: String(item.description || '').replace(/Rakas|Raka/gi, 'McDonalds')
      }));
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  } catch (error) {
    localStorage.removeItem('menuItems');
  }
}

const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const totalPriceEl = document.getElementById('totalPrice');
const deliveryEl = document.getElementById('delivery');
const loginForm = document.getElementById('loginForm');
const staffPortal = document.getElementById('staffPortal');
const logoutBtn = document.getElementById('logoutBtn');
const employeeList = document.getElementById('employeeList');
const adminList = document.getElementById('adminList');
const menuEditorList = document.getElementById('menuEditorList');
const employeeForm = document.getElementById('employeeForm');
const superAdminForm = document.getElementById('superAdminForm');
const menuForm = document.getElementById('menuForm');
const eventForm = document.getElementById('eventForm');
const eventEditorList = document.getElementById('eventEditorList');
const defaultSpecialOffer = 'McDonalds Friday Special – Dubbel burger + crispy fries för 199 kr.';
let pickupType = localStorage.getItem('pickupType') || 'Takeaway';
let pickupQueue = localStorage.getItem('pickupQueue') || '';
let pickupSelection = localStorage.getItem('pickupSelection') || pickupType;
let mPoints = Number(localStorage.getItem('mPoints') || 0);
let breakfastMode = localStorage.getItem('breakfastMode') === 'true';
let restaurantOpen = localStorage.getItem('restaurantOpen') === 'true';
let sortByActivity = localStorage.getItem('sortByActivity') === 'true';
let adminLocks = JSON.parse(localStorage.getItem('adminLocks') || '{}');

const SITE_LOCK_KEY = 'siteLockEnabled';
const SITE_LOCK_PASSWORD = 'Drifty31212';
const SITE_UNLOCK_SESSION_KEY = 'siteUnlocked';

function isSiteLocked() {
  return localStorage.getItem(SITE_LOCK_KEY) === 'true';
}

function setSiteLock(enabled) {
  localStorage.setItem(SITE_LOCK_KEY, String(enabled));
  if (enabled) {
    sessionStorage.removeItem(SITE_UNLOCK_SESSION_KEY);
  } else {
    sessionStorage.setItem(SITE_UNLOCK_SESSION_KEY, 'true');
  }
}

function renderSiteLockState() {
  const button = document.getElementById('siteLockButton');
  const statusText = document.getElementById('siteLockStatusText');
  if (button) button.textContent = isSiteLocked() ? 'Öppna hemsidan igen' : 'Stäng hela hemsidan';
  if (statusText) {
    statusText.textContent = isSiteLocked()
      ? 'Hemsidan är stängd. Endast Super-Admin-lösenordet kan öppna den igen.'
      : 'Hemsidan är öppen för publiken.';
  }
}

function generateSiteLockCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function sendSiteLockCode(email) {
  const code = generateSiteLockCode();
  localStorage.setItem('siteLockEmailTarget', email);
  localStorage.setItem('siteLockVerificationCode', code);
  alert(`Säkerhetskod skickad till ${email}\nKod: ${code}\n\nSkriv in koden för att bekräfta stängningen av hemsidan.`);
  return code;
}

function toggleSiteLockdown() {
  if (!['Owner', 'Super-Admin'].includes(window.currentAdminRole)) {
    alert('Endast Super-Admin eller Owner kan stänga hela hemsidan.');
    return;
  }

  const shouldLock = !isSiteLocked();
  if (!shouldLock) {
    const unlockPassword = window.prompt('Skriv in Super Admin-lösenordet för att öppna hemsidan igen:', '');
    if (unlockPassword !== 'Drifty31212') {
      alert('Fel lösenord. Hemsidan förblir stängd.');
      return;
    }
    setSiteLock(false);
    renderSiteLockState();
    window.location.replace('index.html');
    return;
  }

  const confirmationText = 'Är du säker på att du vill stänga hemsidan? Hemsidan kan inte låsas upp förrän rätt lösenord skrivs in.';
  if (!window.confirm(confirmationText)) {
    return;
  }

  const email = window.prompt('Skriv in Gmail-adressen där säkerhetskoden ska skickas:', 'example@gmail.com');
  if (!email || !/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
    alert('Ange en giltig Gmail-adress för att fortsätta.');
    return;
  }

  const sanitizedEmail = email.trim();
  const sentCode = sendSiteLockCode(sanitizedEmail);
  const enteredCode = window.prompt(`Skriv in säkerhetskoden som skickades till ${sanitizedEmail}:`, '');
  if (enteredCode?.trim() !== sentCode) {
    alert('Fel säkerhetskod. Hemsidan har inte stängts.');
    return;
  }

  setSiteLock(true);
  renderSiteLockState();
  window.location.replace('404.html');
}

function lockSiteRedirect() {
  const currentPath = (window.location.pathname || '').toLowerCase();
  const onLockPage = currentPath.endsWith('/404.html') || currentPath.endsWith('404.html');

  if (isSiteLocked() && !sessionStorage.getItem(SITE_UNLOCK_SESSION_KEY)) {
    if (!onLockPage) {
      window.location.replace('404.html');
    }
    return;
  }

  if (!isSiteLocked() && onLockPage) {
    window.location.replace('index.html');
  }
}

function isOwner() {
  return window.currentAdminRole === 'Owner';
}

function writeMasterLog(action) {
  if (!isOwner()) return;
  const log = JSON.parse(localStorage.getItem('masterLog') || '[]');
  log.push({ action, at: new Date().toISOString(), by: window.currentAdminRole });
  localStorage.setItem('masterLog', JSON.stringify(log.slice(-200)));
  renderMasterLog();
}

function renderMasterLog() {
  const list = document.getElementById('masterLogList');
  const card = document.getElementById('masterLogCard');
  if (!list || !card) return;
  card.hidden = !isOwner();
  if (!isOwner()) return;
  const log = JSON.parse(localStorage.getItem('masterLog') || '[]');
  const stats = document.getElementById('managerStats');
  if (stats) {
    const managers = ['Shift Admin', 'Admin', 'Super-Admin', 'Owner'];
    stats.innerHTML = `<h5>Chefstatistik</h5>${managers.map((role) => { const name = role; const reviews = log.filter((entry) => entry.action.includes('ansökan') && entry.by === name).length; const started = shiftRecords.filter((shift) => shift.role === role).length; return `<p>${name}: ${reviews} ansökningar granskade · ${started} startade skift</p>`; }).join('')}`;
  }
  list.innerHTML = log.length ? log.slice().reverse().map((entry) => `<li><strong>${new Date(entry.at).toLocaleString('sv-SE')}</strong><span>${entry.action} · ${entry.by}</span></li>`).join('') : '<li class="empty-state">Ägarloggen är tom.</li>';
}

function toggleAdminLock(username) {
  if (!isOwner()) {
    alert('Endast ägaren kan nöd-låsa admin-konton.');
    return;
  }
  adminLocks[username] = !adminLocks[username];
  localStorage.setItem('adminLocks', JSON.stringify(adminLocks));
  writeMasterLog(`${adminLocks[username] ? 'Nöd-låste' : 'Låste upp'} admin-kontot ${username}`);
  renderAdminList();
}

function applyBulkRole() {
  if (!['Owner', 'Super-Admin'].includes(window.currentAdminRole)) {
    alert('Endast Super-Admin eller Owner kan ändra flera roller samtidigt.');
    return;
  }
  const role = document.getElementById('bulkRoleSelect')?.value;
  const selected = Array.from(document.querySelectorAll('.employee-select:checked'));
  if (!role || !selected.length) {
    alert('Markera minst en anställd och välj en roll.');
    return;
  }
  selected.forEach((checkbox) => {
    const employee = employees.find((entry) => entry.username === checkbox.value);
    if (employee) employee.role = role;
  });
  saveEmployees(employees);
  writeMasterLog(`Massändrade ${selected.length} personalroller till ${role}`);
  addAudit(`Massändrade ${selected.length} personalroller till ${role}`);
  renderEmployeeList();
  alert(`${selected.length} roller uppdaterade.`);
}

function addBulkServiceWarning() {
  if (!['Super-Admin', 'Owner'].includes(window.currentAdminRole)) {
    alert('Endast Super-Admin eller Owner kan ge massvarning.');
    return;
  }
  const selected = Array.from(document.querySelectorAll('.employee-select:checked'));
  if (!selected.length) return alert('Markera minst en anställd först.');
  const reason = prompt('Gemensam anledning till varningen:')?.trim();
  if (!reason) return;
  selected.forEach((checkbox) => {
    const employee = employees.find((entry) => entry.username === checkbox.value);
    if (!employee || employee.status === 'Avskedad') return;
    employee.warnings = employee.warnings || [];
    if (employee.warnings.length < 3) employee.warnings.push({ reason, evidence: '', at: new Date().toISOString(), givenBy: window.currentAdminRole });
    if (employee.warnings.length >= 3) { employee.disabled = true; employee.status = 'Avstängd'; }
  });
  saveEmployees(employees);
  writeMasterLog(`Massvarning till ${selected.length} valda: ${reason}`);
  renderEmployeeList();
  renderWorkforce();
}

function editAccountPermissions(username) {
  if (!['Super-Admin', 'Owner'].includes(window.currentAdminRole)) return alert('Endast Super-Admin eller Owner kan ändra behörigheter.');
  const permissions = JSON.parse(localStorage.getItem('accountPermissions') || '{}');
  const current = permissions[username] || ['orders'];
  const answer = prompt('Behörigheter kommaseparerade (orders, applications, warnings, menu):', current.join(', '));
  if (answer === null) return;
  permissions[username] = answer.split(',').map((permission) => permission.trim()).filter(Boolean);
  localStorage.setItem('accountPermissions', JSON.stringify(permissions));
  writeMasterLog(`Ändrade behörigheter för ${username}: ${permissions[username].join(', ')}`);
  renderAdminList();
}

function reportLowStock() {
  if (!currentEmployee) return;
  const note = prompt('Vad börjar ta slut? (t.ex. pommes eller bröd)')?.trim();
  if (!note) return;
  const alerts = JSON.parse(localStorage.getItem('stockAlerts') || '[]');
  alerts.push({ note, by: currentEmployee.name, at: new Date().toISOString(), active: true });
  localStorage.setItem('stockAlerts', JSON.stringify(alerts.slice(-50)));
  window.dispatchEvent(new StorageEvent('storage', { key: 'stockAlerts', newValue: JSON.stringify(alerts) }));
  alert('Lageralarm skickat till Shift Admin.');
}

function renderStockAlerts() {
  const list = document.getElementById('stockAlertList');
  if (!list) return;
  const alerts = JSON.parse(localStorage.getItem('stockAlerts') || '[]').filter((alert) => alert.active);
  list.innerHTML = alerts.length ? alerts.slice().reverse().map((alert) => `<p class="stock-alert">🔴 ${alert.note} · ${alert.by}</p>`).join('') : '<p class="empty-state">Inga aktiva lageralarm.</p>';
}

function setMaintenanceWindow() {
  if (!['Owner', 'Super-Admin', 'Admin'].includes(window.currentAdminRole)) return alert('Du saknar behörighet.');
  const minutes = Number(prompt('Stäng restaurangen i hur många minuter?', '30'));
  if (!Number.isFinite(minutes) || minutes < 1) return;
  localStorage.setItem('maintenanceUntil', String(Date.now() + minutes * 60000));
  window.dispatchEvent(new StorageEvent('storage', { key: 'maintenanceUntil', newValue: localStorage.getItem('maintenanceUntil') }));
  renderMaintenanceScreen();
}

function renderMaintenanceScreen() {
  const until = Number(localStorage.getItem('maintenanceUntil') || 0);
  if (!until || until <= Date.now()) {
    document.getElementById('maintenanceScreen')?.remove();
    document.body.classList.remove('maintenance-active');
    return;
  }
  document.body.classList.add('maintenance-active');
  let screen = document.getElementById('maintenanceScreen');
  if (!screen) { screen = document.createElement('div'); screen.id = 'maintenanceScreen'; screen.style.cssText = 'position:fixed;inset:0;z-index:99999;display:grid;place-items:center;text-align:center;background:#171412;color:#fff8ed;padding:24px;'; document.body.appendChild(screen); }
  screen.innerHTML = `<div><h1>Restaurangen är tillfälligt stängd</h1><p>Serverunderhåll pågår. Öppnar igen ${new Date(until).toLocaleTimeString('sv-SE')}.</p></div>`;
  window.setTimeout(renderMaintenanceScreen, 30000);
}

function getSpecialOffer() {
  const storedOffer = localStorage.getItem('specialOffer');
  const until = localStorage.getItem('specialOfferUntil');
  if (until && new Date(until).getTime() <= Date.now()) return 'Inget aktivt erbjudande just nu.';
  if (storedOffer && !/rakas|raka|raks/i.test(storedOffer)) return storedOffer;
  localStorage.setItem('specialOffer', defaultSpecialOffer);
  return defaultSpecialOffer;
}

function addAudit(action) {
  const audit = JSON.parse(localStorage.getItem('auditLog') || '[]');
  audit.push({ action, at: new Date().toISOString(), by: window.currentAdminRole || 'Admin' });
  localStorage.setItem('auditLog', JSON.stringify(audit.slice(-100)));
}

function renderMenuEditor() {
  // This is now replaced by renderMenuEditorV2 - calling the new version
  renderMenuEditorV2();
}

function copyMenuItem(id) {
  const item = menuItems.find((entry) => entry.id === id);
  if (!item) return;
  const copy = { ...item, id: Math.max(...menuItems.map((entry) => entry.id), 0) + 1, name: `${item.name} (kopia)`, soldOut: false };
  menuItems.push(copy);
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  addAudit(`Kopierade menyrätt: ${item.name}`);
  renderMenuEditor();
  renderMenu();
}

function toggleMenuSoldOut(id, soldOut) {
  const item = menuItems.find((entry) => entry.id === id);
  if (!item) return;
  item.soldOut = soldOut;
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  addAudit(`${soldOut ? 'Markerade' : 'Återställde'} menyrätt: ${item.name}`);
  renderMenuEditor();
  renderMenu();
}

function promoteEmployee(username) {
  if (!['Super-Admin', 'Owner'].includes(window.currentAdminRole)) {
    alert('Endast Super-Admin kan befordra personal.');
    return;
  }
  const employee = employees.find((entry) => entry.username === username);
  if (!employee || employee.status === 'Avskedad') return;
  employee.role = 'Shift Admin';
  employee.promotedAt = new Date().toISOString();
  saveEmployees(employees);
  addAudit(`Befordrade ${employee.name} till Shift Admin`);
  renderEmployeeList();
  alert(`${employee.name} är nu Shift Admin.`);
}

function renderEventEditor() {
  if (!eventEditorList) return;
  eventEditorList.innerHTML = events.length ? events.map((event, index) => `<li class="editor-row"><div><strong>${event.name}</strong><span>${event.time} · ${event.description}</span></div><div class="editor-actions"><button type="button" class="secondary-btn edit-event" data-index="${index}">Ändra</button><button type="button" class="danger-btn delete-event" data-index="${index}">Ta bort</button></div></li>`).join('') : '<li class="empty-state">Inga event ännu.</li>';
  eventEditorList.querySelectorAll('.delete-event').forEach((button) => button.addEventListener('click', () => {
    if (!confirm('Ta bort detta event?')) return;
    const [removed] = events.splice(Number(button.dataset.index), 1);
    localStorage.setItem('events', JSON.stringify(events));
    addAudit(`Tog bort event: ${removed.name}`);
    renderEventEditor();
    renderPublicEvent();
  }));
  eventEditorList.querySelectorAll('.edit-event').forEach((button) => button.addEventListener('click', () => {
    const event = events[Number(button.dataset.index)];
    event.name = prompt('Event:', event.name)?.trim() || event.name;
    event.time = prompt('Tid:', event.time)?.trim() || event.time;
    event.description = prompt('Beskrivning:', event.description)?.trim() || event.description;
    localStorage.setItem('events', JSON.stringify(events));
    addAudit(`Ändrade event: ${event.name}`);
    renderEventEditor();
    renderPublicEvent();
  }));
}

function renderPublicEvent() {
  const event = events[events.length - 1];
  const name = document.getElementById('publicEventName');
  const description = document.getElementById('publicEventDescription');
  const time = document.getElementById('publicEventTime');
  if (!event || !name || !description || !time) return;
  name.textContent = event.name;
  description.textContent = event.description;
  const displayDate = event.date ? new Date(event.date) : null;
  time.textContent = displayDate && Number.isFinite(displayDate.getTime())
    ? displayDate.toLocaleString('sv-SE', { dateStyle: 'medium', timeStyle: 'short' })
    : event.time;
  const countdown = document.getElementById('publicEventCountdown');
  const eventDate = event.date ? new Date(event.date) : new Date(event.time);
  if (countdown && Number.isFinite(eventDate.getTime())) {
    const updateCountdown = () => {
      const remaining = eventDate.getTime() - Date.now();
      if (remaining <= 0) {
        countdown.textContent = 'Eventet pågår eller är avslutat.';
        return;
      }
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      countdown.textContent = `Startar om ${hours} h ${minutes} min`;
    };
    updateCountdown();
    window.setInterval(updateCountdown, 60000);
  }
}

function renderHallOfFame() {
  const name = document.getElementById('hallOfFameName');
  const detail = document.getElementById('hallOfFameDetail');
  if (!name || !detail) return;
  const now = new Date();
  const previousMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const previousYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const totals = {};
  orders.forEach((order) => {
    const completed = order.completedTime && new Date(order.completedTime);
    if (!order.completedBy || !completed || completed.getMonth() !== previousMonth || completed.getFullYear() !== previousYear) return;
    totals[order.completedBy] = (totals[order.completedBy] || 0) + 1;
  });
  const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  const employee = winner && employees.find((entry) => entry.username === winner[0]);
  name.textContent = employee ? employee.name : 'Hall of Fame';
  detail.textContent = employee ? `${winner[1]} ordrar slutförda förra månaden.` : 'Statistik visas när personalen har slutfört ordrar.';
}

function updatePublicStatus() {
  const status = document.getElementById('restaurantStatus');
  const detail = document.getElementById('restaurantStatusDetail');
  const queue = document.getElementById('queueStatus');
  if (!status || !detail || !queue) return;

  const activeStaff = shiftRecords.filter((shift) => !shift.endTime).length;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;
  status.textContent = restaurantOpen ? (activeStaff ? 'Öppet och bemannat' : 'Öppet just nu') : 'Stängt just nu';
  detail.textContent = restaurantOpen ? `${activeStaff} personal i tjänst · Stockholm City` : 'Restaurangen är stängd av ansvarig personal.';
  queue.textContent = pendingOrders === 0 ? 'Ingen kö' : pendingOrders < 4 ? 'Måttlig kö' : 'Fullt i köket';
}

function renderEmployeeList() {
  if (!employeeList) return;

  employeeList.innerHTML = '';
  if (!employees.length) {
    employeeList.innerHTML = '<li class="empty-state">Inga personalkonton skapade ännu.</li>';
    return;
  }

  let empList = [...employees];
  
  // Sort by activity if enabled
  if (sortByActivity) {
    empList.sort((a, b) => {
      const aShifts = shiftRecords.filter(s => s.employee === a.username).length;
      const bShifts = shiftRecords.filter(s => s.employee === b.username).length;
      return bShifts - aShifts;
    });
  }

  empList.forEach((employee) => {
    const item = document.createElement('li');
    item.className = 'employee-row';
    if (employee.onLeave) {
      item.style.backgroundColor = 'rgba(255, 193, 7, 0.12)';
      item.style.borderLeft = '3px solid rgba(255, 193, 7, 0.5)';
    }
    const employeeShifts = shiftRecords.filter((shift) => shift.employee === employee.username);
    const shiftCount = employeeShifts.length;
    const lastShift = employeeShifts
      .filter((shift) => shift.startTime)
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0];
    const inactive = !lastShift || Date.now() - new Date(lastShift.startTime).getTime() > 7 * 24 * 60 * 60 * 1000;
    item.innerHTML = `
      <div><label class="bulk-select"><input type="checkbox" class="employee-select" value="${employee.username}"> Välj</label><strong>${shiftCount >= 10 ? '★ ' : ''}${employee.onLeave ? '🟨 ' : ''}${inactive ? '⚠️ ' : ''}${employee.name}</strong><span>${employee.username} · ${employee.role}${employee.status === 'Avskedad' ? ' · Avskedad' : employee.disabled ? ' · Avstängd' : ''}${employee.onLeave ? ' · Tjänstledig' : ''}${inactive ? ' · Inaktiv 7+ dagar' : ''}${employee.probationUntil && Date.now() < new Date(employee.probationUntil).getTime() ? ' · Provanställd' : ''} · ${shiftCount} shiftar</span></div>
      <div class="editor-actions compact-actions">
        <button type="button" class="compact-btn" onclick="changeEmployeeRank('${employee.username}');" title="Ändra roll">📊</button>
        <button type="button" class="compact-btn" onclick="toggleEmployeeLeave('${employee.username}');" title="${employee.onLeave ? 'Tillbaka' : '🟨 Lediga'}">${employee.onLeave ? '✓' : '🟨'}</button>
        <button type="button" class="compact-btn" onclick="toggleEmployeeDisabled('${employee.username}');" title="${employee.disabled ? 'Aktivera' : 'Stäng av'}">${employee.disabled ? '🔓' : '🔒'}</button>
        <button type="button" class="compact-btn" onclick="promoteEmployee(this.dataset.username);" data-username="${employee.username}" title="Befordra">⬆️</button>
        <button type="button" class="secondary-btn" onclick="editEmployeeNote('${employee.username}');">Anteckning</button>
        <button type="button" class="danger-btn delete-employee" data-username="${employee.username}">Ta bort</button>
      </div>
    `;
    employeeList.appendChild(item);
  });

}

function renderAdminList() {
  if (!adminList) return;
  const managedAdmins = adminUsers.filter((user) => user.role !== 'Owner');
  adminList.innerHTML = managedAdmins.map((user) => `<li class="editor-row"><span>${user.username} · ${user.role}${adminLocks[user.username] ? ' · 🔒 Nöd-låst' : ''}</span><div><button type="button" class="secondary-btn" onclick="editAccountPermissions('${user.username}')">Behörigheter</button><button type="button" class="${adminLocks[user.username] ? 'secondary-btn' : 'danger-btn'}" onclick="toggleAdminLock('${user.username}')">${adminLocks[user.username] ? 'Lås upp' : 'Nöd-lås'}</button></div></li>`).join('');
}

function toggleEmployeeDisabled(username) {
  const employee = employees.find((entry) => entry.username === username);
  if (!employee || employee.status === 'Avskedad') return;
  employee.disabled = !employee.disabled;
  saveEmployees(employees);
  addAudit(`${employee.disabled ? 'Stängde av' : 'Aktiverade'} konto: ${employee.name}`);
  renderEmployeeList();
}

function editEmployeeNote(username) {
  const employee = employees.find((entry) => entry.username === username);
  if (!employee) return;
  const note = prompt(`Intern anteckning för ${employee.name}:`, employee.adminNote || '');
  if (note === null) return;
  employee.adminNote = note.trim();
  saveEmployees(employees);
  addAudit(`Uppdaterade intern anteckning: ${employee.name}`);
}

function saveStaffNotice(event) {
  event.preventDefault();
  localStorage.setItem('staffNotice', document.getElementById('staffNoticeInput').value.trim());
  alert('Anslagstavlan är uppdaterad.');
  return false;
}

function saveHappyMealToy(event) {
  event.preventDefault();
  const toy = document.getElementById('happyMealToyInput')?.value.trim() || '';
  localStorage.setItem('happyMealToy', toy);
  renderHappyMealToy();
  alert('Dagens Happy Meal-leksak är uppdaterad.');
  return false;
}

function renderHappyMealToy() {
  const toy = localStorage.getItem('happyMealToy') || 'Ingen leksak angiven just nu.';
  const display = document.getElementById('happyMealToyDisplay');
  const input = document.getElementById('happyMealToyInput');
  if (display) display.textContent = toy;
  if (input && !input.value) input.value = localStorage.getItem('happyMealToy') || '';
}

function addShiftPlan(event) {
  event.preventDefault();
  const plans = JSON.parse(localStorage.getItem('shiftPlans') || '[]');
  plans.push({ text: document.getElementById('shiftPlanInput').value.trim(), createdAt: new Date().toISOString() });
  localStorage.setItem('shiftPlans', JSON.stringify(plans));
  document.getElementById('shiftPlanInput').value = '';
  renderShiftPlans();
  return false;
}

function renderShiftPlans() {
  const list = document.getElementById('shiftPlanList');
  if (!list) return;
  const plans = JSON.parse(localStorage.getItem('shiftPlans') || '[]');
  list.innerHTML = plans.length ? plans.map((plan) => `<li>${plan.text}</li>`).join('') : '<li class="empty-state">Inga planerade pass.</li>';
}

// ===== NEW FEATURES =====

// Shift Reports
function saveShiftReport(event) {
  event.preventDefault();
  const reportText = document.getElementById('shiftReportInput')?.value?.trim();
  if (!reportText) {
    alert('Skriv en skiftrapport först!');
    return false;
  }
  const reports = JSON.parse(localStorage.getItem('shiftReports') || '[]');
  reports.push({
    text: reportText,
    createdAt: new Date().toISOString(),
    createdBy: window.currentAdminRole || 'Admin'
  });
  localStorage.setItem('shiftReports', JSON.stringify(reports));
  document.getElementById('shiftReportInput').value = '';
  renderShiftReports();
  alert('Skiftrapport sparad!');
  return false;
}

function renderShiftReports() {
  const list = document.getElementById('shiftReportList');
  if (!list) return;
  const reports = JSON.parse(localStorage.getItem('shiftReports') || '[]');
  list.innerHTML = reports.length ? reports.slice().reverse().map((report) => `
    <li style="padding: 10px; background: rgba(255,199,44,0.08); border-radius: 6px; margin-bottom: 8px; font-size: 0.85rem;">
      <strong style="color: var(--accent);">${new Date(report.createdAt).toLocaleString('sv-SE')}</strong><br>
      <span style="color: var(--text);">${report.text}</span><br>
      <small style="color: var(--muted);">Av ${report.createdBy || 'Admin'}</small>
    </li>
  `).join('') : '<li class="empty-state">Inga rapporter ännu.</li>';
}

// ===== NEW FEATURES 2 =====

// Breakfast Mode Toggle
function toggleBreakfastMode() {
  breakfastMode = !breakfastMode;
  localStorage.setItem('breakfastMode', breakfastMode);
  const btn = document.getElementById('breakfastModeBtn');
  if (btn) btn.textContent = breakfastMode ? '🌅 Frukostmeny PÅ' : '🌅 Frukostmeny AV';
  addAudit(`${breakfastMode ? 'Aktiverade' : 'Inaktiverade'} frukostmeny`);
  renderMenu();
}

// Restaurant Open/Close
function toggleRestaurantStatus() {
  restaurantOpen = !restaurantOpen;
  localStorage.setItem('restaurantOpen', restaurantOpen);
  const btn = document.getElementById('restaurantStatusBtn');
  if (btn) btn.textContent = restaurantOpen ? '🟢 ÖPPEN' : '🔴 STÄNGD';
  if (btn) btn.style.backgroundColor = restaurantOpen ? '#4ade80' : '#ef4444';
  addAudit(`Restaurangen markerad som ${restaurantOpen ? 'ÖPPEN' : 'STÄNGD'}`);
  updatePublicStatus();
}

// Send Meeting Notice to Staff
function sendMeetingNotice() {
  const message = prompt('Personalmöte - Skriv meddelande:', 'Alla till pausrummet/Discord för kort möte!');
  if (!message) return;
  
  const notice = {
    text: message,
    sentAt: new Date().toISOString(),
    sentBy: window.currentAdminRole || 'Admin'
  };
  
  const notices = JSON.parse(localStorage.getItem('meetingNotices') || '[]');
  notices.push(notice);
  localStorage.setItem('meetingNotices', JSON.stringify(notices));
  window.dispatchEvent(new StorageEvent('storage', { key: 'meetingNotices', newValue: JSON.stringify(notices) }));
  
  alert('Personalmöte-meddelande skickat till all personal!');
  addAudit(`Skickade personalmöte-meddelande: ${message}`);
}

// Toggle Sort by Activity
function toggleSortByActivity() {
  sortByActivity = !sortByActivity;
  localStorage.setItem('sortByActivity', sortByActivity);
  const btn = document.getElementById('sortActivityBtn');
  if (btn) btn.style.backgroundColor = sortByActivity ? 'rgba(255,199,44,0.3)' : '';
  addAudit(`${sortByActivity ? 'Sorterar' : 'Slutar sortera'} personal efter aktivitet`);
  renderEmployeeList();
}

// Calculate Average Price for Price Indicator
function getAveragePriceForCategory(category) {
  const items = menuItems.filter(item => item.category === category && !item.archived);
  if (!items.length) return 0;
  const sum = items.reduce((total, item) => total + item.price, 0);
  return sum / items.length;
}

// Employee Search
function initializeEmployeeSearch() {
  const searchInput = document.getElementById('employeeSearchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('#employeeList .employee-row');
    listItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Change Employee Rank
function changeEmployeeRank(username) {
  const employee = employees.find(e => e.username === username);
  if (!employee) return;
  
  const ranks = ['Kassör', 'Kock', 'Leverans', 'Skiftledare', 'Admin'];
  const currentRank = employee.role;
  const newRank = prompt(
    `Ändra roll för ${employee.name}\nNuvarande: ${currentRank}\n\nVälj ny roll:\n${ranks.map((r, i) => `${i+1}. ${r}`).join('\n')}`,
    currentRank
  );
  
  if (newRank && newRank !== currentRank && ranks.includes(newRank)) {
    employee.role = newRank;
    saveEmployees(employees);
    addAudit(`Ändrade roll för ${employee.name}: ${currentRank} → ${newRank}`);
    writeMasterLog(`Ändrade roll för ${employee.name}: ${currentRank} -> ${newRank}`);
    renderEmployeeList();
    alert(`${employee.name}'s roll ändrad till ${newRank}`);
  }
}

// Leave/Absence Flag
function toggleEmployeeLeave(username) {
  const employee = employees.find(e => e.username === username);
  if (!employee) return;
  
  employee.onLeave = !employee.onLeave;
  employee.leaveUntil = employee.onLeave ? 
    prompt('Tjänstledig fram till (format: YYYY-MM-DD, eller lämna tomt för okänt):') : 
    null;
  
  saveEmployees(employees);
  addAudit(`${employee.onLeave ? 'Markerade' : 'Avmarkerade'} som tjänstledig: ${employee.name}`);
  renderEmployeeList();
  alert(employee.onLeave ? `${employee.name} markerad som tjänstledig` : `${employee.name} är nu tillbaka`);
}

// Add-ons Management
function loadAddons() {
  return JSON.parse(localStorage.getItem('addons') || '[]');
}

function saveAddons(addons) {
  localStorage.setItem('addons', JSON.stringify(addons));
}

function addAddon(event) {
  if (event) event.preventDefault();
  
  const name = document.getElementById('addonName')?.value?.trim();
  const price = parseFloat(document.getElementById('addonPrice')?.value || 0);
  const emoji = document.getElementById('addonEmoji')?.value?.trim() || '🟡';
  const popular = document.getElementById('addonPopular')?.checked || false;
  
  if (!name) {
    alert('Skriv ett namn för tillbehöret!');
    return false;
  }
  
  const addons = loadAddons();
  addons.push({
    id: Date.now(),
    name: name,
    price: price,
    emoji: emoji,
    popular: popular,
    createdAt: new Date().toISOString()
  });
  
  saveAddons(addons);
  addAudit(`Lade till tillbehör: ${name}`);
  renderAddons();
  document.getElementById('addonName').value = '';
  document.getElementById('addonPrice').value = '';
  document.getElementById('addonEmoji').value = '🟡';
  document.getElementById('addonPopular').checked = false;
  alert('Tillbehör tillagt!');
  return false;
}

function renderAddons() {
  const list = document.getElementById('addonList');
  if (!list) return;
  const addons = loadAddons();
  
  list.innerHTML = addons.length ? addons.map(addon => `
    <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,199,44,0.06); border-radius: 6px; margin-bottom: 6px;">
      <div>
        <strong>${addon.emoji} ${addon.name}</strong>
        <span style="display: block; font-size: 0.85rem; color: var(--muted);">${addon.price} kr${addon.popular ? ' · Populärt' : ''}</span>
      </div>
      <button type="button" class="danger-btn" style="padding: 4px 8px; font-size: 0.8rem;" onclick="deleteAddon(${addon.id})">Ta bort</button>
    </li>
  `).join('') : '<li class="empty-state">Inga tillbehör ännu.</li>';
}

function deleteAddon(id) {
  if (!confirm('Ta bort detta tillbehör?')) return;
  const addons = loadAddons();
  const addon = addons.find(a => a.id === id);
  const filtered = addons.filter(a => a.id !== id);
  saveAddons(filtered);
  if (addon) addAudit(`Tog bort tillbehör: ${addon.name}`);
  renderAddons();
}

// Archive Menu Items
function archiveMenuItem(id) {
  const item = menuItems.find(entry => entry.id === id);
  if (!item || !confirm(`Arkivera ${item.name}?`)) return;
  item.archived = true;
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  addAudit(`Arkiverade menyrätt: ${item.name}`);
  renderMenuEditor();
  renderMenu();
}

function restoreMenuItem(id) {
  const item = menuItems.find(entry => entry.id === id);
  if (!item) return;
  item.archived = false;
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  addAudit(`Återställde menyrätt: ${item.name}`);
  renderMenuEditor();
  renderMenu();
}

// Updated renderMenuEditor to show archive buttons
function renderMenuEditorV2() {
  if (!menuEditorList) return;
  const allItems = menuItems;
  
  menuEditorList.innerHTML = allItems.map((item) => {
    const avgPrice = getAveragePriceForCategory(item.category);
    const priceIcon = item.price > avgPrice * 1.2 ? '💸' : item.price < avgPrice * 0.8 ? '💰' : '→';
    const breakfastTag = item.isBreakfast ? ' · 🌅' : '';
    const calorieTag = item.calories ? ` · ${item.calories}` : '';
    const archiveButton = item.archived
      ? `<button type="button" class="secondary-btn" onclick="restoreMenuItem(${item.id})">Aktivera</button>`
      : `<button type="button" class="secondary-btn" onclick="archiveMenuItem(${item.id})">Arkivera</button>`;
    return `<li class="editor-row ${item.archived ? 'archived-row' : ''}"><div><strong>${item.emoji || '🍔'} ${item.name}</strong><span>${item.category} · ${priceIcon} ${item.price} kr${item.archived ? ' · Arkiverad' : ''}${item.soldOut ? ' · Slutsåld' : ''}${item.seasonal ? ' · Säsong' : ''}${item.limitedUntil ? ' · Limited Edition' : ''}${item.staffOnly ? ' · Endast personal' : ''}${breakfastTag}${calorieTag}</span>${item.ingredients ? `<small>Kök: ${item.ingredients}</small>` : ''}</div><div class="editor-actions"><label><input type="checkbox" class="sold-out-toggle" data-id="${item.id}" ${item.soldOut ? 'checked' : ''}> Slutsåld</label><button type="button" class="secondary-btn copy-menu" data-id="${item.id}">Kopiera maträtt</button><button type="button" class="secondary-btn edit-menu" data-id="${item.id}">Ändra</button>${archiveButton}</div></li>`;
  }).join('');
  
  menuEditorList.querySelectorAll('.sold-out-toggle').forEach((input) => input.addEventListener('change', () => toggleMenuSoldOut(Number(input.dataset.id), input.checked)));
  menuEditorList.querySelectorAll('.copy-menu').forEach((button) => button.addEventListener('click', () => copyMenuItem(Number(button.dataset.id))));
  menuEditorList.querySelectorAll('.edit-menu').forEach((button) => button.addEventListener('click', () => {
    const item = menuItems.find((entry) => entry.id === Number(button.dataset.id));
    if (!item) return;
    const name = prompt('Namn:', item.name)?.trim();
    const price = Number(prompt('Pris:', item.price));
    const description = prompt('Beskrivning:', item.description)?.trim();
    if (!name || !Number.isFinite(price) || price <= 0 || !description) return;
    const oldPrice = item.price;
    Object.assign(item, { name, price, description });
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    if (oldPrice !== price) addAudit(`Ändrade pris på menyrätt: ${item.name} (${oldPrice} kr -> ${price} kr)`);
    addAudit(`Ändrade menyrätt: ${item.name}`);
    renderMenuEditorV2();
    renderMenu();
  }));
}

function deleteEmployee(username) {
  const employee = employees.find((entry) => entry.username === username);
  if (!employee) return;
  if (!confirm(`Ta bort kontot för ${employee.name}?`)) return;

  employees = employees.filter((entry) => entry.username !== username);
  saveEmployees(employees);
  renderEmployeeList();
  renderAdminOverview();
  renderWorkforce();
  alert(`Kontot för ${employee.name} har tagits bort.`);
}

document.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-employee');
  if (deleteButton) deleteEmployee(deleteButton.dataset.username);
});

function renderAdminOverview() {
  const employeeCount = document.getElementById('employeeCount');
  const orderCount = document.getElementById('orderCount');
  const revenueTotal = document.getElementById('revenueTotal');
  const adminOrdersContainer = document.getElementById('adminOrdersContainer');
  if (!employeeCount || !orderCount || !revenueTotal || !adminOrdersContainer) return;

  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const totalValue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  employeeCount.textContent = employees.length;
  orderCount.textContent = pendingOrders.length;
  revenueTotal.textContent = `${totalValue} kr`;

  if (!orders.length) {
    adminOrdersContainer.innerHTML = '<p class="empty-state">Inga ordrar ännu.</p>';
    return;
  }

  adminOrdersContainer.innerHTML = orders.slice().reverse().map((order) => `
    <div class="admin-order-row">
      <div><strong>#${order.id}</strong><span>${order.rpName ? `${order.rpName} · ` : ''}${order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</span></div>
      <div><strong>${order.total} kr</strong><span class="order-state ${order.status}">${order.status === 'pending' ? 'Tillagas' : 'Klar för upphämtning'}</span></div>
    </div>
  `).join('');
}

function renderWorkforce() {
  const worker = document.getElementById('weeklyWorker');
  const select = document.getElementById('warningEmployeeSelect');
  const warningList = document.getElementById('warningList');
  if (!worker || !select || !warningList) return;

  let activity = employees.map((employee) => ({
    ...employee,
    orderCount: orders.filter((order) => order.completedBy === employee.username).length,
    warnings: employee.warnings || [],
    inactivePasses: employee.inactivePasses || 0
  })).sort((a, b) => b.orderCount - a.orderCount);
  
  const top = activity[0];
  worker.innerHTML = top && top.orderCount ? `<strong>${top.name}</strong><span>${top.orderCount} klarmarkerade ordrar denna vecka · ${top.role}</span>` : '<p class="empty-state">Ingen aktivitet registrerad ännu.</p>';

  select.innerHTML = activity.length ? activity.map((employee) => `<option value="${employee.username}">${employee.name} (${employee.warnings.length}/3 varningar)</option>`).join('') : '<option>Ingen personal</option>';
  warningList.innerHTML = activity.length ? activity.map((employee) => `
    <div class="warning-row ${employee.inactivePasses >= 3 ? 'inactive-warning' : ''}">
      <div><strong>${employee.name}</strong><span>${employee.warnings.length}/3 tjänstevarningar${employee.inactivePasses >= 3 ? ' · Inaktivitet: 3+' : ''} · ${getActivityPoints(employee.username)} aktivitetspoäng</span></div>
      ${employee.warnings.length ? employee.warnings.map((w, i) => `<small>⚠️ Varning ${i+1} av ${w.givenBy || 'Admin'}: ${w.reason}</small>`).join('<br>') : '<small>Inga varningar</small>'}
    </div>
  `).join('') : '<p class="empty-state">Skapa personal för att hantera varningar.</p>';
  const workerSelect = document.getElementById('weeklyWorkerSelect');
  if (workerSelect) workerSelect.innerHTML = activity.length ? activity.map((employee) => `<option value="${employee.username}">${employee.name}</option>`).join('') : '<option>Ingen personal</option>';
}

function saveHandover(event) {
  event.preventDefault();
  if (!['Owner', 'Super-Admin', 'Admin', 'Shift Admin'].includes(window.currentAdminRole)) return false;
  const input = document.getElementById('handoverInput');
  const text = input?.value.trim();
  if (!text) return false;
  const handovers = JSON.parse(localStorage.getItem('handovers') || '[]');
  handovers.push({ text, sentAt: new Date().toISOString(), sentBy: window.currentAdminRole });
  localStorage.setItem('handovers', JSON.stringify(handovers.slice(-50)));
  input.value = '';
  renderHandovers();
  return false;
}

function renderHandovers() {
  const list = document.getElementById('handoverList');
  if (!list) return;
  const handovers = JSON.parse(localStorage.getItem('handovers') || '[]');
  list.innerHTML = handovers.length ? handovers.slice().reverse().map((entry) => `<li><strong>${new Date(entry.sentAt).toLocaleString('sv-SE')}</strong><span>${entry.text} · ${entry.sentBy}</span></li>`).join('') : '<li class="empty-state">Ingen överlämning ännu.</li>';
}

function renderReceiptArchive() {
  const list = document.getElementById('receiptArchiveList');
  if (!list) return;
  const term = (document.getElementById('receiptSearchInput')?.value || '').trim().toLowerCase();
  const matchingOrders = orders.slice().reverse().filter((order) => !term || String(order.id).toLowerCase().includes(term));
  list.innerHTML = matchingOrders.length ? matchingOrders.map((order) => `<div class="admin-order-row"><div><strong>Kvitto #${order.id}</strong><span>${new Date(order.timestamp || Date.now()).toLocaleString('sv-SE')} · ${order.rpName || 'Okänd kund'}</span></div><span>${order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</span></div>`).join('') : '<p class="empty-state">Inga kvitton matchar sökningen.</p>';
}

function voteWeeklyWorker(event) {
  event.preventDefault();
  const username = document.getElementById('weeklyWorkerSelect')?.value;
  if (!username) return false;
  const votes = JSON.parse(localStorage.getItem('weeklyWorkerVotes') || '{}');
  votes[username] = (votes[username] || 0) + 1;
  localStorage.setItem('weeklyWorkerVotes', JSON.stringify(votes));
  addAudit(`Röstade på Veckans arbetare: ${username}`);
  renderWeeklyWorker();
  alert('Rösten är registrerad.');
  return false;
}

function renderWeeklyWorker() {
  const votes = JSON.parse(localStorage.getItem('weeklyWorkerVotes') || '{}');
  const winnerEntry = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  const winner = winnerEntry && employees.find((employee) => employee.username === winnerEntry[0]);
  const name = document.getElementById('hallOfFameName');
  const detail = document.getElementById('hallOfFameDetail');
  if (winner && name && detail) {
    name.textContent = winner.name;
    detail.textContent = `${winnerEntry[1]} röster som Veckans arbetare.`;
  }
}

function formatDuration(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${hours} h ${minutes} min ${remainingSeconds} sek`;
}

function getActivityPoints(username) {
  return Math.floor(shiftRecords.filter((shift) => shift.employee === username).reduce((total, shift) => {
    const end = shift.endTime ? new Date(shift.endTime).getTime() : Date.now();
    return total + Math.max(0, end - new Date(shift.startTime).getTime()) / 60000;
  }, 0));
}

function renderShiftBoard() {
  const board = document.getElementById('shiftBoard');
  const activeCount = document.getElementById('activeShiftCount');
  if (!board || !activeCount) return;

  const activeShifts = shiftRecords.filter((shift) => !shift.endTime);
  activeCount.innerHTML = `<span></span> ${activeShifts.length} aktiva`;
  const liveStatus = employees.length
    ? `<div class="staff-live-status">${employees.map((employee) => {
      const active = activeShifts.some((shift) => shift.employee === employee.username);
      const shift = activeShifts.find((entry) => entry.employee === employee.username);
      return `<div><span class="live-dot"></span>${employee.name} · ${active ? `I tjänst · ${shift.station || 'Ingen station'}` : 'Ledig'}</div>`;
    }).join('')}</div>`
    : '';
  if (!shiftRecords.length) {
    board.innerHTML = liveStatus + '<p class="empty-state">Inga shiftar registrerade ännu.</p>';
    return;
  }

  board.innerHTML = liveStatus + shiftRecords.slice().reverse().map((shift) => {
    const end = shift.endTime ? new Date(shift.endTime).getTime() : Date.now();
    const duration = getShiftWorkedSeconds(shift);
    return `<div class="shift-row ${shift.endTime ? '' : 'shift-active'}">
      <div><strong>${shift.name}</strong><span>${shift.role} · ${shift.station || 'Ingen station'} · Start ${new Date(shift.startTime).toLocaleString('sv-SE')}${shift.paused ? ' · Rast pågår' : ''}</span></div>
      <div class="shift-duration"><strong>${formatDuration(duration)}</strong><span>${shift.endTime ? 'Avslutad' : 'Pågående'}</span></div>
      <div class="shift-actions"><button class="secondary-btn add-time" data-id="${shift.id}">+ tid</button><button class="danger-btn remove-shift" data-id="${shift.id}">Ta bort</button></div>
    </div>`;
  }).join('');

  board.querySelectorAll('.add-time').forEach((button) => {
    button.addEventListener('click', () => {
      const shift = shiftRecords.find((entry) => entry.id === button.dataset.id);
      const minutes = Number(prompt('Hur många minuter ska läggas till?', '30'));
      if (!shift || !Number.isFinite(minutes) || minutes <= 0) return;
      shift.addedSeconds = (shift.addedSeconds || 0) + Math.round(minutes * 60);
      localStorage.setItem('shiftRecords', JSON.stringify(shiftRecords));
      renderShiftBoard();
    });
  });

  board.querySelectorAll('.remove-shift').forEach((button) => {
    button.addEventListener('click', () => {
      if (!confirm('Ta bort detta shift från historiken?')) return;
      shiftRecords = shiftRecords.filter((entry) => entry.id !== button.dataset.id);
      localStorage.setItem('shiftRecords', JSON.stringify(shiftRecords));
      renderShiftBoard();
    });
  });
}

function renderOnDutyBoard() {
  const board = document.getElementById('onDutyBoard');
  if (!board) return;
  const active = shiftRecords.filter((shift) => !shift.endTime);
  board.innerHTML = active.length ? active.map((shift) => `<div class="shift-row shift-active"><div><strong>${shift.name}</strong><span>${shift.role}</span></div><strong>${shift.station || 'Ingen station'}</strong></div>`).join('') : '<p class="empty-state">Ingen personal är i tjänst.</p>';
}

function addServiceWarning() {
  const select = document.getElementById('warningEmployeeSelect');
  const employee = employees.find((entry) => entry.username === select?.value);
  if (!employee) return;
  if (employee.status === 'Avskedad') {
    alert('Den här personen är redan avskedad.');
    return;
  }
  employee.warnings = employee.warnings || [];
  if (employee.warnings.length >= 3) {
    alert('Den här personen har redan max 3 tjänstevarningar.');
    return;
  }
  const reason = prompt(`Anledning till tjänstevarning för ${employee.name}:`);
  if (!reason || !reason.trim()) return;
  const evidence = prompt('Bevislänk (valfritt):')?.trim() || '';
  employee.warnings.push({ 
    reason: reason.trim(), 
    evidence, 
    at: new Date().toISOString(),
    givenBy: window.currentAdminRole || 'Admin'
  });
  if (employee.warnings.length >= 3) {
    employee.disabled = true;
    employee.status = 'Avstängd';
    employee.suspendedAt = new Date().toISOString();
  }
  saveEmployees(employees);
  addAudit(`Ga tjänstevarning till ${employee.name}: ${reason}`);
  writeMasterLog(`Gav tjänstevarning till ${employee.name}: ${reason.trim()}`);
  renderEmployeeList();
  renderWorkforce();
  renderAdminOverview();
  alert(employee.status === 'Avstängd'
    ? `${employee.name} har nått 3/3 tjänstevarningar och kontot är låst.`
    : `Tjänstevarning registrerad för ${employee.name}. (${employee.warnings.length}/3)`);
}

function addInactivePass() {
  const select = document.getElementById('warningEmployeeSelect');
  const employee = employees.find((entry) => entry.username === select?.value);
  if (!employee) return;
  employee.inactivePasses = Math.min((employee.inactivePasses || 0) + 1, 3);
  saveEmployees(employees);
  renderWorkforce();
}

function renderApplications() {
  const container = document.getElementById('applicationsContainer');
  const count = document.getElementById('applicationCount');
  const approvedContainer = document.getElementById('approvedApplicationsContainer');
  const approvedCount = document.getElementById('approvedApplicationCount');
  if (!container || !count) return;

  const newApplications = applications.filter((application) => application.status === 'Ny');
  count.textContent = `${newApplications.length} nya`;
  const searchTerm = (document.getElementById('applicationSearchInput')?.value || '').trim().toLowerCase();
  const activeApplications = applications.filter((application) => (!searchTerm || String(application.discord || '').toLowerCase().includes(searchTerm)) && !['Besvarad', 'Godkänd', 'Avslagen'].includes(application.status));
  if (!activeApplications.length) {
    container.innerHTML = '<p class="empty-state">Inga ansökningar ännu.</p>';
  } else {
    container.innerHTML = activeApplications.slice().reverse().map((application) => `
      <article class="application-row">
        <div><strong>${application.name}</strong><span>${application.role} · ${application.discord}${application.discordId ? ` · ID: ${application.discordId}` : ''}${application.previousEmployee ? ' · Tidigare anställd' : ''}</span><p><b>RP-ålder:</b> ${application.rpAge || 'Ej angivet'} · <b>Intervju:</b> ${application.interviewTime || 'Ej angivet'}<br><b>Karaktär:</b> ${application.character || 'Ej angivet'}${application.characterImage ? ` · <a href="${application.characterImage}" target="_blank" rel="noreferrer">Visa bild</a>` : ''}<br><b>Tillgänglig:</b> ${(application.availability || []).join(', ') || 'Ej angivet'}<br><b>Erfarenhet:</b> ${application.experience || application.message}<br><b>Varför:</b> ${application.why || application.message}<br><b>Svårigheter:</b> ${application.difficulties || 'Ej angivet'}${application.denialReason ? `<br><b>Nekad:</b> ${application.denialReason} ${application.denialNote || ''}` : ''}</p></div>
        <div class="application-actions"><button type="button" class="primary-btn application-approve" data-id="${application.createdAt}" onclick="window.updateApplicationStatus(this.dataset.id, 'Godkänd'); return false;">Anställ direkt</button><button type="button" class="danger-btn application-deny" data-id="${application.createdAt}" onclick="window.updateApplicationStatus(this.dataset.id, 'Avslagen'); return false;">Neka ansökan</button><button type="button" class="secondary-btn application-read" data-id="${application.createdAt}">${application.status === 'Ny' ? 'Markera läst' : 'Läst'}</button></div>
      </article>
    `).join('');
  }

  const approvedApplications = applications.filter((application) => application.status === 'Godkänd' || (searchTerm && application.status === 'Avslagen' && String(application.discord || '').toLowerCase().includes(searchTerm)));
  if (approvedContainer) {
    approvedContainer.innerHTML = approvedApplications.length ? approvedApplications.slice().reverse().map((application) => `<article class="application-row approved-row"><div><strong>${application.name}</strong><span>${application.role} · ${application.discord}</span><p>${application.status === 'Avslagen' ? `Nekad: ${application.denialReason || 'Övrigt'} ${application.denialNote || ''}` : `Godkänd av ${application.approvedBy || 'admin'}.`}</p></div><span class="application-approved-label">${application.status}</span></article>`).join('') : '<p class="empty-state">Inga godkända ännu.</p>';
  }
  if (approvedCount) approvedCount.textContent = approvedApplications.length;

  container.querySelectorAll('.application-read').forEach((button) => {
    button.addEventListener('click', () => {
      const application = applications.find((entry) => entry.createdAt === button.dataset.id);
      if (!application) return;
      application.status = 'Läst';
      localStorage.setItem('applications', JSON.stringify(applications));
      renderApplications();
    });
  });

  container.querySelectorAll('.application-reply').forEach((button) => {
    button.addEventListener('click', () => {
      const application = applications.find((entry) => entry.createdAt === button.dataset.id);
      const response = prompt(`Svara till ${application.name}:`, application.response || '');
      if (response === null || !response.trim()) return;
      application.response = response.trim();
      application.status = 'Besvarad';
      localStorage.setItem('applications', JSON.stringify(applications));
      renderApplications();
    });
  });

}

function updateApplicationStatus(createdAt, status) {
  const application = applications.find((entry) => String(entry.createdAt) === String(createdAt));
  if (!application) {
    alert('Ansökan kunde inte hittas. Ladda om sidan och försök igen.');
    return;
  }
  const label = status === 'Godkänd' ? 'godkänna' : 'avslå';
  if (status !== 'Godkänd' && !confirm(`Vill du ${label} ansökan från ${application.name}?`)) return;
  if (status === 'Godkänd') {
    const rank = prompt('Start-rank: skriv Praktikant, Kassör eller Kock.', application.role === 'Kassör' ? 'Kassör' : 'Praktikant')?.trim();
    if (!['Praktikant', 'Kassör', 'Kock'].includes(rank)) {
      alert('Välj Praktikant, Kassör eller Kock.');
      return;
    }
    application.startRank = rank;
  } else {
    const reasons = ['För kortfattade svar', 'Tidigare lall', 'Sök igen om en vecka', 'Övrigt'];
    const reasonChoice = prompt(`Välj nekandeanledning:\n${reasons.map((reason, index) => `${index + 1}. ${reason}`).join('\n')}`, '1');
    const reasonIndex = Number(reasonChoice) - 1;
    application.denialReason = reasons[reasonIndex] || 'Övrigt';
    if (application.denialReason === 'Övrigt') application.denialNote = prompt('Skriv anledning:')?.trim() || '';
  }
  application.status = status;
  application[status === 'Godkänd' ? 'approvedBy' : 'deniedBy'] = window.currentAdminRole || 'Admin';
  if (status === 'Godkänd') {
    application.approvedAt = new Date().toISOString();
    application.staffStatus = application.startRank;
    application.practiceUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const username = application.name.toLowerCase().replace(/[^a-z0-9åäö]/gi, '');
    if (username && !employees.some((employee) => employee.username === username)) {
      const password = Math.random().toString(36).slice(-8);
      employees.push({ username, password, name: application.name, role: application.startRank === 'Praktikant' ? application.role : application.startRank, staffStatus: application.startRank, practiceUntil: application.startRank === 'Praktikant' ? application.practiceUntil : null, hiredAt: new Date().toISOString(), warnings: [], inactivePasses: 0, availability: application.availability || [] });
      saveEmployees(employees);
      application.accountUsername = username;
      application.accountPassword = password;
      alert(`Ansökan godkänd. Konto skapat:\nAnvändarnamn: ${username}\nLösenord: ${password}`);
    }
  }
  if (status === 'Avslagen') application.deniedAt = new Date().toISOString();
  localStorage.setItem('applications', JSON.stringify(applications));
  addAudit(`${status} ansökan från ${application.name}`);
  if (status === 'Avslagen') writeMasterLog(`Avslog ansökan från ${application.name}`);
  renderApplications();
  if (status === 'Godkänd') alert(`Ansökan från ${application.name} är godkänd.`);
}

window.updateApplicationStatus = updateApplicationStatus;

function renderMenu() {
  if (!menuGrid) return;

  const categories = ['Burgers', 'Drinks', 'Fries', 'Sides', 'Desserts', 'Extras'];
  const publicBreakfastMode = breakfastMode && Boolean(document.getElementById('breakfastModeBtn'));

  menuGrid.innerHTML = categories
    .map((category) => {
      const hasBreakfastItems = menuItems.some((item) => Boolean(item.isBreakfast) && !item.archived && !item.staffOnly);
      const items = menuItems.filter((item) => item.category === category && !item.archived && !item.staffOnly && (!publicBreakfastMode || !hasBreakfastItems || Boolean(item.isBreakfast)));

      return `
        <section class="category-block">
          <h3 class="category-title">${category}</h3>
          <div class="category-items">
            ${items
              .map(
                (item) => `
                  <article class="menu-card">
                    <div class="menu-image">
                      ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : `<span class="menu-fallback">${item.emoji}</span>`}
                    </div>
                    ${item.seasonal && (!item.limitedUntil || new Date(item.limitedUntil).getTime() > Date.now()) ? '<span class="limited-label">Limited Edition</span>' : ''}
                    <h3>${item.name}</h3>
                    ${item.limitedUntil && new Date(item.limitedUntil).getTime() > Date.now() ? `<small class="limited-label">Limited Edition · kvar till ${new Date(item.limitedUntil).toLocaleString('sv-SE')}</small>` : ''}
                    <p>${item.description}</p>
                    ${item.calories ? `<small>🔥 ${item.calories}</small>` : ''}
                    ${item.allergens ? `<small>Allergener: ${item.allergens}</small>` : ''}
                    <div class="menu-meta">
                      <strong>${item.price} kr</strong>
                      <button data-id="${item.id}" class="add-to-cart" ${item.soldOut ? 'disabled' : ''}>${item.soldOut ? 'Slut för tillfället' : 'Lägg till'}</button>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      `;
    })
    .join('');

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const item = menuItems.find((entry) => entry.id === Number(button.dataset.id));
      if (!item || item.soldOut) return;

      const existing = cart.find((entry) => entry.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      updateCart();
    });
  });
}

function updateCart() {
  if (!cartItems || !subtotalEl || !totalPriceEl) return;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Din kundvagn är tom. Lägg till något från menyn.</p>';
    subtotalEl.textContent = '0 kr';
    totalPriceEl.textContent = '0 kr';
    return false;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const driveThruFee = pickupQueue === 'Drive-thru' ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05 : 0;
  const discount = document.getElementById('blueLightDiscount')?.checked && pickupType === 'Äta här' ? Math.min(100, subtotal) : 0;
  const total = subtotal + driveThruFee - discount;

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.price} kr/st</p>
          </div>
          <div class="cart-actions">
            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
            <span class="price-tag">${item.price * item.quantity} kr</span>
          </div>
        </div>
      `
    )
    .join('');

  subtotalEl.textContent = `${subtotal} kr`;
  totalPriceEl.textContent = `${total} kr${driveThruFee ? ` (inkl. Drive-thru +${driveThruFee} kr)` : ''}`;

  document.querySelectorAll('.quantity-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const item = cart.find((entry) => entry.id === id);
      if (!item) return;

      if (button.dataset.action === 'increase') {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          const index = cart.findIndex((entry) => entry.id === id);
          cart.splice(index, 1);
        }
      }

      updateCart();
    });
  });
}

window.addEventListener('storage', (event) => {
  if (event.key === 'orders' && event.newValue) {
    playOrderAlert();
    try { orders = JSON.parse(event.newValue); } catch {}
    updateEmployeeOrders();
  }
  if (event.key === 'technicalIssues') renderTechnicalIssues();
  if (event.key === 'stockAlerts') renderStockAlerts();
  if (event.key === 'maintenanceUntil') renderMaintenanceScreen();
  if (event.key !== 'menuItems' || !event.newValue) return;
  try {
    const updatedMenuItems = JSON.parse(event.newValue);
    if (!Array.isArray(updatedMenuItems)) return;
    menuItems = updatedMenuItems;
    renderMenu();
  } catch {
  }
});

function initializeCustomerTools() {
  const points = document.getElementById('pointsBalance');
  const discount = document.getElementById('blueLightDiscount');
  const waiting = document.getElementById('driveThruWaiting');
  if (points) points.textContent = `M-Points: ${mPoints}`;
  discount?.addEventListener('change', updateCart);
  waiting?.addEventListener('change', () => {
    localStorage.setItem('driveThruWaiting', waiting.checked ? 'true' : 'false');
    window.dispatchEvent(new StorageEvent('storage', { key: 'driveThruWaiting', newValue: String(waiting.checked) }));
  });
}

function initializeBurgerBuilder() {
  const meat = document.getElementById('builderMeat');
  const cheese = document.getElementById('builderCheese');
  const bacon = document.getElementById('builderBacon');
  const pickles = document.getElementById('builderPickles');
  const price = document.getElementById('builderPrice');
  const update = () => {
    const total = 79 + Number(meat?.value || 1) * 20 + (cheese?.checked ? 15 : 0) + (bacon?.checked ? 20 : 0);
    if (price) price.textContent = `${total} kr`;
  };
  [meat, cheese, bacon, pickles].forEach((control) => control?.addEventListener('change', update));
  document.getElementById('addBuilderBurger')?.addEventListener('click', () => {
    const item = { id: Date.now(), category: 'Burgers', name: `Egen burgare (${meat.value}x kött)`, price: 79 + Number(meat.value) * 20 + (cheese.checked ? 15 : 0) + (bacon.checked ? 20 : 0), emoji: '🍔', description: `${cheese.checked ? 'extra cheddar, ' : ''}${bacon.checked ? 'crispy bacon, ' : ''}${pickles.checked ? 'gurka' : 'utan gurka'}` };
    cart.push({ ...item, quantity: 1 });
    updateCart();
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  });
  update();
}

function initializePickupOptions() {
  const label = document.getElementById('selectedPickup');
  const summary = document.getElementById('pickupModeSummary');
  const updateLabel = () => {
    if (label) label.textContent = pickupSelection;
    if (summary) summary.textContent = pickupSelection;
  };
  document.querySelectorAll('.pickup-option').forEach((button) => {
    const option = button.dataset.pickup || button.dataset.queue;
    button.classList.toggle('selected', option === pickupSelection);
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', String(option === pickupSelection));
    button.addEventListener('click', () => {
      pickupSelection = option;
      pickupType = button.dataset.pickup || '';
      pickupQueue = button.dataset.queue || '';
      localStorage.setItem('pickupSelection', pickupSelection);
      localStorage.setItem('pickupType', pickupType);
      localStorage.setItem('pickupQueue', pickupQueue);
      document.querySelectorAll('.pickup-option').forEach((entry) => {
        const isSelected = entry === button;
        entry.classList.toggle('selected', isSelected);
        entry.setAttribute('aria-checked', String(isSelected));
      });
      updateLabel();
      updateCart();
    });
  });
  updateLabel();
}

const loginCard = document.getElementById('loginCard');
const loginBtn = document.getElementById('loginBtn');

function showPortal() {
  if (loginCard) loginCard.classList.add('hidden');
  if (staffPortal) staffPortal.classList.remove('hidden');
}

function showLogin() {
  if (loginCard) loginCard.classList.remove('hidden');
  if (staffPortal) staffPortal.classList.add('hidden');
}

function logoutAdmin() {
  window.currentAdminRole = null;
  const superAdminCard = document.querySelector('#superAdminForm')?.parentElement;
  const permissionNotice = document.querySelector('.permission-notice');
  if (superAdminCard) superAdminCard.style.display = '';
  if (permissionNotice) permissionNotice.remove();
  document.getElementById('staffPortal')?.classList.add('hidden');
  document.getElementById('employeePortal')?.classList.add('hidden');
  document.getElementById('loginCard')?.classList.remove('hidden');
  document.getElementById('loginForm')?.reset();
}

function setLoginStatus(message) {
  const status = document.getElementById('loginStatus');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('hidden', !message);
}

function handleLogin(event) {
  if (event) event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const match = adminUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password
  );

  if (match) {
    if (adminLocks[match.username]) {
      setLoginStatus('Admin-kontot är nöd-låst av ägaren.');
      return false;
    }
    const role = match.role;
    setLoginStatus('');
    showPortal();
    if (loginForm) loginForm.reset();
    window.currentAdminRole = role;
    renderAdminList();
    renderMasterLog();
    renderTechnicalIssues();
    return true;
  }

  setLoginStatus('Fel användarnamn eller lösenord. Kontrollera uppgifterna och försök igen.');
  return false;
}

if (!window.__staffLoginInitialized && loginForm && staffPortal) {
  window.__staffLoginInitialized = true;

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const success = handleLogin(event);
    if (success) {
        alert(`Välkommen ${window.currentAdminRole || 'Admin'}!`);
    }
  });

  if (loginBtn) {
    loginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const success = handleLogin(event);
      if (success) {
        alert(`Välkommen ${window.currentAdminRole || 'Admin'}!`);
      }
    });
  }
}

if (!window.__staffLogoutInitialized && logoutBtn && staffPortal && loginForm && loginCard) {
  window.__staffLogoutInitialized = true;
  logoutBtn.addEventListener('click', () => {
    showLogin();
    loginForm.reset();
  });
}

if (employeeForm && employeeList) {
  // Employee form submission now handled via inline onsubmit in staff.html
}

if (superAdminForm && adminList) {
  // Super-Admin form submission now handled via inline onsubmit in staff.html
}

if (menuForm && menuEditorList) {
  menuForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('menuName').value.trim();
    const price = Number(document.getElementById('menuPrice').value);
    const description = document.getElementById('menuDesc').value.trim();
    const emoji = document.getElementById('menuEmoji')?.value || '🍔';
    const category = document.getElementById('menuCategory')?.value || 'Extras';
    const imageFile = document.getElementById('menuImage')?.files?.[0];

    if (!name || !description || !price) return;

    let image = '';
    if (imageFile) {
      if (imageFile.size > 2 * 1024 * 1024) {
        alert('Bilden är för stor. Välj en bild under 2 MB.');
        return;
      }
      image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve('');
        reader.readAsDataURL(imageFile);
      });
    }

    const newId = Math.max(...menuItems.map(item => item.id), 0) + 1;
    const newItem = {
      id: newId,
      category: category,
      name: name,
      price: price,
      emoji: emoji,
      image: image,
      description: description,
      ingredients: document.getElementById('menuIngredients')?.value.trim() || '',
      allergens: document.getElementById('menuAllergens')?.value.trim() || '',
      favorite: document.getElementById('menuFavorite')?.checked || false,
      limitedUntil: document.getElementById('menuLimitedUntil')?.value || ''
    };

    menuItems.push(newItem);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    const item = document.createElement('li');
    item.style.padding = '10px 12px';
    item.style.backgroundColor = 'rgba(255, 199, 44, 0.1)';
    item.style.borderRadius = '8px';
    item.style.fontSize = '0.9rem';
    item.style.lineHeight = '1.6';
    item.innerHTML = `
      <strong style="color: var(--accent);">${emoji} ${name}</strong><br>
      <span style="color: var(--muted); font-size: 0.85rem;">
        ${category} • ${price} kr
      </span>
    `;
    menuEditorList.appendChild(item);
    menuForm.reset();
    
    if (typeof renderMenu === 'function') {
      renderMenu();
    }
    renderMenuEditor();
    addAudit(`Lade till menyrätt: ${name}`);
  });
}

if (eventForm) {
  eventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('eventName').value.trim();
    const time = document.getElementById('eventTime').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    if (!name || !time || !description) return;
    events.push({ name, time, date: time, description });
    localStorage.setItem('events', JSON.stringify(events));
    addAudit(`Lade till event: ${name}`);
    eventForm.reset();
    renderEventEditor();
    renderPublicEvent();
  });
}

document.querySelectorAll('.checkout-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const rpName = document.getElementById('rpName');
    if (rpName && !rpName.value.trim()) {
      rpName.focus();
      alert('Skriv ditt RP-namn först.');
      return;
    }
    showPaymentModal();
  });
});

function showPaymentModal() {
  const existingModal = document.getElementById('paymentModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const driveThruFee = pickupQueue === 'Drive-thru' ? subtotal * 0.05 : 0;
  const discount = document.getElementById('blueLightDiscount')?.checked && pickupType === 'Äta här' ? Math.min(100, subtotal) : 0;
  modal.id = 'paymentModal';
  modal.className = 'payment-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="document.getElementById('paymentModal').remove()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2>Betala</h2>
        <button class="modal-close" onclick="document.getElementById('paymentModal').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="payment-box">
          <p class="payment-label">Mottagare</p>
          <h3 class="payment-amount">ErkanBra</h3>
          <hr class="modal-divider">
          <p class="payment-info">Betalas via Polreg.se. ${discount ? `Blåljusrabatt: -${discount} kr. ` : ''}Bekräfta betalningen för att slutföra ordern.</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="secondary-btn" onclick="document.getElementById('paymentModal').remove()">Avbryt</button>
        <button class="primary-btn" onclick="completeOrder()">Bekräfta</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function completeOrder() {
  if (!cart.length) {
    alert('Lägg till något i kundvagnen först.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Save order to localStorage
  const order = {
    id: Math.floor(Math.random() * 100000),
    items: [...cart],
    total: subtotal + driveThruFee - (document.getElementById('blueLightDiscount')?.checked && pickupType === 'Äta här' ? Math.min(100, subtotal) : 0),
    pickupType,
    pickupQueue,
    pickupCode: String(Math.floor(1000 + Math.random() * 9000)),
    rpName: document.getElementById('rpName')?.value.trim() || '',
    driveThruWaiting: Boolean(document.getElementById('driveThruWaiting')?.checked),
    blueLightDiscount: Boolean(document.getElementById('blueLightDiscount')?.checked),
    discount: document.getElementById('blueLightDiscount')?.checked && pickupType === 'Äta här' ? Math.min(100, subtotal) : 0,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  orders.push(order);
  mPoints += Math.floor(order.total / 10);
  localStorage.setItem('mPoints', String(mPoints));
  saveOrders(orders);
  window.dispatchEvent(new StorageEvent('storage', { key: 'orders', newValue: JSON.stringify(orders) }));
  renderAdminOverview();
  
  alert('Tack för din beställning! Betalning till ErkanBra via Polreg.se.');
  cart.length = 0;
  updateCart();
  document.getElementById('paymentModal').remove();
  showOrderStatus(order);
}

function showOrderStatus(order) {
  const panel = document.getElementById('orderStatusPanel');
  const statusText = document.getElementById('orderStatusText');
  const statusDetail = document.getElementById('orderStatusDetail');
  const progress = document.getElementById('orderStatusProgress');
  const pickupCode = document.getElementById('pickupCode');
  if (!panel || !statusText || !statusDetail || !progress) return;

  panel.classList.remove('hidden');
  const pickupLabel = order.pickupType || order.pickupQueue || 'Takeaway';
  const steps = [
    ['Mottagen', 'Köket har tagit emot din order.', '33%'],
    ['Tillagas', 'Din order tillagas just nu.', '66%'],
    ['Klar för upphämtning', `${pickupLabel}. Visa koden i restaurangen.`, '100%']
  ];
  let step = 0;
  const update = () => {
    const current = steps[step];
    statusText.textContent = current[0];
    statusDetail.textContent = current[1];
    progress.style.width = current[2];
    if (step < steps.length - 1) {
      step += 1;
      window.setTimeout(update, 3500);
    }
  };
  if (pickupCode) pickupCode.textContent = order.pickupCode;
  update();
}

function initializeSpecialDisplay() {
  const specialDisplay = document.getElementById('currentSpecialDisplay');
  if (specialDisplay) {
    specialDisplay.textContent = getSpecialOffer();
  }
}

renderMenu();
updateCart();
initializeSpecialDisplay();
initializePickupOptions();
initializeCustomerTools();
initializeBurgerBuilder();
renderEmployeeList();
renderAdminOverview();
renderApplications();
renderMenuEditor();
renderEventEditor();
renderPublicEvent();
renderHallOfFame();
renderWorkforce();
renderShiftBoard();
renderOnDutyBoard();
renderShiftPlans();
updatePublicStatus();
renderHappyMealToy();
// New features
renderShiftReports();
renderAddons();
initializeEmployeeSearch();
initializeRestaurantUI();
renderAdminList();
renderHandovers();
renderReceiptArchive();
renderWeeklyWorker();
renderMasterLog();
renderStockAlerts();
renderMaintenanceScreen();
renderSiteLockState();
lockSiteRedirect();

function initializeRestaurantUI() {
  const breakfastBtn = document.getElementById('breakfastModeBtn');
  const statusBtn = document.getElementById('restaurantStatusBtn');
  
  if (breakfastBtn) {
    breakfastBtn.textContent = breakfastMode ? '🌅 Frukostmeny PÅ' : '🌅 Frukostmeny AV';
  }
  
  if (statusBtn) {
    statusBtn.textContent = restaurantOpen ? '🟢 ÖPPEN' : '🔴 STÄNGD';
    statusBtn.style.backgroundColor = restaurantOpen ? '#4ade80' : '#ef4444';
  }
  
  // Listen for meeting notices
  window.addEventListener('storage', (e) => {
    if (e.key === 'meetingNotices') {
      checkMeetingNotice();
      renderEmployeeInternalInfo();
    }
    if (e.key === 'handovers') {
      renderEmployeeInternalInfo();
    }
  });
}

function checkMeetingNotice() {
  const notices = JSON.parse(localStorage.getItem('meetingNotices') || '[]');
  if (!notices.length) return;
  const lastNotice = notices[notices.length - 1];
  const noticeTime = new Date(lastNotice.sentAt).getTime();
  if (Date.now() - noticeTime < 30000) { // Show if within 30 seconds
    alert(`📢 PERSONALMÖTE:\n${lastNotice.text}\n\nSkickat av: ${lastNotice.sentBy}`);
  }
}

function renderEmployeeInternalInfo() {
  const panel = document.getElementById('employeeHandover');
  if (!panel || !currentEmployee) return;
  const leadershipRoles = ['Shift Admin', 'Skiftledare', 'Admin', 'Super-Admin', 'Owner'];
  if (!leadershipRoles.includes(currentEmployee.role)) {
    panel.classList.add('hidden');
    return;
  }
  const handovers = JSON.parse(localStorage.getItem('handovers') || '[]');
  const meetings = JSON.parse(localStorage.getItem('meetingNotices') || '[]');
  const latestHandover = handovers[handovers.length - 1];
  const latestMeeting = meetings[meetings.length - 1];
  panel.classList.remove('hidden');
  panel.innerHTML = `<strong>Skiftledarinfo</strong><p>${latestHandover ? `${latestHandover.text}<br><small>${latestHandover.sentBy} · ${new Date(latestHandover.sentAt).toLocaleString('sv-SE')}</small>` : 'Ingen överlämning ännu.'}</p>${latestMeeting ? `<p><strong>📢 Personalmöte:</strong> ${latestMeeting.text}<br><small>${latestMeeting.sentBy} · ${new Date(latestMeeting.sentAt).toLocaleString('sv-SE')}</small></p>` : ''}`;
}

function renderEmployeeProfile() {
  if (!currentEmployee) return;
  const shifts = shiftRecords.filter((shift) => shift.employee === currentEmployee.username);
  const hours = shifts.reduce((total, shift) => total + getShiftWorkedSeconds(shift), 0) / 3600;
  const warnings = currentEmployee.warnings || [];
  const idCard = document.getElementById('employeeIdCard');
  const stats = document.getElementById('employeeStats');
  const warningPanel = document.getElementById('employeeWarnings');
  if (idCard) idCard.innerHTML = `<span class="eyebrow">McDonalds ID</span><h4>${currentEmployee.name}</h4><p>Roblox: ${currentEmployee.username}<br>Rank: ${currentEmployee.role}<br>Anställd: ${new Date(currentEmployee.hiredAt || currentEmployee.createdAt || Date.now()).toLocaleDateString('sv-SE')}</p>`;
  if (stats) stats.innerHTML = `<h4>Mina statistik</h4><p><strong>${shifts.length}</strong> skift totalt<br><strong>${hours.toFixed(1)}</strong> arbetade timmar<br><strong>${Math.min(shifts.length, 10)}/10</strong> mot nästa befordran</p>`;
  if (warningPanel) warningPanel.innerHTML = `<h4>Mina tjänstevarningar (${warnings.length}/3)</h4>${warnings.length ? warnings.map((warning) => `<details><summary>${warning.reason}</summary><p>${warning.evidence || 'Ingen bevislänk.'}<br>Givet av ${warning.givenBy || 'Admin'} · ${new Date(warning.at).toLocaleDateString('sv-SE')}</p></details>`).join('') : '<p>Inga tjänstevarningar.</p>'}`;
  renderHandbook();
  renderEmployeeLeaderboard();
}

function renderHandbook() {
  const content = document.getElementById('handbookContent');
  const topic = document.getElementById('handbookTopic')?.value || 'drive';
  if (!content) return;
  const pages = { drive: 'Hälsa kunden välkommen, upprepa ordern, kontrollera betalning och lämna över tydligt till köket.', break: 'Stämpla rast innan du lämnar stationen. Återuppta skiftet när du är tillbaka och meddela skiftledaren.', dress: 'Bär godkänd McDonalds-tröja, byxor och keps. Håll uniformen ren och använd rätt Roblox-kläd-ID.' };
  content.textContent = pages[topic];
}

function requestLeave(event) {
  event.preventDefault();
  if (!currentEmployee) return false;
  const days = Number(document.getElementById('leaveDays')?.value);
  if (!Number.isFinite(days) || days < 1) return false;
  const until = new Date(Date.now() + days * 86400000).toISOString();
  currentEmployee.onLeave = true;
  currentEmployee.leaveUntil = until;
  const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
  requests.push({ username: currentEmployee.username, days, until, at: new Date().toISOString() });
  localStorage.setItem('leaveRequests', JSON.stringify(requests.slice(-100)));
  saveEmployees(employees);
  renderEmployeeProfile();
  alert(`Ledighet registrerad i ${days} dagar.`);
  return false;
}

function reportTechnicalIssue(event) {
  event.preventDefault();
  if (!currentEmployee) return false;
  const input = document.getElementById('issueInput');
  const text = input?.value.trim();
  if (!text) return false;
  const reports = JSON.parse(localStorage.getItem('technicalIssues') || '[]');
  reports.push({ text, by: currentEmployee.name, username: currentEmployee.username, at: new Date().toISOString(), status: 'Ny' });
  localStorage.setItem('technicalIssues', JSON.stringify(reports.slice(-100)));
  input.value = '';
  alert('Tekniska rapporten skickades till Shift Admin.');
  return false;
}

function renderTechnicalIssues() {
  const card = document.getElementById('issueReportCard');
  const list = document.getElementById('issueReportList');
  if (!card || !list) return;
  const canView = ['Owner', 'Super-Admin', 'Admin', 'Shift Admin'].includes(window.currentAdminRole);
  card.hidden = !canView;
  if (!canView) return;
  const reports = JSON.parse(localStorage.getItem('technicalIssues') || '[]');
  list.innerHTML = reports.length ? reports.slice().reverse().map((report) => `<div class="admin-order-row"><span><strong>${report.status}</strong> · ${report.text}</span><small>${report.by} · ${new Date(report.at).toLocaleString('sv-SE')}</small></div>`).join('') : '<p class="empty-state">Inga felrapporter.</p>';
}

function renderEmployeeLeaderboard() {
  const list = document.getElementById('employeeLeaderboard');
  if (!list) return;
  const totals = employees.map((employee) => ({ employee, seconds: shiftRecords.filter((shift) => shift.employee === employee.username).reduce((sum, shift) => sum + getShiftWorkedSeconds(shift), 0) })).sort((a, b) => b.seconds - a.seconds);
  list.innerHTML = totals.length ? totals.map((entry, index) => `<p><strong>${index + 1}. ${entry.employee.name}</strong> · ${(entry.seconds / 3600).toFixed(1)} h</p>`).join('') : '<p>Ingen statistik ännu.</p>';
}

function playOrderAlert() {
  if (!currentShift || currentShift.paused) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.04, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.18);
}

// Employee portal functions
function handleStaffLogin() {
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');
  if (!usernameEl || !passwordEl) return false;

  const u = usernameEl.value.trim();
  const p = passwordEl.value.trim();
  
  // Check admin users
  const ADMINS_LOGIN = [
    { username: 'shiftadmin', password: 'admin123', role: 'Shift Admin' },
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'superadmin', password: 'superadmin123', role: 'Super-Admin' },
    { username: 'erkanbra', password: 'erkan123', role: 'Owner' }
  ];
  
  const adminMatch = ADMINS_LOGIN.find(a => a.username.toLowerCase() === u.toLowerCase() && a.password === p);
  if (adminMatch) {
    if (adminLocks[adminMatch.username]) {
      setLoginStatus('Admin-kontot är nöd-låst av ägaren.');
      return false;
    }
    setLoginStatus('');
    // Store the current admin role for permission checks
    window.currentAdminRole = adminMatch.role;
    renderAdminList();
    renderMasterLog();
    renderTechnicalIssues();
    
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('staffPortal').classList.remove('hidden');
    const sd = document.getElementById('currentSpecialDisplay');
    if (sd) sd.textContent = getSpecialOffer();
    const st = document.getElementById('specialText');
    if (st) st.value = getSpecialOffer();
    const sac = document.querySelector('#superAdminForm')?.parentElement;
    if (sac) {
      const isSuperAdmin = adminMatch.role === 'Super-Admin' || adminMatch.role === 'Owner';
      sac.style.display = isSuperAdmin ? 'block' : 'none';
      
      // Show Super-Admin option in dropdown for Super-Admin users
      const superAdminOption = document.querySelector('option.super-admin-option');
      if (superAdminOption) {
        superAdminOption.style.display = isSuperAdmin ? 'block' : 'none';
      }
      
      // Add notice for non-Super-Admin users
      if (!isSuperAdmin && !document.querySelector('.permission-notice')) {
        const noticeEl = document.createElement('div');
        noticeEl.className = 'permission-notice';
        noticeEl.style.padding = '12px';
        noticeEl.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
        noticeEl.style.border = '1px solid rgba(255, 193, 7, 0.3)';
        noticeEl.style.borderRadius = '8px';
        noticeEl.style.marginBottom = '16px';
        noticeEl.style.color = 'rgba(255, 193, 7, 0.8)';
        noticeEl.style.fontSize = '0.9rem';
        noticeEl.textContent = '⚠️ Endast Super-Admin kan ge Super-Admin behörighet';
        sac.parentElement.insertBefore(noticeEl, sac);
      }
    }
    alert('Välkommen ' + adminMatch.role + '!');
    document.getElementById('loginForm').reset();
    return false;
  }
  
  // Check employee users
  const employeeMatch = employees.find(e => e.username.toLowerCase() === u.toLowerCase() && e.password === p);
  if (employeeMatch) {
    if (employeeMatch.status === 'Avskedad' || employeeMatch.disabled) {
      setLoginStatus(employeeMatch.status === 'Avskedad' ? 'Kontot är spärrat eftersom personen är avskedad.' : 'Kontot är tillfälligt avstängt av en chef.');
      return false;
    }
    setLoginStatus('');
    currentEmployee = employeeMatch;
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('employeePortal').classList.remove('hidden');
    const isTrainee = employeeMatch.staffStatus === 'Praktikant' && employeeMatch.practiceUntil && Date.now() < new Date(employeeMatch.practiceUntil).getTime();
    if (employeeMatch.staffStatus === 'Praktikant' && !isTrainee) employeeMatch.staffStatus = 'Godkänd personal';
    document.getElementById('employeePortalName').textContent = employeeMatch.name + ' (' + employeeMatch.role + ')' + (isTrainee ? ' · Praktikant' : '');
    const employeeNotice = document.getElementById('employeeNotice');
    if (employeeNotice) employeeNotice.textContent = localStorage.getItem('staffNotice') || 'Ingen intern information just nu.';
    renderEmployeeInternalInfo();
    renderEmployeeProfile();
    updateEmployeeOrders();
    document.getElementById('loginForm').reset();
    updateShiftStatus();
    alert('Välkommen ' + employeeMatch.name + '!');
    return false;
  }
  
  setLoginStatus('Fel användarnamn eller lösenord. Kontrollera uppgifterna och försök igen.');
  return false;
}

function logoutEmployee() {
  currentEmployee = null;
  currentShift = null;
  window.currentAdminRole = null;
  document.getElementById('employeePortal').classList.add('hidden');
  document.getElementById('loginCard').classList.remove('hidden');
  document.getElementById('loginForm').reset();
}

function toggleShift() {
  if (!currentEmployee) return;
  
  if (!currentShift) {
    if (!restaurantOpen) {
      alert('Restaurangen är stängd. En chef måste öppna den innan du kan starta ett skift.');
      return;
    }
    currentShift = {
      id: `${currentEmployee.username}-${Date.now()}`,
      employee: currentEmployee.username,
      name: currentEmployee.name,
      role: currentEmployee.role,
      station: document.getElementById('employeeStation')?.value || 'Ingen station',
      startTime: new Date().toISOString(),
      endTime: null,
      paused: false,
      pauseStartedAt: null,
      pausedSeconds: 0
    };
    shiftRecords.push(currentShift);
  } else {
    if (currentShift.paused && currentShift.pauseStartedAt) {
      currentShift.pausedSeconds = Number(currentShift.pausedSeconds || 0) + Math.max(0, (Date.now() - new Date(currentShift.pauseStartedAt).getTime()) / 1000);
      currentShift.paused = false;
      currentShift.pauseStartedAt = null;
    }
    currentShift.endTime = new Date().toISOString();
    const savedShift = shiftRecords.find((shift) => shift.id === currentShift.id);
    if (savedShift) savedShift.endTime = currentShift.endTime;
    currentShift = null;
  }
  localStorage.setItem('shiftRecords', JSON.stringify(shiftRecords));
  updateShiftStatus();
  renderShiftBoard();
  renderOnDutyBoard();
}

function updateShiftStatus() {
  const btn = document.getElementById('shiftBtn');
  const pauseBtn = document.getElementById('pauseShiftBtn');
  const status = document.getElementById('shiftStatus');
  if (!btn || !status) return;
  
  if (currentShift) {
    btn.textContent = 'Gå ut shift';
    btn.style.backgroundColor = 'var(--danger)';
    if (pauseBtn) {
      pauseBtn.hidden = false;
      pauseBtn.textContent = currentShift.paused ? 'Fortsätt skift' : 'Ta rast';
      pauseBtn.style.backgroundColor = currentShift.paused ? 'var(--green)' : 'var(--accent)';
    }
    const startTime = new Date(currentShift.startTime);
    status.textContent = `${currentShift.paused ? '⏸ Rast sedan ' : '✓ I shift sedan '}${startTime.toLocaleTimeString('sv-SE')}`;
  } else {
    btn.textContent = 'Gå in shift';
    btn.style.backgroundColor = '';
    if (pauseBtn) pauseBtn.hidden = true;
    status.textContent = '○ Inte i shift';
  }
}

function getShiftWorkedSeconds(shift) {
  const end = shift.endTime ? new Date(shift.endTime).getTime() : Date.now();
  let pausedSeconds = Number(shift.pausedSeconds || 0);
  if (shift.paused && shift.pauseStartedAt) pausedSeconds += Math.max(0, (Date.now() - new Date(shift.pauseStartedAt).getTime()) / 1000);
  return Math.max(0, Math.floor((end - new Date(shift.startTime).getTime()) / 1000 - pausedSeconds) + Number(shift.addedSeconds || 0));
}

function toggleShiftPause() {
  if (!currentShift) return;
  const now = new Date().toISOString();
  if (currentShift.paused && currentShift.pauseStartedAt) {
    currentShift.pausedSeconds = Number(currentShift.pausedSeconds || 0) + Math.max(0, (Date.now() - new Date(currentShift.pauseStartedAt).getTime()) / 1000);
    currentShift.pauseStartedAt = null;
    currentShift.paused = false;
  } else {
    currentShift.pauseStartedAt = now;
    currentShift.paused = true;
  }
  const savedShift = shiftRecords.find((shift) => shift.id === currentShift.id);
  if (savedShift) Object.assign(savedShift, currentShift);
  localStorage.setItem('shiftRecords', JSON.stringify(shiftRecords));
  updateShiftStatus();
  renderShiftBoard();
  renderOnDutyBoard();
}

function updateEmployeeOrders() {
  const container = document.getElementById('ordersContainer');
  
  if (!orders || orders.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); text-align: center;">Inga ordrar att ta.</p>';
    return;
  }
  
  const pendingOrders = orders.filter(o => o.status === 'pending');
  
  if (pendingOrders.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); text-align: center;">Inga ordrar att ta.</p>';
    return;
  }
  
  container.innerHTML = pendingOrders.map(order => {
    const itemsList = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
    return `
      <div style="padding: 12px; background: rgba(255, 199, 44, 0.1); border-radius: 8px; margin-bottom: 10px; border: 1px solid rgba(255, 199, 44, 0.2);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <div>
            <strong style="color: var(--accent);">Order #${order.id}</strong><br>
            <span style="color: var(--muted); font-size: 0.85rem;">${order.rpName ? `RP-namn: ${order.rpName}<br>` : ''}${itemsList}<br>${order.pickupType || order.pickupQueue || 'Takeaway'} · Kod ${order.pickupCode || '----'}</span>
          </div>
          <span style="background: rgba(255, 199, 44, 0.2); padding: 4px 8px; border-radius: 4px; font-weight: 600; color: var(--accent);">${order.total} kr${order.blueLightDiscount ? ' · Blåljus -100 kr' : ''}${order.driveThruWaiting ? ' · 🚗 Väntar' : ''}</span>
        </div>
        <button class="secondary-btn full" onclick="completeEmployeeOrder(${order.id});" style="margin-top: 8px;">Klar för upphämtning</button>
      </div>
    `;
  }).join('');
}

function completeEmployeeOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = 'ready';
    order.completedBy = currentEmployee.username;
    order.completedTime = new Date().toISOString();
    saveOrders(orders);
    updateEmployeeOrders();
    renderAdminOverview();
    alert('Order markerad som klar!');
  }
}
