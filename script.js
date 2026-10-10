// Ank1tverse interactions — vanilla JavaScript, no framework or build step.
(() => {
  'use strict';
  // IMPORTANT: Replace these with your real contact details before publishing.
  const CONTACT_EMAIL = 'ankitdeypersonal@gmail.com';
  const WHATSAPP_NUMBER = '918617646356'; // country code + number, digits only; no + or spaces

  document.documentElement.classList.add('js-ready');

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    const icon = menuButton.querySelector('.menu-icon');
    if (icon) icon.textContent = isOpen ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    const icon = menuButton?.querySelector('.menu-icon');
    if (icon) icon.textContent = '☰';
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const backTop = document.getElementById('back-top');
  const updateBackTop = () => { if (backTop) backTop.hidden = window.scrollY <= 500; };
  window.addEventListener('scroll', updateBackTop, { passive: true }); updateBackTop();

  const copyButton = document.getElementById('copy-email');
  const copyLabel = document.getElementById('copy-label');
  copyButton?.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      if (copyLabel) copyLabel.textContent = 'EMAIL COPIED';
      window.setTimeout(() => { if (copyLabel) copyLabel.textContent = 'COPY EMAIL'; }, 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  });

  const whatsappForm = document.getElementById('whatsapp-form');
  const whatsappHint = document.getElementById('whatsapp-hint');
  whatsappForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      if (whatsappHint) whatsappHint.textContent = 'Before this can work, replace WHATSAPP_NUMBER in script.js with your WhatsApp country code + number (digits only).';
      return;
    }
    const name = document.getElementById('visitor-name').value.trim();
    const email = document.getElementById('visitor-email').value.trim();
    const message = document.getElementById('visitor-message').value.trim();
    const body = [`Hello Ankit, I'm ${name}.`, email ? `My email: ${email}` : '', '', message].filter(Boolean).join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
  });

  // Secret terminal
  const terminalToggle = document.getElementById('terminal-toggle');
  const terminalLabel = document.getElementById('terminal-launch-label');
  const terminalPopover = document.getElementById('terminal-popover');
  const terminalClose = document.getElementById('terminal-close');
  const terminalForm = document.getElementById('terminal-form');
  const terminalCommand = document.getElementById('terminal-command');
  const terminalLog = document.getElementById('terminal-log');
  const setTerminalOpen = open => {
    terminalPopover.hidden = !open;
    terminalLabel.textContent = open ? 'CLOSE TERMINAL' : 'OPEN SECRET TERMINAL';
    if (open) terminalCommand.focus();
  };
  terminalToggle?.addEventListener('click', () => setTerminalOpen(terminalPopover.hidden));
  terminalClose?.addEventListener('click', () => setTerminalOpen(false));
  const responses = {
    whoami: 'Ankit Dey — creative thinker, BBA student, builder-in-progress.',
    help: 'Available commands: whoami, skills, status, contact, education, game, clear',
    skills: 'Creative: design + branding | Business: analysis + case work | Tech: front-end experiments.',
    status: 'STATUS: CURIOUS. BUILDING. LEARNING. REPEAT.',
    contact: `Email: ${CONTACT_EMAIL}`,
    education: 'Arena Animation (2022–2024) | BBA, Amity University Online (2026–2029; pursuing).',
    game: 'Scroll to WEB-SLINGER TRAINING and press START GAME.'
  };
  terminalForm?.addEventListener('submit', event => {
    event.preventDefault();
    const cmd = terminalCommand.value.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') terminalLog.innerHTML = '<p>ANKIT_OS v1.0.0</p><p>Type <b>help</b> to see available commands.</p>';
    else {
      const block = document.createElement('div'); block.className = 'terminal-response';
      const commandLine = document.createElement('p'); const prompt = document.createElement('span');
      prompt.textContent = 'guest@ankit:~$'; commandLine.append(prompt, document.createTextNode(` ${cmd}`));
      const reply = document.createElement('p'); reply.textContent = responses[cmd] || `Command not found: "${cmd}". Type "help" for available commands.`;
      block.append(commandLine, reply); terminalLog.append(block);
    }
    terminalCommand.value = ''; terminalLog.scrollTop = terminalLog.scrollHeight;
  });

  // Character customization inspired by the interactive avatar on the reference site.
  const swingStage = document.querySelector('.swing-stage');
  document.querySelectorAll('[data-suit]').forEach(button => {
    button.addEventListener('click', () => {
      const suit = button.dataset.suit;
      if (!swingStage) return;
      swingStage.classList.remove('suit-neon', 'suit-glitch');
      if (suit === 'neon') swingStage.classList.add('suit-neon');
      if (suit === 'glitch') swingStage.classList.add('suit-glitch');
      document.querySelectorAll('[data-suit]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    });
  });

  // Mini-game: catch spider tokens, avoid glitch bombs.
  const canvas = document.getElementById('spider-game');
  const ctx = canvas?.getContext('2d');
  const startButton = document.getElementById('game-start');
  const scoreEl = document.getElementById('game-score');
  const bestEl = document.getElementById('game-best');
  const statusEl = document.getElementById('game-status');
  const leftButton = document.getElementById('move-left');
  const rightButton = document.getElementById('move-right');
  if (canvas && ctx) {
    const W = 800, H = 360;
    let player = { x: W / 2, y: H - 43, w: 46, h: 34, speed: 6 };
    let items = [], score = 0, running = false, lastSpawn = 0, lastTime = 0, raf = 0;
    let leftHeld = false, rightHeld = false;
    let best = 0;
    try { best = Number(localStorage.getItem('ank1tverse-best') || 0); } catch {}
    bestEl.textContent = String(best).padStart(2, '0');
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * ratio; canvas.height = H * ratio;
      ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
      draw();
    }
    function background() {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#111b2d'); grad.addColorStop(1, '#080d17');
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#29405b'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 120, H); ctx.stroke(); }
      ctx.fillStyle = '#0a0d13';
      for (let i = 0; i < 16; i++) {
        const bw = 26 + (i * 17 % 32), bh = 35 + (i * 31 % 100), bx = i * 55 - 10;
        ctx.fillRect(bx, H - bh, bw, bh);
        ctx.fillStyle = '#ff5a52'; for (let wy = H - bh + 9; wy < H - 8; wy += 13) ctx.fillRect(bx + 6, wy, 3, 4);
        ctx.fillStyle = '#0a0d13';
      }
      ctx.fillStyle = '#e9b66d'; ctx.font = '10px monospace'; ctx.fillText('ANK1TVARSE / ARCADE', 18, 25);
    }
    function drawPlayer() {
      const x = player.x, y = player.y;
      ctx.save(); ctx.translate(x, y);
      ctx.strokeStyle = '#080a0f'; ctx.lineWidth = 3;
      ctx.fillStyle = '#e9323c'; ctx.beginPath(); ctx.ellipse(0, -8, 15, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff5e7';
      ctx.beginPath(); ctx.moveTo(-11, -11); ctx.lineTo(-2, -9); ctx.lineTo(-5, -3); ctx.lineTo(-12, -5); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(11, -11); ctx.lineTo(2, -9); ctx.lineTo(5, -3); ctx.lineTo(12, -5); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#2459c9'; ctx.beginPath(); ctx.roundRect(-13, 6, 26, 20, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✳', 0, 19);
      ctx.strokeStyle = '#e9323c'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-9, 9); ctx.lineTo(-21, 16); ctx.moveTo(9, 9); ctx.lineTo(21, 2); ctx.stroke();
      ctx.restore();
    }
    function drawItem(item) {
      ctx.save(); ctx.translate(item.x, item.y);
      if (item.bad) {
        ctx.fillStyle = '#ff704c'; ctx.strokeStyle = '#311515'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, -13); ctx.lineTo(12, 10); ctx.lineTo(-12, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#22111a'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center'; ctx.fillText('!', 0, 6);
      } else {
        ctx.fillStyle = '#ffdb76'; ctx.strokeStyle = '#fff0bd'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#17233a'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✳', 0, 5);
      }
      ctx.restore();
    }
    function draw() {
      background(); items.forEach(drawItem); drawPlayer();
      if (!running) {
        ctx.fillStyle = '#060a12c9'; ctx.fillRect(0, 0, W, H);
        ctx.textAlign = 'center'; ctx.fillStyle = '#fff4e4'; ctx.font = '900 34px sans-serif'; ctx.fillText(score ? 'NICE RUN!' : 'READY, WEB-SLINGER?', W / 2, H / 2 - 10);
        ctx.fillStyle = '#c4d3ed'; ctx.font = '14px monospace'; ctx.fillText('Catch ✳ tokens • Avoid ! glitch bombs', W / 2, H / 2 + 23);
      }
    }
    function endGame() {
      running = false; cancelAnimationFrame(raf); startButton.textContent = 'PLAY AGAIN'; statusEl.textContent = 'RUN OVER — TRY AGAIN';
      if (score > best) { best = score; bestEl.textContent = String(best).padStart(2, '0'); try { localStorage.setItem('ank1tverse-best', String(best)); } catch {} }
      draw();
    }
    function tick(time) {
      if (!running) return;
      const dt = Math.min((time - (lastTime || time)) / 16.67, 2); lastTime = time;
      if (leftHeld) player.x -= player.speed * dt;
      if (rightHeld) player.x += player.speed * dt;
      player.x = Math.max(25, Math.min(W - 25, player.x));
      if (time - lastSpawn > Math.max(340, 850 - score * 8)) {
        items.push({ x: 20 + Math.random() * (W - 40), y: -15, bad: Math.random() < .24, speed: 2.2 + Math.random() * 1.8 + score * .025 });
        lastSpawn = time;
      }
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]; item.y += item.speed * dt;
        if (Math.abs(item.x - player.x) < (item.bad ? 27 : 24) && Math.abs(item.y - player.y) < 28) {
          if (item.bad) { endGame(); return; }
          score++; scoreEl.textContent = String(score).padStart(2, '0'); items.splice(i, 1); continue;
        }
        if (item.y > H + 20) items.splice(i, 1);
      }
      draw(); raf = requestAnimationFrame(tick);
    }
    function startGame() {
      cancelAnimationFrame(raf); score = 0; items = []; player.x = W / 2; lastSpawn = 0; lastTime = 0; running = true;
      scoreEl.textContent = '00'; startButton.textContent = 'RESTART'; statusEl.textContent = 'GO! CATCH THE TOKENS';
      raf = requestAnimationFrame(tick);
    }
    function hold(button, setter) {
      button?.addEventListener('pointerdown', e => { e.preventDefault(); setter(true); button.setPointerCapture?.(e.pointerId); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(type => button?.addEventListener(type, () => setter(false)));
    }
    hold(leftButton, value => leftHeld = value); hold(rightButton, value => rightHeld = value);
    window.addEventListener('keydown', e => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) { leftHeld = true; if (e.key.startsWith('Arrow')) e.preventDefault(); }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) { rightHeld = true; if (e.key.startsWith('Arrow')) e.preventDefault(); }
    });
    window.addEventListener('keyup', e => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) leftHeld = false;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) rightHeld = false;
    });
    startButton?.addEventListener('click', startGame);
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
  }
})();