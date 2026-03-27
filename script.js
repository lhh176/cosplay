const filterButtons = document.querySelectorAll("[data-filter]");
const mediaSections = document.querySelectorAll(".media-section");
const navToggle = document.querySelector(".nav-toggle");
const languageToggle = document.querySelector(".language-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const showcaseCards = Array.from(document.querySelectorAll(".showcase-card"));
const videoCards = Array.from(document.querySelectorAll(".video-card"));
const contactCards = Array.from(document.querySelectorAll(".contact-card"));
const metaDescription = document.querySelector('meta[name="description"]');
const entryOverlay = document.querySelector(".entry-overlay");
const lightbox = document.querySelector(".lightbox");
const lightboxShell = document.querySelector(".lightbox-shell");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxPreview = document.querySelector(".lightbox-preview");
const lightboxTag = document.querySelector(".lightbox-tag");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxMeta = document.querySelector(".lightbox-meta");
const lightboxDescription = document.querySelector(".lightbox-description");
const lightboxAction = document.querySelector(".lightbox-action");
const lightboxEmpty = document.querySelector(".lightbox-empty");
const interactiveCards = [...showcaseCards, ...videoCards, ...contactCards];
let defaultLightboxEmptyMarkup = "";
const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
const coarsePointerQuery = window.matchMedia?.("(hover: none), (pointer: coarse)");

const filterOrder = ["all", "ai-video", "ai-photo", "cosplay"];
const filterLabels = {
  zh: {
    all: "切换分类：全部",
    "ai-video": "切换分类：AI 视频作品",
    "ai-photo": "切换分类：AI 融合摄影",
    cosplay: "切换分类：Cosplay 摄影",
  },
  en: {
    all: "Cycle Category: All",
    "ai-video": "Cycle Category: AI Videos",
    "ai-photo": "Cycle Category: AI Fusion Photos",
    cosplay: "Cycle Category: Cosplay Photos",
  },
};
const themeLabels = {
  zh: {
    dark: "切换到白天模式",
    light: "切换到黑夜模式",
  },
  en: {
    dark: "Switch to light mode",
    light: "Switch to dark mode",
  },
};
const languageLabels = {
  zh: {
    button: "EN",
    aria: "切换为英文",
    toolbar: "作品分类",
    heroNotesAria: "注意事项",
  },
  en: {
    button: "中文",
    aria: "Switch language to Chinese",
    toolbar: "Portfolio categories",
    heroNotesAria: "Notes",
  },
};
const accessibilityLabels = {
  zh: {
    showcase: "查看图片：",
    video: "播放视频：",
    contact: "查看联系方式：",
  },
  en: {
    showcase: "View image: ",
    video: "Play video: ",
    contact: "View contact: ",
  },
};
const lightboxLabels = {
  zh: {
    close: "关闭",
    closeAria: "关闭预览",
    prevAria: "上一张",
    nextAria: "下一张",
    defaultAction: "打开视频链接",
    empty:
      '当前还没有接入真实视频文件。把对应视频卡片上的 <code>data-video-src</code> 或 <code>data-video-link</code> 改成实际地址后，这里会显示可播放内容或跳转入口。',
    emptyLinked: "当前卡片还没有接入直链视频文件，你可以先通过下方按钮跳转查看成片。",
  },
  en: {
    close: "Close",
    closeAria: "Close preview",
    prevAria: "Previous",
    nextAria: "Next",
    defaultAction: "Open video link",
    empty:
      'No local video file is connected yet. Add a real <code>data-video-src</code> or <code>data-video-link</code> to this card and this area will show playback or a jump link.',
    emptyLinked: "This card does not have a direct video file yet. Use the button below to open the published version first.",
  },
};
const videoStateLabels = {
  zh: {
    ready: "已接入",
    empty: "待接入",
  },
  en: {
    ready: "Preview",
    empty: "Soon",
  },
};
const translations = {
  zh: {
    meta: {
      title: "镜域造像 | Cosplay 与 AI 摄影作品展示",
      description: "展示 cosplay 摄影作品、AI 融合摄影作品与 AI 视频作品，呈现角色摄影和数字视觉叙事。",
    },
    brand: {
      mark: "镜域造像",
      note: "Cosplay Photography + AI Visual Storytelling",
    },
    hero: {
      eyebrow: "角色摄影 / AI 融合 / 影像叙事",
      title: "让真实拍摄、生成式视觉和视频表达落在同一套作品语言里。",
      text:
        "这个页面现在按你的要求拆成三条展示线：Cosplay 摄影作品、AI 融合摄影作品、AI 视频作品。每组内容使用独立比例，方便你后续直接替换成正式素材。",
      browse: "浏览作品",
      about: "查看创作说明",
      notes: [
        "注意事项 01：作品区当前支持图片预览、视频弹窗和联系方式二维码双击放大。",
        "注意事项 02：替换真实素材时请保持原有比例结构，这样页面编排和视觉节奏不会被破坏。",
      ],
    },
    stats: [
      { label: "AI 视频展示比例", value: "2 部 16:9 先行展示" },
      { label: "AI 融合摄影比例", value: "3 张 16:9" },
      { label: "摄影展示比例", value: "3 张 2:3 + 2 张 3:2" },
    ],
    intro: {
      eyebrow: "创作说明",
      title: "摄影是素材起点，AI 是视觉延展，视频负责把世界观推向动态叙事。",
      cards: [
        {
          title: "Cosplay 摄影",
          text:
            "重点放在角色还原、表演感和氛围调度，竖图更适合呈现服装、妆面、肢体和角色气场，横图则用来展示场景关系和剧情推进。",
        },
        {
          title: "AI 融合摄影",
          text:
            "以实拍人物为主体，用 AI 扩展背景、空间结构和视觉设定，让照片在概念层面更完整，但仍然保留摄影本身的质感与人物可信度。",
        },
        {
          title: "AI 视频作品",
          text:
            "用短片形式展示角色世界观、动态光效、转场和氛围音画设计，适合承接摄影系列的延伸内容，也适合做展映、社交平台宣传和项目提案展示。",
        },
      ],
    },
    gallery: {
      eyebrow: "作品展示",
      title: "先看动态影像，再进入静态系列",
      filters: ["全部", "AI 视频作品", "AI 融合摄影", "Cosplay 摄影"],
    },
    videoSection: {
      kicker: "AI Video Showcase",
      title: "AI 视频作品优先展示",
      note: "2 部 16:9 作品先行承接世界观与节奏，再向下展开静态摄影系列",
      cards: [
        {
          tag: "AI 视频",
          title: "铁轨疾奔 · 片段",
          description: "少女背对镜头沿铁轨全力奔跑，鞋尖踩过水洼炸开水花，长发与衣摆被速度一起拉起，适合做情绪瞬间和动势展示。",
          linkLabel: "打开视频链接",
        },
        {
          tag: "AI 视频",
          title: "异界回廊 · 概念短片",
          description: "基于横幅摄影场景延展出空间位移、镜头推进和体积光变化，适合做作品集中的第二支主片。",
          linkLabel: "打开视频链接",
        },
      ],
    },
    aiPhotoSection: {
      kicker: "AI Fusion Photography",
      title: "AI 融合摄影作品",
      note: "1 张主视觉横幅 + 2 张辅助横幅，先建立核心概念，再补空间延展",
      cards: [
        {
          title: "暗袍唤雷",
          alt: "暗袍唤雷",
          description: "以压低环境亮度和雷电能量作为主视觉重心，突出角色气场与电光层次。",
        },
        {
          title: "竹间定乾坤",
          alt: "竹间定乾坤",
          description: "借竹林纵深和人物定势建立东方叙事感，让画面从静态中带出控制力。",
        },
        {
          title: "废土雷行者",
          alt: "废土雷行者",
          description: "把废土地貌、金属质感和雷击动势压进同一画幅，强化末世穿行的速度感。",
        },
      ],
    },
    cosplaySection: {
      kicker: "Cosplay Photography",
      title: "Cosplay 摄影作品",
      note: "左侧用竖幅建立角色存在感，右侧用横幅补足场景与叙事推进",
      cards: [
        {
          title: "爆爆的迷你军团",
          alt: "爆爆的迷你军团",
          description: "用高饱和角色造型和压缩透视建立冲击力，让竖幅主视觉更直接地抓住注意力。",
        },
        {
          title: "软萌猫耳小雷姆",
          alt: "软萌猫耳小雷姆",
          description: "把柔和表情、毛绒细节和近景氛围压进竖构图里，画面重心更贴近角色本身。",
        },
        {
          title: "红发魔书小魔女",
          alt: "红发魔书小魔女",
          description: "以横向场景把角色、道具和情绪一起展开，让魔书叙事感和人物状态同时成立。",
        },
        {
          title: "初音护士营业中",
          alt: "初音护士营业中",
          description: "利用制服符号和角色姿态形成清晰记忆点，让单张竖幅同时兼顾亲和感和完成度。",
        },
        {
          title: "甜妹与迷你分身",
          alt: "甜妹与迷你分身",
          description: "利用横幅空间把主角和分身关系拉开，画面会更完整，也更有轻快的戏剧互动感。",
        },
      ],
    },
    process: {
      eyebrow: "工作流程",
      title: "先建立摄影可信度，再用 AI 补足世界，再把静态延伸到视频。",
      cards: [
        { index: "01", title: "角色设定", text: "先明确角色身份、造型关键词和空间气氛，避免后续只剩素材堆叠。" },
        { index: "02", title: "实拍执行", text: "拍清楚人物主光、材质和动作关系，保证 AI 延展时有稳定的真实锚点。" },
        { index: "03", title: "融合生成", text: "对照片进行背景扩展、气氛统一和视觉草图迭代，控制 AI 只服务整体叙事。" },
        { index: "04", title: "视频输出", text: "把静态作品转成预告片、动态海报或叙事短片，形成完整的作品展示链路。" },
      ],
    },
    contact: {
      eyebrow: "联系方式",
      title: "联系与合作",
      note: "桌面端双击、移动端单击二维码可放大预览",
      cards: [
        {
          tag: "QQ",
          title: "QQ 联系方式",
          meta: "联系方式 / 二维码",
          alt: "QQ 联系二维码",
          description: "如需沟通作品合作、商业拍摄或项目定制，可通过 QQ 扫码联系。",
          body: "双击二维码可放大查看，适合电脑端直接扫码联系。",
        },
        {
          tag: "微信",
          title: "微信 联系方式",
          meta: "联系方式 / 二维码",
          alt: "微信 联系二维码",
          description: "如需约拍、合作咨询或获取更多作品信息，可通过微信扫码联系。",
          body: "双击二维码可放大查看，适合手机端保存后扫码或直接查看。",
        },
      ],
    },
    footer: {
      title: "镜域造像",
      text: "现在这版已经适合直接替换真实图片和视频素材，继续扩展为正式作品集网站。",
      backTop: "返回顶部",
    },
  },
  en: {
    meta: {
      title: "Mirror Domain | Cosplay and AI Visual Portfolio",
      description: "A portfolio of cosplay photography, AI fusion photography, and AI video pieces built around character-driven visual storytelling.",
    },
    brand: {
      mark: "Mirror Domain",
      note: "Cosplay Photography + AI Visual Storytelling",
    },
    hero: {
      eyebrow: "Character Photography / AI Fusion / Visual Narrative",
      title: "Place live-action shooting, generative visuals, and video expression inside one visual language.",
      text:
        "This page is now split into three presentation lines as requested: cosplay photography, AI fusion photography, and AI video pieces. Each group keeps an independent ratio structure so you can replace everything with final assets later.",
      browse: "Browse Work",
      about: "Read the Concept",
      notes: [
        "Note 01: the portfolio area currently supports image previews, video popups, and enlarged contact QR codes.",
        "Note 02: keep the original ratio structure when replacing assets so the layout rhythm stays intact.",
      ],
    },
    stats: [
      { label: "AI Video Layout", value: "2 featured 16:9 films" },
      { label: "AI Fusion Photo Layout", value: "3 pieces in 16:9" },
      { label: "Photography Layout", value: "3 images in 2:3 + 2 images in 3:2" },
    ],
    intro: {
      eyebrow: "Approach",
      title: "Photography builds the source material, AI expands the world, and video pushes it into motion.",
      cards: [
        {
          title: "Cosplay Photography",
          text:
            "The focus stays on character accuracy, performance, and atmosphere. Vertical frames work best for costume, makeup, gesture, and aura, while horizontal frames are better for scene relationships and story progression.",
        },
        {
          title: "AI Fusion Photography",
          text:
            "Real photography stays at the core while AI extends the setting, the spatial structure, and the visual premise, making the final image more conceptually complete without losing the tactile quality of the original shoot.",
        },
        {
          title: "AI Video Works",
          text:
            "Short-form video is used to show worldbuilding, motion lighting, transitions, and audiovisual mood. It works as an extension of the photo series and also fits screenings, social media promotion, or project decks.",
        },
      ],
    },
    gallery: {
      eyebrow: "Portfolio",
      title: "Start with motion, then move into the still-image series",
      filters: ["All", "AI Videos", "AI Fusion Photos", "Cosplay Photos"],
    },
    videoSection: {
      kicker: "AI Video Showcase",
      title: "AI videos lead the portfolio",
      note: "Two 16:9 films set the world and pacing first, then the still series unfolds underneath.",
      cards: [
        {
          tag: "AI Video",
          title: "Rail Sprint · Clip",
          description: "A heroine runs full speed down the railway with her back to camera, kicking water from puddles as hair and fabric trail behind, making it ideal for a high-motion emotional beat.",
          linkLabel: "Open video link",
        },
        {
          tag: "AI Video",
          title: "Otherworld Corridor · Concept Short",
          description: "Extends horizontal photo scenes into spatial drift, camera pushes, and volumetric light changes, functioning as the second main film in the portfolio.",
          linkLabel: "Open video link",
        },
      ],
    },
    aiPhotoSection: {
      kicker: "AI Fusion Photography",
      title: "AI fusion photography",
      note: "One hero frame on top, then two supporting wides to deepen the concept and space.",
      cards: [
        {
          title: "Stormcaller in Dark Robes",
          alt: "Stormcaller in Dark Robes",
          description: "The main visual weight sits on low-key atmosphere and electrical energy, pushing the character's pressure and lightning layers forward.",
        },
        {
          title: "Stillness Among Bamboo",
          alt: "Stillness Among Bamboo",
          description: "The depth of the bamboo grove and the fixed pose create an eastern narrative calm with a strong sense of control.",
        },
        {
          title: "Wasteland Thunder Walker",
          alt: "Wasteland Thunder Walker",
          description: "Wasteland textures, metallic surfaces, and lightning momentum are compressed into one frame to amplify the speed of a post-apocalyptic passage.",
        },
      ],
    },
    cosplaySection: {
      kicker: "Cosplay Photography",
      title: "Cosplay photography",
      note: "Verticals establish the character presence first, while horizontals complete the scene and narrative flow.",
      cards: [
        {
          title: "Jinx and the Tiny Squad",
          alt: "Jinx and the Tiny Squad",
          description: "High-saturation styling and compressed perspective create instant impact, turning the vertical hero shot into the strongest attention grabber.",
        },
        {
          title: "Soft Cat-Eared Mini Rem",
          alt: "Soft Cat-Eared Mini Rem",
          description: "Soft expression, fluffy detail, and a near-field mood are compressed into a vertical frame that keeps the focus tightly on the character.",
        },
        {
          title: "Red-Haired Spellbook Witch",
          alt: "Red-Haired Spellbook Witch",
          description: "The horizontal frame opens up enough space for the character, prop, and emotional tone to work together inside one magical narrative beat.",
        },
        {
          title: "Miku Nurse On Duty",
          alt: "Miku Nurse On Duty",
          description: "Uniform cues and pose create a clear memory point, letting a single vertical frame balance charm with overall completeness.",
        },
        {
          title: "Sweet Girl and Mini Double",
          alt: "Sweet Girl and Mini Double",
          description: "The wider frame separates the main subject and the miniature double more clearly, making the interaction feel lighter and more theatrical.",
        },
      ],
    },
    process: {
      eyebrow: "Workflow",
      title: "Build photographic credibility first, let AI expand the world, then extend stills into motion.",
      cards: [
        { index: "01", title: "Character Setup", text: "Lock the character identity, styling keywords, and atmospheric direction first so later work does not collapse into disconnected assets." },
        { index: "02", title: "Live Shoot", text: "Capture key light, material texture, and action relationships clearly so AI expansion always has a stable real anchor." },
        { index: "03", title: "Fusion Pass", text: "Expand the background, unify atmosphere, and iterate visual drafts while keeping AI in service of the overall narrative." },
        { index: "04", title: "Video Output", text: "Turn still images into trailers, animated posters, or short narrative films so the final portfolio reads as one coherent chain." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact and collaboration",
      note: "Desktop: double-click. Mobile: tap once to enlarge the QR codes.",
      cards: [
        {
          tag: "QQ",
          title: "QQ Contact",
          meta: "Contact / QR Code",
          alt: "QQ contact QR code",
          description: "For project collaboration, commercial shooting, or custom commissions, you can reach out by scanning the QQ code.",
          body: "Double-click to enlarge. Best for scanning directly from desktop.",
        },
        {
          tag: "WeChat",
          title: "WeChat Contact",
          meta: "Contact / QR Code",
          alt: "WeChat contact QR code",
          description: "For bookings, collaboration inquiries, or more portfolio details, you can reach out by scanning the WeChat code.",
          body: "Double-click to enlarge. Suitable for saving on mobile and scanning later.",
        },
      ],
    },
    footer: {
      title: "Mirror Domain",
      text: "This version is already ready for real images and video assets, and can keep growing into a formal portfolio site.",
      backTop: "Back to Top",
    },
  },
};
let currentLanguage = "zh";

let activeImageCard = null;
let activeTrigger = null;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight * 0.35;
let pointerRaf = 0;
let videoPreviewObserver = null;
let entrySequenceTimer = 0;

function getThemeLabel(theme) {
  return themeLabels[currentLanguage]?.[theme] ?? themeLabels.zh[theme];
}

function getFilterLabel(filter) {
  return filterLabels[currentLanguage]?.[filter] ?? filterLabels.zh[filter] ?? "切换分类";
}

function updateCardAccessibilityByLanguage() {
  const labels = accessibilityLabels[currentLanguage] ?? accessibilityLabels.zh;
  setCardAccessibility(showcaseCards, labels.showcase);
  setCardAccessibility(videoCards, labels.video);
  setCardAccessibility(contactCards, labels.contact);
}

function syncVideoCardStateLabels() {
  const labels = videoStateLabels[currentLanguage] ?? videoStateLabels.zh;
  videoCards.forEach((card) => {
    const chip = card.querySelector(".video-chip");
    const hasVideo = Boolean(card.dataset.videoSrc?.trim());
    const state = hasVideo ? "ready" : "empty";
    if (chip) {
      chip.textContent = labels[state];
    }
    card.classList.toggle("has-video-preview", hasVideo);
    card.classList.toggle("is-video-empty", !hasVideo);
  });
}

function createVideoPreview(card) {
  const videoSrc = card.dataset.videoSrc?.trim();
  const surface = card.querySelector(".video-surface");
  if (!surface || !videoSrc || surface.querySelector(".card-video-preview")) {
    return;
  }

  const preview = document.createElement("video");
  preview.className = "card-video-preview";
  preview.muted = true;
  preview.loop = true;
  preview.playsInline = true;
  preview.preload = "metadata";
  preview.setAttribute("aria-hidden", "true");

  const source = document.createElement("source");
  source.src = videoSrc;
  source.type = card.dataset.videoType?.trim() || "video/mp4";
  preview.append(source);
  surface.prepend(preview);
}

function initVideoCardPreviews() {
  videoCards.forEach((card) => {
    createVideoPreview(card);
  });

  const previews = Array.from(document.querySelectorAll(".card-video-preview"));
  if (previews.length === 0 || prefersReducedMotion()) {
    return;
  }

  videoPreviewObserver?.disconnect();
  videoPreviewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const preview = entry.target;
        if (!(preview instanceof HTMLVideoElement)) {
          return;
        }

        if (entry.isIntersecting) {
          void preview.play().catch(() => {});
        } else {
          preview.pause();
        }
      });
    },
    { threshold: 0.45 },
  );

  previews.forEach((preview) => {
    videoPreviewObserver.observe(preview);
  });
}

function applyTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  if (themeToggle) {
    const nextLabel = getThemeLabel(nextTheme);
    themeToggle.textContent = nextLabel;
    themeToggle.setAttribute("aria-label", nextLabel);
  }
  window.localStorage.setItem("site-theme", nextTheme);
}

function initTheme() {
  const savedTheme = window.localStorage.getItem("site-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
    return;
  }

  const preferredLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  applyTheme(preferredLight ? "light" : "dark");
}

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  mediaSections.forEach((section) => {
    const matches = filter === "all" || section.dataset.category === filter;
    section.hidden = !matches;
    section.setAttribute("aria-hidden", String(!matches));
  });

  if (navToggle) {
    const nextLabel = getFilterLabel(filter) ?? "切换分类";
    navToggle.textContent = nextLabel;
    navToggle.setAttribute("aria-label", nextLabel);
  }
}

function prefersSingleTapPreview() {
  return coarsePointerQuery?.matches || navigator.maxTouchPoints > 0;
}

function prefersReducedMotion() {
  return reducedMotionQuery?.matches ?? false;
}

function shouldEnhanceMotion() {
  return !prefersReducedMotion();
}

function shouldEnhancePointerMotion() {
  return !prefersReducedMotion() && !prefersSingleTapPreview();
}

function finalizeEntrySequence() {
  window.clearTimeout(entrySequenceTimer);
  document.body.classList.remove("is-entry-pending", "is-entry-active");
  document.body.classList.add("is-entry-complete");

  if (entryOverlay) {
    entryOverlay.hidden = true;
  }
}

function startEntrySequence() {
  if (!entryOverlay) {
    finalizeEntrySequence();
    return;
  }

  entryOverlay.hidden = false;
  document.body.classList.remove("is-entry-complete");

  if (prefersReducedMotion()) {
    finalizeEntrySequence();
    return;
  }

  document.body.classList.add("is-entry-pending");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.remove("is-entry-pending");
      document.body.classList.add("is-entry-active");
    });
  });

  entrySequenceTimer = window.setTimeout(finalizeEntrySequence, 3020);
}

function getVisibleShowcaseCards() {
  return showcaseCards.filter((card) => !card.closest(".media-section")?.hidden);
}

function getFocusableElements(container) {
  if (!(container instanceof HTMLElement)) {
    return [];
  }

  return Array.from(
    container.querySelectorAll(
      'button:not([disabled]):not([hidden]), [href]:not([hidden]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function buildFxLayer() {
  if (document.querySelector(".fx-layer") || !shouldEnhanceMotion()) {
    return;
  }

  const fxLayer = document.createElement("div");
  fxLayer.className = "fx-layer";
  if (!shouldEnhancePointerMotion()) {
    fxLayer.classList.add("is-ambient");
  }

  const cursorAura = document.createElement("div");
  cursorAura.className = "cursor-aura";

  const particleField = document.createElement("div");
  particleField.className = "particle-field";
  const ambientOrbA = document.createElement("span");
  ambientOrbA.className = "ambient-orb ambient-orb-a";
  const ambientOrbB = document.createElement("span");
  ambientOrbB.className = "ambient-orb ambient-orb-b";
  const particleCount = window.innerWidth <= 960 ? 10 : 14;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.setProperty("--x", (6 + Math.random() * 88).toFixed(2));
    particle.style.setProperty("--y", (4 + Math.random() * 92).toFixed(2));
    particle.style.setProperty("--size", (2 + Math.random() * 4.5).toFixed(2));
    particle.style.setProperty("--alpha", (10 + Math.random() * 18).toFixed(2));
    particle.style.setProperty("--duration", (7 + Math.random() * 9).toFixed(2));
    particle.style.setProperty("--delay", (Math.random() * 8).toFixed(2));
    particle.style.setProperty("--drift-x", (-18 + Math.random() * 36).toFixed(2));
    particle.style.setProperty("--drift-y", (-26 + Math.random() * 52).toFixed(2));
    particleField.append(particle);
  }

  fxLayer.append(cursorAura, ambientOrbA, ambientOrbB, particleField);
  document.body.prepend(fxLayer);
}

function commitPointer() {
  document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);
  pointerRaf = 0;
}

function queuePointerUpdate(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  document.documentElement.style.setProperty("--pointer-x", `${(mouseX / window.innerWidth) * 100}%`);
  document.documentElement.style.setProperty("--pointer-y", `${(mouseY / window.innerHeight) * 100}%`);

  if (!pointerRaf) {
    pointerRaf = window.requestAnimationFrame(commitPointer);
  }
}

function resetCardTilt(card) {
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
}

function bindCardTilt(card) {
  if (!shouldEnhancePointerMotion()) {
    resetCardTilt(card);
    return;
  }

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const tiltY = (offsetX - 0.5) * 8;
    const tiltX = (0.5 - offsetY) * 7;

    card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  });

  card.addEventListener("pointerleave", () => {
    resetCardTilt(card);
  });

  card.addEventListener("blur", () => {
    resetCardTilt(card);
  });
}

function setCardAccessibility(cards, labelPrefix) {
  cards.forEach((card) => {
    const title = card.querySelector("h4")?.textContent?.trim() ?? (currentLanguage === "en" ? "Untitled work" : "未命名作品");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${labelPrefix}${title}`);
  });
}

function applyLanguage(lang) {
  const nextLanguage = lang === "en" ? "en" : "zh";
  const copy = translations[nextLanguage];
  const uiCopy = languageLabels[nextLanguage];
  const lightboxCopy = lightboxLabels[nextLanguage];
  currentLanguage = nextLanguage;

  document.documentElement.lang = nextLanguage === "en" ? "en" : "zh-CN";
  document.title = copy.meta.title;
  metaDescription?.setAttribute("content", copy.meta.description);

  document.querySelector(".brand-mark").textContent = copy.brand.mark;
  document.querySelector(".brand-note").textContent = copy.brand.note;

  if (languageToggle) {
    languageToggle.textContent = uiCopy.button;
    languageToggle.setAttribute("aria-label", uiCopy.aria);
  }

  document.querySelector(".hero-copy .eyebrow").textContent = copy.hero.eyebrow;
  document.querySelector(".hero-copy h1").textContent = copy.hero.title;
  document.querySelector(".hero-text").textContent = copy.hero.text;
  document.querySelectorAll(".hero-actions .button")[0].textContent = copy.hero.browse;
  document.querySelectorAll(".hero-actions .button")[1].textContent = copy.hero.about;
  document.querySelector(".hero-notes").setAttribute("aria-label", uiCopy.heroNotesAria);
  document.querySelectorAll(".hero-notes p").forEach((note, index) => {
    note.textContent = copy.hero.notes[index];
  });

  document.querySelectorAll(".hero-panel .stat-card").forEach((card, index) => {
    const stat = copy.stats[index];
    card.querySelector(".stat-label").textContent = stat.label;
    card.querySelector("strong").textContent = stat.value;
  });

  document.querySelector(".section-intro .section-heading .eyebrow").textContent = copy.intro.eyebrow;
  document.querySelector(".section-intro .section-heading h2").textContent = copy.intro.title;
  document.querySelectorAll(".intro-layout .info-block").forEach((block, index) => {
    const introCard = copy.intro.cards[index];
    block.querySelector("h3").textContent = introCard.title;
    block.querySelector("p").textContent = introCard.text;
  });

  document.querySelector("#gallery .section-heading .eyebrow").textContent = copy.gallery.eyebrow;
  document.querySelector("#gallery .section-heading h2").textContent = copy.gallery.title;
  document.querySelector(".filter-bar").setAttribute("aria-label", uiCopy.toolbar);
  filterButtons.forEach((button, index) => {
    button.textContent = copy.gallery.filters[index];
  });

  const videoSection = document.querySelector('.media-section[data-category="ai-video"]');
  videoSection.querySelector(".section-kicker").textContent = copy.videoSection.kicker;
  videoSection.querySelector("h3").textContent = copy.videoSection.title;
  videoSection.querySelector(".section-note").textContent = copy.videoSection.note;
  videoCards.forEach((card, index) => {
    const cardCopy = copy.videoSection.cards[index];
    card.dataset.videoLinkLabel = cardCopy.linkLabel;
    card.querySelector(".showcase-tag").textContent = cardCopy.tag;
    card.querySelector("h4").textContent = cardCopy.title;
    card.querySelector(".showcase-body p:last-child").textContent = cardCopy.description;
  });
  syncVideoCardStateLabels();

  const aiPhotoSection = document.querySelector('.media-section[data-category="ai-photo"]');
  aiPhotoSection.querySelector(".section-kicker").textContent = copy.aiPhotoSection.kicker;
  aiPhotoSection.querySelector("h3").textContent = copy.aiPhotoSection.title;
  aiPhotoSection.querySelector(".section-note").textContent = copy.aiPhotoSection.note;
  document.querySelectorAll('.media-section[data-category="ai-photo"] .showcase-card').forEach((card, index) => {
    const cardCopy = copy.aiPhotoSection.cards[index];
    card.dataset.imageAlt = cardCopy.alt;
    card.querySelector(".media-image").alt = cardCopy.alt;
    card.querySelector(".showcase-tag").textContent = nextLanguage === "en" ? "AI Fusion Photo" : "AI 融合摄影";
    card.querySelector("strong").textContent = cardCopy.title;
    card.querySelector("h4").textContent = cardCopy.title;
    card.querySelector(".showcase-body p:last-child").textContent = cardCopy.description;
  });

  const cosplaySection = document.querySelector('.media-section[data-category="cosplay"]');
  cosplaySection.querySelector(".section-kicker").textContent = copy.cosplaySection.kicker;
  cosplaySection.querySelector("h3").textContent = copy.cosplaySection.title;
  cosplaySection.querySelector(".section-note").textContent = copy.cosplaySection.note;
  document.querySelectorAll('.media-section[data-category="cosplay"] .showcase-card').forEach((card, index) => {
    const cardCopy = copy.cosplaySection.cards[index];
    card.dataset.imageAlt = cardCopy.alt;
    card.querySelector(".media-image").alt = cardCopy.alt;
    card.querySelector(".showcase-tag").textContent = nextLanguage === "en" ? "Cosplay Photo" : "Cosplay 摄影";
    card.querySelector("strong").textContent = cardCopy.title;
    card.querySelector("h4").textContent = cardCopy.title;
    card.querySelector(".showcase-body p:last-child").textContent = cardCopy.description;
  });

  document.querySelector(".process-section .section-heading .eyebrow").textContent = copy.process.eyebrow;
  document.querySelector(".process-section .section-heading h2").textContent = copy.process.title;
  document.querySelectorAll(".process-card").forEach((card, index) => {
    const processCard = copy.process.cards[index];
    card.querySelector(".process-index").textContent = processCard.index;
    card.querySelector("h3").textContent = processCard.title;
    card.querySelector("p").textContent = processCard.text;
  });

  document.querySelector(".contact-section .section-heading .eyebrow").textContent = copy.contact.eyebrow;
  document.querySelector(".contact-section .section-heading h2").textContent = copy.contact.title;
  document.querySelector(".contact-section .section-note").textContent = copy.contact.note;
  contactCards.forEach((card, index) => {
    const contactCard = copy.contact.cards[index];
    card.dataset.imageAlt = contactCard.alt;
    card.dataset.imageTitle = contactCard.title;
    card.dataset.imageTag = contactCard.tag;
    card.dataset.imageMeta = contactCard.meta;
    card.dataset.imageDescription = contactCard.description;
    card.querySelector(".contact-media img").alt = contactCard.alt;
    card.querySelector(".showcase-tag").textContent = contactCard.tag;
    card.querySelector("h4").textContent = contactCard.title;
    card.querySelector(".contact-body p:last-child").textContent = contactCard.body;
  });

  document.querySelector(".footer-title").textContent = copy.footer.title;
  document.querySelector(".footer p:last-child").textContent = copy.footer.text;
  document.querySelector('.footer .button').textContent = copy.footer.backTop;

  lightboxClose.textContent = lightboxCopy.close;
  lightboxClose.setAttribute("aria-label", lightboxCopy.closeAria);
  lightboxPrev?.setAttribute("aria-label", lightboxCopy.prevAria);
  lightboxNext?.setAttribute("aria-label", lightboxCopy.nextAria);
  if (lightboxAction) {
    lightboxAction.textContent = lightboxCopy.defaultAction;
  }
  defaultLightboxEmptyMarkup = lightboxCopy.empty;
  lightboxEmpty.innerHTML = defaultLightboxEmptyMarkup;

  updateCardAccessibilityByLanguage();
  applyTheme(document.body.dataset.theme === "light" ? "light" : "dark");
  applyFilter(document.querySelector(".filter-button.is-active")?.dataset.filter ?? "all");
  window.localStorage.setItem("site-language", nextLanguage);

  if (!lightbox?.hidden && activeTrigger instanceof HTMLElement) {
    if (activeTrigger.classList.contains("video-card")) {
      openVideoPreview(activeTrigger);
    } else if (activeTrigger.classList.contains("contact-card")) {
      openContactPreview(activeTrigger);
    } else {
      openImagePreview(activeTrigger);
    }
  }
}

function initLanguage() {
  const savedLanguage = window.localStorage.getItem("site-language");
  applyLanguage(savedLanguage === "en" ? "en" : "zh");
}

function scheduleVisualEnhancements() {
  if (!shouldEnhanceMotion()) {
    commitPointer();
    return;
  }

  const bootEnhancements = () => {
    buildFxLayer();
    if (shouldEnhancePointerMotion()) {
      document.addEventListener("pointermove", queuePointerUpdate, { passive: true });
      document.addEventListener("pointerdown", queuePointerUpdate, { passive: true });
    }
    commitPointer();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(bootEnhancements, { timeout: 900 });
    return;
  }

  window.setTimeout(bootEnhancements, 180);
}

function getCardDetails(card) {
  const sectionTitle = card.closest(".media-section")?.querySelector("h3")?.textContent?.trim() ?? "";
  const tag = card.querySelector(".showcase-tag")?.textContent?.trim() ?? sectionTitle;
  const title = card.querySelector("h4")?.textContent?.trim() ?? sectionTitle;
  const description = card.querySelector(".showcase-body p:last-child")?.textContent?.trim() ?? "";
  const ratio = card.classList.contains("video-card")
    ? card.querySelector(".video-duration")?.textContent?.trim() ?? ""
    : "";
  const imageSrc = card.dataset.imageSrc?.trim() ?? "";
  const imageAlt = card.dataset.imageAlt?.trim() ?? title;

  return { sectionTitle, tag, title, description, ratio, imageSrc, imageAlt };
}

function getContactDetails(card) {
  return {
    tag: card.dataset.imageTag?.trim() ?? "联系方式",
    title: card.dataset.imageTitle?.trim() ?? "联系方式",
    meta: card.dataset.imageMeta?.trim() ?? "二维码 / 联系方式",
    description: card.dataset.imageDescription?.trim() ?? "",
    src: card.dataset.imageSrc?.trim() ?? "",
    alt: card.dataset.imageAlt?.trim() ?? "联系方式二维码",
  };
}

function openLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.hidden = false;
  document.body.classList.add("is-modal-open");
  lightboxClose?.focus();
}

function setLightboxMode(mode) {
  if (!lightboxShell) {
    return;
  }

  lightboxShell.classList.remove("is-image-mode", "is-contact-mode", "is-video-mode");
  if (mode) {
    lightboxShell.classList.add(`is-${mode}-mode`);
  }
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  const video = lightboxPreview?.querySelector("video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  lightbox.hidden = true;
  document.body.classList.remove("is-modal-open");
  setLightboxMode("");
  lightboxPreview.innerHTML = "";
  if (lightboxAction) {
    lightboxAction.hidden = true;
    lightboxAction.removeAttribute("href");
    lightboxAction.textContent = lightboxLabels[currentLanguage].defaultAction;
  }
  lightboxEmpty.innerHTML = defaultLightboxEmptyMarkup;
  lightboxEmpty.hidden = true;
  activeImageCard = null;

  if (activeTrigger instanceof HTMLElement) {
    activeTrigger.focus();
  }
}

function setModalText(details, meta) {
  lightboxTag.textContent = details.tag;
  lightboxTitle.textContent = details.title;
  lightboxMeta.textContent = meta;
  lightboxDescription.textContent = details.description;
}

function renderPreview(node) {
  lightboxPreview.innerHTML = "";
  if (node) {
    lightboxPreview.append(node);
  }
}

function setLightboxAction(href, label) {
  if (!lightboxAction) {
    return;
  }

  if (!href) {
    lightboxAction.hidden = true;
    lightboxAction.removeAttribute("href");
    lightboxAction.textContent = lightboxLabels[currentLanguage].defaultAction;
    return;
  }

  lightboxAction.href = href;
  lightboxAction.textContent = label || "打开视频链接";
  lightboxAction.hidden = false;
}

function openContactPreview(card) {
  if (!card) {
    return;
  }

  activeImageCard = null;
  activeTrigger = card;

  const details = getContactDetails(card);
  const image = document.createElement("img");
  image.src = details.src;
  image.alt = details.alt;

  renderPreview(image);
  setLightboxMode("contact");
  setLightboxAction("");
  lightboxPrev.hidden = true;
  lightboxNext.hidden = true;
  lightboxEmpty.hidden = true;
  setModalText(
    {
      tag: details.tag,
      title: details.title,
      description: details.description,
    },
    details.meta,
  );
  openLightbox();
}

function updateImageNav() {
  const multipleImages = getVisibleShowcaseCards().length > 1;
  lightboxPrev.hidden = !multipleImages;
  lightboxNext.hidden = !multipleImages;
}

function openImagePreview(target) {
  const card = typeof target === "number" ? getVisibleShowcaseCards()[target] ?? showcaseCards[target] : target;
  if (!card) {
    return;
  }

  activeImageCard = card;
  activeTrigger = card;

  const details = getCardDetails(card);
  const previewNode = details.imageSrc
    ? Object.assign(document.createElement("img"), {
        src: details.imageSrc,
        alt: details.imageAlt,
      })
    : card.querySelector(".media-surface")?.cloneNode(true);

  renderPreview(previewNode);
  setLightboxMode("image");
  setModalText(details, [details.sectionTitle, details.ratio].filter(Boolean).join(" / "));
  setLightboxAction("");
  lightboxEmpty.hidden = true;
  updateImageNav();
  openLightbox();
}

function stepImagePreview(direction) {
  if (!(activeImageCard instanceof HTMLElement)) {
    return;
  }

  const visibleShowcaseCards = getVisibleShowcaseCards();
  const currentIndex = visibleShowcaseCards.indexOf(activeImageCard);
  if (currentIndex < 0 || visibleShowcaseCards.length === 0) {
    return;
  }

  const nextIndex = (currentIndex + direction + visibleShowcaseCards.length) % visibleShowcaseCards.length;
  openImagePreview(visibleShowcaseCards[nextIndex]);
}

function openVideoPreview(card) {
  if (!card) {
    return;
  }

  activeImageCard = null;
  activeTrigger = card;

  const details = getCardDetails(card);
  const videoSrc = card.dataset.videoSrc?.trim();
  const videoType = card.dataset.videoType?.trim() || "video/mp4";
  const videoLink = card.dataset.videoLink?.trim() ?? "";
  const videoLinkLabel = card.dataset.videoLinkLabel?.trim() ?? "打开视频链接";

  lightboxPrev.hidden = true;
  lightboxNext.hidden = true;

  if (videoSrc) {
    const video = document.createElement("video");
    const source = document.createElement("source");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    source.src = videoSrc;
    source.type = videoType;
    video.append(source);
    renderPreview(video);
    lightboxEmpty.hidden = true;
    setLightboxAction("");
    video.load();
    void video.play().catch(() => {});
  } else {
    const surface = card.querySelector(".video-surface")?.cloneNode(true);
    renderPreview(surface);
    lightboxEmpty.innerHTML = videoLink
      ? lightboxLabels[currentLanguage].emptyLinked
      : defaultLightboxEmptyMarkup;
    lightboxEmpty.hidden = false;
    setLightboxAction(videoLink, videoLinkLabel);
  }

  setLightboxMode("video");
  setModalText(details, [details.sectionTitle, details.ratio].filter(Boolean).join(" / "));
  openLightbox();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });

  button.addEventListener("keydown", (event) => {
    const currentIndex = Array.from(filterButtons).indexOf(button);
    if (currentIndex < 0) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      filterButtons[(currentIndex + 1) % filterButtons.length].focus();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      filterButtons[(currentIndex - 1 + filterButtons.length) % filterButtons.length].focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      filterButtons[0].focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      filterButtons[filterButtons.length - 1].focus();
    }
  });
});

navToggle?.addEventListener("click", () => {
  const activeButton = document.querySelector(".filter-button.is-active");
  const currentFilter = activeButton?.dataset.filter ?? "all";
  const currentIndex = filterOrder.indexOf(currentFilter);
  const nextFilter = filterOrder[(currentIndex + 1) % filterOrder.length];

  applyFilter(nextFilter);
  document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme === "light" ? "light" : "dark";
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "zh" : "en");
});

updateCardAccessibilityByLanguage();
syncVideoCardStateLabels();
initVideoCardPreviews();
scheduleVisualEnhancements();

interactiveCards.forEach((card) => {
  bindCardTilt(card);
});

showcaseCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    openImagePreview(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImagePreview(card);
    }
  });
});

videoCards.forEach((card) => {
  card.addEventListener("click", () => {
    openVideoPreview(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openVideoPreview(card);
    }
  });
});

contactCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (prefersSingleTapPreview()) {
      openContactPreview(card);
    }
  });

  card.addEventListener("dblclick", () => {
    openContactPreview(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openContactPreview(card);
    }
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => stepImagePreview(-1));
lightboxNext?.addEventListener("click", () => stepImagePreview(1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (lightbox?.hidden) {
    return;
  }

  if (event.key === "Tab" && lightbox) {
    const focusableElements = getFocusableElements(lightbox);
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft" && activeImageCard) {
    stepImagePreview(-1);
  }

  if (event.key === "ArrowRight" && activeImageCard) {
    stepImagePreview(1);
  }
});

initLanguage();
initTheme();
applyFilter("all");
startEntrySequence();
