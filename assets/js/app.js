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

const pageTitleSpan =
  document.querySelector(".page-title span");


// ======================================================
// PRANAM LINK
// ======================================================

const pranamLink =
  document.querySelector(".pranam-link");


const DEFAULT_LANG = "English";
const STORAGE_LANG_KEY = "selectedLanguage";

let translations = {};

let videoSwiper;
let contentSwiper;

let currentTopicIndex = 1;


// last topic in the visual order
const LAST_TOPIC_INDEX = 3;


/* ==================================================
   AUDIO
=================================================== */

const AUDIO_PATH = "./assets/audio/";

const SFX = {

  english:
    new Audio(`${AUDIO_PATH}Eng.mpeg`),

  hindi:
    new Audio(`${AUDIO_PATH}Hin.mpeg`),

  gujarati:
    new Audio(`${AUDIO_PATH}Guj.mpeg`),

  pop:
    new Audio(`${AUDIO_PATH}pop.mp3`),

  topic:
    new Audio(`${AUDIO_PATH}topic.mp3`),

};


Object.values(SFX).forEach((audio) => {

  audio.preload = "auto";

});


// stop every sfx, then play requested one
function playSfx(name) {

  const audio = SFX[name];

  if (!audio) return;


  Object.values(SFX).forEach((sound) => {

    sound.pause();

    sound.currentTime = 0;

  });


  const playPromise =
    audio.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch((err) => {

      console.warn(
        `Could not play ${name} audio:`,
        err
      );

    });

  }

}


/* ==================================================
   TOPIC SLIDES DATA
=================================================== */

const topicSlidesData = {

  // ==================================================
  // TOPIC 1
  // ==================================================

  1: [

    {
      video: "./assets/videos/1-1.mp4",
      key: "slide-1.1"
    },

    {
      video: "./assets/videos/1-2.mp4",
      key: "slide-1.2"
    },

    {
      video: "./assets/videos/1-3.mp4",
      key: "slide-1.3"
    },

    {
      video: "./assets/videos/1-4.mp4",
      key: "slide-1.4"
    },

    {
      video: "./assets/videos/1-5.mp4",
      key: "slide-1.5"
    },

    {
      video: "./assets/videos/1-6.mp4",
      key: "slide-1.6"
    },

    {
      video: "./assets/videos/1-7.mp4",
      key: "slide-1.7"
    },

    {
      video: "./assets/videos/1-8.mp4",
      key: "slide-1.8"
    },

    {
      video: "./assets/videos/1-9.mp4",
      key: "slide-1.9"
    },

    {
      video: "./assets/videos/1-10.mp4",
      key: "slide-1.10"
    },

    {
      video: "./assets/videos/1-11.mp4",
      key: "slide-1.11"
    },

    {
      video: "./assets/videos/1-12.mp4",
      key: "slide-1.12"
    },

    {
      video: "./assets/videos/1-13.mp4",
      key: "slide-1.13"
    },

    {
      video: "./assets/videos/1-14.mp4",
      key: "slide-1.14"
    },

    {
      video: "./assets/videos/1-15.mp4",
      key: "slide-1.15"
    },

    {
      video: "./assets/videos/1-16.mp4",
      key: "slide-1.16"
    },

    {
      video: "./assets/videos/1-17.mp4",
      key: "slide-1.17"
    },

    {
      video: "./assets/videos/1-18.mp4",
      key: "slide-1.18"
    },

    {
      video: "./assets/videos/1-19.mp4",
      key: "slide-1.19"
    },

    {
      video: "./assets/videos/1-20.mp4",
      key: "slide-1.20"
    },

    {
      video: "./assets/videos/1-21.mp4",
      key: "slide-1.21"
    },

    {
      video: "./assets/videos/1-22.mp4",
      key: "slide-1.22"
    },

    {
      video: "./assets/videos/1-23.mp4",
      key: "slide-1.23"
    },

    {
      video: "./assets/videos/1-24.mp4",
      key: "slide-1.24"
    },

    {
      video: "./assets/videos/1-25.mp4",
      key: "slide-1.25"
    },

    {
      video: "./assets/videos/1-26.mp4",
      key: "slide-1.26"
    },

    {
      video: "./assets/videos/1-27.mp4",
      key: "slide-1.27"
    },

    {
      video: "./assets/videos/1-28.mp4",
      key: "slide-1.28"
    },

    {
      video: "./assets/videos/1-29.mp4",
      key: "slide-1.29"
    },

    {
      video: "./assets/videos/1-30.mp4",
      key: "slide-1.30"
    },

    {
      video: "./assets/videos/1-31.mp4",
      key: "slide-1.31"
    },

    {
      video: "./assets/videos/1-32.mp4",
      key: "slide-1.32"
    },

  ],


  // ==================================================
  // TOPIC 2
  // ==================================================

  2: [

    {
      video: "./assets/videos/2-1.mp4",
      key: "slide-2.1"
    },

    {
      video: "./assets/videos/2-2.mp4",
      key: "slide-2.2"
    },

    {
      video: "./assets/videos/2-3.mp4",
      key: "slide-2.3"
    },

    {
      video: "./assets/videos/2-4.mp4",
      key: "slide-2.4"
    },

    {
      video: "./assets/videos/2-5.mp4",
      key: "slide-2.5"
    },

    {
      video: "./assets/videos/2-6.mp4",
      key: "slide-2.6"
    },

    {
      video: "./assets/videos/2-7.mp4",
      key: "slide-2.7"
    },

    {
      video: "./assets/videos/2-8.mp4",
      key: "slide-2.8"
    },

  ],


  // ==================================================
  // TOPIC 3
  // ==================================================

  3: [

    {
      video: "./assets/videos/3-1.mp4",
      key: "slide-3.1"
    },

    {
      video: "./assets/videos/3-2.mp4",
      key: "slide-3.2"
    },

    {
      video: "./assets/videos/3-3.mp4",
      key: "slide-3.3"
    },

    {
      video: "./assets/videos/3-4.mp4",
      key: "slide-3.4"
    },

    {
      video: "./assets/videos/3-5.mp4",
      key: "slide-3.5"
    },

  ],


  // ==================================================
  // TOPIC 4
  // ==================================================

  4: [

    {
      video: "./assets/videos/4-1.mp4",
      key: "slide-4.1"
    },

    {
      video: "./assets/videos/4-2.mp4",
      key: "slide-4.2"
    },

  ],

};


/* ==================================================
   PRANAM LINK FUNCTIONS
=================================================== */


// Hide Pranam link
function hidePranamLink() {

  if (!pranamLink) return;


  pranamLink.classList.remove(
    "show"
  );


  pranamLink.style.display =
    "none";

  pranamLink.style.opacity =
    "0";

  pranamLink.style.visibility =
    "hidden";

  pranamLink.style.pointerEvents =
    "none";

}


// Show Pranam link
function showPranamLink() {

  if (!pranamLink) return;


  pranamLink.classList.add(
    "show"
  );


  pranamLink.style.display =
    "flex";

  pranamLink.style.opacity =
    "1";

  pranamLink.style.visibility =
    "visible";

  pranamLink.style.pointerEvents =
    "auto";

}


// Check whether Pranam should show
function updatePranamLink(index) {

  // Always hide first
  hidePranamLink();


  const slidesData =
    topicSlidesData[currentTopicIndex];


  if (!slidesData) return;

  if (!slidesData[index]) return;


  const activeSlide =
    slidesData[index];


  // ==================================================
  // SHOW ONLY:
  // TOPIC 3
  // LAST SLIDE
  // VIDEO 3-5.mp4
  // ==================================================

  if (
    currentTopicIndex === 3 &&
    activeSlide.video &&
    activeSlide.video.includes(
      "3-5.mp4"
    )
  ) {

    showPranamLink();

  }

}


/* ==================================================
   LANGUAGE
=================================================== */

function getSavedLanguage() {

  return (
    localStorage.getItem(
      STORAGE_LANG_KEY
    ) ||
    DEFAULT_LANG
  );

}


function saveLanguage(lang) {

  localStorage.setItem(
    STORAGE_LANG_KEY,
    lang
  );

}


function setActiveButton(activeBtn) {

  [
    btnEn,
    btnHi,
    btnGu
  ].forEach((btn) => {

    if (btn) {

      btn.classList.remove(
        "active"
      );

    }

  });


  if (activeBtn) {

    activeBtn.classList.add(
      "active"
    );

  }

}


/* ==================================================
   CREATE RIGHT SIDE PAGES
=================================================== */

function createPages() {

  const main =
    document.querySelector("main");


  if (!main) return;


  let pagesContainer =
    document.querySelector(".pages");


  if (!pagesContainer) {

    pagesContainer =
      document.createElement("div");


    pagesContainer.className =
      "pages";


    pagesContainer.innerHTML = `

      <a
        class="page page-4 active"
        href="topic-4.html"
        data-page="4"
        data-lang-key="num-1"
      ></a>


      <a
        class="page page-1"
        href="topic-1.html"
        data-page="1"
        data-lang-key="num-2"
      ></a>


      <a
        class="page page-2"
        href="topic-2.html"
        data-page="2"
        data-lang-key="num-3"
      ></a>


      <a
        class="page page-3"
        href="topic-3.html"
        data-page="3"
        data-lang-key="num-4"
      ></a>

    `;


    main.appendChild(
      pagesContainer
    );

  }


  /* ==================================================
     PAGE CLICK
  =================================================== */

  pagesContainer.addEventListener(
    "click",
    (e) => {

      const pageLink =
        e.target.closest(".page");


      if (!pageLink) return;


      e.preventDefault();


      // Hide Pranam while changing page
      hidePranamLink();


      // Play topic.mp3
      playSfx("topic");


      const pageNum =
        Number(
          pageLink.getAttribute(
            "data-page"
          )
        );


      showTopicSwiper(
        pageNum
      );

    }
  );

}


/* ==================================================
   ACTIVE PAGE
=================================================== */

function updateActivePage(
  topicIndex
) {

  document
    .querySelectorAll(
      ".pages .page"
    )
    .forEach((page) => {

      page.classList.remove(
        "active"
      );

    });


  const activePage =
    document.querySelector(
      `.pages .page-${topicIndex}`
    );


  if (activePage) {

    activePage.classList.add(
      "active"
    );

  }

}


/* ==================================================
   CREATE SLIDES
=================================================== */

function createSlides(
  topicIndex = 1
) {

  const videoWrapper =
    document.getElementById(
      "video-swiper-wrapper"
    );


  const contentWrapper =
    document.getElementById(
      "content-swiper-wrapper"
    );


  if (
    !videoWrapper ||
    !contentWrapper
  ) {

    return;

  }


  const slidesData =
    topicSlidesData[topicIndex] ||
    topicSlidesData[1];


  let videoHTML = "";

  let contentHTML = "";


  slidesData.forEach(
    (slide, index) => {

      // VIDEO
      videoHTML += `

        <div
          class="swiper-slide"
          data-slide-index="${index}"
        >

          <div class="video-slide-inner">

            <video
              playsinline
              muted
              preload="metadata"
            >

              <source
                src="${slide.video}"
                type="video/mp4"
              />

            </video>

          </div>

        </div>

      `;


      // CONTENT
      contentHTML += `

        <div
          class="swiper-slide"
          data-slide-index="${index}"
        >

          <div class="content-slide-inner">

            <p
              class="slide-text"
              data-slide-key="${slide.key}"
            ></p>

          </div>

        </div>

      `;

    }
  );


  videoWrapper.innerHTML =
    videoHTML;


  contentWrapper.innerHTML =
    contentHTML;

}


/* ==================================================
   DESTROY SWIPERS
=================================================== */

function destroySwipers() {

  if (videoSwiper) {

    videoSwiper.destroy(
      true,
      true
    );


    videoSwiper = null;

  }


  if (contentSwiper) {

    contentSwiper.destroy(
      true,
      true
    );


    contentSwiper = null;

  }

}


/* ==================================================
   INIT SWIPERS
=================================================== */

function initSwipers() {

  if (
    typeof Swiper === "undefined"
  ) {

    console.error(
      "Swiper library not loaded. Check your swiper script tag."
    );


    return;

  }


  const slidesData =
    topicSlidesData[
      currentTopicIndex
    ] ||
    topicSlidesData[1];


  // ==================================================
  // VIDEO SWIPER
  // ==================================================

  videoSwiper =
    new Swiper(
      ".video-swiper",
      {

        effect: "fade",

        fadeEffect: {

          crossFade: true,

        },

        speed: 600,

        allowTouchMove: false,

      }
    );


  // ==================================================
  // CONTENT SWIPER
  // ==================================================

  contentSwiper =
    new Swiper(
      ".content-swiper",
      {

        effect: "fade",

        fadeEffect: {

          crossFade: true,

        },

        speed: 600,

        allowTouchMove: false,

        autoHeight: false,

      }
    );


  const prevBtn =
    document.querySelector(
      ".prev-btn"
    );


  const nextBtn =
    document.querySelector(
      ".next-btn"
    );


  /* ==================================================
     PREVIOUS
  =================================================== */

  if (prevBtn) {

    prevBtn.onclick = () => {

      const activeIndex =
        contentSwiper.activeIndex;


      if (
        activeIndex > 0
      ) {

        goToSlide(
          activeIndex - 1
        );

      }

    };

  }


  /* ==================================================
     NEXT
  =================================================== */

  if (nextBtn) {

    nextBtn.onclick = () => {

      const activeIndex =
        contentSwiper.activeIndex;


      const lastIndex =
        slidesData.length - 1;


      // If already on final Topic 3 slide,
      // do nothing because Pranam link is shown.
      if (
        currentTopicIndex ===
          LAST_TOPIC_INDEX &&
        activeIndex ===
          lastIndex
      ) {

        return;

      }


      if (
        activeIndex <
        lastIndex
      ) {

        goToSlide(
          activeIndex + 1
        );

      }

    };

  }


  // ==================================================
  // VIDEO TRANSITION START
  // ==================================================

  videoSwiper.on(
    "slideChangeTransitionStart",
    () => {

      pauseAllVideos();

    }
  );


  // ==================================================
  // VIDEO TRANSITION END
  // ==================================================

  videoSwiper.on(
    "slideChangeTransitionEnd",
    () => {

      const activeIndex =
        videoSwiper.activeIndex;


      playActiveVideo(
        activeIndex
      );


      updateNavButtons(
        activeIndex
      );


      // Important
      updatePranamLink(
        activeIndex
      );

    }
  );


  // ==================================================
  // CONTENT SLIDE CHANGE
  // ==================================================

  contentSwiper.on(
    "slideChange",
    () => {

      const activeIndex =
        contentSwiper.activeIndex;


      updateNavButtons(
        activeIndex
      );


      updatePranamLink(
        activeIndex
      );

    }
  );


  // Initial
  updateNavButtons(0);

  updatePranamLink(0);

  playActiveVideo(0);

}


/* ==================================================
   GO TO SLIDE
=================================================== */

function goToSlide(index) {

  if (
    !videoSwiper ||
    !contentSwiper
  ) {

    return;

  }


  const slidesData =
    topicSlidesData[
      currentTopicIndex
    ];


  if (!slidesData) return;


  if (
    index < 0 ||
    index >=
      slidesData.length
  ) {

    return;

  }


  // Hide/show immediately
  updatePranamLink(
    index
  );


  videoSwiper.slideTo(
    index
  );


  contentSwiper.slideTo(
    index
  );


  updateNavButtons(
    index
  );

}


/* ==================================================
   UPDATE NAVIGATION BUTTONS
=================================================== */

function updateNavButtons(index) {

  const prevBtn =
    document.querySelector(
      ".prev-btn"
    );


  const nextBtn =
    document.querySelector(
      ".next-btn"
    );


  const slidesData =
    topicSlidesData[
      currentTopicIndex
    ] ||
    topicSlidesData[1];


  const lastIndex =
    slidesData.length - 1;


  // ==================================================
  // PREVIOUS
  // ==================================================

  if (prevBtn) {

    prevBtn.classList.toggle(
      "disabled",
      index === 0
    );

  }


  // ==================================================
  // NEXT
  // ==================================================

  if (nextBtn) {

    // Hide next button on last slide
    if (
      index === lastIndex
    ) {

      nextBtn.style.display =
        "none";

    } else {

      nextBtn.style.display =
        "";

    }

  }


  // ==================================================
  // PRANAM LINK
  // ==================================================

  updatePranamLink(
    index
  );

}


/* ==================================================
   PAUSE VIDEOS
=================================================== */

function pauseAllVideos() {

  document
    .querySelectorAll(
      ".video-slide-inner video"
    )
    .forEach((video) => {

      video.pause();


      try {

        video.currentTime = 0;

      } catch (error) {

        // Ignore

      }

    });

}


/* ==================================================
   PLAY ACTIVE VIDEO
=================================================== */

function playActiveVideo(index) {

  const activeVideo =
    document.querySelector(
      `.video-swiper .swiper-slide[data-slide-index="${index}"] video`
    );


  if (!activeVideo) return;


  try {

    activeVideo.currentTime = 0;

  } catch (error) {

    // Ignore

  }


  const playPromise =
    activeVideo.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch(
      () => {}
    );

  }

}


/* ==================================================
   APPLY LANGUAGE
=================================================== */

function applyLanguage(lang) {

  const langData =
    translations[lang];


  // ==================================================
  // ACTIVE LANGUAGE BUTTON
  // ==================================================

  if (
    lang === "English"
  ) {

    document.body.setAttribute(
      "data-lang",
      "en"
    );


    setActiveButton(
      btnEn
    );

  }

  else if (
    lang === "Hindi"
  ) {

    document.body.setAttribute(
      "data-lang",
      "hi"
    );


    setActiveButton(
      btnHi
    );

  }

  else if (
    lang === "Gujarati"
  ) {

    document.body.setAttribute(
      "data-lang",
      "gu"
    );


    setActiveButton(
      btnGu
    );

  }


  saveLanguage(
    lang
  );


  document.documentElement.lang =
    lang;


  if (!langData) return;


  // ==================================================
  // GENERAL TEXT
  // ==================================================

  document
    .querySelectorAll(
      "[data-lang-key]"
    )
    .forEach((el) => {

      const key =
        el.getAttribute(
          "data-lang-key"
        );


      if (
        langData[key] !==
        undefined
      ) {

        el.innerHTML =
          String(
            langData[key]
          )
            .replace(
              /\n/g,
              "<br>"
            );

      }

    });


  // ==================================================
  // SLIDE TEXT
  // ==================================================

  document
    .querySelectorAll(
      ".slide-text"
    )
    .forEach((el) => {

      const key =
        el.getAttribute(
          "data-slide-key"
        );


      if (
        langData[key] !==
        undefined
      ) {

        el.innerHTML =
          String(
            langData[key]
          )
            .replace(
              /\n/g,
              "<br>"
            );

      } else {

        el.innerHTML = "";

      }

    });

}


/* ==================================================
   INITIAL STATE
=================================================== */

function setInitialState() {

  // Pranam must be hidden here
  hidePranamLink();


  document.body.classList.remove(
    "show-main"
  );


  document.body.classList.remove(
    "show-swiper"
  );


  if (intro) {

    intro.classList.remove(
      "hide"
    );


    intro.style.display =
      "flex";


    requestAnimationFrame(
      () => {

        intro.classList.add(
          "show"
        );

      }
    );

  }


  if (topicContainer) {

    topicContainer.style.display =
      "";

  }


  if (swiperSection) {

    swiperSection.style.display =
      "none";

  }


  const pages =
    document.querySelector(
      ".pages"
    );


  if (pages) {

    pages.style.display =
      "none";

  }


  if (pageTitleSpan) {

    pageTitleSpan.setAttribute(
      "data-lang-key",
      "title"
    );

  }

}


/* ==================================================
   SHOW MAIN CONTENT
=================================================== */

function showMainContent() {

  if (!intro) return;


  // Hide Pranam on topic screen
  hidePranamLink();


  intro.classList.remove(
    "show"
  );


  intro.classList.add(
    "hide"
  );


  setTimeout(
    () => {

      intro.style.display =
        "none";


      document.body.classList.add(
        "show-main"
      );


      document.body.classList.remove(
        "show-swiper"
      );


      if (topicContainer) {

        topicContainer.style.display =
          "";

      }


      if (swiperSection) {

        swiperSection.style.display =
          "none";

      }


      const pages =
        document.querySelector(
          ".pages"
        );


      if (pages) {

        pages.style.display =
          "none";

      }


      if (pageTitleSpan) {

        pageTitleSpan.setAttribute(
          "data-lang-key",
          "title"
        );

      }


      applyLanguage(
        getSavedLanguage()
      );

    },
    500
  );

}


/* ==================================================
   SHOW TOPIC SWIPER
=================================================== */

function showTopicSwiper(
  topicIndex
) {

  if (
    !topicSlidesData[
      topicIndex
    ]
  ) {

    return;

  }


  // Save topic
  currentTopicIndex =
    topicIndex;


  // Always hide Pranam when
  // a new topic opens
  hidePranamLink();


  document.body.classList.add(
    "show-main"
  );


  document.body.classList.add(
    "show-swiper"
  );


  if (intro) {

    intro.classList.remove(
      "show"
    );


    intro.classList.add(
      "hide"
    );


    intro.style.display =
      "none";

  }


  if (topicContainer) {

    topicContainer.style.display =
      "none";

  }


  if (swiperSection) {

    swiperSection.style.display =
      "flex";

  }


  const pages =
    document.querySelector(
      ".pages"
    );


  if (pages) {

    pages.style.display =
      "flex";

  }


  updateActivePage(
    topicIndex
  );


  if (pageTitleSpan) {

    pageTitleSpan.setAttribute(
      "data-lang-key",
      `title-${topicIndex}`
    );

  }


  destroySwipers();


  createSlides(
    topicIndex
  );


  initSwipers();


  applyLanguage(
    getSavedLanguage()
  );


  goToSlide(0);

}


/* ==================================================
   BACK TO INTRO
=================================================== */

function goToInitialState(e) {

  if (e) {

    e.preventDefault();

  }


  // Hide Pranam
  hidePranamLink();


  document.body.classList.remove(
    "show-main"
  );


  document.body.classList.remove(
    "show-swiper"
  );


  pauseAllVideos();


  if (topicContainer) {

    topicContainer.style.display =
      "";

  }


  if (swiperSection) {

    swiperSection.style.display =
      "none";

  }


  const pages =
    document.querySelector(
      ".pages"
    );


  if (pages) {

    pages.style.display =
      "none";

  }


  if (pageTitleSpan) {

    pageTitleSpan.setAttribute(
      "data-lang-key",
      "title"
    );

  }


  if (intro) {

    intro.style.display =
      "flex";


    requestAnimationFrame(
      () => {

        intro.classList.remove(
          "hide"
        );


        intro.classList.add(
          "show"
        );

      }
    );

  }


  applyLanguage(
    getSavedLanguage()
  );

}


/* ==================================================
   PAGE LOAD
=================================================== */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    // Initially hide Pranam
    hidePranamLink();


    createPages();


    createSlides(1);


    currentTopicIndex =
      1;


    try {

      initSwipers();

    }

    catch (err) {

      console.error(
        "Swiper init failed:",
        err
      );

    }


    setInitialState();


    applyLanguage(
      getSavedLanguage()
    );


    fetch(
      "./assets/json/data.json"
    )

      .then((res) => {

        if (!res.ok) {

          throw new Error(
            `data.json request failed with status ${res.status}`
          );

        }


        return res.json();

      })


      .then((data) => {

        translations =
          data;


        applyLanguage(
          getSavedLanguage()
        );


        const params =
          new URLSearchParams(
            window.location.search
          );


        const topicFromURL =
          Number(
            params.get(
              "topic"
            )
          );


        if (
          topicSlidesData[
            topicFromURL
          ]
        ) {

          showTopicSwiper(
            topicFromURL
          );

        }

      })


      .catch((err) => {

        console.error(
          "Error loading translations:",
          err
        );


        console.error(
          "If you opened index.html from the file system, serve the folder over http instead."
        );

      });

  }
);


/* ==================================================
   LANGUAGE BUTTONS
=================================================== */

if (btnEn) {

  btnEn.addEventListener(
    "click",
    () => {

      playSfx(
        "english"
      );


      applyLanguage(
        "English"
      );

    }
  );

}


if (btnHi) {

  btnHi.addEventListener(
    "click",
    () => {

      playSfx(
        "hindi"
      );


      applyLanguage(
        "Hindi"
      );

    }
  );

}


if (btnGu) {

  btnGu.addEventListener(
    "click",
    () => {

      playSfx(
        "gujarati"
      );


      applyLanguage(
        "Gujarati"
      );

    }
  );

}


/* ==================================================
   INTRO CLICK
=================================================== */

if (clickBtn) {

  clickBtn.addEventListener(
    "click",
    showMainContent
  );

}


/* ==================================================
   HOME BUTTON
=================================================== */

if (homeBtn) {

  homeBtn.addEventListener(
    "click",
    (e) => {

      playSfx(
        "pop"
      );


      hidePranamLink();


      goToInitialState(
        e
      );

    }
  );

}


/* ==================================================
   TOPIC 1 CLICK
=================================================== */

if (topic1) {

  topic1.addEventListener(
    "click",
    (e) => {

      e.preventDefault();


      hidePranamLink();


      showTopicSwiper(
        1
      );

    }
  );

}


/* ==================================================
   TOPIC 2 CLICK
=================================================== */

if (topic2) {

  topic2.addEventListener(
    "click",
    (e) => {

      e.preventDefault();


      hidePranamLink();


      showTopicSwiper(
        2
      );

    }
  );

}


/* ==================================================
   TOPIC 3 CLICK
=================================================== */

if (topic3) {

  topic3.addEventListener(
    "click",
    (e) => {

      e.preventDefault();


      hidePranamLink();


      showTopicSwiper(
        3
      );

    }
  );

}


/* ==================================================
   TOPIC 4 CLICK
=================================================== */

if (topic4) {

  topic4.addEventListener(
    "click",
    (e) => {

      e.preventDefault();


      hidePranamLink();


      showTopicSwiper(
        4
      );

    }
  );

}


/* ==================================================
   PRANAM LINK CLICK
=================================================== */

if (pranamLink) {

  pranamLink.addEventListener(
    "click",
    () => {

      // Hide immediately while
      // navigating to pranam.html
      hidePranamLink();

    }
  );

}