/* =========================================================
   띠 컬러 로드맵 — app.js
   ========================================================= */
(function () {
  'use strict';

  const TABLE = 'color_cards';
  const LS_KEY = 'zodiac_color_cards_v1';
  const OWNER_KEY = 'zodiac_color_owner_token';

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  let currentZodiacKey = null;
  let chartInstance = null;
  let usingApi = true;

  /* ---------------- 유틸 ---------------- */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function hexToRgba(hex, alpha) {
    const clean = String(hex).replace('#', '');
    const full = clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean;
    const num = parseInt(full, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  let toastTimer = null;
  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('is-visible'), 2400);
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      toast(successMessage || '복사했어요');
    } catch (err) {
      toast('복사에 실패했어요. 직접 선택해 주세요.');
    }
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return date.getFullYear() + '.' + pad(date.getMonth() + 1) + '.' + pad(date.getDate());
  }

  /* ---------------- 에너지(오행) 점수 ---------------- */
  const ELEMENT_KEYS = ['wood', 'fire', 'earth', 'metal', 'water'];

  function elementScores(zodiac) {
    const scores = {};
    ELEMENT_KEYS.forEach((key) => { scores[key] = 26; });
    scores[zodiac.element] = 100;
    if (zodiac.companion && zodiac.companion !== zodiac.element) {
      scores[zodiac.companion] = Math.max(scores[zodiac.companion], 62);
    }
    return scores;
  }

  /* ---------------- 띠 계산 ---------------- */
  function keyFromYear(year) {
    const y = Number(year);
    if (!isFinite(y) || y < 1) return null;
    const index = (((y - 4) % 12) + 12) % 12;
    return ZODIAC_ORDER[index];
  }

  function yearFromKey(key) {
    const index = ZODIAC_ORDER.indexOf(key);
    if (index < 0) return null;
    return 2020 + ((index - ZODIAC_ORDER.indexOf('rat') + 12) % 12);
  }

  /* ---------------- 칩 (빠른 선택) ---------------- */
  function renderChips() {
    const wrap = $('#chip-grid');
    if (!wrap) return;
    wrap.innerHTML = '';
    ZODIAC_ORDER.forEach((key) => {
      const z = ZODIAC[key];
      const button = el('button', 'chip');
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      const emoji = el('span', 'chip-emoji', z.emoji);
      emoji.setAttribute('aria-hidden', 'true');
      button.appendChild(emoji);
      button.appendChild(el('span', null, z.name));
      button.addEventListener('click', () => {
        selectZodiac(key);
      });
      wrap.appendChild(button);
    });
  }

  function highlightChip(key) {
    $$('#chip-grid .chip').forEach((chip) => {
      const label = chip.textContent.replace(/\s/g, '');
      const target = ZODIAC[key].name.replace(/\s/g, '');
      chip.setAttribute('aria-pressed', label === target ? 'true' : 'false');
    });
  }

  /* ---------------- 오행 카드 ---------------- */
  function renderElementCards() {
    const wrap = $('#element-grid');
    if (!wrap) return;
    wrap.innerHTML = '';
    ELEMENT_KEYS.forEach((key) => {
      const e = ELEMENTS[key];
      const card = el('article', 'element-card');
      card.style.setProperty('--el', e.color);
      card.style.setProperty('--el-soft', e.soft);
      card.style.setProperty('--el-text', e.text);

      const top = el('div', 'element-top');
      top.appendChild(el('h3', 'element-name', e.name));
      const glyph = el('span', 'element-glyph', e.alias.charAt(0));
      glyph.setAttribute('aria-hidden', 'true');
      top.appendChild(glyph);
      card.appendChild(top);

      card.appendChild(el('p', 'element-keyword', e.keyword));
      card.appendChild(el('p', 'element-trait', e.trait));
      card.appendChild(el('p', 'element-desc', e.desc));
      card.appendChild(el('span', 'element-season', e.season + ' · ' + e.color.toUpperCase()));
      wrap.appendChild(card);
    });
  }

  function renderCycles() {
    const goodLine = $('#cycle-good');
    const badLine = $('#cycle-bad');

    if (goodLine) {
      goodLine.innerHTML = '';
      ELEMENT_KEYS.forEach((key, index) => {
        const e = ELEMENTS[key];
        const strong = document.createElement('b');
        strong.textContent = e.name;
        goodLine.appendChild(strong);
        goodLine.appendChild(document.createTextNode(' → '));
        if (index === ELEMENT_KEYS.length - 1) {
          const back = document.createElement('b');
          back.textContent = ELEMENTS[ELEMENTS[key].generates].name;
          goodLine.appendChild(back);
        }
      });
      goodLine.appendChild(document.createTextNode(' 순서로 서로를 살립니다.'));
    }

    if (badLine) {
      badLine.innerHTML = '';
      const order = ['wood', 'earth', 'water', 'fire', 'metal'];
      order.forEach((key, index) => {
        const e = ELEMENTS[key];
        const strong = document.createElement('b');
        strong.textContent = e.name;
        badLine.appendChild(strong);
        badLine.appendChild(document.createTextNode(index === order.length - 1 ? '' : ' → '));
      });
      badLine.appendChild(document.createTextNode(' 순서로 서로를 누릅니다.'));
    }
  }

  /* ---------------- 카탈로그 ---------------- */
  function miniSwatch(hex, isBad) {
    const dot = el('span', 'mini-swatch' + (isBad ? ' is-bad' : ''));
    dot.style.background = hex;
    dot.title = hex;
    return dot;
  }

  function renderCatalog() {
    const wrap = $('#catalog-groups');
    if (!wrap) return;
    wrap.innerHTML = '';

    ZODIAC_GROUPS.forEach((group) => {
      const element = ELEMENTS[group.element];
      const section = el('section', 'group-card');
      section.style.setProperty('--el-soft', element.soft);
      section.style.setProperty('--el-text', element.text);

      const head = el('header', 'group-head');
      head.appendChild(el('h3', 'group-title', group.title));
      head.appendChild(el('span', 'group-tag', element.name + ' · ' + element.season));
      section.appendChild(head);

      const grid = el('div', 'group-grid');

      group.keys.forEach((key) => {
        const z = ZODIAC[key];
        const card = el('button', 'zodiac-card');
        card.type = 'button';
        card.setAttribute('aria-label', z.name + ' 컬러 리포트 보기');

        const cardHead = el('div', 'zodiac-card-head');
        const emoji = el('span', 'zodiac-card-emoji', z.emoji);
        emoji.setAttribute('aria-hidden', 'true');
        cardHead.appendChild(emoji);
        const nameBox = el('div');
        nameBox.appendChild(el('span', 'zodiac-card-name', z.name));
        nameBox.appendChild(el('span', 'zodiac-card-sub', z.branch + ' · ' + z.makeup));
        cardHead.appendChild(nameBox);
        card.appendChild(cardHead);

        card.appendChild(el('p', 'zodiac-card-headline', z.headline));

        const rows = el('div', 'zodiac-rows');

        const goodRow = el('div', 'zodiac-row');
        goodRow.appendChild(el('span', 'zodiac-row-label good', '어울림'));
        const goodDots = el('span', 'mini-swatches');
        z.good.forEach((c) => goodDots.appendChild(miniSwatch(c.hex, false)));
        goodRow.appendChild(goodDots);
        rows.appendChild(goodRow);

        const badRow = el('div', 'zodiac-row');
        badRow.appendChild(el('span', 'zodiac-row-label bad', '주의'));
        const badDots = el('span', 'mini-swatches');
        z.bad.forEach((c) => badDots.appendChild(miniSwatch(c.hex, true)));
        badRow.appendChild(badDots);
        rows.appendChild(badRow);

        card.appendChild(rows);
        card.appendChild(el('span', 'zodiac-card-more', '자세히 보기 →'));

        card.addEventListener('click', () => selectZodiac(key));
        grid.appendChild(card);
      });

      section.appendChild(grid);
      wrap.appendChild(section);
    });
  }

  /* ---------------- 결과 렌더 ---------------- */
  function renderResult(key) {
    const z = ZODIAC[key];
    const element = ELEMENTS[z.element];

    $('#result-emoji').textContent = z.emoji;
    $('#result-kicker').textContent = z.branch + ' · ' + z.makeup + ' · ' + z.pairTitle;
    $('#result-name').textContent = z.name + ' 컬러 리포트';
    $('#result-headline').textContent = z.headline;
    $('#result-summary').textContent = z.summary;

    const badge = $('#result-badge');
    badge.textContent = element.name;
    badge.style.background = element.soft;
    badge.style.color = element.text;
    badge.style.borderColor = hexToRgba(element.color, 0.35);

    // 어울리는 컬러
    const goodList = $('#good-list');
    goodList.innerHTML = '';
    z.good.forEach((c) => {
      const li = el('li', 'swatch');
      const chip = el('span', 'swatch-chip');
      chip.style.background = c.hex;
      li.appendChild(chip);
      const info = el('div', 'swatch-info');
      info.appendChild(el('span', 'swatch-name', c.name));
      const hex = el('span', 'swatch-hex', c.hex.toUpperCase());
      info.appendChild(hex);
      if (c.why) info.appendChild(el('p', 'swatch-why', c.why));
      li.appendChild(info);
      goodList.appendChild(li);
    });

    // 피해야 할 컬러
    const badList = $('#bad-list');
    badList.innerHTML = '';
    z.bad.forEach((c) => {
      const li = el('li', 'swatch');
      const chip = el('span', 'swatch-chip');
      chip.style.background = c.hex;
      li.appendChild(chip);
      const info = el('div', 'swatch-info');
      info.appendChild(el('span', 'swatch-name', c.name));
      info.appendChild(el('span', 'swatch-hex', c.hex.toUpperCase()));
      li.appendChild(info);
      badList.appendChild(li);
    });
    $('#bad-reason').textContent = z.badReason;

    // 보완하면 좋은 컬러 (상생 컬러)
    const balanceList = $('#balance-list');
    balanceList.className = 'swatch-list swatch-list-balance';
    balanceList.innerHTML = '';
    element.balanceColors.forEach((hex, index) => {
      const li = el('li', 'swatch');
      const chip = el('span', 'swatch-chip');
      chip.style.background = hex;
      li.appendChild(chip);
      const info = el('div', 'swatch-info');
      info.appendChild(el('span', 'swatch-name', index === 0 ? '보완 컬러 ①' : '보완 컬러 ' + (index + 1)));
      info.appendChild(el('span', 'swatch-hex', hex.toUpperCase()));
      if (index === 0) info.appendChild(el('p', 'swatch-why', ELEMENTS[element.generatedBy].name + ' 기운으로 부족한 기운을 채워줍니다.'));
      li.appendChild(info);
      balanceList.appendChild(li);
    });
    $('#balance-why').textContent = element.balanceWhy;

    // 오행 음식 궁합
    $('#result-taste').textContent = element.taste;
    const foodGood = $('#food-good-list');
    const foodCaution = $('#food-caution-list');
    foodGood.innerHTML = '';
    foodCaution.innerHTML = '';
    element.goodFoods.forEach((food) => foodGood.appendChild(el('li', null, food)));
    element.cautionFoods.forEach((food) => foodCaution.appendChild(el('li', null, food)));
    $('#food-note').textContent = element.foodNote;

    // 팔레트
    const palette = $('#palette-grid');
    palette.innerHTML = '';
    z.palette.forEach((hex) => {
      const swatch = el('button', 'palette-swatch');
      swatch.type = 'button';
      swatch.style.background = hex;
      swatch.dataset.hex = hex;
      swatch.setAttribute('aria-label', hex + ' 값 복사');
      swatch.addEventListener('click', () => copyText(hex, hex + ' 복사 완료'));
      palette.appendChild(swatch);
    });

    // 팁
    $('#result-tip-text').textContent = z.tip;

    // 오행 차트
    renderChart(z);

    // 화면 표시
    const section = $('#result-section');
    section.hidden = false;

    const saveHint = $('#save-hint');
    saveHint.textContent = '이름을 남기면 저장한 카드에서 다시 볼 수 있습니다.';
  }

  function renderChart(zodiac) {
    const canvas = $('#element-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const scores = elementScores(zodiac);
    const main = ELEMENTS[zodiac.element];
    const labels = ELEMENT_KEYS.map((key) => ELEMENTS[key].name + '\n' + ELEMENTS[key].alias);
    const values = ELEMENT_KEYS.map((key) => scores[key]);

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    chartInstance = new Chart(canvas.getContext('2d'), {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: zodiac.name + ' 오행 밸런스',
          data: values,
          backgroundColor: hexToRgba(main.color, 0.22),
          borderColor: main.color,
          borderWidth: 2.5,
          pointBackgroundColor: main.color,
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
          pointRadius: 4.5,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 650 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ' ' + ctx.formattedValue + ' / 100'
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 25,
              backdropColor: 'transparent',
              color: '#9AA1B2',
              font: { size: 10 }
            },
            grid: { color: '#E6E9F0' },
            angleLines: { color: '#E6E9F0' },
            pointLabels: {
              color: '#4A5160',
              font: { size: 12, weight: '600' }
            }
          }
        }
      }
    });

    const note = $('#chart-note');
    if (note) {
      const main = ELEMENTS[zodiac.element];
      note.textContent = main.name + ' 기운을 중심으로, 상생으로 연결된 ' +
        ELEMENTS[main.generates].name + ' 기운이 뒤를 받치는 구성입니다.';
    }
  }

  /* ---------------- 오행별 음식 가이드 ---------------- */
  function renderFoodGuide() {
    const wrap = $('#food-guide-grid');
    if (!wrap) return;
    wrap.innerHTML = '';

    ELEMENT_KEYS.forEach((key) => {
      const e = ELEMENTS[key];
      const card = el('article', 'food-guide-card');
      card.style.setProperty('--el', e.color);
      card.style.setProperty('--el-soft', e.soft);
      card.style.setProperty('--el-text', e.text);

      const top = el('div', 'food-guide-top');
      top.appendChild(el('h3', 'food-guide-name', e.name));
      top.appendChild(el('span', 'food-guide-eat', e.keyword));
      card.appendChild(top);

      card.appendChild(el('span', 'food-guide-taste', '대표 맛 · ' + e.taste));

      card.appendChild(el('p', 'food-guide-sub good', '✓ 기운을 살리는 음식'));
      const goodList = el('ul', 'food-guide-list is-good');
      e.goodFoods.forEach((food) => goodList.appendChild(el('li', null, food)));
      card.appendChild(goodList);

      card.appendChild(el('p', 'food-guide-sub caution', '✕ 과하면 기운을 누르는 음식'));
      const cautionList = el('ul', 'food-guide-list is-caution');
      e.cautionFoods.forEach((food) => cautionList.appendChild(el('li', null, food)));
      card.appendChild(cautionList);

      card.appendChild(el('p', 'food-guide-note', e.foodNote));
      wrap.appendChild(card);
    });
  }

  /* ---------------- 띠 선택 ---------------- */
  function selectZodiac(key, birthYear) {
    if (!ZODIAC[key]) return;
    currentZodiacKey = key;
    highlightChip(key);
    renderResult(key);

    const nameEl = $('#result-name');
    if (birthYear && nameEl) {
      const z = ZODIAC[key];
      nameEl.textContent = z.name + ' 컬러 리포트';
      $('#result-kicker').textContent =
        birthYear + '년생 · ' + z.branch + ' · ' + z.makeup;
    }

    const section = $('#result-section');
    const target = $('#result-anchor') || section;
    if (target && typeof target.scrollIntoView === 'function') {
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }

  /* ---------------- 저장 카드 (Table API + 폴백) ---------------- */
  function ownerToken() {
    let token = localStorage.getItem(OWNER_KEY);
    if (!token) {
      token = 'owner-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(OWNER_KEY, token);
    }
    return token;
  }

  function localRead() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function localWrite(rows) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(rows));
    } catch (err) {
      toast('이 브라우저에는 저장 공간이 부족해요.');
    }
  }

  async function apiList() {
    const res = await fetch('tables/' + TABLE + '?limit=200');
    if (!res.ok) throw new Error('list failed');
    const body = await res.json();
    return Array.isArray(body.data) ? body.data : [];
  }

  async function apiCreate(row) {
    const res = await fetch('tables/' + TABLE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row)
    });
    if (!res.ok) throw new Error('create failed');
    return res.json();
  }

  async function apiDelete(id) {
    const res = await fetch('tables/' + TABLE + '/' + encodeURIComponent(id), { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('delete failed');
    return true;
  }

  async function listCards() {
    if (usingApi) {
      try {
        return await apiList();
      } catch (err) {
        usingApi = false;
      }
    }
    return localRead();
  }

  async function saveCard(title, zodiacKey) {
    const z = ZODIAC[zodiacKey];
    const row = {
      title: title,
      zodiac_key: zodiacKey,
      zodiac_name: z.name,
      element: ELEMENTS[z.element].name,
      good_hexes: z.good.map((c) => c.hex).join(','),
      bad_hexes: z.bad.map((c) => c.hex).join(','),
      note: z.tip,
      palette_hexes: z.palette.join(','),
      owner_token: ownerToken(),
      created_at: new Date().toISOString()
    };

    if (usingApi) {
      try {
        const created = await apiCreate(row);
        return created;
      } catch (err) {
        usingApi = false;
      }
    }

    const localRow = Object.assign({}, row, {
      id: 'local-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    });
    const rows = localRead();
    rows.unshift(localRow);
    localWrite(rows);
    return localRow;
  }

  async function removeCard(row) {
    if (usingApi && row.id && String(row.id).indexOf('local-') !== 0) {
      try {
        await apiDelete(row.id);
        return true;
      } catch (err) {
        usingApi = false;
      }
    }
    const rows = localRead().filter((item) => item.id !== row.id);
    localWrite(rows);
    return true;
  }

  async function renderArchive() {
    const grid = $('#archive-grid');
    const empty = $('#archive-empty');
    if (!grid || !empty) return;

    let rows = [];
    try {
      rows = await listCards();
    } catch (err) {
      rows = [];
    }

    grid.innerHTML = '';
    if (!rows.length) {
      empty.hidden = false;
      grid.hidden = true;
      return;
    }

    empty.hidden = true;
    grid.hidden = false;

    rows.slice(0, 60).forEach((row) => {
      const z = ZODIAC[row.zodiac_key];
      const card = el('article', 'archive-card');

      const del = el('button', 'archive-delete', '✕');
      del.type = 'button';
      del.setAttribute('aria-label', (row.title || '카드') + ' 삭제');
      del.addEventListener('click', async (event) => {
        event.stopPropagation();
        await removeCard(row);
        toast('카드를 삭제했어요.');
        renderArchive();
      });
      card.appendChild(del);

      const top = el('div', 'archive-top');
      const emoji = el('span', 'archive-emoji', z ? z.emoji : '🎨');
      emoji.setAttribute('aria-hidden', 'true');
      top.appendChild(emoji);
      const info = el('div');
      info.appendChild(el('span', 'archive-name', row.title || '저장한 카드'));
      info.appendChild(el('span', 'archive-meta',
        (row.zodiac_name || (z ? z.name : '')) + ' · ' + (row.element || '') +
        (row.created_at ? ' · ' + formatDate(row.created_at) : '')));
      top.appendChild(info);
      card.appendChild(top);

      const swatches = el('div', 'archive-swatches');
      const hexes = String(row.palette_hexes || row.good_hexes || '').split(',').filter(Boolean);
      hexes.slice(0, 6).forEach((hex) => {
        const dot = el('span', 'mini-swatch');
        dot.style.background = hex;
        swatches.appendChild(dot);
      });
      card.appendChild(swatches);

      const actions = el('div', 'archive-actions');
      const view = el('button', 'btn btn-soft', '리포트 보기');
      view.type = 'button';
      view.addEventListener('click', () => {
        if (z) selectZodiac(row.zodiac_key);
        else toast('이 카드의 띠 정보를 찾을 수 없어요.');
      });
      actions.appendChild(view);

      const copy = el('button', 'btn btn-soft', '복사');
      copy.type = 'button';
      copy.addEventListener('click', () => {
        copyText(hexes.join(', '), '컬러 코드를 복사했어요');
      });
      actions.appendChild(copy);
      card.appendChild(actions);

      grid.appendChild(card);
    });
  }

  /* ---------------- 모달 ---------------- */
  function openSaveModal() {
    if (!currentZodiacKey) {
      toast('먼저 띠를 선택해 주세요.');
      return;
    }
    const modal = $('#save-modal');
    const input = $('#save-name');
    const z = ZODIAC[currentZodiacKey];
    $('#save-modal-desc').textContent = z.name + ' 추천 컬러 리포트를 저장합니다.';
    input.value = z.name + ' 컬러 카드';
    modal.hidden = false;
    window.setTimeout(() => input.focus(), 60);
  }

  function closeSaveModal() {
    $('#save-modal').hidden = true;
  }

  /* ---------------- 초기화 ---------------- */
  function initHeaderShadow() {
    const header = $('#site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initFinder() {
    const form = $('#finder-form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const yearInput = $('#birth-year');
        const year = Number(yearInput.value);
        if (!year || year < 1900 || year > 2100) {
          toast('1900 ~ 2100년 사이 연도를 입력해 주세요.');
          yearInput.focus();
          return;
        }
        const key = keyFromYear(year);
        if (!key) {
          toast('연도를 다시 확인해 주세요.');
          return;
        }
        selectZodiac(key, year);
        toast(ZODIAC[key].name + ' 컬러 리포트를 열었어요.');
      });
    }

    const copyBtn = $('#copy-palette');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!currentZodiacKey) return;
        const z = ZODIAC[currentZodiacKey];
        copyText(z.palette.join(', '), '추천 팔레트 HEX를 복사했어요');
      });
    }

    const saveBtn = $('#save-card-btn');
    if (saveBtn) saveBtn.addEventListener('click', openSaveModal);

    const cancel = $('#save-cancel');
    if (cancel) cancel.addEventListener('click', closeSaveModal);

    const modal = $('#save-modal');
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeSaveModal();
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal && !modal.hidden) closeSaveModal();
    });

    const saveForm = $('#save-form');
    if (saveForm) {
      saveForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = $('#save-name').value.trim();
        if (!title) {
          toast('카드 이름을 입력해 주세요.');
          return;
        }
        if (!currentZodiacKey) {
          toast('먼저 띠를 선택해 주세요.');
          return;
        }
        await saveCard(title, currentZodiacKey);
        closeSaveModal();
        toast('카드를 저장했어요.');
        renderArchive();
      });
    }
  }

  function init() {
    renderChips();
    renderElementCards();
    renderCycles();
    renderFoodGuide();
    renderCatalog();
    initHeaderShadow();
    initFinder();
    renderArchive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
