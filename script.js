const siteRules = {
    wnacg: { lengths: [1, 2, 3, 4, 5, 6], url: (number) => `https://wnacg.com/photos-index-aid-${number}.html`, label: '紳士漫畫連結' },
    nhentai: { lengths: [1, 2, 3, 4, 5, 6], url: (number) => `https://nhentai.net/g/${number}/`, label: 'N Hentai 連結' },
    '18comic': { lengths: [1, 2, 3, 4, 5, 6, 7], url: (number) => `https://18comic.vip/photo/${number}.html`, label: '18comic.vip 連結' },
    hanime: { lengths: [5, 6], url: (number) => `https://hanime1.me/comic/${number}`, label: 'Hanime 連結' },
    pixiv: { lengths: [8], url: (number) => `https://www.pixiv.net/artworks/${number}`, label: 'Pixiv 連結' }
};

// DOM Elements
const siteSelect = document.getElementById('siteSelect');
const digitLengthSelect = document.getElementById('digitLength');
const inputNumber = document.getElementById('inputNumber');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const randomBtn = document.getElementById('randomBtn');
const linksContainer = document.getElementById('links');
const errorContainer = document.getElementById('error');

// Populate site options
Object.keys(siteRules).forEach(site => {
    const option = document.createElement('option');
    option.value = site;
    option.textContent = siteRules[site].label;
    siteSelect.appendChild(option);
});

// Update digit lengths
siteSelect.addEventListener('change', () => {
    errorContainer.textContent = '';
    digitLengthSelect.innerHTML = '<option value="">請選擇位數</option>';
    const site = siteSelect.value;
    if (site) {
        siteRules[site].lengths.forEach(length => {
            digitLengthSelect.innerHTML += `<option value="${length}">${length}位</option>`;
        });
        digitLengthSelect.disabled = false;
        inputNumber.disabled = false;
        generateBtn.disabled = false;
    } else {
        digitLengthSelect.disabled = true;
        inputNumber.disabled = true;
        generateBtn.disabled = true;
    }
});

// Generate link
generateBtn.addEventListener('click', () => {
    const site = siteSelect.value;
    const length = parseInt(digitLengthSelect.value, 10);
    const number = inputNumber.value.trim();
    linksContainer.innerHTML = '';
    errorContainer.textContent = '';

    if (!/^\d+$/.test(number)) {
        inputNumber.classList.add('error');
        errorContainer.textContent = '請輸入有效的數字編號！';
        return;
    }

    if (number.length !== length) {
        errorContainer.textContent = `輸入的數字位數應為 ${length} 位。`;
        return;
    }

    const url = siteRules[site].url(number);
    const link = document.createElement('a');
    link.href = url;
    link.textContent = siteRules[site].label;
    link.target = '_blank';
    linksContainer.appendChild(link);
    inputNumber.classList.remove('error');
});

// Clear inputs
clearBtn.addEventListener('click', () => {
    siteSelect.value = '';
    digitLengthSelect.innerHTML = '<option value="">請選擇位數</option>';
    digitLengthSelect.disabled = true;
    inputNumber.value = '';
    inputNumber.disabled = true;
    generateBtn.disabled = true;
    linksContainer.innerHTML = '';
    errorContainer.textContent = '';
});

// Generate random number
randomBtn.addEventListener('click', () => {
    const length = parseInt(digitLengthSelect.value, 10);
    if (isNaN(length)) {
        errorContainer.textContent = '請先選擇網站和位數！';
        return;
    }
    const randomNum = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    inputNumber.value = randomNum;
});
