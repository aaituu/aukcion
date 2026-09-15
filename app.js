const state = {
  route: location.hash.slice(1) || "discover",
  price: 4850000,
  seconds: 38,
  bids: 17,
  leader: false,
  frozen: false,
  favorites: new Set(["A-208"]),
  category: "Все",
  query: "",
  history: [
    { user: "Инвестор #118", price: 4850000, time: "12 сек", mine: false },
    { user: "Инвестор #526", price: 4709000, time: "31 сек", mine: false },
    { user: "Инвестор #882", price: 4572000, time: "48 сек", mine: false }
  ]
};

const lots = [
  { id:"A-204", title:"Часы Heritage 1963", category:"Часы", price:4850000, time:"00:38", pos:"0%", phase:"Live" },
  { id:"A-205", title:"Gran Turismo, 1967", category:"Автомобили", price:42500000, time:"12:45", pos:"50%", phase:"Live" },
  { id:"A-206", title:"Кресло Atelier No. 7", category:"Дизайн", price:1680000, time:"01:22", pos:"100%", phase:"Live" },
  { id:"A-207", title:"Chronograph No. 12", category:"Часы", price:7200000, time:"Завтра", pos:"0%", phase:"Скоро" },
  { id:"A-208", title:"Emerald Touring Coupé", category:"Автомобили", price:38700000, time:"18:05", pos:"50%", phase:"Live" },
  { id:"A-209", title:"Кресло Collector Edition", category:"Дизайн", price:2100000, time:"Пт, 19:00", pos:"100%", phase:"Скоро" }
];

const icons = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-5"/>',
  gavel:'<path d="m14 7 3 3M6 15l3 3M8 13l7-7 4 4-7 7zM3 21h10"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
  eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12"/><circle cx="12" cy="12" r="2.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>',
  grid:'<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  file:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
  phone:'<path d="M6.6 3h3l1.5 4-2 1.5a16 16 0 0 0 6.4 6.4l1.5-2 4 1.5v3c0 1.2-1 2.2-2.2 2.1C10 18.8 5.2 14 4.5 5.2 4.4 4 5.4 3 6.6 3z"/>',
  wifiOff:'<path d="m3 3 18 18M5 9c4-3 8-4 12-2M8 13c2-1 4-2 7-1M11 17c1-.5 2-.5 3 0"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  alert:'<path d="M12 3 2 21h20zM12 9v5M12 18h.01"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M16 5a3 3 0 0 1 0 6M17 14c2.5.5 3.7 2.5 4 6"/>'
};

function icon(name, small=false){ return `<svg class="icon ${small?'icon-sm':''}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.grid}</svg>`; }
function money(value){ return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₸"; }
function nextBid(){ return Math.round(state.price * 1.03 / 1000) * 1000; }
function timeText(){ return `00:${String(state.seconds).padStart(2,"0")}`; }
function img(pos, cls=""){ return `<div class="product-image ${cls}" role="img" aria-label="Изображение лота" style="background-position:${pos} center"></div>`; }
function pageWrap(content, cls=""){ return `<section class="page ${cls}">${content}</section>`; }

function lotCard(lot){
  const favorite = state.favorites.has(lot.id);
  return `<article class="lot-card card" data-category="${lot.category}">
    <button class="favorite ${favorite?'active':''}" data-favorite="${lot.id}" aria-label="${favorite?'Удалить из избранного':'Добавить в избранное'}">${icon('heart',true)}</button>
    <div class="lot-image" style="background-position:${lot.pos} center"></div>
    <div class="lot-card-body"><div class="lot-meta"><span>${lot.category}</span><span>Лот ${lot.id}</span></div><h3>${lot.title}</h3>
    <div class="lot-status"><div><small>Текущая цена</small><strong>${money(lot.price)}</strong></div><span class="countdown">${lot.time}</span></div>
    <button class="card-action" data-route="${lot.id==='A-204'?'lot':'live'}">${lot.phase==='Live'?'Открыть торги':'Подробнее'} ${icon('arrow',true)}</button></div>
  </article>`;
}

function renderDiscover(){
  return pageWrap(`<section class="hero"><div class="hero-copy"><span class="kicker">${icon('shield',true)} Проверенная площадка</span><h1>Ставка.<br><em>50 секунд.</em><br>Ваш лот.</h1><p>Гибридный аукцион для редких вещей и серьёзных сделок. Серверный таймер, прозрачная история ставок и защищённые личности участников.</p><div class="hero-actions"><button class="button primary" data-route="live">Войти в Live-зал ${icon('arrow')}</button><button class="button ghost" data-route="catalog">Смотреть все лоты</button></div><div class="trust-row"><span>${icon('shield',true)} Digital ID подтверждён</span><span>${icon('clock',true)} Smart Hammer 50s</span><span>${icon('users',true)} Blind ID</span></div></div>
  <div class="hero-lot">${img('0%')}<span class="hero-live"><i class="live-dot"></i>Торги идут</span><div class="hero-lot-content"><span class="kicker" style="color:#a9cab9">Лот A-204 · Фаза III</span><h2>Часы Heritage 1963</h2><div class="price-line"><div><small>Текущая цена</small><strong>${money(state.price)}</strong></div><div class="time-box"><small>До завершения</small><strong>${timeText()}</strong></div></div></div></div></section>
  <section class="section"><div class="section-head"><div><span class="kicker">Активные торги</span><h2>Сейчас в аукционе</h2></div><button class="button ghost" data-route="catalog">Все лоты ${icon('arrow',true)}</button></div><div class="lot-grid">${lots.slice(0,3).map(lotCard).join('')}</div></section>
  <section class="section"><div class="section-head"><div><span class="kicker">Простой процесс</span><h2>Три шага до сделки</h2></div></div><div class="process-grid"><article class="process-card card"><span class="step">01</span><h3>Пройдите проверку</h3><p>Digital ID подтверждает личность, а система создаёт Blind ID для каждого лота.</p></article><article class="process-card card"><span class="step">02</span><h3>Участвуйте в торгах</h3><p>Каждая ставка повышает цену на 3% и перезапускает серверный таймер на 50 секунд.</p></article><article class="process-card card"><span class="step">03</span><h3>Закройте сделку</h3><p>Победитель получает протокол и переходит к оформлению сделки с продавцом.</p></article></div></section>`,"discover-page");
}

function renderCatalog(){
  const categories=["Все","Часы","Автомобили","Дизайн"];
  const filtered=lots.filter(l=>(state.category==="Все"||l.category===state.category)&&(`${l.title} ${l.id}`.toLowerCase().includes(state.query.toLowerCase())));
  return pageWrap(`<header class="page-title"><div><span class="kicker">Каталог</span><h1>Выберите лот</h1></div><p>Все объекты прошли первичную проверку документов. Статус обновляется автоматически.</p></header><div class="catalog-toolbar"><label class="field">${icon('search')}<input id="catalogSearch" value="${state.query}" placeholder="Поиск по названию или номеру"></label><div class="filter-chips">${categories.map(c=>`<button data-category-filter="${c}" class="${state.category===c?'active':''}">${c}</button>`).join('')}</div><div class="catalog-count">Найдено: ${filtered.length}</div></div><div class="catalog-grid">${filtered.length?filtered.map(lotCard).join(''):'<div class="empty-state">По вашему запросу лотов не найдено.</div>'}</div>`,"catalog-page");
}

function renderLot(){
  return pageWrap(`<div class="breadcrumbs"><button data-route="catalog">Каталог</button><span>/</span><span>Лот A-204</span></div><div class="lot-layout"><div class="lot-gallery card">${img('0%')}<div class="gallery-tools"><span class="glass-pill">01 / 06</span><button class="glass-pill" data-favorite="A-204">${icon('heart',true)} В избранное</button></div></div><article class="lot-summary card"><div class="phase-label"><span>Фаза III</span><span>Live-аукцион</span></div><div class="phase-progress"><i class="done"></i><i class="done"></i><i class="active"></i></div><span class="kicker"><i class="live-dot"></i> Торги идут</span><h1>Часы Heritage 1963</h1><p>Механические часы в корпусе из жёлтого золота. Проверенная история обслуживания и полный комплект документов.</p><div class="specs"><div><small>Год</small><strong>1963</strong></div><div><small>Состояние</small><strong>Отличное</strong></div><div><small>Город</small><strong>Астана</strong></div><div><small>Осмотр</small><strong>По записи</strong></div></div><div class="doc-list"><div class="doc-row"><span>${icon('file',true)} Отчёт эксперта</span><b>PDF</b></div><div class="doc-row"><span>${icon('shield',true)} Проверка ограничений</span><b class="verified">Чисто</b></div></div><button class="button primary" style="width:100%" data-route="live">Перейти в Live-зал ${icon('arrow')}</button></article></div>
  <div class="detail-bottom"><article class="detail-card card"><span class="kicker">Open House</span><h2>Запись на осмотр</h2><p>Выберите удобный день. После записи адрес появится в личном кабинете.</p><div class="open-house-grid">${[16,17,18,19,20].map((d,i)=>`<button class="date-button ${i===1?'active':''}"><small>Сен</small><strong>${d}</strong></button>`).join('')}</div></article><article class="detail-card card"><span class="kicker">Проверено</span><h2>Прозрачность лота</h2><p>Продавец подтверждён через Digital ID. Документы проверены, ограничений в реестре не обнаружено.</p><div class="trust-row"><span>${icon('eye',true)} 1 284 просмотра</span><span>${icon('file',true)} 312 скачиваний</span></div></article></div>`,"lot-page");
}

function renderLive(){
  const timerClass=state.frozen?'frozen':state.seconds<=5?'critical':state.seconds<=20?'warning':'';
  const buttonText=state.frozen?'Торги на паузе':state.leader?'Вы уже лидируете':`Сделать ставку`;
  return pageWrap(`<header class="live-header"><div><span class="kicker"><i class="live-dot"></i> Live · Лот A-204 · Фаза III</span><h1>Часы Heritage 1963</h1></div><div class="live-actions"><button class="button ghost" id="runnerDemo">Демо Runner-Up</button><button class="button ghost" id="finishDemo">Завершить демо</button></div></header><div class="live-layout"><div class="live-visual card">${img('0%')}<span class="glass-pill view-count">${icon('eye',true)} 1 284 смотрят</span></div><aside class="live-panel card"><div class="auction-timer ${timerClass}"><small>${state.frozen?'SLA Freeze':'До завершения'}</small><strong id="auctionTimer">${timeText()}</strong><span>Ставка возвращает таймер к 00:50</span></div><div class="live-price"><small>Текущая цена</small><strong id="currentPrice">${money(state.price)}</strong><span id="leaderStatus" class="leader-status ${state.leader?'':'outbid'}">${state.leader?'Вы лидируете · Инвестор #704':'Лидер: Инвестор #118'}</span></div><button id="bidButton" class="bid-button" ${state.leader||state.frozen?'disabled':''}>${icon('gavel')}<span><small>${buttonText}</small><strong id="nextBidValue">${money(nextBid())}</strong></span></button><p class="bid-disclaimer">Перед каждой ставкой система запросит подтверждение суммы. Собственную последнюю ставку перебить нельзя.</p><div class="feed-head"><span>${icon('history',true)} История ставок</span><b id="bidCount">${state.bids}</b></div><div class="bid-feed" id="bidFeed">${state.history.map(bidRow).join('')}</div></aside></div><div class="live-tech"><div class="tech-cell"><small>Синхронизация</small><strong>NTP ±1 ms</strong></div><div class="tech-cell"><small>Канал</small><strong>WSS secured</strong></div><div class="tech-cell"><small>Blind ID</small><strong>Активен</strong></div><div class="tech-cell"><small>Rate limit</small><strong>500 ms</strong></div></div>`,"live-page");
}

function bidRow(b){ return `<div class="bid-row"><span class="blind-id ${b.mine?'mine':''}"><i></i>${b.user}</span><b>${money(b.price)}</b><time>${b.time}</time></div>`; }

function sidebar(role){
  const names={investor:"Инвестор #704",seller:"Продавец #091",partner:"Партнёр #342"};
  return `<aside class="sidebar card"><div class="user-card"><span class="avatar">АК</span><h3>${names[role]}</h3><span class="verified">${icon('shield',true)} Личность подтверждена</span></div><nav class="role-nav"><button class="active">${icon('grid',true)}Обзор</button><button>${icon('heart',true)}Избранное</button><button>${icon('history',true)}История</button><button>${icon('file',true)}Документы</button></nav><div class="role-switch"><small>Демо ролей</small><button class="button ghost" data-route="investor">Инвестор</button><button class="button ghost" data-route="seller">Продавец</button><button class="button ghost" data-route="partner">Партнёр</button></div></aside>`;
}

function renderInvestor(){
  return pageWrap(`<div class="dashboard">${sidebar('investor')}<section><header class="dashboard-title"><div><span class="kicker">Кабинет инвестора</span><h1>Добрый день, Айдар</h1></div><button class="button primary" data-route="catalog">Найти лот ${icon('arrow',true)}</button></header><div class="stat-grid"><article class="deposit-card card"><span class="verified">${icon('shield',true)} На специальном счёте</span><h3>Гарантийный задаток активен</h3><p>Средства заморожены только для участия в выбранном аукционе.</p><div class="deposit-meta"><div><small>Сумма</small><strong>485 000 ₸</strong></div><div><small>Статус</small><strong>Заморожено</strong></div><div><small>Автовозврат</small><strong>23:48:12</strong></div></div></article><article class="stat-card card"><small>Активные ставки</small><strong>2</strong><span>В двух аукционах</span></article><article class="stat-card card"><small>Выигранные лоты</small><strong>1</strong><span>Ожидает оформления</span></article></div><div class="dashboard-grid"><article class="dash-card card"><div class="section-head"><h2>Текущие торги</h2></div><div class="active-lot-row">${img('0%')}<div><small>Лот A-204 · Live</small><b>Часы Heritage 1963</b><span class="verified">Вы участвуете</span></div><button class="button soft" data-route="live">В зал</button></div></article><article class="dash-card card"><h2>Последние документы</h2><table class="mini-table"><tr><th>Документ</th><th>Статус</th></tr><tr><td>Акт блокировки задатка</td><td><span class="status-badge">Готов</span></td></tr><tr><td>Протокол участия</td><td><span class="status-badge amber">После торгов</span></td></tr></table></article></div></section></div>`,"dashboard-page");
}

function renderSeller(){
  return pageWrap(`<div class="dashboard">${sidebar('seller')}<section><header class="dashboard-title"><div><span class="kicker">Кабинет продавца</span><h1>Монитор лота</h1></div><button class="button primary" data-route="live">Смотреть Live ${icon('arrow',true)}</button></header><div class="stat-grid"><article class="stat-card card"><small>Просмотры</small><strong>1 284</strong><span>+18% за 24 часа</span></article><article class="stat-card card"><small>Скачивания Data Room</small><strong>312</strong><span>Проверенные участники</span></article><article class="stat-card card"><small>Записи Open House</small><strong>46</strong><span>На пять дней</span></article></div><div class="dashboard-grid"><article class="dash-card card"><h2>График интереса</h2><div class="chart">${[34,49,42,72,58,86,95].map((h,i)=>`<div class="bar" style="height:${h}%"><span>${i+10}.09</span></div>`).join('')}</div></article><article class="dash-card card"><h2>Состояние аукциона</h2><div class="phase-track"><span class="done"></span><span class="done"></span><span class="active"></span><span></span></div><table class="mini-table"><tr><td>Фаза I</td><td><span class="status-badge">Завершено</span></td></tr><tr><td>Фаза II</td><td><span class="status-badge">Завершено</span></td></tr><tr><td>Фаза III</td><td><span class="status-badge amber">Live</span></td></tr></table></article><article class="dash-card card veto-panel"><span class="kicker" style="color:var(--red)">${icon('alert',true)} Право ВЕТО</span><h2>Решение после торгов</h2><p>После завершения выберите подтверждение сделки или активируйте цифровой карантин на 5 месяцев.</p><button class="button primary" id="approveSale">Подтвердить продажу</button><button class="button ghost" id="vetoButton">Активировать ВЕТО</button></article><article class="dash-card card"><h2>Open House</h2><p style="color:var(--muted)">Ближайшая группа: сегодня, 18:30</p><div class="active-lot-row">${img('0%')}<div><small>Группа №4</small><b>8 участников</b></div><span class="status-badge">Подтверждено</span></div></article></div></section></div>`,"dashboard-page");
}

function renderPartner(){
  return pageWrap(`<div class="dashboard">${sidebar('partner')}<section><header class="dashboard-title"><div><span class="kicker">Кабинет партнёра</span><h1>Lead Protection</h1></div><span class="status-badge">2% Ref-Bonus</span></header><div class="stat-grid"><article class="stat-card card"><small>Закреплённые лиды</small><strong>14</strong><span>За последние 90 дней</span></article><article class="stat-card card"><small>В активных фазах</small><strong>6</strong><span>Три объекта в Phase III</span></article><article class="stat-card card"><small>Прогноз бонуса</small><strong>970 000 ₸</strong><span>От текущей цены лота</span></article></div><div class="dashboard-grid"><article class="dash-card card"><span class="kicker">Новый лид</span><h2>Быстрая регистрация</h2><form class="lead-form" id="leadForm"><label class="field"><input required placeholder="ИИН / БИН собственника"></label><label class="field"><input required placeholder="Телефон"></label><label class="field"><input required placeholder="Кадастровый номер / VIN"></label><label class="field"><select><option>Недвижимость</option><option>Автомобиль</option><option>Другое</option></select></label><button class="button primary" type="submit">Проверить и закрепить</button></form></article><article class="dash-card card"><h2>Движение объекта</h2><div class="phase-track"><span class="done"></span><span class="done"></span><span class="active"></span><span></span></div><table class="mini-table"><tr><th>Этап</th><th>Статус</th></tr><tr><td>Фаза I · Проверка</td><td><span class="status-badge">Готово</span></td></tr><tr><td>Фаза II · Показы</td><td><span class="status-badge">Готово</span></td></tr><tr><td>Фаза III · Торги</td><td><span class="status-badge amber">Сейчас</span></td></tr></table></article><article class="dash-card card"><h2>История выплат</h2><table class="mini-table"><tr><th>Объект</th><th>Бонус</th><th>Статус</th></tr><tr><td>LOT-8722-KZ</td><td>620 000 ₸</td><td><span class="status-badge">Выплачено</span></td></tr><tr><td>LOT-8794-KZ</td><td>840 000 ₸</td><td><span class="status-badge amber">Ожидается</span></td></tr></table></article><article class="dash-card card"><h2>Реферальная ссылка</h2><p style="color:var(--muted)">Ссылка привязана к вашему Partner ID.</p><label class="field"><input value="aurum.kz/ref/P-342" readonly><button class="button soft" id="copyRef" style="min-height:36px">Копировать</button></label></article></div></section></div>`,"dashboard-page");
}

function renderHow(){
  return pageWrap(`<header class="how-hero"><span class="kicker" style="justify-content:center">Правила участия</span><h1>От проверки до закрытия сделки</h1><p>Платформа защищает торги, синхронизирует ставки и формирует официальный цифровой протокол.</p></header><div class="timeline"><article class="timeline-card card"><span class="step">1</span><div><h3>Верификация Digital ID</h3><p>Личность участника подтверждается, а персональные данные скрываются за Blind ID.</p></div><span class="status-badge">Демо: готово</span></article><article class="timeline-card card"><span class="step">2</span><div><h3>Гарантийный задаток 10%</h3><p>Средства блокируются на специальном счёте и возвращаются проигравшим автоматически.</p></div><button class="button soft" data-route="investor">Посмотреть</button></article><article class="timeline-card card"><span class="step">3</span><div><h3>Smart Hammer 50s</h3><p>Ставка +3% подтверждается участником и перезапускает серверный таймер.</p></div><button class="button soft" data-route="live">В Live-зал</button></article><article class="timeline-card card"><span class="step">4</span><div><h3>Протокол и решение продавца</h3><p>После торгов формируется акт. Продавец подтверждает сделку или использует право ВЕТО.</p></div><button class="button soft" data-route="seller">Кабинет</button></article></div>`,"how-page");
}

function renderWinner(){
  return pageWrap(`<div class="winner-page"><section class="winner-copy"><span class="success-icon">${icon('check')}</span><span class="kicker" style="margin-top:22px">Торги завершены · Протокол сформирован</span><h1>Поздравляем,<br>лот ваш.</h1><p>Вы победили в торгах за «Часы Heritage 1963». Контакт продавца открыт, а документы по результатам доступны в личном кабинете.</p><div class="contact-card card"><div><small>Продавец</small><strong>Арман К.</strong><span class="verified">${icon('shield',true)} Личность подтверждена</span></div><a href="tel:+77001234567"><small>Номер телефона</small><strong>+7 700 123 45 67</strong></a></div><div class="warning-note">${icon('shield')}<p><b>Демонстрационный сценарий.</b> В рабочей системе дальнейшее оформление и банковский контур выполняются по утверждённому юридическому регламенту.</p></div><button class="button primary" data-route="investor">Открыть документы ${icon('arrow')}</button></section><aside class="winner-image card">${img('0%')}<div class="winner-price"><small>Финальная цена</small><strong>${money(state.price)}</strong></div></aside></div>`,"winner-page-wrap");
}

const renderers={discover:renderDiscover,catalog:renderCatalog,lot:renderLot,live:renderLive,investor:renderInvestor,seller:renderSeller,partner:renderPartner,how:renderHow,winner:renderWinner};

function render(){
  const renderer=renderers[state.route]||renderDiscover;
  document.getElementById("page").innerHTML=renderer();
  document.querySelectorAll(".desktop-nav button").forEach(btn=>btn.classList.toggle("active",btn.dataset.route===state.route));
  bindPageEvents();
}

function navigate(route){ state.route=route; location.hash=route; document.getElementById("mobileDrawer").classList.remove("open"); window.scrollTo({top:0,behavior:"smooth"}); render(); }

function bindPageEvents(){
  document.querySelectorAll("#page [data-route]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.route)));
  document.querySelectorAll("#page [data-favorite]").forEach(btn=>btn.addEventListener("click",()=>toggleFavorite(btn.dataset.favorite)));
  document.querySelectorAll("#page [data-category-filter]").forEach(btn=>btn.addEventListener("click",()=>{state.category=btn.dataset.categoryFilter;render()}));
  const catalogSearch=document.getElementById("catalogSearch"); if(catalogSearch) catalogSearch.addEventListener("input",e=>{state.query=e.target.value;const caret=e.target.selectionStart;render();const next=document.getElementById("catalogSearch");next.focus();next.setSelectionRange(caret,caret)});
  const bidButton=document.getElementById("bidButton"); if(bidButton) bidButton.addEventListener("click",openBidConfirmation);
  const runner=document.getElementById("runnerDemo"); if(runner) runner.addEventListener("click",()=>document.getElementById("runnerDialog").showModal());
  const finish=document.getElementById("finishDemo"); if(finish) finish.addEventListener("click",()=>navigate("winner"));
  document.querySelectorAll(".date-button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".date-button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");toast("Запись на осмотр подтверждена","success")}));
  const leadForm=document.getElementById("leadForm"); if(leadForm) leadForm.addEventListener("submit",e=>{e.preventDefault();toast("Лид свободен и закреплён за вами на 90 дней","success");leadForm.reset()});
  const copyRef=document.getElementById("copyRef"); if(copyRef) copyRef.addEventListener("click",()=>{navigator.clipboard?.writeText("https://aurum.kz/ref/P-342");toast("Реферальная ссылка скопирована","success")});
  const approve=document.getElementById("approveSale"); if(approve) approve.addEventListener("click",()=>toast("Продажа подтверждена. Формируется пакет документов","success"));
  const veto=document.getElementById("vetoButton"); if(veto) veto.addEventListener("click",()=>toast("Демо: сформирован акт ВЕТО, Lockout — 5 месяцев","error"));
}

function toggleFavorite(id){ state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id); toast(state.favorites.has(id)?"Лот добавлен в избранное":"Лот удалён из избранного","success"); render(); }

function openBidConfirmation(){
  if(state.leader){toast("Вы уже сделали последнюю ставку","error");return}
  document.getElementById("confirmCurrent").textContent=money(state.price);
  document.getElementById("confirmNext").textContent=money(nextBid());
  document.getElementById("termsCheck").checked=false;
  document.getElementById("confirmBid").disabled=true;
  document.getElementById("bidDialog").showModal();
}

function acceptBid(){
  const amount=nextBid(); state.price=amount; state.seconds=50; state.bids+=1; state.leader=true;
  state.history.unshift({user:"Инвестор #704",price:amount,time:"сейчас",mine:true});
  document.getElementById("bidDialog").close(); render(); toast("Ставка принята. Сейчас вы лидируете","success");
  window.setTimeout(simulateCompetitor,6500);
}

function simulateCompetitor(){
  if(!state.leader||state.route!=="live"||state.frozen)return;
  state.price=nextBid(); state.seconds=50; state.bids+=1; state.leader=false;
  state.history.unshift({user:"Инвестор #391",price:state.price,time:"сейчас",mine:false}); render(); toast("Инвестор #391 повысил ставку","error");
}

function startFreeze(){
  if(state.frozen)return; state.frozen=true; let count=10; const overlay=document.getElementById("freezeOverlay"); overlay.hidden=false; document.getElementById("freezeCountdown").textContent="00:10"; if(state.route==="live")render();
  const timer=setInterval(()=>{count--;document.getElementById("freezeCountdown").textContent=`00:${String(count).padStart(2,"0")}`;if(count<=0){clearInterval(timer);state.frozen=false;overlay.hidden=true;if(state.route==="live")render();toast("Соединение восстановлено. Таймер синхронизирован","success")}},1000);
}

function toast(message,type="success"){
  const el=document.createElement("div");el.className=`toast ${type}`;el.innerHTML=`${icon(type==='error'?'alert':'check')}<span>${message}</span>`;document.getElementById("toastStack").append(el);setTimeout(()=>el.remove(),3400);
}

function updateClocks(){
  const now=new Date();document.getElementById("serverTime").textContent=now.toLocaleTimeString("ru-RU",{hour12:false,timeZone:"Asia/Almaty"});
  document.getElementById("pingValue").textContent=`${10+Math.floor(Math.random()*6)} ms`;
  if(state.route==="live"&&!state.frozen&&state.seconds>0){state.seconds--;const node=document.getElementById("auctionTimer");if(node){node.textContent=timeText();const wrapper=node.parentElement;wrapper.classList.toggle("warning",state.seconds<=20&&state.seconds>5);wrapper.classList.toggle("critical",state.seconds<=5)}if(state.seconds===0)navigate("winner")}
}

function openSearch(){
  const dialog=document.getElementById("searchDialog");const input=document.getElementById("globalSearch");input.value="";renderSearchResults("");dialog.showModal();
}
function renderSearchResults(query){const result=lots.filter(l=>`${l.title} ${l.id} ${l.category}`.toLowerCase().includes(query.toLowerCase())).slice(0,5);document.getElementById("searchResults").innerHTML=result.map(l=>`<button type="button" class="search-result" data-search-route="${l.id==='A-204'?'lot':'live'}">${img(l.pos)}<span><b>${l.title}</b><small>${l.id} · ${l.category}</small></span>${icon('arrow',true)}</button>`).join('');document.querySelectorAll('[data-search-route]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('searchDialog').close();navigate(b.dataset.searchRoute)}))}

document.getElementById("searchButton").innerHTML=icon("search");
document.getElementById("notificationButton").innerHTML=icon("bell");
document.getElementById("menuButton").innerHTML=icon("menu");
document.getElementById("searchIcon").innerHTML=icon("search");
document.getElementById("wifiOffIcon").innerHTML=icon("wifiOff");
document.getElementById("bidModalIcon").innerHTML=icon("gavel");
document.getElementById("menuButton").addEventListener("click",()=>document.getElementById("mobileDrawer").classList.toggle("open"));
document.querySelectorAll("header [data-route], .mobile-drawer [data-route]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.route)));
document.getElementById("searchButton").addEventListener("click",openSearch);
document.getElementById("globalSearch").addEventListener("input",e=>renderSearchResults(e.target.value));
document.getElementById("notificationButton").addEventListener("click",()=>toast("3 уведомления: старт торгов, новая ставка и готовый документ","success"));
document.getElementById("freezeDemo").addEventListener("click",startFreeze);
document.getElementById("termsCheck").addEventListener("change",e=>document.getElementById("confirmBid").disabled=!e.target.checked);
document.getElementById("confirmBid").addEventListener("click",acceptBid);
window.addEventListener("hashchange",()=>{state.route=location.hash.slice(1)||"discover";render()});
setInterval(updateClocks,1000);
updateClocks();render();

// WebMCP: позволяет поддерживающим браузерам открыть live-зал и подготовить
// безопасное подтверждение ставки через тот же интерфейс, что видит человек.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  Promise.resolve(document.modelContext.registerTool({name:"start_bid_confirmation",title:"Подготовить ставку",description:"Открывает Live-зал и диалог подтверждения следующей ставки +3%. Не подтверждает ставку автоматически.",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:async()=>{navigate("live");setTimeout(openBidConfirmation,0);return{status:"confirmation_required",lot_id:"A-204",amount_kzt:nextBid()}}},{signal:lifecycle.signal})).catch(()=>{});
}
