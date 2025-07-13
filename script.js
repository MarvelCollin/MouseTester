let leftClicks = 0;
let rightClicks = 0;
let doubleClicks = 0;
let clickTimes = [];
let lastClickTime = 0;
let doubleClickDelay = 300;

const leftClicksElement = document.getElementById('leftClicks');
const rightClicksElement = document.getElementById('rightClicks');
const doubleClicksElement = document.getElementById('doubleClicks');
const clickArea = document.getElementById('clickArea');
const clickIndicator = document.getElementById('clickIndicator');
const resetBtn = document.getElementById('resetBtn');
const testBtn = document.getElementById('testBtn');
const cpsElement = document.getElementById('cps');
const lastClickElement = document.getElementById('lastClick');

function updateDisplay() {
    leftClicksElement.textContent = leftClicks;
    rightClicksElement.textContent = rightClicks;
    doubleClicksElement.textContent = doubleClicks;
    calculateCPS();
}

function calculateCPS() {
    const now = Date.now();
    clickTimes = clickTimes.filter(time => now - time < 1000);
    cpsElement.textContent = clickTimes.length;
}

function showClickIndicator(x, y) {
    clickIndicator.style.left = x + 'px';
    clickIndicator.style.top = y + 'px';
    clickIndicator.classList.remove('active');
    void clickIndicator.offsetWidth;
    clickIndicator.classList.add('active');
    
    setTimeout(() => {
        clickIndicator.classList.remove('active');
    }, 600);
}

function addPulseEffect(element) {
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 300);
}

clickArea.addEventListener('click', function(e) {
    const now = Date.now();
    const rect = clickArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    leftClicks++;
    clickTimes.push(now);
    lastClickElement.textContent = 'Left Click';
    
    showClickIndicator(x, y);
    addPulseEffect(leftClicksElement.parentElement);
    updateDisplay();
    
    lastClickTime = now;
});

clickArea.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const rect = clickArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    rightClicks++;
    clickTimes.push(Date.now());
    lastClickElement.textContent = 'Right Click';
    
    showClickIndicator(x, y);
    addPulseEffect(rightClicksElement.parentElement);
    updateDisplay();
});

clickArea.addEventListener('dblclick', function(e) {
    const rect = clickArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    doubleClicks++;
    lastClickElement.textContent = 'Double Click';        clickIndicator.style.background = '#51cf66';
    showClickIndicator(x, y);
    addPulseEffect(doubleClicksElement.parentElement);
    
    setTimeout(() => {
        clickIndicator.style.background = '#4dabf7';
    }, 600);
    
    updateDisplay();
});

resetBtn.addEventListener('click', function() {
    leftClicks = 0;
    rightClicks = 0;
    doubleClicks = 0;
    clickTimes = [];
    lastClickElement.textContent = 'None';
    updateDisplay();
    addPulseEffect(resetBtn);
});

testBtn.addEventListener('click', function() {
    let testClicks = 0;
    const maxClicks = 5;
    const interval = 150;
    
    addPulseEffect(testBtn);
    
    const testInterval = setInterval(() => {
        const rect = clickArea.getBoundingClientRect();
        const x = Math.random() * (rect.width - 40) + 20;
        const y = Math.random() * (rect.height - 40) + 20;
        
        showClickIndicator(x, y);
        leftClicks++;
        clickTimes.push(Date.now());
        
        testClicks++;
        if (testClicks >= maxClicks) {
            clearInterval(testInterval);
            lastClickElement.textContent = 'Auto Test Completed';
        } else {
            lastClickElement.textContent = 'Auto Test Click ' + testClicks;
        }
        
        updateDisplay();
    }, interval);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
        resetBtn.click();
    }
    if (e.key === 't' || e.key === 'T') {
        testBtn.click();
    }
});

setInterval(calculateCPS, 100);

updateDisplay();
