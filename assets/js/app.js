const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujrati");

const intro = document.querySelector(".intro");
const clickBtn = document.querySelector(".click");
const homeBtn = document.querySelector(".home-btn");

const topicContainer = document.querySelector(".topic-container");
const swiperSection = document.querySelector(".custom-swiper-section");
const topic1 = document.querySelector(".topic-1");
const topic2 = document.querySelector(".topic-2");
const topic3 = document.querySelector(".topic-3");
const topic4 = document.querySelector(".topic-4");
const pageTitleSpan = document.querySelector(".page-title span");

const DEFAULT_LANG = "English";
const STORAGE_LANG_KEY = "selectedLanguage";
let translations = {};

let videoSwiper;
let contentSwiper;
let currentTopicIndex = 0;

// last topic in the visual order (its final slide goes to pranam.html)
const LAST_TOPIC_INDEX = 3;

// 4 topic swipers data
const topicSlidesData = {
  1: [
    { video: "./assets/videos/1-1.mp4", key: "slide-1.1" },
    { video: "./assets/videos/1-2.mp4", key: "slide-1.2" },
    { video: "./assets/videos/1-3.mp4", key: "slide-1.3" },
    { video: "./assets/videos/1-4.mp4", key: "slide-1.4" },
    { video: "./assets/videos/1-5.mp4", key: "slide-1.5" },
    { video: "./assets/videos/1-6.mp4", key: "slide-1.6" },
    { video: "./assets/videos/1-7.mp4", key: "slide-1.7" },
    { video: "./assets/videos/1-8.mp4", key: "slide-1.8" },
    { video: "./assets/videos/1-9.mp4", key: "slide-1.9" },
    { video: "./assets/videos/1-10.mp4", key: "slide-1.10" },
    { video: "./assets/videos/1-11.mp4", key: "slide-1.11" },
    { video: "./assets/videos/1-12.mp4", key: "slide-1.12" },
    { video: "./assets/videos/1-13.mp4", key: "slide-1.13" },
    { video: "./assets/videos/1-14.mp4", key: "slide-1.14" },
    { video: "./assets/videos/1-15.mp4", key: "slide-1.15" },
    { video: "./assets/videos/1-16.mp4", key: "slide-1.16" },
    { video: "./assets/videos/1-17.mp4", key: "slide-1.17" },
    { video: "./assets/videos/1-18.mp4", key: "slide-1.18" },
    { video: "./assets/videos/1-19.mp4", key: "slide-1.19" },
    { video: "./assets/videos/1-20.mp4", key: "slide-1.20" },
    { video: "./assets/videos/1-21.mp4", key: "slide-1.21" },
    { video: "./assets/videos/1-22.mp4", key: "slide-1.22" },
    { video: "./assets/videos/1-23.mp4", key: "slide-1.23" },
    { video: "./assets/videos/1-24.mp4", key: "slide-1.24" },
    { video: "./assets/videos/1-25.mp4", key: "slide-1.25" },
    { video: "./assets/videos/1-26.mp4", key: "slide-1.26" },
    { video: "./assets/videos/1-27.mp4", key: "slide-1.27" },
    { video: "./assets/videos/1-28.mp4", key: "slide-1.28" },
    { video: "./assets/videos/1-29.mp4", key: "slide-1.29" },
    { video: "./assets/videos/1-30.mp4", key: "slide-1.30" },
    { video: "./assets/videos/1-31.mp4", key: "slide-1.31" },
    { video: "./assets/videos/1-32.mp4", key: "slide-1.32" },
  ],
  2: [
    { video: "./assets/videos/2-1.mp4", key: "slide-2.1" },
    { video: "./assets/videos/2-2.mp4", key: "slide-2.2" },
    { video: "./assets/videos/2-3.mp4", key: "slide-2.3" },
    { video: "./assets/videos/2-4.mp4", key: "slide-2.4" },
    { video: "./assets/videos/2-5.mp4", key: "slide-2.5" },
    { video: "./assets/videos/2-6.mp4", key: "slide-2.6" },
    { video: "./assets/videos/2-7.mp4", key: "slide-2.7" },
    { video: "./assets/videos/2-8.mp4", key: "slide-2.8" },
  ],
  3: [
    { video: "./assets/videos/3-1.mp4", key: "slide-3.1" },
    { video: "./assets/videos/3-2.mp4", key: "slide-3.2" },
    { video: "./assets/videos/3-3.mp4", key: "slide-3.3" },
    { video: "./assets/videos/3-4.mp4", key: "slide-3.4" },
    { video: "./assets/videos/3-5.mp4", key: "slide-3.5" },
  ],
  4: [
    { video: "./assets/videos/4-1.mp4", key: "slide-4.1" },
    { video: "./assets/videos/4-2.mp4", key: "slide-4.2" },
  ],
};

function getSavedLanguage() {
  return localStorage.getItem(STORAGE_LANG_KEY) || DEFAULT_LANG;
}

function saveLanguage(lang) {
  localStorage.setItem(STORAGE_LANG_KEY, lang);
}

// set active language button
function setActiveButton(activeBtn) {
  [btnEn, btnHi, btnGu].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// create right side pages
function createPages() {
  let pagesContainer = document.querySelector(".pages");

  if (!pagesContainer) {
    pagesContainer = document.createElement("div");
    pagesContainer.className = "pages";
    pagesContainer.innerHTML = `
      <a class="page page-4 active" href="topic-4.html" data-page="4" data-lang-key="num-1"></a>
      <a class="page page-1" href="topic-1.html" data-page="1" data-lang-key="num-2"></a>
      <a class="page page-2" href="topic-2.html" data-page="2" data-lang-key="num-3"></a>
      <a class="page page-3" href="topic-3.html" data-page="3" data-lang-key="num-4"></a>
    `;
    document.querySelector("main").appendChild(pagesContainer);
  }

  pagesContainer.addEventListener("click", (e) => {
    const pageLink = e.target.closest(".page");
    if (!pageLink) return;

    e.preventDefault();
    const pageNum = Number(pageLink.getAttribute("data-page"));
    showTopicSwiper(pageNum);
  });
}

// set active page
function updateActivePage(topicIndex) {
  document.querySelectorAll(".pages .page").forEach((page) => {
    page.classList.remove("active");
  });

  const activePage = document.querySelector(`.pages .page-${topicIndex}`);
  if (activePage) {
    activePage.classList.add("active");
  }
}

// build slides for selected topic
function createSlides(topicIndex = 1) {
  const videoWrapper = document.getElementById("video-swiper-wrapper");
  const contentWrapper = document.getElementById("content-swiper-wrapper");
  const slidesData = topicSlidesData[topicIndex] || topicSlidesData[1];

  let videoHTML = "";
  let contentHTML = "";

  slidesData.forEach((slide, index) => {
    videoHTML += `
      <div class="swiper-slide" data-slide-index="${index}">
        <div class="video-slide-inner">
          <video playsinline muted preload="metadata">
            <source src="${slide.video}" type="video/mp4" />
          </video>
        </div>
      </div>
    `;

    contentHTML += `
      <div class="swiper-slide" data-slide-index="${index}">
        <div class="content-slide-inner">
          <p class="slide-text" data-slide-key="${slide.key}"></p>
        </div>
      </div>
    `;
  });

  videoWrapper.innerHTML = videoHTML;
  contentWrapper.innerHTML = contentHTML;
}

// destroy old swipers safely
function destroySwipers() {
  if (videoSwiper) {
    videoSwiper.destroy(true, true);
    videoSwiper = null;
  }

  if (contentSwiper) {
    contentSwiper.destroy(true, true);
    contentSwiper = null;
  }
}

// init swipers
function initSwipers() {
  const slidesData = topicSlidesData[currentTopicIndex] || topicSlidesData[1];

  videoSwiper = new Swiper(".video-swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 600,
    allowTouchMove: false,
  });

  contentSwiper = new Swiper(".content-swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 600,
    allowTouchMove: false,
    autoHeight: false,
  });

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (prevBtn) {
    prevBtn.onclick = () => {
      const activeIndex = contentSwiper.activeIndex;
      if (activeIndex > 0) {
        goToSlide(activeIndex - 1);
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      const activeIndex = contentSwiper.activeIndex;
      const lastIndex = slidesData.length - 1;

      if (currentTopicIndex === LAST_TOPIC_INDEX && activeIndex === lastIndex) {
        window.location.href = "pranam.html";
        return;
      }

      if (activeIndex < lastIndex) {
        goToSlide(activeIndex + 1);
      }
    };
  }

  videoSwiper.on("slideChangeTransitionStart", pauseAllVideos);
  videoSwiper.on("slideChangeTransitionEnd", () => {
    playActiveVideo(videoSwiper.activeIndex);
    updateNavButtons(videoSwiper.activeIndex);
  });

  updateNavButtons(0);
  playActiveVideo(0);
}

// go both swipers same slide
function goToSlide(index) {
  if (!videoSwiper || !contentSwiper) return;

  videoSwiper.slideTo(index);
  contentSwiper.slideTo(index);
  updateNavButtons(index);
}

// update nav buttons
function updateNavButtons(index) {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slidesData = topicSlidesData[currentTopicIndex] || topicSlidesData[1];
  const lastIndex = slidesData.length - 1;

  if (prevBtn) {
    prevBtn.classList.toggle("disabled", index === 0);
  }

  if (nextBtn) {
    if (currentTopicIndex === LAST_TOPIC_INDEX && index === lastIndex) {
      nextBtn.classList.remove("disabled");
    } else {
      nextBtn.classList.toggle("disabled", index === lastIndex);
    }
  }
}

// pause all videos
function pauseAllVideos() {
  document.querySelectorAll(".video-slide-inner video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

// play active video
function playActiveVideo(index) {
  const activeVideo = document.querySelector(
    `.video-swiper .swiper-slide[data-slide-index="${index}"] video`,
  );

  if (!activeVideo) return;

  const playPromise = activeVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

// apply language
function applyLanguage(lang) {
  const langData = translations[lang];
  if (!langData) return;

  saveLanguage(lang);
  document.documentElement.lang = lang;

  if (lang === "English") {
    document.body.setAttribute("data-lang", "en");
    setActiveButton(btnEn);
  } else if (lang === "Hindi") {
    document.body.setAttribute("data-lang", "hi");
    setActiveButton(btnHi);
  } else if (lang === "Gujarati") {
    document.body.setAttribute("data-lang", "gu");
    setActiveButton(btnGu);
  }

  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    if (langData[key] !== undefined) {
      el.innerHTML = String(langData[key]).replace(/\n/g, "<br>");
    }
  });

  document.querySelectorAll(".slide-text").forEach((el) => {
    const key = el.getAttribute("data-slide-key");
    if (langData[key] !== undefined) {
      el.innerHTML = String(langData[key]).replace(/\n/g, "<br>");
    } else {
      el.innerHTML = "";
    }
  });
}

// initial intro state
function setInitialState() {
  document.body.classList.remove("show-main");
  document.body.classList.remove("show-swiper");

  if (intro) {
    intro.classList.remove("hide");
    intro.style.display = "flex";

    requestAnimationFrame(() => {
      intro.classList.add("show");
    });
  }

  if (topicContainer) {
    topicContainer.style.display = "";
  }

  if (swiperSection) {
    swiperSection.style.display = "none";
  }

  const pages = document.querySelector(".pages");
  if (pages) {
    pages.style.display = "none";
  }

  if (pageTitleSpan) {
    pageTitleSpan.setAttribute("data-lang-key", "title");
  }
}

// show topic list
function showMainContent() {
  if (!intro) return;

  intro.classList.remove("show");
  intro.classList.add("hide");

  setTimeout(() => {
    intro.style.display = "none";
    document.body.classList.add("show-main");
    document.body.classList.remove("show-swiper");

    if (topicContainer) {
      topicContainer.style.display = "";
    }

    if (swiperSection) {
      swiperSection.style.display = "none";
    }

    const pages = document.querySelector(".pages");
    if (pages) {
      pages.style.display = "none";
    }

    if (pageTitleSpan) {
      pageTitleSpan.setAttribute("data-lang-key", "title");
    }

    applyLanguage(getSavedLanguage());
  }, 500);
}

// show selected topic swiper
function showTopicSwiper(topicIndex) {
  if (!topicSlidesData[topicIndex]) return;

  currentTopicIndex = topicIndex;

  document.body.classList.add("show-main");
  document.body.classList.add("show-swiper");

  if (intro) {
    intro.style.display = "none";
  }

  if (topicContainer) {
    topicContainer.style.display = "none";
  }

  if (swiperSection) {
    swiperSection.style.display = "flex";
  }

  const pages = document.querySelector(".pages");
  if (pages) {
    pages.style.display = "flex";
  }

  updateActivePage(topicIndex);

  if (pageTitleSpan) {
    pageTitleSpan.setAttribute("data-lang-key", `title-${topicIndex}`);
  }

  destroySwipers();
  createSlides(topicIndex);
  initSwipers();
  applyLanguage(getSavedLanguage());
  goToSlide(0);
}

// back to intro
function goToInitialState(e) {
  e.preventDefault();

  document.body.classList.remove("show-main");
  document.body.classList.remove("show-swiper");

  if (topicContainer) {
    topicContainer.style.display = "";
  }

  if (swiperSection) {
    swiperSection.style.display = "none";
  }

  const pages = document.querySelector(".pages");
  if (pages) {
    pages.style.display = "none";
  }

  if (pageTitleSpan) {
    pageTitleSpan.setAttribute("data-lang-key", "title");
  }

  if (intro) {
    intro.style.display = "flex";

    requestAnimationFrame(() => {
      intro.classList.remove("hide");
      intro.classList.add("show");
    });
  }

  applyLanguage(getSavedLanguage());
}

// page load
window.addEventListener("DOMContentLoaded", () => {
  createPages();
  createSlides(1);

  fetch("./assets/json/data.json")
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      currentTopicIndex = 1;
      initSwipers();
      setInitialState();
      applyLanguage(getSavedLanguage());

      const params = new URLSearchParams(window.location.search);
      const topicFromURL = Number(params.get("topic"));

      if (topicSlidesData[topicFromURL]) {
        showTopicSwiper(topicFromURL);
      }
    })
    .catch((err) => console.error("Error loading translations:", err));
});

// language buttons
if (btnEn) {
  btnEn.addEventListener("click", () => applyLanguage("English"));
}
if (btnHi) {
  btnHi.addEventListener("click", () => applyLanguage("Hindi"));
}
if (btnGu) {
  btnGu.addEventListener("click", () => applyLanguage("Gujarati"));
}

if (clickBtn) {
  clickBtn.addEventListener("click", showMainContent);
}
if (homeBtn) {
  homeBtn.addEventListener("click", goToInitialState);
}

// topic clicks
if (topic1) {
  topic1.addEventListener("click", (e) => {
    e.preventDefault();
    showTopicSwiper(1);
  });
}

if (topic2) {
  topic2.addEventListener("click", (e) => {
    e.preventDefault();
    showTopicSwiper(2);
  });
}

if (topic3) {
  topic3.addEventListener("click", (e) => {
    e.preventDefault();
    showTopicSwiper(3);
  });
}

if (topic4) {
  topic4.addEventListener("click", (e) => {
    e.preventDefault();
    showTopicSwiper(4);
  });
}