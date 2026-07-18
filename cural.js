/* ============================================================
   CURAL. — Ikas storefront arayuz loader
   Tek dosya: gate (bekletme/sifre) + home (ana sayfa) + store (magaza)
   Ikas Dosya Yoneticisi'ne yuklenir, Ikas Scriptler'den <script src> ile cagrilir.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- AYAR ---------- */
  var CONFIG = {
    // Ikas Dosya Yoneticisi'ne burna-web.mp4 yukleyince URL'i buraya yapistir:
    VIDEO_URL: "VIDEO_URL_BURAYA",
    PASSWORD: "BOR1S.DROP",
    UNLOCK_KEY: "cural_unlocked",
    IG: "https://www.instagram.com/curalco/",
    MAIL: "info@cural.co",
    CONTACT_MAIL: "cural@outlook.com.tr",
    // Brevo subscription form (CURAL Drop) serve endpoint -> Liste #2
    BREVO_ACTION: "https://c8f53a98.sibforms.com/serve/MUIFAFYxnOXl9WJjyn1Vi8UZkH-_XsyChyxguH97uTMjIUEDD5DsAVRhq6TMNZxEehiHyHFWATF9Jd9bcINX50ysXRTZYf8oq3aSQRZkITCqoifECitvk4NzO2AtwOCmL2Ps7frZBbdqYvgZi8J1amB6ewDoZ2D08B2PGxLwx4shGPk-lFeNOdL48ZLJp7qbtPrfSpm-2U3Fw6FOIA==",
    // Brevo subscription form (CURAL Iletisim) serve endpoint -> Liste #8 (sadece EMAIL kaydeder, mesaj mailto ile gider)
    CONTACT_BREVO_ACTION: "https://c8f53a98.sibforms.com/serve/MUIFAIdSG5Mn9RQnBZcjls-um8r24u0KA1tW3tp72hZTLS-F57XABQzMKidjuBHH5VxnWLq-2Js9pERmXhZG75VbQQGOkZe32B0Mqxs_2CITiLd9WlJblmnSQ6NLQD0Ry24ZHMkQ5ugFBBcrunD0dZKTIVCR2x4NYdtr0vkHJG5_i6oE8h1sSUcHSvmOPZxusKf2SrCn2mUycsdySg=="
  };

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

  /* ---------- CSS ---------- */
  var CSS =
    ':root{--ink:#0a0a0a;--paper:#fff;--dim:#9a9a9a;--line:#e8e8e8;--stone:#f3f2f0;--mono:"Courier New",ui-monospace,monospace}' +
    ':where(#cural-root *){margin:0;padding:0;box-sizing:border-box}' +
    '#cural-root{position:fixed;inset:0;z-index:999999;background:var(--paper);color:var(--ink);' +
    'font-family:var(--mono);-webkit-font-smoothing:antialiased;overflow-y:auto;display:flex;flex-direction:column;min-height:100%}' +
    '#cural-root a{color:inherit;text-decoration:none}' +
    '.cu-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 24px 60px}' +
    '.cu-logo{height:auto;display:block}' +
    '.cu-rise{animation:cuRise .9s cubic-bezier(.2,.7,.2,1) both}' +
    '@keyframes cuRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
    '@keyframes cuFade{from{opacity:0}to{opacity:1}}' +
    /* menu */
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
    /* store — Slawn duzeni: sol sidebar nav, kenarliksiz 4lu grid, isim/fiyat hover'da */
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
    '.cu-grid{flex:1;min-width:0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}' +
    '.cu-card{display:block;position:relative}' +
    '.cu-ph{aspect-ratio:4/5;background:var(--paper);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}' +
    '.cu-ph img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .5s ease,opacity .2s}' +
    '.cu-card:hover .cu-ph img{transform:scale(1.04)}' +
    '.cu-ph.sold img{opacity:.5}' +
    '.cu-ph.sold::before{content:"Sold out";position:absolute;top:10px;left:10px;background:var(--ink);color:var(--paper);font-size:9px;letter-spacing:.2em;text-transform:uppercase;padding:5px 9px;z-index:2}' +
    '.cu-ph span{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--dim);transition:opacity .2s}' +
    '.cu-meta{padding:10px 2px 0;display:flex;flex-direction:column;gap:4px;opacity:0;transform:translateY(-3px);transition:opacity .2s,transform .2s}' +
    '.cu-card:hover .cu-meta{opacity:1;transform:none}' +
    '.cu-meta .nm{font-size:12px;letter-spacing:.06em;font-weight:700}' +
    '.cu-meta .ty{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-meta .rw{display:flex;justify-content:space-between;align-items:baseline;margin-top:4px}' +
    '.cu-meta .pr{font-size:12px}.cu-meta .st{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}' +
    /* footer */
    '.cu-foot{border-top:1px solid var(--line);padding:22px 28px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}' +
    '.cu-foot span,.cu-foot a{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--dim)}' +
    '.cu-foot a:hover{color:var(--ink)}' +
    /* urun/sepet sayfalari icin ust bar (Ikas'in kendi header'i gizlenir, bu gecer) */
    '.cu-skintop{display:flex;flex-direction:column;align-items:center;gap:10px;padding:22px 24px 18px;background:#fff;position:relative;z-index:10000}' +
    '.cu-skintop a{text-decoration:none}' +
    /* contact formu */
    '.cu-form-wrap{flex:1;min-width:0;max-width:640px}' +
    '.cu-form-intro{font-size:11px;color:var(--dim);letter-spacing:.05em;line-height:1.8;margin-bottom:28px}' +
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
    '@media(max-width:760px){.cu-store{flex-direction:column;gap:24px}.cu-side{flex-direction:row;flex-wrap:wrap;width:100%;position:static;gap:14px 22px}.cu-grid{grid-template-columns:repeat(2,1fr)}}' +
    '@media(max-width:600px){.cu-menu{gap:12px;margin-bottom:42px}.cu-menu a{font-size:11px;letter-spacing:.24em}}' +
    '@media(max-width:460px){.cu-grid{grid-template-columns:1fr}.cu-foot{justify-content:center}}';

  /* ---------- URUN SAYFASI SKIN (Ikas DOM'u Slawn'a giydirir) ---------- */
  // Ikas OZY temasi container'lara INLINE siyah bg + beyaz yazi basiyor
  // (style="background-color: rgb(0, 0, 0)" / "#000000ff" / color:#ffffff).
  // Inline style sadece !important + attribute-selector ile ezilir.
  var SKIN_CSS =
    /* tum zemin beyaz: kok + ana sarmalayicilar + inline-siyah div'ler (sepet/shopping butonu haric) */
    'html.cural-skin,html.cural-skin body,html.cural-skin #__next,' +
    'html.cural-skin footer,html.cural-skin .product-detail-tabs-main,' +
    'html.cural-skin .product-detail-page-detail-box,html.cural-skin .slider-banner,' +
    'html.cural-skin [style*="background-color: rgb(0, 0, 0)"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *),' +
    'html.cural-skin [style*="background-color:#000000"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *),' +
    'html.cural-skin [style*="background:#000000"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *){' +
      'background:#fff!important;background-color:#fff!important}' +
    /* Ikas'in kendi ust menusu gizlenir — yerine cu-skintop (logo+Sepet) gecer */
    'html.cural-skin .header{display:none!important}' +
    /* tum yazi koyu (sepet/shopping butonu haric) — inline beyaz yazi dahil */
    'html.cural-skin,html.cural-skin *:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *):not([class*="QuantityCircle"]):not([class*="StepCircle"]):not([class*="StepCircle"] *):not([class*="TooltipContainer"]):not([class*="TooltipContainer"] *){color:#0a0a0a!important}' +
    'html.cural-skin [style*="color:#ffffff"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *),' +
    'html.cural-skin [style*="color: rgb(255, 255, 255)"]:not(.add-to-cart):not(.add-to-cart *):not(.shopping-button):not(.shopping-button *):not(.cu-cart-badge):not(.basket-checkout-btn):not(.basket-checkout-btn *),' +
    'html.cural-skin font[color="#ffffff"]{color:#0a0a0a!important}' +
    /* checkout: adet/adim rozetleri + tooltip ikonlari (?) siyah-uzerine-siyah oluyordu */
    'html.cural-skin [class*="QuantityCircle"],html.cural-skin [class*="StepCircle"],html.cural-skin [class*="StepCircle"] *,' +
    'html.cural-skin [class*="TooltipContainer"],html.cural-skin [class*="TooltipContainer"] *{color:#fff!important}' +
    /* mono basliklar */
    'html.cural-skin .product-name,html.cural-skin .product-name-main,' +
    'html.cural-skin .product-detail-page-detail-box,html.cural-skin .product-detail-tabs-main{' +
      'font-family:"Courier New",ui-monospace,monospace!important;letter-spacing:.04em!important}' +
    'html.cural-skin .product-name,html.cural-skin .product-name-main{text-transform:uppercase!important;font-weight:700!important}' +
    /* sepet/satin-al butonlari: siyah zemin beyaz yazi (Slawn) */
    'html.cural-skin .add-to-cart,html.cural-skin .add-to-cart *,' +
    'html.cural-skin .shopping-button,html.cural-skin .shopping-button *{' +
      'background:#0a0a0a!important;background-color:#0a0a0a!important;color:#fff!important;border:none!important;border-radius:0!important;' +
      'letter-spacing:.22em!important;text-transform:uppercase!important;font-family:"Courier New",ui-monospace,monospace!important}' +
    'html.cural-skin .add-to-cart,html.cural-skin .shopping-button{transition:opacity .2s!important}' +
    'html.cural-skin .add-to-cart:hover,html.cural-skin .shopping-button:hover{opacity:.78!important}' +
    /* urun sayfasi butonu Slawn'daki gibi kompakt (tam genislik degil) */
    'html.cural-skin .product-detail-page-buy-box{margin-top:16px!important;align-items:flex-start!important}' +
    'html.cural-skin .product-detail-page-buy-box .add-to-cart{flex:none!important;width:auto!important;padding:14px 40px!important}' +
    /* favori/kalp ikonu ve hizli-odeme (Shop Pay) iframe'i gizlenir — Slawn referansinda yok, marka b/w minimal'ine uymuyor */
    'html.cural-skin .add-favorite-basket{display:none!important}' +
    'html.cural-skin .product-detail-page-detail-box iframe{display:none!important}' +
    /* sepet rozeti + odemeye gec butonu: global koyu-yazi kurali yuzunden siyah-uzerine-siyah oluyordu, acikca duzeltilir */
    'html.cural-skin .cu-cart-badge{color:#fff!important;background:#0a0a0a!important}' +
    'html.cural-skin .basket-checkout-btn,html.cural-skin .basket-checkout-btn *{color:#fff!important}' +
    /* bos sepet: buyuk gri sepet ikonu kaldirilir — Slawn referansinda sade metin var, ikon yok */
    'html.cural-skin .empty-basket svg{display:none!important}' +
    /* urun sayfasi breadcrumb'i (Stone Market > ...) kaldirilir — Slawn referansinda yok, gereksiz gurultu */
    'html.cural-skin .breadcrumbs{display:none!important}' +
    /* skintop (logo+Sepet) ile icerik arasi Slawn'daki gibi ferah bosluk birakilir */
    'html.cural-skin .cu-skintop{padding-bottom:56px!important}' +
    /* footer ince ayrac */
    'html.cural-skin footer{border-top:1px solid #e8e8e8!important}' +
    /* gercek Ikas checkout akisi (/checkout) JS ile inline --checkout-* degiskenlerini kendi ayarlariyla basar; */
    /* !important stylesheet kurali non-important inline'i ezer, boylece marka renkleri (siyah/beyaz) korunur */
    ':root{--checkout-button-bg-color:#0a0a0a!important;--checkout-button-text-color:#fff!important;' +
    '--checkout-secondary-button-bg-color:#fff!important;--checkout-secondary-button-text-color:#0a0a0a!important;' +
    '--checkout-secondary-button-border-color:#0a0a0a!important;--checkout-primary-bg-color:#fff!important;' +
    '--checkout-primary-text-color:#0a0a0a!important;--checkout-secondary-bg-color:#fff!important;' +
    '--checkout-secondary-text-color:#0a0a0a!important;--checkout-card-bg-color:#fff!important;' +
    '--checkout-border-color:#e8e8e8!important}';

  var FOOT =
    '<footer class="cu-foot"><span>CURAL. &copy; 2026</span>' +
    '<a href="' + CONFIG.IG + '" target="_blank" rel="noopener">@curalco</a>' +
    '<a href="mailto:' + CONFIG.MAIL + '">' + CONFIG.MAIL + '</a></footer>';

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
      '</div>' + FOOT
    );
  }

  function homeHTML() {
    return (
      '<div class="cu-main">' +
        '<div class="cu-rise">' + logoSVG("min(300px,64vw)") + '</div>' +
        '<nav class="cu-menu cu-rise">' +
          '<a href="/">Home</a>' +
          '<a href="/stone-market">Stone Market</a>' +
          '<a href="/flame-store">Flame Market</a>' +
          '<a href="/contact">Contact</a>' +
        '</nav>' +
        '<a class="cu-ig cu-rise" href="' + CONFIG.IG + '" target="_blank" rel="noopener" aria-label="Instagram">' + IG_SVG + '</a>' +
      '</div>' + FOOT
    );
  }

  // Urunler — Ikas gercek slug + og:image + fiyat
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

  // Urun gorseli Ikas'taki gercek urun sayfasindan (og:image) canli cekilir,
  // panelde yuklenen guncel gorsel otomatik yansir. Hardcoded img sadece ilk
  // boyama (flash onleme) icin fallback.
  var OG_CACHE_TTL = 3600000; // 1 saat
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
            img.loading = "lazy";
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
            (p.img ? '<img src="' + p.img + '" alt="' + p.nm + '" loading="lazy">' : '<span>' + p.nm + '</span>') +
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
      '</div>' + FOOT
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
      '</div>' + FOOT
    );
  }

  /* ---------- SAYFA TESPITI ---------- */
  function detectPage() {
    if (window.CURAL_PAGE) return window.CURAL_PAGE;           // manuel override (test)
    // Site kilitli: sifre girilene kadar HER sayfada gate goster
    if (!isUnlocked()) return "gate";
    var p = (location.pathname || "").toLowerCase();
    // Magaza koleksiyon sayfalari -> custom Slawn grid (Ikas gorselleri)
    if (/^\/(stone-market|flame-store)\/?$/.test(p)) return "store";
    if (p === "" || p === "/") return "home";
    if (p === "/contact" || p === "/pages/contact") return "contact";
    // sepet/odeme: Ikas DOM'u kalir, CSS skin uygulanir (gercek sepet/checkout mantigi korunur)
    if (p === "/cart" || p === "/checkout" || /^\/checkout\//.test(p)) return "cart";
    // urun sayfasi: Ikas DOM'u kalir, sadece CSS ile Slawn'a giydirilir (sepet/odeme korunur)
    // once bilinen urun slug'lari (DOM gec gelse de skin uygulanir), sonra DOM tespiti
    var bare = p.replace(/\/$/, "");
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].url === bare) return "product"; }
    if (document.querySelector(".product-detail-page-slider, .product-name, .add-to-cart")) return "product";
    // hesap/arama vb. = Ikas'in kendi sayfalari, dokunma
    return null;
  }

  /* ---------- DAVRANIS ---------- */
  function wireGate(root) {
    var join = root.querySelector("#cuJoin");
    if (join) join.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = join.querySelector("input").value.trim();
      var btn = join.querySelector("button");
      // Brevo'ya gonder (action ayarliysa)
      if (!email) return;
      if (CONFIG.BREVO_ACTION && CONFIG.BREVO_ACTION.indexOf("http") === 0) {
        var fd = new FormData();
        fd.append("EMAIL", email);
        fd.append("email_address_check", ""); // Brevo honeypot (bos kalmali)
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

      // Best-effort: e-postayi Brevo listesine ekle (sadece EMAIL kaydedilir)
      if (CONFIG.CONTACT_BREVO_ACTION) {
        var bfd = new FormData();
        bfd.append("EMAIL", email);
        bfd.append("email_address_check", "");
        bfd.append("locale", "tr");
        fetch(CONFIG.CONTACT_BREVO_ACTION, { method: "POST", mode: "no-cors", body: bfd }).catch(function () {});
      }

      // Asil mesaj: mailto ile dogrudan CONFIG.CONTACT_MAIL'e gider (backend gerektirmez)
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

  /* ---------- MONTAJ ---------- */
  // CSS bir kez enjekte edilir
  function injectCSS() {
    if (document.getElementById("cural-style")) return;
    var st = document.createElement("style");
    st.id = "cural-style";
    st.textContent = CSS + SKIN_CSS;
    document.head.appendChild(st);
  }

  // onceki render izlerini temizle (SPA gecisinde tekrar render icin)
  function cleanup() {
    var r = document.getElementById("cural-root");
    if (r) r.parentNode.removeChild(r);
    var t = document.getElementById("cural-skintop");
    if (t) t.parentNode.removeChild(t);
    document.documentElement.classList.remove("cural-skin");
    document.documentElement.style.overflow = "";
  }

  // urun/sepet sayfalari: Ikas DOM'u kalir, Ikas'in kendi header'i CSS ile gizlenir,
  // yerine logo+Sepet iceren kucuk bir ust bar enjekte edilir
  function injectSkinTop() {
    var bar = document.createElement("div");
    bar.id = "cural-skintop";
    bar.className = "cu-skintop";
    bar.innerHTML = '<a href="/">' + logoSVG("110px") + '</a><a class="cu-cart" href="/cart">Sepet <span class="cu-cart-badge">0</span></a>';
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ---------- STOK SAYACI + OZEL ROZET (urun sayfasi) ----------
     Kalan stok Ikas'in sayfaya gomdugu __NEXT_DATA__'dan OKUNMUYOR artik —
     o deger Ikas'in kendi sunucu-tarafi cache'inde uzun sure bayat kalabiliyor
     (dogrulandi: admin'de 50/50 iken sayfa gunlerce "10" gosterdi, disaridan
     duzeltilemiyor). Bunun yerine PRODUCTS[].soldCount MANUEL olarak tutulur —
     her gercek satistan sonra bu sayi elle +1 artirilip push edilir. Az sayida
     satis oldugu surece (erken asama drop) bu, Ikas'in ucretli Admin API/Private
     App plani gerektiren otomatik entegrasyondan cok daha basit ve HER ZAMAN
     dogru bir cozum. */
  function pad3(n) { n = String(n); while (n.length < 3) n = "0" + n; return n; }

  function removeStockBadges() {
    var old = document.querySelectorAll(".cu-stock-badge, .cu-special-badge, .cu-size-label");
    for (var i = 0; i < old.length; i++) if (old[i].parentNode) old[i].parentNode.removeChild(old[i]);
  }

  // Urun basligi (BORİS./BURNA.) hemen altina boyut etiketi ("25 CM") eklenir.
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
    // Buy-box'in ICINE degil, TAMAMEN ALTINA (tam genislik, ayri blok) eklenir —
    // buy-box fiyat+buton icin dar bir flex satiri, icine sikisirsa metin kirilir.
    var anchor = document.querySelector(".product-detail-page-buy-box") || document.querySelector(".add-to-cart");
    if (!anchor || !anchor.parentNode) return;

    var sold = Math.max(0, Math.min(p.total, p.soldCount || 0));
    var remaining = p.total - sold;
    var serialNo = remaining > 0 ? sold + 1 : p.total;

    var wrap = document.createElement("div");
    wrap.className = "cu-stock-badge";
    wrap.style.cssText = "width:100%;margin:18px 0 0;font-family:var(--mono);";

    var serial = document.createElement("div");
    serial.style.cssText = "font-size:13px;font-weight:700;letter-spacing:.1em;color:#0a0a0a!important;";
    serial.textContent = p.nm + " #" + pad3(serialNo) + " / " + pad3(p.total);
    wrap.appendChild(serial);

    var left = document.createElement("div");
    left.style.cssText = "margin-top:4px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:" + (remaining <= 10 ? "#c0392b" : "#888") + "!important;";
    left.textContent = remaining <= 0 ? "TÜKENDİ" : (remaining <= 10 ? "SON " + remaining + " ADET" : remaining + " ADET KALDI");
    wrap.appendChild(left);

    anchor.parentNode.insertBefore(wrap, anchor.nextSibling);

    if (p.special > 0 && remaining > 0) {
      var badge = document.createElement("div");
      badge.className = "cu-special-badge";
      badge.style.cssText = "width:100%;box-sizing:border-box;margin:12px 0 0;padding-top:10px;border-top:1px solid #0a0a0a;" +
        "font-family:var(--mono);font-size:13px;font-weight:700;letter-spacing:.06em;line-height:1.5;color:#0a0a0a!important;text-transform:uppercase;";
      badge.textContent = p.special + " TANESİ AYRI DÖKÜLDÜ. BİRİ SENDE OLABİLİR.";
      anchor.parentNode.insertBefore(badge, wrap.nextSibling);
    }
  }

  // Ikas'in buy-box'i (Next.js hydration) degisken gecikmeyle mount olabiliyor —
  // sabit tek seferlik timeout bazen kacirdigi icin, hedef bulunana kadar
  // (max ~5sn) kisa aralarla tekrar denenir.
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

  // Ikas'in gercek sepet sayisini (.basket-bag) okuyup kendi Sepet rozetlerimize yansitir.
  // Ikas DOM'u gec/asenkron mount olabilir, o yuzden body genelinde surekli izlenir.
  // Ikas'in .basket-bag'i sadece FARKLI URUN SAYISINI gosterir, toplam adedi degil
  // (2 adet ayni urun sepette olsa da "1" yazar) — bu yuzden sepet/checkout sayfasindaki
  // .quantity-box degerlerini toplayip gercek toplam adedi kendimiz hesapliyoruz.
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
    // .quantity-box yoksa ya sepet gercekten bos ya da henuz yuklenmedi.
    // .empty-basket varsa sepet sayfasi yuklenmis VE gercekten bos demektir (eski
    // iyimser localStorage degerini gecersiz kilar, aksi halde bos sepette bile
    // rozet eski sayiyi gostermeye devam ederdi).
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
  // Urun sayfasinda "Sepete Ekle" her tiklamada tam 1 adet ekler (adet secici yok) —
  // .quantity-box o sayfada olmadigi icin, tiklaninca iyimser (optimistic) +1 yapip
  // sepet sayfasina gidildiginde gercek toplamla otomatik duzeltiliyor.
  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest && e.target.closest(".add-to-cart");
    if (!btn) return;
    var cur = 0;
    try { cur = parseInt(localStorage.getItem(CART_QTY_KEY), 10) || 0; } catch (err) {}
    try { localStorage.setItem(CART_QTY_KEY, String(cur + 1)); } catch (err) {}
    scheduleCartBadgeSync();
  }, true);
  var cartBadgeScheduled = false;
  function scheduleCartBadgeSync() {
    if (cartBadgeScheduled) return;
    cartBadgeScheduled = true;
    requestAnimationFrame(function () { cartBadgeScheduled = false; syncCartBadge(); });
  }

  // Ikas bazi native <button> elementlerine INLINE !important stil basiyor (siyah/beyaz temasi).
  // CSS hicbir sekilde inline+!important'i ezemez — bu yuzden JS ile inline stili
  // kendi degerlerimizle yeniden yazip bir MutationObserver ile koruyoruz.
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
    if (!page) return; // dokunulmayacak Ikas sayfasi (hesap/arama vb.)

    // Urun/sepet sayfasi: Ikas DOM'u kalir, sadece Slawn skin uygulanir (sepet/odeme calisir)
    if (page === "product" || page === "cart") {
      document.documentElement.classList.add("cural-skin");
      injectSkinTop();
      scheduleCartBadgeSync();
      if (page === "product") scheduleStockBadge();
      return;
    }

    // Root overlay (gate/home/store/contact)
    var root = document.createElement("div");
    root.id = "cural-root";
    if (page === "gate") root.innerHTML = gateHTML();
    else if (page === "store") {
      var coll = /flame-store/.test((location.pathname || "").toLowerCase()) ? "flame" : "stone";
      root.innerHTML = storeHTML(coll);
    }
    else if (page === "contact") root.innerHTML = contactHTML();
    else root.innerHTML = homeHTML();

    document.body.appendChild(root);
    document.documentElement.style.overflow = "hidden"; // arka Ikas icerigini kilitle
    guardButtons(root);
    scheduleCartBadgeSync();

    if (page === "gate") wireGate(root);
    if (page === "contact") wireContact(root);
    if (page === "store") refreshProductImages(root);
  }

  // Ikas = Next.js SPA -> route degisiminde mount() tekrar calismaz.
  // history.pushState/replaceState + popstate dinle, her gecisde yeniden render et.
  function hookSPA() {
    function wrap(name) {
      var orig = history[name];
      if (!orig || orig.__cural) return;
      var fn = function () {
        var ret = orig.apply(this, arguments);
        setTimeout(render, 40); // Ikas DOM'u guncellesin sonra render
        return ret;
      };
      fn.__cural = true;
      history[name] = fn;
    }
    wrap("pushState");
    wrap("replaceState");
    window.addEventListener("popstate", function () { setTimeout(render, 40); });
  }

  function start() {
    hookSPA();
    render();
    // Ikas'in kendi sepet sayacini (.basket-bag) izler, urun eklenince/cikinca rozet anlik guncellenir
    new MutationObserver(scheduleCartBadgeSync).observe(document.body, { childList: true, subtree: true, characterData: true });
    // Ikas'in .basket-bag guncellemesi bazen mutation ile yakalanamiyor (async/gec render) — yedek olarak periyodik senkronize edilir
    setInterval(syncCartBadge, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
