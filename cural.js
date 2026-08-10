/* ============================================================
   CURAL. — Ikas storefront arayuz loader
   Tek dosya: gate + home + about + store + contact + legal + urun/sepet skin
   Ikas Dosya Yoneticisi'ne yuklenir, Ikas Scriptler'den <script src> ile cagrilir.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- AYAR ---------- */
  var CONFIG = {
    VIDEO_URL: "VIDEO_URL_BURAYA",
    PASSWORD: "BOR1S.DROP",
    UNLOCK_KEY: "cural_unlocked",
    IG: "https://www.instagram.com/curalco/",
    MAIL: "info@cural.co",
    CONTACT_MAIL: "cural@outlook.com.tr",
    BREVO_ACTION: "https://c8f53a98.sibforms.com/serve/MUIFAFYxnOXl9WJjyn1Vi8UZkH-_XsyChyxguH97uTMjIUEDD5DsAVRhq6TMNZxEehiHyHFWATF9Jd9bcINX50ysXRTZYf8oq3aSQRZkITCqoifECitvk4NzO2AtwOCmL2Ps7frZBbdqYvgZi8J1amB6ewDoZ2D08B2PGxLwx4shGPk-lFeNOdL48ZLJp7qbtPrfSpm-2U3Fw6FOIA==",
    CONTACT_BREVO_ACTION: "https://c8f53a98.sibforms.com/serve/MUIFAIdSG5Mn9RQnBZcjls-um8r24u0KA1tW3tp72hZTLS-F57XABQzMKidjuBHH5VxnWLq-2Js9pERmXhZG75VbQQGOkZe32B0Mqxs_2CITiLd9WlJblmnSQ6NLQD0Ry24ZHMkQ5ugFBBcrunD0dZKTIVCR2x4NYdtr0vkHJG5_i6oE8h1sSUcHSvmOPZxusKf2SrCn2mUycsdySg=="
  };

  // Yeni gorsel varliklarin (360 spin, ana sayfa karakterleri) barindigi taban URL
  var IMGBASE = "https://emiralay380-dot.github.io/cural/img/";

  /* ---------- LOGO (TAG varyant, scrawl) ---------- */
  function logoSVG(px) {
    return (
      '<svg class="cu-logo" style="width:' + px + '" viewBox="0 0 800 240" fill="none" ' +
      'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CURAL.">' +
      '<defs><filter id="cu-rough" x="-14%" y="-50%" width="128%" height="200%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.03 0.045" numOctaves="3" seed="3" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs>' +
      '<g filter="url(#cu-rough)" stroke="#0a0a0a" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M152 70 C 110 44, 52 54, 48 116 C 44 174, 112 176, 160 150"/>' +
      '<path d="M188 60 C 184 124, 190 164, 238 164 C 286 164, 292 116, 292 56"/>' +
      '<path d="M326 178 L 330 78 C 376 66, 416 86, 398 114 C 388 134, 340 130, 334 129 L 404 178"/>' +
      '<path d="M440 162 L 494 54 L 548 162 M 462 122 L 526 122"/>' +
      '<path d="M576 60 L 580 160 L 644 152"/>' +
      '</g>' +
      '<circle cx="680" cy="150" r="16" fill="#0a0a0a" filter="url(#cu-rough)"/>' +
      '<path d="M150 200 C 320 184, 520 214, 690 192" filter="url(#cu-rough)" stroke="#0a0a0a" stroke-width="7" stroke-linecap="round" fill="none"/>' +
      '</svg>'
    );
  }

  /* ---------- INSTAGRAM IKONU ---------- */
  var IG_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2.5" y="2.5" width="19" height="19" rx="5"/>' +
    '<circle cx="12" cy="12" r="4.2"/>' +
    '<circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>';

  /* ---------- KILIT (client-side gate) ---------- */
  function isUnlocked() {
    try { return localStorage.getItem(CONFIG.UNLOCK_KEY) === "1"; } catch (e) { return false; }
  }
  function unlock() {
    try { localStorage.setItem(CONFIG.UNLOCK_KEY, "1"); } catch (e) {}
  }

  /* ---------- CSS (temel + gate/home/about/store/contact/legal) ---------- */
  var CSS =
    ':root{--ink:#0a0a0a;--paper:#fff;--dim:#9a9a9a;--line:#e8e8e8;--stone:#f3f2f0;--mono:"Courier New",ui-monospace,monospace;--disp:"Bebas Neue","Arial Narrow",sans-serif}' +
    ':where(#cural-root *){margin:0;padding:0;box-sizing:border-box}' +
    '#cural-root{position:fixed;inset:0;z-index:999999;background:var(--paper);color:var(--ink);' +
    'font-family:var(--mono);-webkit-font-smoothing:antialiased;overflow-y:auto;display:flex;flex-direction:column;min-height:100%}' +
    '#cural-root a{color:inherit;text-decoration:none}' +
    /* ozel imlec: sadece bindirme (overlay) sayfalarinda, gercek Ikas sepet/odeme akisina karismasin */
    '#cural-root,#cural-root *{cursor:url(' + IMGBASE + 'home/cursor.png) 6 4,auto}' +
    '#cural-root a,#cural-root button,#cural-root .cu-fig,#cural-root .cu-card{cursor:url(' + IMGBASE + 'home/cursor.png) 6 4,pointer}' +
    '.cu-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 24px 60px}' +
    '.cu-logo{height:auto;display:block}' +
    '.cu-rise{animation:cuRise .9s cubic-bezier(.2,.7,.2,1) both}' +
    '@keyframes cuRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
    '@keyframes cuFade{from{opacity:0}to{opacity:1}}' +
    /* menu (eski liste — artik sadece gate sayfasinda kullaniliyor) */
    '.cu-menu{display:flex;flex-direction:column;align-items:center;gap:14px;margin:40px 0 50px}' +
    '.cu-menu a{font-size:12px;letter-spacing:.3em;text-transform:uppercase;padding-bottom:2px;border-bottom:1px solid transparent;transition:border-color .2s}' +
    '.cu-menu a:hover{border-color:var(--ink)}.cu-menu a.muted{color:var(--dim)}' +
    '.cu-tag{font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-ig{display:inline-flex;margin-top:34px;color:var(--ink);opacity:.85;transition:opacity .2s}' +
    '.cu-ig:hover{opacity:.45}' +
    /* gate */
    '.cu-clip{width:min(300px,70vw);aspect-ratio:16/10;margin:22px 0 40px;object-fit:cover;background:var(--stone);' +
    'filter:grayscale(.15) contrast(1.02);pointer-events:none;user-select:none;animation:cuFade 1.4s ease .2s both}' +
    '.cu-su-t{font-size:12px;letter-spacing:.4em;font-weight:700;text-transform:uppercase;margin-bottom:16px}' +
    '.cu-su-s{font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--dim);line-height:2.1;margin-bottom:34px}' +
    '.cu-join{display:flex;width:min(430px,88vw);border:1px solid var(--ink)}' +
    '.cu-join input{flex:1;background:transparent;border:none;outline:none;font-family:var(--mono);font-size:12px;letter-spacing:.08em;color:var(--ink);padding:15px 16px}' +
    '.cu-join input::placeholder{color:var(--dim)}' +
    '.cu-join button{background:var(--ink);color:var(--paper);border:none;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.26em;text-transform:uppercase;font-weight:700;padding:0 26px;transition:opacity .2s}' +
    '.cu-join button:hover{opacity:.7}' +
    '.cu-div{width:min(430px,88vw);height:1px;background:var(--line);margin:40px 0 26px}' +
    '.cu-pwt{background:none;border:none;cursor:pointer;font-family:var(--mono);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--dim);transition:color .2s}' +
    '.cu-pwt:hover{color:var(--ink)}' +
    '.cu-pwbox{display:none;margin-top:22px;width:min(430px,88vw)}.cu-pwbox.open{display:block;animation:cuRise .5s ease both}' +
    '.cu-pwrow{display:flex;border:1px solid var(--ink)}' +
    '.cu-pwrow input{flex:1;background:transparent;border:none;outline:none;font-family:var(--mono);font-size:12px;letter-spacing:.18em;color:var(--ink);padding:14px 16px;text-align:center}' +
    '.cu-pwrow button{background:var(--ink);color:var(--paper);border:none;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.26em;text-transform:uppercase;font-weight:700;padding:0 24px;transition:opacity .2s}' +
    '.cu-pwrow button:hover{opacity:.7}' +
    '.cu-pwmsg{margin-top:12px;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--dim);min-height:12px}' +
    '.cu-pwmsg.err{color:#c0392b}.cu-pwmsg.ok{color:var(--ink)}' +

    /* ---------- ANA SAYFA: figur sahnesi + hover fizigi + marquee ---------- */
    '.cu-home{flex:1;display:flex;flex-direction:column;min-height:100%}' +
    '.cu-home-top{display:flex;justify-content:center;padding:56px 24px 0}' +
    '.cu-stage{flex:1;display:flex;align-items:center;justify-content:center;min-height:560px;padding:40px 24px}' +
    '.cu-figures{display:flex;align-items:center;justify-content:center;gap:min(120px,7vw);max-width:1400px;width:100%;flex-wrap:wrap}' +
    '.cu-fig{position:relative;display:block;transition:transform 380ms cubic-bezier(.34,1.56,.64,1),filter 380ms ease}' +
    '.cu-fig img{display:block;position:relative;z-index:2;pointer-events:none;-webkit-user-drag:none}' +
    '.cu-outline{position:absolute;z-index:1;pointer-events:none;overflow:visible;opacity:0;transition:opacity 180ms ease}' +
    '.cu-fig:hover .cu-outline{opacity:1}' +
    '.cu-outline path{transform-box:fill-box;transform-origin:50% 50%}' +
    '.cu-outline--blue path{animation:cuBlueFrames .8s steps(1) infinite}' +
    '.cu-outline--orange path{animation:cuOrangeFrames .9s steps(1) infinite}' +
    '.cu-outline--black path{animation:cuBlackFrames 1.2s steps(1) infinite}' +
    '@keyframes cuBlueFrames{' +
      '0%,100%{d:path("M 50.00,4.98 L 57.93,23.75 L 74.02,12.03 L 73.99,26.76 L 98.52,19.26 L 90.65,33.49 L 114.10,35.34 L 88.76,47.13 L 110.71,54.49 L 86.33,58.31 L 100.49,70.51 L 83.16,71.01 L 82.74,81.72 L 66.47,76.03 L 63.33,94.14 L 50.00,81.78 L 37.87,90.15 L 31.39,79.41 L 11.04,87.73 L 21.84,67.84 L -7.36,73.30 L 5.09,60.27 L -9.62,54.41 L 10.32,47.07 L -14.93,35.15 L 13.33,35.10 L 7.94,23.35 L 27.01,27.74 L 22.83,7.06 L 40.45,18.37 Z");transform:scale(.97) rotate(-1deg)}' +
      '33.33%{d:path("M 50.00,10.68 L 59.81,17.51 L 73.30,13.17 L 75.89,24.93 L 97.87,19.67 L 92.01,32.93 L 108.46,36.63 L 94.28,46.72 L 105.30,54.09 L 91.50,59.49 L 102.29,71.24 L 86.64,73.22 L 86.87,85.72 L 69.52,80.86 L 62.73,92.13 L 50.00,78.27 L 36.10,96.01 L 30.12,81.42 L 14.48,84.40 L 20.95,68.41 L -3.93,71.91 L 7.68,59.68 L -15.42,54.84 L 4.39,46.63 L -9.15,36.48 L 10.54,33.97 L 5.09,21.54 L 27.39,28.10 L 27.15,13.89 L 39.50,15.23 Z");transform:scale(1.02) rotate(.8deg)}' +
      '66.67%{d:path("M 50.00,7.17 L 59.38,18.95 L 77.25,6.94 L 73.62,27.12 L 93.39,22.51 L 83.08,36.56 L 104.14,37.62 L 87.71,47.21 L 107.15,54.23 L 92.55,59.73 L 109.50,74.18 L 85.05,72.21 L 85.54,84.42 L 67.60,77.82 L 63.45,94.52 L 50.00,79.70 L 38.29,88.78 L 30.00,81.60 L 12.57,86.25 L 20.79,68.51 L 1.25,69.81 L 12.84,58.50 L -17.92,55.02 L 10.96,47.11 L -10.67,36.13 L 5.93,32.09 L 8.52,23.71 L 24.72,25.51 L 24.87,10.28 L 39.57,15.46 Z");transform:scale(1.0) rotate(-.5deg)}' +
    '}' +
    '@keyframes cuOrangeFrames{' +
      '0%,100%{d:path("M 50.00,8.49 C 57.57,8.32 65.38,13.51 73.07,17.22 C 80.76,20.93 93.16,24.40 96.15,30.76 C 99.13,37.12 92.53,47.30 90.99,55.38 C 89.46,63.46 91.61,73.39 86.94,79.22 C 82.27,85.06 71.09,89.28 63.00,90.42 C 54.91,91.56 46.66,87.99 38.40,86.08 C 30.13,84.17 18.21,84.08 13.41,78.95 C 8.60,73.82 10.62,63.12 9.56,55.31 C 8.50,47.50 4.03,38.27 7.04,32.09 C 10.05,25.90 20.47,22.15 27.63,18.22 C 34.79,14.29 42.43,8.66 50.00,8.49 Z");transform:scale(1,1) rotate(0deg)}' +
      '33.33%{d:path("M 50.00,9.92 C 59.31,8.87 73.73,3.18 80.14,7.18 C 86.55,11.19 84.97,25.71 88.46,33.96 C 91.95,42.22 102.24,49.88 101.07,56.70 C 99.90,63.53 87.89,69.55 81.46,74.89 C 75.02,80.23 70.35,84.67 62.46,88.75 C 54.57,92.83 41.70,101.47 34.13,99.35 C 26.56,97.24 22.73,83.21 17.03,76.08 C 11.33,68.95 1.66,63.93 -0.07,56.57 C -1.80,49.21 2.60,39.11 6.66,31.93 C 10.72,24.75 17.07,17.15 24.29,13.48 C 31.52,9.81 40.69,10.97 50.00,9.92 Z");transform:scale(1.025,.98) rotate(.6deg)}' +
      '66.67%{d:path("M 50.00,6.44 C 57.85,5.76 68.57,9.89 75.01,14.47 C 81.45,19.04 83.87,26.79 88.64,33.89 C 93.41,40.98 105.01,50.34 103.65,57.04 C 102.29,63.75 87.17,68.24 80.50,74.13 C 73.83,80.01 71.27,88.39 63.62,92.35 C 55.97,96.32 42.09,100.85 34.59,97.93 C 27.08,95.01 24.14,81.77 18.60,74.84 C 13.05,67.92 3.70,63.70 1.33,56.39 C -1.05,49.08 -0.07,37.27 4.36,30.97 C 8.78,24.67 20.28,22.67 27.88,18.58 C 35.49,14.49 42.15,7.13 50.00,6.44 Z");transform:scale(.99,1.02) rotate(-.5deg)}' +
    '}' +
    '@keyframes cuBlackFrames{' +
      '0%,100%{d:path("M 50.00,14.45 C 53.74,14.65 57.66,16.52 61.01,18.25 C 64.36,19.98 66.18,23.05 70.10,24.85 C 74.03,26.65 80.18,26.29 84.55,29.05 C 88.92,31.82 96.44,36.89 96.31,41.43 C 96.17,45.96 87.70,52.54 83.74,56.25 C 79.78,59.96 73.79,59.22 72.56,63.68 C 71.34,68.14 77.66,78.15 76.38,83.01 C 75.09,87.86 69.24,92.91 64.84,92.81 C 60.44,92.71 54.86,82.69 50.00,82.42 C 45.14,82.16 40.04,91.21 35.71,91.23 C 31.38,91.24 25.36,87.12 24.02,82.50 C 22.69,77.89 29.08,67.89 27.68,63.53 C 26.28,59.17 19.69,60.07 15.60,56.37 C 11.51,52.67 2.98,45.77 3.14,41.32 C 3.30,36.88 12.11,32.49 16.55,29.72 C 20.99,26.95 26.11,26.82 29.79,24.71 C 33.46,22.59 35.21,18.76 38.58,17.05 C 41.95,15.34 46.26,14.25 50.00,14.45 Z");transform:translate(0,0) scale(1)}' +
      '33.33%{d:path("M 50.00,14.38 C 53.73,14.46 57.84,16.11 61.11,17.96 C 64.37,19.81 65.84,23.53 69.60,25.47 C 73.37,27.40 79.51,26.86 83.71,29.56 C 87.92,32.27 94.94,37.27 94.84,41.70 C 94.74,46.13 86.79,52.44 83.11,56.13 C 79.44,59.82 73.82,59.22 72.80,63.82 C 71.77,68.42 78.27,78.87 76.95,83.73 C 75.64,88.59 69.39,93.31 64.90,92.99 C 60.41,92.67 54.94,81.88 50.00,81.82 C 45.06,81.75 39.68,92.34 35.23,92.60 C 30.79,92.86 24.62,88.20 23.33,83.37 C 22.05,78.54 28.65,68.15 27.54,63.62 C 26.43,59.08 20.50,59.83 16.69,56.17 C 12.89,52.50 5.11,46.25 4.71,41.62 C 4.31,36.98 9.83,30.81 14.30,28.36 C 18.78,25.91 27.50,28.75 31.57,26.93 C 35.64,25.12 35.66,19.57 38.73,17.48 C 41.80,15.39 46.27,14.30 50.00,14.38 Z");transform:translate(1px,-1.5px) scale(1.015)}' +
      '66.67%{d:path("M 50.00,14.45 C 53.74,14.65 57.66,16.52 61.01,18.25 C 64.36,19.98 66.18,23.05 70.10,24.85 C 74.03,26.65 80.18,26.29 84.55,29.05 C 88.92,31.82 96.44,36.89 96.31,41.43 C 96.17,45.96 87.70,52.54 83.74,56.25 C 79.78,59.96 73.79,59.22 72.56,63.68 C 71.34,68.14 77.66,78.15 76.38,83.01 C 75.09,87.86 69.24,92.91 64.84,92.81 C 60.44,92.71 54.86,82.69 50.00,82.42 C 45.14,82.16 40.04,91.21 35.71,91.23 C 31.38,91.24 25.36,87.12 24.02,82.50 C 22.69,77.89 29.08,67.89 27.68,63.53 C 26.28,59.17 19.69,60.07 15.60,56.37 C 11.51,52.67 2.98,45.77 3.14,41.32 C 3.30,36.88 12.11,32.49 16.55,29.72 C 20.99,26.95 26.11,26.82 29.79,24.71 C 33.46,22.59 35.21,18.76 38.58,17.05 C 41.95,15.34 46.26,14.25 50.00,14.45 Z");transform:translate(-.5px,.5px) scale(1.0)}' +
    '}' +
    '.cu-fig--blue img{width:min(410px,42vw);height:auto}' +
    '.cu-outline--blue{inset:-30px;width:calc(100% + 60px);height:calc(100% + 60px)}' +
    '.cu-fig--blue:hover{transform:scale(1.28);filter:drop-shadow(0 8px 12px rgba(0,0,0,.3))}' +
    '.cu-fig--orange img{height:min(400px,42vw);width:auto}' +
    '.cu-outline--orange{inset:-35px;width:calc(100% + 70px);height:calc(100% + 70px)}' +
    '.cu-fig--orange:hover{transform:scale(1.15) rotate(8deg);filter:drop-shadow(0 4px 6px rgba(0,0,0,.2))}' +
    '.cu-fig--black img{height:min(410px,42vw);width:auto}' +
    '.cu-outline--black{inset:-18px;width:calc(100% + 36px);height:calc(100% + 36px)}' +
    '.cu-fig--black:hover{transform:scale(1.15) rotate(-6deg);filter:drop-shadow(0 4px 6px rgba(0,0,0,.2))}' +
    /* kapali bandi (cakmak tiklama sakasi) */
    '.cu-tape-layer{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:visible}' +
    '.cu-tape{position:absolute;left:50%;top:50%;width:130%;height:26px;margin-left:-65%;margin-top:-13px;' +
    'background:repeating-linear-gradient(45deg,#f5c400 0,#f5c400 14px,#111 14px,#111 28px);' +
    'display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.35);' +
    'opacity:0;transform:scale(.4) rotate(0deg);transition:transform 420ms cubic-bezier(.34,1.56,.64,1),opacity 200ms ease}' +
    '.cu-tape.cu-tape--in{opacity:1;transform:scale(1) rotate(var(--rot,0deg))}' +
    '.cu-tape.cu-tape--out{opacity:0;transform:scale(.6) rotate(var(--rot,0deg)) translateY(-16px)}' +
    '.cu-tape-label{background:#fff;color:#111;font-family:var(--disp);font-weight:700;font-size:14px;letter-spacing:2px;padding:2px 10px;border-radius:3px;white-space:nowrap}' +
    /* marquee */
    '.cu-marquee{border-top:1px solid var(--line);overflow:hidden;height:80px;display:flex;align-items:center;white-space:nowrap}' +
    '.cu-marquee-track{display:inline-block;animation:cuScroll 22s linear infinite}' +
    '.cu-marquee:hover .cu-marquee-track{animation-play-state:paused}' +
    '.cu-marquee-track span{display:inline-flex;align-items:center;gap:12px;margin:0 32px;font-family:var(--disp);font-size:30px;letter-spacing:.5px;opacity:.85}' +
    '@keyframes cuScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
    '@media(max-width:760px){.cu-figures{gap:14vw 8vw}.cu-stage{min-height:420px}}' +

    /* ---------- ABOUT (sahte AI sohbet sayfasi) ---------- */
    '.cu-about-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:24px}' +
    '.cu-chat{width:min(560px,92vw);height:min(680px,86vh);background:#161616;border:1px solid rgba(255,255,255,.14);border-radius:18px;' +
    'overflow:hidden;display:flex;flex-direction:column;color:#fff}' +
    '.cu-chat-bar{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.1);font-size:13px;opacity:.7}' +
    '.cu-dot{width:11px;height:11px;border-radius:50%;display:inline-block}' +
    '.cu-dot.red{background:#ff5f56}.cu-dot.yellow{background:#ffbd2e}.cu-dot.green{background:#27c93f}' +
    '.cu-dot-link{display:inline-block;line-height:0}' +
    '.cu-chat-body{padding:22px;flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:16px}' +
    '.cu-msg{max-width:85%}' +
    '.cu-msg .who{font-size:11px;opacity:.4;margin-bottom:4px;letter-spacing:1px}' +
    '.cu-msg.user{align-self:flex-end;text-align:right}' +
    '.cu-msg.user .bubble{background:rgba(255,255,255,.1);border-radius:8px;padding:8px 14px;display:inline-block}' +
    '.cu-msg.bot .who{color:#7c8cff}' +
    '.cu-msg.bot .bubble{font-size:14px;line-height:1.6}' +
    '.cu-chat-foot{border-top:1px solid rgba(255,255,255,.1);padding:14px 16px;display:flex;gap:10px;align-items:center}' +
    '.cu-chat-foot input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-family:var(--mono);font-size:13px;opacity:.9}' +
    '.cu-chat-foot input::placeholder{opacity:.4;color:#fff}' +
    '.cu-chat-foot button{background:rgba(255,255,255,.08);border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:15px;opacity:.7;transition:opacity .15s ease}' +
    '.cu-chat-foot button:hover{opacity:1}' +
    '.cu-blink{display:inline-block;width:7px;height:14px;background:#fff;margin-left:2px;animation:cuBlink .9s steps(1) infinite;vertical-align:text-bottom}' +
    '@keyframes cuBlink{50%{opacity:0}}' +

    /* ---------- footer (tum bindirme sayfalarinda) ---------- */
    '.cu-foot{border-top:1px solid var(--line);padding:20px 28px 26px;display:flex;flex-direction:column;gap:10px}' +
    '.cu-foot-row{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}' +
    '.cu-foot-row span,.cu-foot-row a{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-foot-row a:hover{color:var(--ink)}' +
    '.cu-foot-legal{display:flex;gap:10px;flex-wrap:wrap;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-foot-legal a:hover{color:var(--ink)}' +

    /* urun/sepet sayfalari icin ust bar */
    '.cu-skintop{display:flex;flex-direction:column;align-items:center;gap:10px;padding:22px 24px 18px;background:#fff;position:relative;z-index:10000}' +
    '.cu-skintop a{text-decoration:none}' +

    /* contact formu */
    '.cu-form-wrap{flex:1;min-width:0;max-width:640px}' +
    '.cu-form-row{display:flex;gap:16px;margin-bottom:16px}' +
    '.cu-form-row.full{flex-direction:column}' +
    '.cu-field{flex:1;display:flex;flex-direction:column;min-width:0}' +
    '.cu-field input,.cu-field textarea{border:1px solid var(--ink);padding:13px 14px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--ink);background:transparent;outline:none;width:100%}' +
    '.cu-field textarea{min-height:140px;resize:vertical}' +
    '.cu-field input::placeholder,.cu-field textarea::placeholder{color:var(--dim)}' +
    '.cu-form-actions{display:flex;justify-content:space-between;align-items:center;margin-top:24px;flex-wrap:wrap;gap:14px}' +
    '.cu-btn{-webkit-appearance:none;appearance:none;background:var(--ink)!important;color:var(--paper)!important;border:none;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;padding:14px 26px;transition:opacity .2s;display:inline-block}' +
    '.cu-btn:hover{opacity:.78}' +
    '.cu-btn.ghost{background:transparent!important;color:var(--ink)!important;border:1px solid var(--ink)}' +
    '.cu-form-msg{margin-top:16px;font-size:10px;letter-spacing:.12em;color:var(--dim)}' +
    '@media(max-width:600px){.cu-form-row{flex-direction:column;gap:12px}}' +

    /* ---------- store — sol sidebar nav, 4lu grid, isim/fiyat hover'da ---------- */
    '.cu-top{display:flex;flex-direction:column;align-items:center;padding:64px 24px 0}' +
    '.cu-cart{margin-top:16px;display:inline-flex;align-items:center;gap:7px;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--dim);transition:color .2s}' +
    '.cu-cart:hover{color:var(--ink)}' +
    '.cu-cart-badge{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:var(--ink);color:var(--paper);font-family:var(--mono);font-size:9px;letter-spacing:0;line-height:1}' +
    '.cu-coll-wrap{max-width:1280px;width:100%;margin:56px auto 0;padding:0 24px}' +
    '.cu-coll{display:flex;justify-content:space-between;align-items:baseline;width:100%;margin:0 0 24px;padding:0 0 14px;border-bottom:1px solid var(--line)}' +
    '.cu-coll h1{font-size:12px;letter-spacing:.34em;text-transform:uppercase;font-weight:700}' +
    '.cu-coll span{font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-store{display:flex;align-items:flex-start;max-width:1280px;width:100%;margin:0 auto;padding:0 24px 80px;gap:40px}' +
    '.cu-side{width:130px;flex-shrink:0;display:flex;flex-direction:column;gap:14px;position:sticky;top:40px}' +
    '.cu-side a{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);padding-bottom:2px;border-bottom:1px solid transparent;transition:color .2s,border-color .2s;align-self:flex-start}' +
    '.cu-side a:hover{color:var(--ink)}' +
    '.cu-side a.active{color:var(--ink);border-color:var(--ink)}' +
    '.cu-grid{flex:1;min-width:0;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}' +
    '.cu-card{display:block;position:relative}' +
    '.cu-ph{aspect-ratio:4/5;background:var(--paper);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}' +
    '.cu-ph img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .5s ease,opacity .2s}' +
    '.cu-card:hover .cu-ph img{transform:scale(1.045)}' +
    '.cu-ph.sold img{opacity:.5}' +
    '.cu-ph.sold::before{content:"Sold out";position:absolute;top:10px;left:10px;background:var(--ink);color:var(--paper);font-size:9px;letter-spacing:.2em;text-transform:uppercase;padding:5px 9px;z-index:2}' +
    '.cu-ph span{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--dim);transition:opacity .2s}' +
    '.cu-meta{padding:12px 2px 0;display:flex;flex-direction:column;gap:4px;opacity:0;transform:translateY(-3px);transition:opacity .2s,transform .2s}' +
    '.cu-card:hover .cu-meta{opacity:1;transform:none}' +
    '.cu-meta .nm{font-size:13px;letter-spacing:.06em;font-weight:700}' +
    '.cu-meta .ty{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-meta .rw{display:flex;justify-content:space-between;align-items:baseline;margin-top:4px}' +
    '.cu-meta .pr{font-size:12px}.cu-meta .st{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}' +
    '@media(max-width:760px){.cu-store{flex-direction:column;gap:24px}.cu-side{flex-direction:row;flex-wrap:wrap;width:100%;position:static;gap:14px 22px}.cu-grid{grid-template-columns:repeat(2,1fr)}}' +
    '@media(max-width:600px){.cu-menu{gap:12px;margin-bottom:42px}.cu-menu a{font-size:11px;letter-spacing:.24em}}' +
    '@media(max-width:460px){.cu-grid{grid-template-columns:1fr}}' +

    /* ---------- legal sayfalari ---------- */
    '.cu-legal-wrap{max-width:1280px;width:100%;margin:0 auto;padding:0 24px 80px}' +
    '.cu-legal{max-width:680px;margin:0 auto;line-height:1.7;font-size:14px}' +
    '.cu-legal h1{font-family:var(--disp);font-size:38px;letter-spacing:.5px;margin-bottom:6px}' +
    '.cu-legal .upd{color:var(--dim);font-size:11px;margin-bottom:34px;letter-spacing:.08em}' +
    '.cu-legal h2{font-family:var(--disp);font-size:19px;letter-spacing:.5px;margin:32px 0 10px}' +
    '.cu-legal p{margin-bottom:12px;opacity:.85}' +
    '.cu-legal ul{margin:0 0 12px 20px;opacity:.85}' +
    '.cu-legal li{margin-bottom:5px}' +
    '.cu-legal a{text-decoration:underline}';

  /* ---------- URUN SAYFASI SKIN (Ikas DOM'u Slawn'a giydirir) — DEGISMEDI ---------- */
  var SKIN_CSS =
    'html.cural-skin,html.cural-skin body,html.cural-skin #__next,' +
    'html.cural-skin footer,html.cural-skin .product-detail-tabs-main,' +
    'html.cural-skin .product-detail-page-detail-box,html.cural-skin .slider-banner,' +
    'html.cural-skin [style*="background-color: rgb(0, 0, 0)"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *),' +
    'html.cural-skin [style*="background-color:#000000"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *),' +
    'html.cural-skin [style*="background:#000000"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *){' +
      'background:#fff!important;background-color:#fff!important}' +
    'html.cural-skin .header{display:none!important}' +
    'html.cural-skin,html.cural-skin *:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *):not(.basket-top-checkout):not(.basket-top-checkout *):not(.payment-link):not(.payment-link *):not([class*="QuantityCircle"]):not([class*="StepCircle"]):not([class*="StepCircle"] *):not([class*="TooltipContainer"]):not([class*="TooltipContainer"] *){color:#0a0a0a!important}' +
    'html.cural-skin [style*="color:#ffffff"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *):not(.basket-top-checkout):not(.basket-top-checkout *),' +
    'html.cural-skin [style*="color: rgb(255, 255, 255)"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *):not(.basket-top-checkout):not(.basket-top-checkout *),' +
    'html.cural-skin font[color="#ffffff"]{color:#0a0a0a!important}' +
    'html.cural-skin [class*="QuantityCircle"],html.cural-skin [class*="StepCircle"],html.cural-skin [class*="StepCircle"] *,' +
    'html.cural-skin [class*="TooltipContainer"],html.cural-skin [class*="TooltipContainer"] *{color:#fff!important}' +
    'html.cural-skin .product-name,html.cural-skin .product-name-main,' +
    'html.cural-skin .product-detail-page-detail-box,html.cural-skin .product-detail-tabs-main{' +
      'font-family:"Courier New",ui-monospace,monospace!important;letter-spacing:.04em!important}' +
    'html.cural-skin .product-name,html.cural-skin .product-name-main{text-transform:uppercase!important;font-weight:700!important}' +
    'html.cural-skin .add-to-cart,html.cural-skin .add-to-cart *,' +
    'html.cural-skin .shopping-button,html.cural-skin .shopping-button *{' +
      'background:#0a0a0a!important;background-color:#0a0a0a!important;color:#fff!important;border:none!important;border-radius:0!important;' +
      'letter-spacing:.22em!important;text-transform:uppercase!important;font-family:"Courier New",ui-monospace,monospace!important}' +
    'html.cural-skin .add-to-cart,html.cural-skin .shopping-button{transition:opacity .2s!important}' +
    'html.cural-skin .add-to-cart:hover,html.cural-skin .shopping-button:hover{opacity:.78!important}' +
    'html.cural-skin .product-detail-page-buy-box{margin-top:16px!important;align-items:flex-start!important}' +
    'html.cural-skin .product-detail-page-buy-box .add-to-cart{flex:none!important;width:auto!important;padding:14px 40px!important}' +
    'html.cural-skin .add-favorite-basket{display:none!important}' +
    'html.cural-skin .product-detail-page-detail-box iframe{display:none!important}' +
    'html.cural-skin .cu-cart-badge{color:#fff!important;background:#0a0a0a!important}' +
    'html.cural-skin .basket-checkout-btn,html.cural-skin .basket-checkout-btn *{color:#fff!important}' +
    'html.cural-skin .basket-top-checkout,html.cural-skin .basket-top-checkout *{color:#fff!important}' +
    'html.cural-skin .payment-link,html.cural-skin .payment-link *{color:#fff!important}' +
    'html.cural-skin .empty-basket svg{display:none!important}' +
    'html.cural-skin .breadcrumbs{display:none!important}' +
    'html.cural-skin .cu-skintop{padding-bottom:56px!important}' +
    'html.cural-skin footer{border-top:1px solid #e8e8e8!important}' +
    ':root{--checkout-button-bg-color:#0a0a0a!important;--checkout-button-text-color:#fff!important;' +
    '--checkout-secondary-button-bg-color:#fff!important;--checkout-secondary-button-text-color:#0a0a0a!important;' +
    '--checkout-secondary-button-border-color:#0a0a0a!important;--checkout-primary-bg-color:#fff!important;' +
    '--checkout-primary-text-color:#0a0a0a!important;--checkout-secondary-bg-color:#fff!important;' +
    '--checkout-secondary-text-color:#0a0a0a!important;--checkout-card-bg-color:#fff!important;' +
    '--checkout-border-color:#e8e8e8!important}';

  /* ---------- LEGAL METINLERI ---------- */
  var LEGAL = {
    kvkk: {
      title: "KVKK Aydınlatma Metni",
      updated: "9 Ağustos 2026",
      body: [
        '<p>CURAL. olarak bize verdiğin bilgilerin sana ait olduğunun farkındayız. Bu yüzden hangi bilgileri neden aldığımızı ve ne yaptığımızı mümkün olduğunca açık anlatmak istiyoruz.</p>',
        '<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verilerinin CURAL. tarafından nasıl işlendiği konusunda seni bilgilendirmek amacıyla hazırlanmıştır.</p>',
        '<h2>Hangi Bilgilerini İşliyoruz?</h2>',
        '<p>CURAL.\'ı ziyaret ettiğinde, bizimle iletişime geçtiğinde veya sipariş verdiğinde işlem için gerekli olan bazı bilgilerini alabiliriz. Bunlar başlıca:</p>',
        '<ul><li>Ad ve soyad</li><li>Telefon numarası</li><li>E-posta adresi</li><li>Teslimat ve fatura adresi</li><li>Sipariş ve alışveriş bilgileri</li><li>Ödeme ve işlem bilgileri</li><li>İade ve değişim bilgileri</li><li>Bizimle gerçekleştirdiğin iletişimler</li><li>IP adresi, cihaz, tarayıcı ve site kullanımına ilişkin teknik bilgiler</li></ul>',
        '<p>olabilir. İhtiyacımız olmayan bilgiyi istememeye çalışıyoruz.</p>',
        '<h2>Neden Kullanıyoruz?</h2>',
        '<p>Bilgilerini esas olarak: siparişini oluşturmak, ödemenin gerçekleştirilmesini sağlamak, siparişini hazırlamak ve göndermek, teslimat sürecini yürütmek, gerektiğinde seninle iletişime geçmek, iade ve değişim süreçlerini yönetmek, müşteri desteği sağlamak, yasal yükümlülüklerimizi yerine getirmek, dolandırıcılık ve kötüye kullanımı önlemek ve CURAL. web sitesinin güvenliğini sağlamak amacıyla işleyebiliriz.</p>',
        '<p>İzin vermen gereken pazarlama faaliyetleri söz konusu olduğunda ise gerekli onay süreçleri ayrıca yürütülür.</p>',
        '<h2>Bilgilerini Nasıl Topluyoruz?</h2>',
        '<p>Kişisel verilerini; CURAL. web sitesi üzerinden doldurduğun formlar, verdiğin siparişler, bizimle gerçekleştirdiğin iletişimler ve siteyi kullanırken çalışan çerezler ve benzeri teknolojiler aracılığıyla elektronik ortamda toplayabiliriz.</p>',
        '<p>Ayrıca ödeme, e-ticaret ve kargo hizmeti aldığımız iş ortakları aracılığıyla da işlem için gerekli bazı bilgiler elde edilebilir.</p>',
        '<h2>Hangi Hukuki Sebeplere Dayanıyoruz?</h2>',
        '<p>Kişisel veriler, yapılan işlemin niteliğine göre KVKK\'da öngörülen kişisel veri işleme şartlarına dayanılarak işlenir.</p>',
        '<p>Örneğin bir sipariş verdiğinde, siparişinin hazırlanması, ödemesinin gerçekleştirilmesi ve sana ulaştırılması için gerekli verilerin işlenmesi sözleşmenin kurulması veya ifasıyla doğrudan ilgili olabilir.</p>',
        '<p>Fatura ve benzeri kayıtların tutulması kanuni yükümlülüklerimizin yerine getirilmesi kapsamında olabilir.</p>',
        '<p>Site ve işlem güvenliğinin sağlanmasına yönelik bazı işlemler ise temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatlerimiz kapsamında gerçekleştirilebilir.</p>',
        '<p>Bir işlemin açık rıza gerektirdiği durumlarda ise açık rızan ayrıca alınır.</p>',
        '<h2>Bilgilerin Kimlerle Paylaşılabilir?</h2>',
        '<p>Siparişini sana ulaştırabilmek için bazen başka şirketlerin de sürece dahil olması gerekiyor. Kişisel veriler, yalnızca gerekli olduğu ölçüde;</p>',
        '<ul><li>Ödeme hizmeti sağlayıcıları</li><li>Kargo ve lojistik şirketleri</li><li>E-ticaret ve teknik altyapı sağlayıcıları</li><li>Muhasebe ve benzeri hizmet sağlayıcıları</li><li>Yetkili kamu kurum ve kuruluşları</li></ul>',
        '<p>ile ilgili hizmetin sağlanması veya yasal yükümlülüklerin yerine getirilmesi amacıyla paylaşılabilir.</p>',
        '<h2>Verilerini Nasıl Koruyoruz?</h2>',
        '<p>Kişisel verilerinin yetkisiz erişime, kaybolmaya, değiştirilmesine veya hukuka aykırı şekilde kullanılmasına karşı korunması için gerekli idari ve teknik tedbirleri almaya çalışıyoruz.</p>',
        '<p>Verilerini yalnızca işlenmesini gerektiren amaç için gerekli olduğu veya ilgili mevzuatın gerektirdiği süre boyunca saklarız. İşleme sebebi ortadan kalktığında veriler ilgili mevzuata uygun şekilde silinir, yok edilir veya anonim hale getirilir.</p>',
        '<h2>Hakların</h2>',
        '<p>Kişisel veriler sana ait. Dolayısıyla onlar hakkında söz hakkın da var.</p>',
        '<p>KVKK\'nın 11. maddesi kapsamında; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, ilgili şartların oluşması halinde verilerinin düzeltilmesini veya silinmesini/yok edilmesini isteme ve Kanun kapsamında sahip olduğun diğer haklarını kullanabilirsin.</p>',
        '<h2>Bize Ulaş</h2>',
        '<p>Kişisel verilerinle ilgili bir sorun, soru veya talebin varsa bize ulaşabilirsin.</p>',
        '<p>CURAL.<br>E-posta: <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>',
        '<p>KVKK kapsamındaki taleplerini de bu adres üzerinden bize iletebilirsin.</p>'
      ].join("")
    },
    gizlilik: {
      title: "Gizlilik Politikası",
      updated: "9 Ağustos 2026",
      body: [
        '<p>CURAL. olarak gizliliğine saygı duyuyoruz.</p>',
        '<p>Bu Gizlilik Politikası; CURAL. web sitesini ziyaret ettiğinde, ürünlerimizi incelediğinde, sipariş verdiğinde veya bizimle iletişime geçtiğinde kişisel bilgilerinin nasıl toplandığını, neden kullanıldığını ve kimlerle paylaşılabileceğini açıklar.</p>',
        '<p>Kişisel verilerinin işlenmesinde başta 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) olmak üzere Türkiye\'de yürürlükte bulunan ilgili mevzuata uygun hareket etmeyi amaçlıyoruz.</p>',
        '<h2>Hangi Bilgileri Topluyoruz?</h2>',
        '<p>CURAL. ile nasıl etkileşime geçtiğine bağlı olarak aşağıdaki bilgiler işlenebilir:</p>',
        '<p><strong>İletişim bilgileri:</strong> Ad, soyad, telefon numarası, e-posta adresi, teslimat ve fatura adresi.</p>',
        '<p><strong>Sipariş bilgileri:</strong> Satın aldığın, iade ettiğin veya değiştirdiğin ürünler, sipariş geçmişin, sepet ve işlem bilgilerin.</p>',
        '<p><strong>Ödeme bilgileri:</strong> Ödeme yöntemi, işlem ve ödeme onay bilgileri. Kart bilgilerinin işlenmesi, kullandığımız ödeme kuruluşları tarafından gerçekleştirilebilir.</p>',
        '<p><strong>İletişim kayıtları:</strong> Bize e-posta veya diğer iletişim kanalları üzerinden gönderdiğin mesajlar ve müşteri destek talepleri.</p>',
        '<p><strong>Teknik bilgiler:</strong> IP adresi, cihaz, tarayıcı, bağlantı ve site kullanımına ilişkin teknik bilgiler.</p>',
        '<p><strong>Kullanım bilgileri:</strong> CURAL. web sitesini nasıl kullandığın, görüntülediğin sayfalar ve site üzerindeki etkileşimlerin.</p>',
        '<h2>Bilgileri Nasıl Topluyoruz?</h2>',
        '<p>Kişisel bilgilerini; CURAL. web sitesi üzerinden doğrudan verdiğin bilgilerden, oluşturduğun siparişlerden, bizimle gerçekleştirdiğin iletişimlerden, çerezler ve benzeri teknolojilerden ve hizmet aldığımız ödeme, kargo, e-ticaret ve teknik altyapı sağlayıcılarından elde edebiliriz.</p>',
        '<h2>Bilgilerini Neden Kullanıyoruz?</h2>',
        '<p>Bilgilerini temel olarak: siparişlerini oluşturmak ve tamamlamak, ödemelerini gerçekleştirmek, ürünlerini hazırlamak ve göndermek, teslimat sürecini yürütmek, iade ve değişim işlemlerini gerçekleştirmek, seninle siparişin hakkında iletişim kurmak, müşteri desteği sağlamak, CURAL. web sitesini geliştirmek, işlem ve site güvenliğini sağlamak, dolandırıcılık ve kötüye kullanımı önlemek, yasal yükümlülüklerimizi yerine getirmek amacıyla kullanabiliriz.</p>',
        '<p>Pazarlama iletişiminin ayrıca izin gerektirdiği durumlarda gerekli izin süreçleri ayrıca yürütülür.</p>',
        '<h2>Bilgilerini Kimlerle Paylaşabiliriz?</h2>',
        '<p>CURAL.\'dan verdiğin bir siparişi tek başımıza tamamlamamız her zaman mümkün değil. Bu nedenle kişisel bilgilerin, yalnızca ilgili hizmetin sağlanması için gerekli olduğu ölçüde;</p>',
        '<ul><li>Kargo ve lojistik şirketleri</li><li>Ödeme hizmeti sağlayıcıları</li><li>E-ticaret ve web altyapısı sağlayıcıları</li><li>Barındırma ve teknik hizmet sağlayıcıları</li><li>Muhasebe ve finans hizmeti sağlayıcıları</li></ul>',
        '<p>ile paylaşılabilir. Kanunen gerekli olması halinde yetkili kamu kurum ve kuruluşlarıyla da bilgi paylaşılması gerekebilir.</p>',
        '<h2>Yurt Dışındaki Hizmet Sağlayıcıları</h2>',
        '<p>CURAL.\'ın kullandığı bazı teknik hizmetlerin sunucuları veya altyapıları Türkiye dışında bulunabilir. Böyle bir durumda kişisel verilerin yurt dışına aktarılması, KVKK\'nın 9. maddesi ve ilgili mevzuatta öngörülen şartlara ve uygun güvence mekanizmalarına göre gerçekleştirilir.</p>',
        '<h2>Üçüncü Taraf Siteler</h2>',
        '<p>CURAL. web sitesinde başka web sitelerine veya platformlara yönlendiren bağlantılar bulunabilir. CURAL.\'dan ayrılıp üçüncü taraf bir siteyi ziyaret ettiğinde o sitenin kendi gizlilik politikaları ve kullanım koşulları geçerli olur.</p>',
        '<h2>Çerezler</h2>',
        '<p>CURAL. web sitesinin düzgün çalışması, tercihlerin hatırlanması, site performansının ölçülmesi ve kullanıcı deneyiminin geliştirilmesi amacıyla çerezler ve benzeri teknolojiler kullanılabilir.</p>',
        '<h2>Verilerini Nasıl Koruyoruz?</h2>',
        '<p>Kişisel bilgilerinin yetkisiz erişime, kayba, kötüye kullanıma veya hukuka aykırı şekilde işlenmesine karşı korunması için uygun teknik ve idari tedbirleri almaya çalışıyoruz. Ancak internet üzerinden gerçekleştirilen hiçbir veri aktarımının veya depolama sisteminin yüzde yüz güvenli olduğu garanti edilemez.</p>',
        '<h2>Bilgilerini Ne Kadar Saklıyoruz?</h2>',
        '<p>Kişisel bilgilerini yalnızca toplandıkları amaç için gerekli olduğu veya ilgili mevzuat kapsamında saklamamız gerektiği süre boyunca tutarız. İşleme amacı ve hukuki saklama gerekliliği ortadan kalktığında veriler yürürlükteki mevzuata uygun şekilde silinir, yok edilir veya anonim hale getirilir.</p>',
        '<h2>Hakların</h2>',
        '<p>Kişisel verilerin konusunda KVKK\'nın 11. maddesi kapsamında çeşitli haklara sahipsin. Kişisel verilerinin işlenip işlenmediğini öğrenmek ve Kanun kapsamında sahip olduğun diğer hakları kullanmak için bizimle iletişime geçebilirsin.</p>',
        '<h2>Talepler ve Bize Ulaşma</h2>',
        '<p>Gizliliğin, kişisel bilgilerin veya bu politika hakkında bir sorun varsa bize ulaşabilirsin. KVKK kapsamındaki taleplerini de aşağıdaki e-posta adresi üzerinden bize iletebilirsin.</p>',
        '<p>CURAL.<br>E-posta: <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>',
        '<h2>Bu Politikadaki Değişiklikler</h2>',
        '<p>CURAL. büyüdükçe, kullandığımız hizmetler değiştikçe veya yasal gereklilikler nedeniyle bu Gizlilik Politikası\'nı zaman zaman güncelleyebiliriz. Güncel politika bu sayfada yayınlanır ve değişiklik yapıldığında sayfanın üstündeki "Son güncelleme" tarihi değiştirilir.</p>'
      ].join("")
    },
    kosullar: {
      title: "Kullanım Koşulları",
      updated: "9 Ağustos 2026",
      body: [
        '<h2>1. Siteyi Kullanmak</h2>',
        '<p>CURAL. web sitesini yalnızca hukuka uygun amaçlarla kullanabilirsin.</p>',
        '<p>Sipariş verirken veya site üzerindeki hizmetlerden yararlanırken senden e-posta adresi, teslimat adresi, fatura bilgileri ve ödeme için gerekli bazı bilgiler istenebilir.</p>',
        '<p>Verdiğin bilgilerin doğru, güncel ve eksiksiz olmasından sen sorumlusun. Bir kullanıcı hesabın varsa hesap bilgilerinin ve şifrenin güvenliğini korumak da senin sorumluluğundadır.</p>',
        '<h2>2. Ürünler</h2>',
        '<p>CURAL. ürünlerini sitede mümkün olduğunca doğru şekilde göstermeye çalışıyoruz. Ancak kullandığın ekranın, cihazın, parlaklık ve renk ayarlarının farklı olması nedeniyle ürünlerin renkleri veya görünümü gerçekte gördüğünden küçük farklılıklar gösterebilir.</p>',
        '<p>Özellikle el işçiliği, üretim tekniği veya kullanılan malzemenin doğasından kaynaklanan küçük farklılıklar bulunabilir.</p>',
        '<p>Ürün açıklamalarını, özelliklerini ve mevcut ürünleri gerektiğinde güncelleme hakkımız saklıdır.</p>',
        '<p>Bazı ürünler sınırlı sayıda üretilebilir. Bir ürünün stokları tükendiğinde aynı ürünün yeniden satışa çıkacağını garanti etmiyoruz.</p>',
        '<h2>3. Siparişler</h2>',
        '<p>CURAL. üzerinden sipariş vermen, ilgili ürünü satın almak için yaptığın bir teklif niteliğindedir. Siparişinin başarıyla oluşturulması, siparişin her durumda kabul edildiği anlamına gelmeyebilir.</p>',
        '<p>Ödemenin alınması ve siparişin tarafımızca onaylanmasının ardından sipariş işleme alınır.</p>',
        '<p>Teknik hata, stok problemi, ödeme sorunu, yanlış fiyatlandırma veya siparişin yerine getirilmesini engelleyen başka bir durum olması halinde siparişi iptal etme hakkımız saklıdır. Böyle bir durumda mümkün olan en kısa sürede sipariş sırasında verdiğin iletişim bilgilerinden sana ulaşırız.</p>',
        '<p>Siparişini tamamlamadan önce ürün, beden, adet, teslimat adresi ve diğer bilgilerini kontrol etmeni öneriyoruz.</p>',
        '<p>İade, değişim ve cayma hakkına ilişkin işlemler İade ve Değişim Politikamız ve yürürlükteki tüketici mevzuatı kapsamında gerçekleştirilir.</p>',
        '<h2>4. Fiyatlar ve Ödeme</h2>',
        '<p>Ürün fiyatları, kampanyalar ve indirimler zaman zaman değişebilir. Siparişinde geçerli olan fiyat, siparişini oluşturduğun anda sana gösterilen ve sipariş onayında belirtilen fiyattır.</p>',
        '<p>Varsa kargo ücreti veya diğer ek ücretler ödeme işlemi tamamlanmadan önce sana gösterilir.</p>',
        '<p>Ödeme sırasında verdiğin bilgilerin doğru ve sana ait olması gerekir. Başkasına ait bir ödeme aracını yetkisiz şekilde kullanamazsın.</p>',
        '<p>Kampanyaların ayrıca belirtilen kendi şartları olabilir. Bir kampanya için özel koşullar belirtilmişse ilgili kampanyada bu koşullar geçerli olur.</p>',
        '<h2>5. Kargo ve Teslimat</h2>',
        '<p>Siparişler belirtilen teslimat adresine gönderilir. Sitede gösterilen tahmini kargo ve teslimat sürelerini mümkün olduğunca doğru vermeye çalışıyoruz.</p>',
        '<p>Ancak kargo şirketleri, yoğunluk, hava koşulları, resmi tatiller, doğal afetler veya kontrolümüz dışında gelişen diğer durumlar nedeniyle gecikmeler yaşanabilir.</p>',
        '<p>Siparişinde bir sorun olduğunu düşünüyorsan bize ulaşabilirsin: <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>',
        '<h2>6. CURAL.\'a Ait İçerikler</h2>',
        '<p>CURAL. web sitesinde bulunan; CURAL. adı ve logosu, karakterler, illüstrasyonlar, figürler, heykeller, tablolar, ürün tasarımları, kıyafet ve aksesuar tasarımları, fotoğraflar, videolar, animasyonlar, grafikler, yazılar, sloganlar ve diğer özgün içerikler ilgili fikri mülkiyet mevzuatı kapsamında korunabilir.</p>',
        '<p>Aksi açıkça belirtilmediği sürece bu içerikleri CURAL.\'ın önceden yazılı izni olmadan ticari amaçla kopyalayamaz, çoğaltamaz, değiştiremez, satamaz veya CURAL. ürünüymüş gibi kullanamazsın.</p>',
        '<p>Sitedeki bir içeriği görebiliyor veya erişebiliyor olman, o içeriğin fikri mülkiyet haklarının sana devredildiği anlamına gelmez.</p>',
        '<h2>7. Üçüncü Taraf Hizmetleri</h2>',
        '<p>CURAL. sitesinin çalışabilmesi için ödeme, e-ticaret altyapısı, kargo, analiz veya benzeri alanlarda üçüncü taraf hizmetlerden yararlanabiliriz. Bu hizmetlerin bazıları kendi kullanım koşullarına ve gizlilik politikalarına tabi olabilir.</p>',
        '<h2>8. Üçüncü Taraf Bağlantıları</h2>',
        '<p>CURAL. zaman zaman başka web sitelerine, sosyal medya platformlarına veya üçüncü taraf hizmetlere bağlantı verebilir. Bu sitelerin içeriği, güvenliği veya gizlilik uygulamaları CURAL.\'ın kontrolünde olmayabilir.</p>',
        '<h2>9. Gizlilik ve Kişisel Veriler</h2>',
        '<p>CURAL. üzerinden toplanan kişisel bilgilerin nasıl işlendiğine ilişkin ayrıntıları <a href="/gizlilik-politikasi">Gizlilik Politikası</a> ve <a href="/kvkk">KVKK Aydınlatma Metni</a> üzerinden inceleyebilirsin.</p>',
        '<h2>10. Yorumlar ve Bize Gönderdiğin İçerikler</h2>',
        '<p>CURAL.\'a yorum, öneri, fikir veya geri bildirim gönderebilirsin. Gönderdiğin içeriklerin üçüncü kişilerin telif, marka, gizlilik veya diğer haklarını ihlal etmemesi gerekir.</p>',
        '<p>Hukuka aykırı, tehdit edici, yanıltıcı, kötü amaçlı veya başkalarının haklarını ihlal eden içerikleri kaldırma hakkımız saklıdır.</p>',
        '<h2>11. Hatalar ve Eksik Bilgiler</h2>',
        '<p>Sitede zaman zaman ürün açıklaması, fiyat, kampanya, stok durumu, kargo ücreti veya benzeri konularda yazım hataları, teknik hatalar veya eksik bilgiler bulunabilir. Böyle bir hata fark edildiğinde bilgileri düzeltme veya güncelleme hakkımız saklıdır.</p>',
        '<h2>12. Yapmaman Gerekenler</h2>',
        '<p>CURAL. web sitesini kullanırken; hukuka aykırı faaliyetlerde bulunamaz, başkalarının haklarını ihlal edemez, CURAL.\'a veya başka kişilere ait fikri mülkiyet haklarını ihlal edemez, yanıltıcı bilgi paylaşamaz, zararlı yazılım gönderemez, spam veya benzeri istenmeyen içerikler gönderemez, başkalarının kişisel bilgilerini hukuka aykırı şekilde toplayamaz ve sitenin güvenlik sistemlerini aşmaya çalışamazsın.</p>',
        '<p>Ayrıca CURAL. web sitesindeki içerik veya verilerin otomatik araçlarla sistematik biçimde çekilmesi, kopyalanması veya ticari amaçla yeniden kullanılması yasaktır.</p>',
        '<h2>13. Hizmete Erişim</h2>',
        '<p>CURAL. web sitesinin her zaman kesintisiz veya tamamen hatasız çalışacağını garanti edemeyiz. Bakım, güncelleme, teknik sorunlar veya kontrolümüz dışında gerçekleşen durumlar nedeniyle siteye erişim geçici olarak kesilebilir.</p>',
        '<h2>14. Sorumluluk</h2>',
        '<p>CURAL., yürürlükteki mevzuatın izin verdiği sınırlar içerisinde hizmetlerini sunar. Bu Kullanım Koşulları\'nın hiçbir hükmü, tüketicinin kanundan doğan ve sözleşmeyle kaldırılamayan haklarını ortadan kaldıracak şekilde yorumlanamaz.</p>',
        '<h2>15. Koşulların Bir Bölümü Geçersiz Olursa</h2>',
        '<p>Bu Kullanım Koşulları\'nın herhangi bir hükmünün geçersiz veya uygulanamaz olduğunun belirlenmesi, diğer hükümlerin geçerliliğini mümkün olduğu ölçüde etkilemez.</p>',
        '<h2>16. Uygulanacak Hukuk</h2>',
        '<p>Bu Kullanım Koşulları ve CURAL. üzerinden gerçekleştirilen işlemler, uygulanabilir olduğu ölçüde Türkiye Cumhuriyeti hukukuna tabidir. Tüketicilerin yürürlükteki mevzuattan kaynaklanan Tüketici Hakem Heyeti, Tüketici Mahkemesi ve diğer yetkili mercilere başvuru hakları saklıdır.</p>',
        '<h2>17. Kullanım Koşullarında Değişiklik</h2>',
        '<p>CURAL. geliştikçe bu koşullar da değişebilir. Yeni özellikler eklediğimizde, çalışma şeklimiz değiştiğinde veya hukuki gereklilikler nedeniyle gerekli olduğunda Kullanım Koşulları\'nı güncelleyebiliriz. Güncel versiyon her zaman bu sayfada yayınlanır.</p>',
        '<h2>18. İletişim</h2>',
        '<p>Bu Kullanım Koşulları, siparişin veya CURAL. hakkında bir sorun varsa bize ulaşabilirsin.</p>',
        '<p>CURAL.<br>E-posta: <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>'
      ].join("")
    },
    iade: {
      title: "İade ve Cayma Politikası",
      updated: "9 Ağustos 2026",
      body: [
        '<p>Her CURAL. ürünü sınırlı sayıda ve özenle hazırlanır. Sipariş vermeden önce ürün açıklamalarını, ölçüleri ve varsa beden bilgilerini kontrol etmeni öneriyoruz.</p>',
        '<h2>14 Günlük Cayma Hakkı</h2>',
        '<p>Türkiye\'deki mesafeli satış mevzuatı kapsamında, internet üzerinden verdiğin siparişlerde ürünü teslim aldığın tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilirsin.</p>',
        '<p>Cayma hakkını kullanmak için 14 günlük süre içerisinde bize açık bir bildirim göndermen yeterlidir.</p>',
        '<p>E-posta: <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>',
        '<p>Talebini aldıktan sonra iade sürecine ilişkin gerekli bilgileri sana iletiriz. Önceden cayma/iade bildirimi yapılmadan gönderilen ürünlerin süreçlerinin sağlıklı yürütülebilmesi için öncelikle bizimle iletişime geçmeni rica ederiz.</p>',
        '<h2>Ürünün Durumu</h2>',
        '<p>Cayma süresi içerisinde ürünü yalnızca niteliğini, özelliklerini ve işleyişini anlamak için gerekli olduğu ölçüde incelemeni öneriyoruz.</p>',
        '<p>Ürünün kullanımı nedeniyle meydana gelen ve mevzuat kapsamında tüketicinin sorumluluğunda bulunan değer kayıpları bakımından yasal haklarımız saklıdır. Ancak tüketicinin ürünü cayma süresi içerisinde işleyişine, teknik özelliklerine ve kullanım talimatlarına uygun şekilde kullanması halinde meydana gelen değişiklik ve bozulmalardan sorumlu tutulamayacağına ilişkin mevzuat hükümleri saklıdır.</p>',
        '<h2>Cayma Hakkının Bulunmadığı Ürünler</h2>',
        '<p>Mevzuatta belirtilen istisnaların bulunduğu ürünlerde cayma hakkı kullanılamaz. Bunlara özellikle; müşterinin isteği veya kişisel ihtiyaçları doğrultusunda özel olarak hazırlanan ya da kişiselleştirilen ürünler ile tesliminden sonra ambalaj, bant, mühür veya benzeri koruyucu unsurları açılmış olması nedeniyle iadesi sağlık ve hijyen açısından uygun olmayan ürünler dahildir.</p>',
        '<p>Bir ürünün bu kapsamda olması halinde ilgili ürün sayfasında ayrıca bilgi verilebilir.</p>',
        '<h2>Hasarlı veya Yanlış Ürün</h2>',
        '<p>Siparişini teslim aldığında kontrol etmeni öneriyoruz. Ürün hasarlı veya ayıplı geldiyse ya da sipariş ettiğinden farklı bir ürün gönderildiyse <a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a> adresinden bizimle iletişime geç.</p>',
        '<p>Mümkünse sipariş numaranı ve sorunu gösteren fotoğrafları da gönder. Durumu inceleyip yasal yükümlülüklerimiz doğrultusunda çözüm sağlayacağız.</p>',
        '<p>Bu durumlar normal cayma hakkından farklıdır; ayıplı mala ilişkin tüketici hakları ayrıca devam eder.</p>',
        '<h2>Değişim</h2>',
        '<p>CURAL. genel olarak doğrudan ürün değişimi sunmak zorunda değildir. Başka bir beden, renk veya ürün istiyorsan mevcut siparişin için geçerli cayma/iade sürecini kullanabilir ve istediğin ürün için stok bulunması halinde yeni bir sipariş oluşturabilirsin.</p>',
        '<p>Ayıplı veya yanlış gönderilen ürünlere ilişkin yasal hakların saklıdır.</p>',
        '<h2>İade Kargo Ücreti</h2>',
        '<p>Cayma hakkı kapsamında iade kargo masrafının hangi tarafa ait olacağı, sipariş öncesinde yapılan bilgilendirme ve yürürlükteki mevzuat doğrultusunda belirlenir.</p>',
        '<p>Tüketiciye teslim edilen ürünün ayıplı olması halinde tüketici iade masrafından sorumlu tutulamaz.</p>',
        '<h2>Para İadesi</h2>',
        '<p>Cayma bildiriminin tarafımıza ulaşmasının ardından, mevzuatta öngörülen süre içerisinde iade edilmesi gereken ödemeler gerçekleştirilir. Mesafeli satışlarda satıcı, cayma bildiriminin kendisine ulaşmasından itibaren 14 gün içerisinde tüketicinin ödemiş olduğu bedeli iade etmekle yükümlüdür.</p>',
        '<p>İade, mevzuatta aksi gerekmediği sürece satın alma sırasında kullanılan ödeme yöntemine uygun şekilde gerçekleştirilir. Bankanın veya ödeme kuruluşunun işlemi hesabına yansıtma süresi CURAL.\'ın gerçekleştirdiği iade işleminden sonra ayrıca değişiklik gösterebilir.</p>',
        '<h2>Bize Ulaş</h2>',
        '<p>İade, cayma hakkı, hasarlı ürün veya siparişinle ilgili başka bir sorun için:</p>',
        '<p>CURAL.<br><a href="mailto:cural@outlook.com.tr">cural@outlook.com.tr</a></p>'
      ].join("")
    }
  };
  var LEGAL_ROUTES = { "/kvkk": "kvkk", "/gizlilik-politikasi": "gizlilik", "/kullanim-kosullari": "kosullar", "/iade-politikasi": "iade" };

  function legalFooterLinks() {
    return '<a href="/kvkk">KVKK</a><a href="/gizlilik-politikasi">Gizlilik Politikası</a>' +
      '<a href="/kullanim-kosullari">Kullanım Koşulları</a><a href="/iade-politikasi">İade Politikası</a>';
  }
  function FOOT() {
    return (
      '<footer class="cu-foot">' +
        '<div class="cu-foot-row"><span>CURAL. &copy; 2026</span>' +
          '<a href="' + CONFIG.IG + '" target="_blank" rel="noopener">@curalco</a>' +
          '<a href="mailto:' + CONFIG.MAIL + '">' + CONFIG.MAIL + '</a></div>' +
        '<div class="cu-foot-legal">' + legalFooterLinks() + '</div>' +
      '</footer>'
    );
  }

  /* ---------- SAYFALAR ---------- */
  function gateHTML() {
    return (
      '<div class="cu-main">' +
        '<div class="cu-rise" style="margin-bottom:40px">' + logoSVG("min(220px,56vw)") + '</div>' +
        '<div class="cu-su-t cu-rise">Sign Up</div>' +
        '<div class="cu-su-s cu-rise">Erken erişim, özel ürünler,<br>kodlar ve daha fazlasını elde edin</div>' +
        '<form class="cu-join cu-rise" id="cuJoin">' +
          '<input type="email" placeholder="email adresin" required>' +
          '<button type="submit">Join</button>' +
        '</form>' +
        '<div class="cu-div"></div>' +
        '<button class="cu-pwt" id="cuPwt">Şifreyi biliyorum</button>' +
        '<div class="cu-pwbox" id="cuPwbox">' +
          '<form class="cu-pwrow" id="cuPwform">' +
            '<input type="password" id="cuPwin" placeholder="* * * * * * *" autocomplete="off">' +
            '<button type="submit">Gir</button>' +
          '</form>' +
          '<div class="cu-pwmsg" id="cuPwmsg"></div>' +
        '</div>' +
      '</div>' + FOOT()
    );
  }

  // Ana sayfa: figur sahnesi (hover fizigi + el cizimi kontur) + marquee
  function homeHTML() {
    return (
      '<div class="cu-home">' +
        '<div class="cu-home-top cu-rise">' + logoSVG("min(220px,50vw)") + '</div>' +
        '<div class="cu-stage">' +
          '<div class="cu-figures">' +
            '<a href="/about" class="cu-fig cu-fig--blue">' +
              '<svg class="cu-outline cu-outline--blue" viewBox="0 0 100 100" preserveAspectRatio="none">' +
                '<path fill="none" stroke="#2f5fa7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<img src="' + IMGBASE + 'home/boris.webp" alt="BORİS. — Hakkında">' +
            '</a>' +
            '<a href="/stone-market" class="cu-fig cu-fig--orange">' +
              '<svg class="cu-outline cu-outline--orange" viewBox="0 0 100 100" preserveAspectRatio="none">' +
                '<path fill="none" stroke="#ef3b0a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<img src="' + IMGBASE + 'home/burna.webp" alt="BURNA. — Stone Market">' +
            '</a>' +
            '<div class="cu-fig cu-fig--black" id="cuCakmak">' +
              '<svg class="cu-outline cu-outline--black" viewBox="0 0 100 100" preserveAspectRatio="none">' +
                '<path fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<img src="' + IMGBASE + 'home/cakmak.webp" alt="ÇAKMAK">' +
              '<div class="cu-tape-layer" id="cuTapeLayer"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="cu-marquee"><div class="cu-marquee-track" id="cuMarqueeTrack"></div></div>' +
      '</div>' + FOOT()
    );
  }

  function aboutHTML() {
    return (
      '<div class="cu-about-wrap">' +
        '<div class="cu-chat">' +
          '<div class="cu-chat-bar">' +
            '<a href="/" class="cu-dot-link" title="Ana sayfa" aria-label="Ana sayfa"><span class="cu-dot red"></span></a>' +
            '<span class="cu-dot yellow"></span><span class="cu-dot green"></span>' +
            '<span>CURAL. — chat</span>' +
          '</div>' +
          '<div class="cu-chat-body" id="cuChatBody"></div>' +
          '<div class="cu-chat-foot">' +
            '<input type="text" id="cuChatIn" placeholder="yaz bakalım...">' +
            '<button id="cuChatSend" aria-label="Gönder">&#8594;</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // Urunler — Ikas gercek slug + og:image + fiyat (canli veriler — DEGISMEDI)
  var IMG = "https://cdn.myikas.com/images/c11c9e86-3ee0-4921-9b23-0440efa35815/";
  var PRODUCTS = [
    { coll: "stone", url: "/boris",             nm: "BORİS.", ty: "Taş tozu figür — 50 adet", pr: "3.000 TL", st: "Stokta", sold: false,
      total: 50, special: 5, soldCount: 0, size: "25 CM",
      img: IMG + "fb562a81-d46b-419c-8d41-0597a58d067c/720/chatgpt-image-14-tem-2026-20-37-56.webp" },
    { coll: "stone", url: "/burna",             nm: "BURNA.", ty: "Tütsülük — 50 adet",        pr: "3.000 TL", st: "Stokta", sold: false,
      total: 50, special: 5, soldCount: 0, size: "25 CM",
      img: IMG + "d3b61a8a-787e-4e21-b4dc-e1b5f8571453/720/chatgpt-image-14-tem-2026-20-43-56.webp" },
    { coll: "flame", url: "/boris-pocket-idol", nm: "Çakmak", ty: "BORİS. Pocket Idol",        pr: "150 TL",   st: "Stokta", sold: false,
      total: null, special: 0,
      img: IMG + "9d914837-db93-4790-a639-e06479e932a1/720/chatgpt-image-12-haz-2026-04-51-32.jpg" }
  ];

  function currentProduct() {
    var bare = (location.pathname || "").toLowerCase().replace(/\/$/, "");
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].url === bare) return PRODUCTS[i]; }
    return null;
  }

  var OG_CACHE_TTL = 3600000;
  function ogImageCacheGet(url) {
    try {
      var raw = localStorage.getItem("cural_og_" + url);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (Date.now() - o.t > OG_CACHE_TTL) return null;
      return o.img;
    } catch (e) { return null; }
  }
  function ogImageCacheSet(url, img) {
    try { localStorage.setItem("cural_og_" + url, JSON.stringify({ img: img, t: Date.now() })); } catch (e) {}
  }
  function fetchOgImage(url, cb) {
    var cached = ogImageCacheGet(url);
    if (cached) { cb(cached); return; }
    fetch(url).then(function (r) { return r.text(); }).then(function (html) {
      var m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
              html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (m && m[1]) { ogImageCacheSet(url, m[1]); cb(m[1]); }
    }).catch(function () {});
  }
  function refreshProductImages(root) {
    var els = root.querySelectorAll(".cu-ph[data-purl]");
    for (var i = 0; i < els.length; i++) {
      (function (el) {
        var purl = el.getAttribute("data-purl");
        fetchOgImage(purl, function (imgUrl) {
          var img = el.querySelector("img");
          if (!img) {
            img = document.createElement("img");
            img.alt = el.getAttribute("data-nm") || "";
            img.loading = "eager";
            var span = el.querySelector("span");
            if (span) span.remove();
            el.insertBefore(img, el.firstChild);
          }
          if (img.src !== imgUrl) img.src = imgUrl;
        });
      })(els[i]);
    }
  }

  function storeHTML(coll) {
    var list = PRODUCTS.filter(function (p) { return p.coll === coll; });
    var title = coll === "flame" ? "Flame Market" : "Stone Market";
    var cards = list.map(function (p) {
      return (
        '<a class="cu-card" href="' + p.url + '">' +
          '<div class="cu-ph' + (p.sold ? " sold" : "") + '" data-purl="' + p.url + '" data-nm="' + p.nm + '">' +
            (p.img ? '<img src="' + p.img + '" alt="' + p.nm + '" loading="eager" fetchpriority="high">' : '<span>' + p.nm + '</span>') +
          '</div>' +
          '<div class="cu-meta"><div class="nm">' + p.nm + '</div>' +
          '<div class="ty">' + p.ty + '</div>' +
          '<div class="rw"><span class="pr">' + p.pr + '</span>' +
          '<span class="st">' + (p.sold ? "Sold out" : p.st) + '</span></div></div>' +
        '</a>'
      );
    }).join("");
    return (
      '<div class="cu-top"><a href="/">' + logoSVG("140px") + '</a>' +
        '<a class="cu-cart" href="/cart">Sepet <span class="cu-cart-badge">0</span></a>' +
      '</div>' +
      '<div class="cu-coll-wrap"><div class="cu-coll"><h1>' + title + '</h1><span>Drop 001 — ' + list.length + ' parça</span></div></div>' +
      '<div class="cu-store">' +
        '<nav class="cu-side">' +
          '<a href="/">Home</a>' +
          '<a href="/stone-market"' + (coll === "stone" ? ' class="active"' : '') + '>Stone Market</a>' +
          '<a href="/flame-store"' + (coll === "flame" ? ' class="active"' : '') + '>Flame Market</a>' +
          '<a href="/contact">Contact</a>' +
        '</nav>' +
        '<div class="cu-grid">' + cards + '</div>' +
      '</div>' + FOOT()
    );
  }

  function contactHTML() {
    return (
      '<div class="cu-top"><a href="/">' + logoSVG("140px") + '</a>' +
        '<a class="cu-cart" href="/cart">Sepet <span class="cu-cart-badge">0</span></a>' +
      '</div>' +
      '<div class="cu-coll-wrap"><div class="cu-coll"><h1>Contact</h1><span>Yanıt için 3-5 iş günü</span></div></div>' +
      '<div class="cu-store">' +
        '<nav class="cu-side">' +
          '<a href="/">Home</a>' +
          '<a href="/stone-market">Stone Market</a>' +
          '<a href="/flame-store">Flame Market</a>' +
          '<a href="/contact" class="active">Contact</a>' +
        '</nav>' +
        '<div class="cu-form-wrap">' +
          '<form id="cuContactForm">' +
            '<div class="cu-form-row">' +
              '<div class="cu-field"><input type="text" name="FIRSTNAME" placeholder="Ad" required></div>' +
              '<div class="cu-field"><input type="text" name="LASTNAME" placeholder="Soyad"></div>' +
            '</div>' +
            '<div class="cu-form-row">' +
              '<div class="cu-field"><input type="email" name="EMAIL" placeholder="Email" required></div>' +
              '<div class="cu-field"><input type="text" name="ORDERNUM" placeholder="Sipariş No (varsa)"></div>' +
            '</div>' +
            '<div class="cu-form-row full">' +
              '<div class="cu-field"><input type="text" name="SUBJECT" placeholder="Konu" required></div>' +
            '</div>' +
            '<div class="cu-form-row full">' +
              '<div class="cu-field"><textarea name="MESSAGE" placeholder="Mesaj" required></textarea></div>' +
            '</div>' +
            '<div class="cu-form-actions">' +
              '<a class="cu-btn ghost" href="/">Ana Sayfa</a>' +
              '<button class="cu-btn" type="submit">Gönder</button>' +
            '</div>' +
            '<div class="cu-form-msg" id="cuContactMsg"></div>' +
          '</form>' +
        '</div>' +
      '</div>' + FOOT()
    );
  }

  function legalHTML(key) {
    var d = LEGAL[key];
    if (!d) return "";
    return (
      '<div class="cu-top"><a href="/">' + logoSVG("140px") + '</a>' +
        '<a class="cu-cart" href="/cart">Sepet <span class="cu-cart-badge">0</span></a>' +
      '</div>' +
      '<div class="cu-legal-wrap"><div class="cu-legal">' +
        '<h1>' + d.title + '</h1><div class="upd">Son güncelleme: ' + d.updated + '</div>' +
        d.body +
      '</div></div>' + FOOT()
    );
  }

  /* ---------- SAYFA TESPITI ---------- */
  function detectPage() {
    if (window.CURAL_PAGE) return window.CURAL_PAGE;
    var p = (location.pathname || "").toLowerCase();
    var bare = p.replace(/\/$/, "");
    if (LEGAL_ROUTES[bare]) return "legal:" + LEGAL_ROUTES[bare];
    if (/^\/(stone-market|flame-store)\/?$/.test(p)) return "store";
    if (p === "" || p === "/") return "home";
    if (p === "/about" || p === "/pages/about" || p === "/hakkinda") return "about";
    if (p === "/contact" || p === "/pages/contact") return "contact";
    if (p === "/cart") return "cart";
    if (p === "/checkout" || /^\/checkout\//.test(p)) return "checkout";
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].url === bare) return "product"; }
    if (document.querySelector(".product-detail-page-slider, .product-name, .add-to-cart")) return "product";
    return null;
  }

  /* ---------- DAVRANIS: gate/contact — DEGISMEDI ---------- */
  function wireGate(root) {
    var join = root.querySelector("#cuJoin");
    if (join) join.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = join.querySelector("input").value.trim();
      var btn = join.querySelector("button");
      if (!email) return;
      if (CONFIG.BREVO_ACTION && CONFIG.BREVO_ACTION.indexOf("http") === 0) {
        var fd = new FormData();
        fd.append("EMAIL", email);
        fd.append("email_address_check", "");
        fd.append("locale", "tr");
        fetch(CONFIG.BREVO_ACTION, { method: "POST", mode: "no-cors", body: fd }).catch(function () {});
      }
      join.querySelector("input").value = "";
      btn.textContent = "Tamam";
      setTimeout(function () { btn.textContent = "Join"; }, 3000);
    });

    var pwt = root.querySelector("#cuPwt");
    var box = root.querySelector("#cuPwbox");
    if (pwt && box) pwt.addEventListener("click", function () {
      box.classList.toggle("open");
      var i = root.querySelector("#cuPwin"); if (i) i.focus();
    });

    var pwf = root.querySelector("#cuPwform");
    if (pwf) pwf.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = root.querySelector("#cuPwin").value.trim();
      var m = root.querySelector("#cuPwmsg");
      if (v === CONFIG.PASSWORD) {
        m.className = "cu-pwmsg ok"; m.textContent = "Açıldı.";
        unlock();
        setTimeout(function () { location.href = "/"; }, 500);
      } else {
        m.className = "cu-pwmsg err"; m.textContent = "Yanlış şifre.";
      }
    });
  }

  function wireContact(root) {
    var f = root.querySelector("#cuContactForm");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(f);
      var first = (fd.get("FIRSTNAME") || "").trim();
      var last = (fd.get("LASTNAME") || "").trim();
      var email = (fd.get("EMAIL") || "").trim();
      var order = (fd.get("ORDERNUM") || "").trim();
      var subject = (fd.get("SUBJECT") || "").trim();
      var message = (fd.get("MESSAGE") || "").trim();
      if (!first || !email || !subject || !message) return;

      if (CONFIG.CONTACT_BREVO_ACTION) {
        var bfd = new FormData();
        bfd.append("EMAIL", email);
        bfd.append("email_address_check", "");
        bfd.append("locale", "tr");
        fetch(CONFIG.CONTACT_BREVO_ACTION, { method: "POST", mode: "no-cors", body: bfd }).catch(function () {});
      }

      var body = "Ad Soyad: " + first + " " + last + "\n" +
        "Email: " + email + "\n" +
        (order ? "Sipariş No: " + order + "\n" : "") +
        "\n" + message;
      var mailto = "mailto:" + CONFIG.CONTACT_MAIL +
        "?subject=" + encodeURIComponent("[CURAL Iletisim] " + subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = mailto;

      var msg = root.querySelector("#cuContactMsg");
      if (msg) msg.textContent = "Mail uygulaman açıldı. Göndermek için onayla.";
    });
  }

  /* ---------- DAVRANIS: ana sayfa (marquee + kapali bandi sakasi) ---------- */
  var MARQUEE_ITEMS = ["CURAL.", "@curalco", "CURAL.", "STONE MARKET", "CURAL.", "FLAME MARKET"];
  function wireHome(root) {
    var track = root.querySelector("#cuMarqueeTrack");
    if (track) {
      var html = "";
      for (var pass = 0; pass < 2; pass++) {
        for (var i = 0; i < MARQUEE_ITEMS.length; i++) {
          html += '<span>' + (MARQUEE_ITEMS[i] === "@curalco" ? IG_SVG : "") + MARQUEE_ITEMS[i] + '</span>';
        }
      }
      track.innerHTML = html;
    }

    var fig = root.querySelector("#cuCakmak");
    var layer = root.querySelector("#cuTapeLayer");
    if (!fig || !layer) return;
    var MAX_STRIPS = 5, REMOVE_DELAY_MS = 2200, REMOVE_STAGGER_MS = 260;
    var count = 0, busy = false;
    fig.addEventListener("click", function () {
      if (busy || count >= MAX_STRIPS) return;
      count++;
      var strip = document.createElement("div");
      strip.className = "cu-tape";
      var rotate = (Math.random() * 50 - 25).toFixed(1);
      var offsetY = (Math.random() * 60 - 30).toFixed(0);
      strip.style.setProperty("--rot", rotate + "deg");
      strip.style.top = "calc(50% + " + offsetY + "px)";
      if (count === MAX_STRIPS) {
        var label = document.createElement("span");
        label.className = "cu-tape-label";
        label.textContent = "KAPALI";
        strip.appendChild(label);
      }
      layer.appendChild(strip);
      requestAnimationFrame(function () { strip.classList.add("cu-tape--in"); });
      if (count >= MAX_STRIPS) {
        busy = true;
        setTimeout(removeStripsOneByOne, REMOVE_DELAY_MS);
      }
    });
    function removeStripsOneByOne() {
      var strips = Array.prototype.slice.call(layer.children);
      var i = strips.length - 1;
      function removeNext() {
        if (i < 0) { count = 0; busy = false; return; }
        var strip = strips[i];
        strip.classList.remove("cu-tape--in");
        strip.classList.add("cu-tape--out");
        setTimeout(function () { strip.remove(); }, 220);
        i--;
        setTimeout(removeNext, REMOVE_STAGGER_MS);
      }
      removeNext();
    }
  }

  /* ---------- DAVRANIS: about (sahte AI sohbet) ---------- */
  var CHAT_INTRO = [
    { who: "user", text: "cural ne aq" },
    { who: "bot", text: "Animasyonlar, tablolar, heykeller, kıyafetler, aksesuarlar. emir / CURAL., gerçekten içinde yaşamak isteyeceğin bir dünya kuruyor. Düzce merkezli sanatçı, hikâye anlatımına ve animasyona olan tutkusunu izleyebileceğin, giyebileceğin ve bir parçası olabileceğin bir şeye dönüştürüyor." }
  ];
  var CHAT_GREETINGS = ["merhaba", "selam", "naber", "nabersin", "nasılsın", "nasilsin", "nasılsınız", "nasilsiniz", "iyi misin", "napıyorsun", "napiyorsun"];
  var CHAT_GREETING_REPLY = "iyi ben sen";
  var CHAT_ONE_WORD_REPLY = "sana tek kelimeyle cevap veriyormuşum gibi mi görünüyorum aq?";
  var CHAT_RANDOM_REPLIES = [
    "ben onu bunu bilmem, emir / CURAL. çok iyi işler yapıyo.",
    "sen hala sipariş oluşturmadın mı?",
    "sevgi nerde destek nerde aq? hadi alışveriş tosunum."
  ];
  function wireAbout(root) {
    var body = root.querySelector("#cuChatBody");
    var input = root.querySelector("#cuChatIn");
    var send = root.querySelector("#cuChatSend");
    if (!body) return;

    function scrollBottom() { body.scrollTop = body.scrollHeight; }
    function typeMessage(msg, done) {
      var el = document.createElement("div");
      el.className = "cu-msg " + msg.who;
      el.innerHTML = '<div class="who">' + (msg.who === "user" ? "SEN" : "CURAL.") + '</div>' +
        '<div class="bubble"><span class="typed"></span><span class="cu-blink"></span></div>';
      body.appendChild(el);
      var typedEl = el.querySelector(".typed");
      var i = 0;
      function step() {
        if (i <= msg.text.length) {
          typedEl.textContent = msg.text.slice(0, i);
          scrollBottom();
          i++;
          setTimeout(step, msg.who === "user" ? 55 : 22);
        } else {
          var blink = el.querySelector(".cu-blink");
          if (blink) blink.remove();
          done();
        }
      }
      step();
    }
    function playSequence(index) {
      if (index >= CHAT_INTRO.length) return;
      typeMessage(CHAT_INTRO[index], function () {
        setTimeout(function () { playSequence(index + 1); }, 500);
      });
    }
    playSequence(0);

    function pickReply(raw) {
      var norm = raw.trim().toLocaleLowerCase("tr").replace(/[?!.,]/g, "");
      if (CHAT_GREETINGS.indexOf(norm) > -1) return CHAT_GREETING_REPLY;
      var words = norm.split(/\s+/).filter(Boolean);
      if (words.length === 1) return CHAT_ONE_WORD_REPLY;
      return CHAT_RANDOM_REPLIES[Math.floor(Math.random() * CHAT_RANDOM_REPLIES.length)];
    }
    function sendUserMessage() {
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      typeMessage({ who: "user", text: text }, function () {
        setTimeout(function () {
          typeMessage({ who: "bot", text: pickReply(text) }, function () {});
        }, 400);
      });
    }
    if (input) input.addEventListener("keydown", function (e) { if (e.key === "Enter") sendUserMessage(); });
    if (send) send.addEventListener("click", sendUserMessage);
  }

  /* ---------- MONTAJ ---------- */
  function injectCSS() {
    if (document.getElementById("cural-style")) return;
    var st = document.createElement("style");
    st.id = "cural-style";
    st.textContent = CSS + SKIN_CSS;
    document.head.appendChild(st);
  }

  function cleanup() {
    var r = document.getElementById("cural-root");
    if (r) r.parentNode.removeChild(r);
    var t = document.getElementById("cural-skintop");
    if (t) t.parentNode.removeChild(t);
    document.documentElement.classList.remove("cural-skin");
    document.documentElement.style.overflow = "";
  }

  function injectSkinTop() {
    var bar = document.createElement("div");
    bar.id = "cural-skintop";
    bar.className = "cu-skintop";
    bar.innerHTML = '<a href="/">' + logoSVG("110px") + '</a><a class="cu-cart" href="/cart">Sepet <span class="cu-cart-badge">0</span></a>';
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ---------- STOK SAYACI + OZEL ROZET (urun sayfasi) — DEGISMEDI ---------- */
  function removeStockBadges() {
    var old = document.querySelectorAll(".cu-stock-badge, .cu-special-badge, .cu-size-label");
    for (var i = 0; i < old.length; i++) if (old[i].parentNode) old[i].parentNode.removeChild(old[i]);
  }
  function injectSizeLabel(p) {
    if (!p || !p.size) return;
    var nameEl = document.querySelector(".product-name");
    if (!nameEl || !nameEl.parentNode) return;
    var el = document.createElement("div");
    el.className = "cu-size-label";
    el.style.cssText = "margin-top:6px;font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#0a0a0a!important;";
    el.textContent = p.size;
    nameEl.parentNode.insertBefore(el, nameEl.nextSibling);
  }
  function injectStockBadge() {
    removeStockBadges();
    var p = currentProduct();
    injectSizeLabel(p);
    if (!p || !p.total) return;
    var anchor = document.querySelector(".product-detail-page-buy-box") || document.querySelector(".add-to-cart");
    if (!anchor || !anchor.parentNode) return;
    var sold = Math.max(0, Math.min(p.total, p.soldCount || 0));
    var remaining = p.total - sold;
    if (p.special > 0 && remaining > 0) {
      var badge = document.createElement("div");
      badge.className = "cu-special-badge";
      badge.style.cssText = "width:100%;box-sizing:border-box;margin:18px 0 0;padding-top:10px;border-top:1px solid #0a0a0a;" +
        "font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.06em;line-height:1.5;color:#0a0a0a!important;text-transform:uppercase;";
      badge.textContent = p.special + " TANESİ AYRI DÖKÜLDÜ. BİRİ SENDE OLABİLİR.";
      anchor.parentNode.insertBefore(badge, anchor.nextSibling);
    }
  }

  /* ---------- 360 SPIN VIEWER (BORİS. + BURNA., 36 kare, autoplay + surukle) ---------- */
  var SPIN_N = 36;
  var SPIN_PATHS = {
    "/boris": IMGBASE + "spin360/boris/frame_",
    "/burna": IMGBASE + "spin360/burna/frame_"
  };
  function injectSpin360(product) {
    if (document.getElementById("cu-360-viewer")) return;
    var framePath = SPIN_PATHS[product.url];
    if (!framePath) return;
    var slider = document.querySelector(".product-detail-page-slider");
    if (!slider || !slider.parentNode) return;

    slider.style.display = "none";

    var viewer = document.createElement("div");
    viewer.id = "cu-360-viewer";
    viewer.style.cssText = "width:100%;aspect-ratio:1/1;background:#fff;position:relative;" +
      "cursor:grab;user-select:none;touch-action:pan-y;overflow:hidden;";

    var badge = document.createElement("div");
    badge.style.cssText = "position:absolute;bottom:14px;right:14px;background:rgba(10,10,10,.82);" +
      "color:#fff;font-size:9px;letter-spacing:.2em;text-transform:uppercase;padding:7px 11px;" +
      "display:flex;align-items:center;gap:6px;pointer-events:none;z-index:2;font-family:var(--mono);";
    badge.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8">' +
      '<path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v8h8"/></svg>360°';
    viewer.appendChild(badge);

    var imgs = [];
    for (var i = 0; i < SPIN_N; i++) {
      var im = document.createElement("img");
      im.src = framePath + String(i).padStart(3, "0") + ".webp";
      im.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain;" +
        "pointer-events:none;-webkit-user-drag:none;opacity:0;";
      viewer.appendChild(im);
      imgs.push(im);
    }
    imgs[0].style.opacity = 1;
    slider.parentNode.insertBefore(viewer, slider);

    var current = 0, dragging = false, lastX = 0, PX_PER_FRAME = 8;
    var autoplayTimer = null, resumeTimer = null;
    var AUTOPLAY_MS = 70, RESUME_DELAY_MS = 1200;

    function show(i) {
      i = ((i % SPIN_N) + SPIN_N) % SPIN_N;
      if (i === current) return;
      imgs[current].style.opacity = 0;
      imgs[i].style.opacity = 1;
      current = i;
    }
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function () { show(current + 1); }, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    function scheduleResume() {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(startAutoplay, RESUME_DELAY_MS);
    }
    function onDown(x) {
      dragging = true; lastX = x; viewer.style.cursor = "grabbing";
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
    }
    function onMove(x) {
      if (!dragging) return;
      var dx = x - lastX;
      if (Math.abs(dx) >= PX_PER_FRAME) {
        show(current - Math.trunc(dx / PX_PER_FRAME));
        lastX = x;
      }
    }
    function onUp() {
      if (!dragging) return;
      dragging = false; viewer.style.cursor = "grab";
      scheduleResume();
    }

    viewer.addEventListener("mousedown", function (e) { onDown(e.clientX); e.preventDefault(); });
    window.addEventListener("mousemove", function (e) { onMove(e.clientX); });
    window.addEventListener("mouseup", onUp);
    viewer.addEventListener("touchstart", function (e) { onDown(e.touches[0].clientX); }, { passive: true });
    viewer.addEventListener("touchmove", function (e) { onMove(e.touches[0].clientX); }, { passive: true });
    viewer.addEventListener("touchend", onUp);

    startAutoplay();
  }
  function scheduleSpin360() {
    var p = currentProduct();
    if (!p || !SPIN_PATHS[p.url]) return;
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var target = document.querySelector(".product-detail-page-slider");
      if (target) { clearInterval(timer); injectSpin360(p); }
      else if (tries >= 25) clearInterval(timer);
    }, 200);
  }

  function scheduleStockBadge() {
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var target = document.querySelector(".product-detail-page-buy-box .add-to-cart, .add-to-cart") ||
        document.querySelector(".product-detail-page-buy-box");
      if (target || tries >= 25) {
        clearInterval(timer);
        injectStockBadge();
      }
    }, 200);
  }

  /* ---------- SEPET ROZETI + TOAST — DEGISMEDI ---------- */
  var CART_QTY_KEY = "cural_cart_qty";
  function computeCartQtyFromDOM() {
    var boxes = document.querySelectorAll(".quantity-box");
    if (boxes.length) {
      var total = 0;
      for (var i = 0; i < boxes.length; i++) {
        var m = (boxes[i].textContent || "").match(/(\d+)/);
        if (m) total += parseInt(m[1], 10);
      }
      return total;
    }
    if (document.querySelector(".empty-basket")) return 0;
    return null;
  }
  function syncCartBadge() {
    var n;
    var computed = computeCartQtyFromDOM();
    if (computed !== null) {
      n = String(computed);
      try { localStorage.setItem(CART_QTY_KEY, n); } catch (e) {}
    } else {
      try { n = localStorage.getItem(CART_QTY_KEY); } catch (e) { n = null; }
      if (n === null) {
        var el = document.querySelector(".basket-bag");
        n = el ? (el.textContent || "").trim() : "";
      }
    }
    var badges = document.querySelectorAll(".cu-cart-badge");
    for (var i = 0; i < badges.length; i++) badges[i].textContent = n || "0";
  }
  function showAddToCartToast() {
    var t = document.getElementById("cu-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "cu-toast";
      t.style.cssText = "position:fixed;left:50%;bottom:28px;z-index:1000000;" +
        "transform:translateX(-50%) translateY(16px);opacity:0;pointer-events:none;" +
        "background:#0a0a0a;color:#fff;font-family:'Courier New',ui-monospace,monospace;" +
        "font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;" +
        "padding:13px 24px;white-space:nowrap;transition:opacity .25s ease,transform .25s ease;";
      document.body.appendChild(t);
    }
    t.textContent = "Sepete eklendi.";
    requestAnimationFrame(function () {
      t.style.opacity = "1";
      t.style.transform = "translateX(-50%) translateY(0)";
    });
    clearTimeout(t._cuTimer);
    t._cuTimer = setTimeout(function () {
      t.style.opacity = "0";
      t.style.transform = "translateX(-50%) translateY(16px)";
    }, 1700);
    var badges = document.querySelectorAll(".cu-cart-badge");
    for (var i = 0; i < badges.length; i++) {
      (function (b) {
        b.style.transition = "transform .18s ease";
        b.style.transform = "scale(1.35)";
        setTimeout(function () { b.style.transform = "scale(1)"; }, 180);
      })(badges[i]);
    }
  }
  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest && e.target.closest(".add-to-cart");
    if (!btn) return;
    var cur = 0;
    try { cur = parseInt(localStorage.getItem(CART_QTY_KEY), 10) || 0; } catch (err) {}
    try { localStorage.setItem(CART_QTY_KEY, String(cur + 1)); } catch (err) {}
    scheduleCartBadgeSync();
    showAddToCartToast();
  }, true);
  var cartBadgeScheduled = false;
  function scheduleCartBadgeSync() {
    if (cartBadgeScheduled) return;
    cartBadgeScheduled = true;
    requestAnimationFrame(function () { cartBadgeScheduled = false; syncCartBadge(); });
  }

  function guardButtons(root) {
    var btns = root.querySelectorAll(".cu-join button, .cu-pwrow button, .cu-btn");
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        var ghost = btn.classList.contains("ghost");
        function apply() {
          btn.style.setProperty("background", ghost ? "transparent" : "#0a0a0a", "important");
          btn.style.setProperty("color", ghost ? "#0a0a0a" : "#fff", "important");
          btn.style.setProperty("border", ghost ? "1px solid #0a0a0a" : "none", "important");
          btn.style.setProperty("border-radius", "0", "important");
        }
        apply();
        var mo = new MutationObserver(function () {
          mo.disconnect();
          apply();
          mo.observe(btn, { attributes: true, attributeFilter: ["style"] });
        });
        mo.observe(btn, { attributes: true, attributeFilter: ["style"] });
      })(btns[i]);
    }
  }

  function render() {
    injectCSS();
    cleanup();
    var page = detectPage();
    if (!page) return;

    if (page === "product" || page === "cart" || page === "checkout") {
      document.documentElement.classList.add("cural-skin");
      if (page !== "checkout") injectSkinTop();
      scheduleCartBadgeSync();
      if (page === "product") { scheduleStockBadge(); scheduleSpin360(); }
      return;
    }

    var root = document.createElement("div");
    root.id = "cural-root";
    if (page === "gate") root.innerHTML = gateHTML();
    else if (page === "home") root.innerHTML = homeHTML();
    else if (page === "about") root.innerHTML = aboutHTML();
    else if (page === "store") {
      var coll = /flame-store/.test((location.pathname || "").toLowerCase()) ? "flame" : "stone";
      root.innerHTML = storeHTML(coll);
    }
    else if (page === "contact") root.innerHTML = contactHTML();
    else if (page.indexOf("legal:") === 0) root.innerHTML = legalHTML(page.slice(6));
    else root.innerHTML = homeHTML();

    document.body.appendChild(root);
    document.documentElement.style.overflow = "hidden";
    guardButtons(root);
    scheduleCartBadgeSync();

    if (page === "gate") wireGate(root);
    if (page === "home") wireHome(root);
    if (page === "about") wireAbout(root);
    if (page === "contact") wireContact(root);
    if (page === "store") refreshProductImages(root);
  }

  function hookSPA() {
    function wrap(name) {
      var orig = history[name];
      if (!orig || orig.__cural) return;
      var fn = function () {
        var ret = orig.apply(this, arguments);
        setTimeout(render, 40);
        return ret;
      };
      fn.__cural = true;
      history[name] = fn;
    }
    wrap("pushState");
    wrap("replaceState");
    window.addEventListener("popstate", function () { setTimeout(render, 40); });
  }

  function killLegacyGate() {
    var el = document.getElementById("co");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  function forcePaymentLinkWhite() {
    var els = document.querySelectorAll(".payment-link, .payment-link *");
    for (var i = 0; i < els.length; i++) els[i].style.setProperty("color", "#fff", "important");
  }
  function forceFixedBarWhite() {
    var leafs = document.querySelectorAll("body *");
    for (var i = 0; i < leafs.length; i++) {
      var el = leafs[i];
      if (el.children.length) continue;
      var txt = (el.textContent || "").trim().toUpperCase();
      if (!txt) continue;
      if (txt.indexOf("SEPETE GİT") === -1 && txt !== "TOPLAM" && txt.charAt(0) !== "₺") continue;
      var p = el, isFixed = false;
      while (p && p !== document.body) {
        if (getComputedStyle(p).position === "fixed") { isFixed = true; break; }
        p = p.parentElement;
      }
      if (isFixed) el.style.setProperty("color", "#fff", "important");
    }
  }
  function forceCouponButtonWhite() {
    var leafs = document.querySelectorAll("body *");
    for (var i = 0; i < leafs.length; i++) {
      var el = leafs[i];
      if (el.children.length) continue;
      if ((el.textContent || "").trim() !== "Uygula") continue;
      el.style.setProperty("color", "#fff", "important");
    }
  }
  function watchLegacyGate() {
    killLegacyGate();
    forcePaymentLinkWhite();
    forceFixedBarWhite();
    forceCouponButtonWhite();
    new MutationObserver(function () { killLegacyGate(); forcePaymentLinkWhite(); forceFixedBarWhite(); forceCouponButtonWhite(); })
      .observe(document.body, { childList: true, subtree: true });
  }

  function start() {
    hookSPA();
    render();
    watchLegacyGate();
    new MutationObserver(scheduleCartBadgeSync).observe(document.body, { childList: true, subtree: true, characterData: true });
    setInterval(syncCartBadge, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
