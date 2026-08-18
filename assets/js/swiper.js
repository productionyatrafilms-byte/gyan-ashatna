// ======================================================
// TOPIC SLIDE DATA
// ======================================================

const topicSlides = {

  // ====================================================
  // TOPIC 1
  // ====================================================

  1: [
    {
      video: "./assets/videos/slide-1.mp4",
      text: "Throwing paper here & there",
    },

    {
      video: "./assets/videos/slide-2.mp4",
      text: "Keeping the room neat and clean",
    },

    {
      video: "./assets/videos/slide-3.mp4",
      text: "Placing books properly on the shelf",
    },

    {
      video: "./assets/videos/slide-4.mp4",
      text: "Wiping the table after work",
    },
  ],


  // ====================================================
  // TOPIC 2
  // ====================================================

  2: [
    {
      video: "./assets/videos/slide-5.mp4",
      text: "Putting toys back in their place",
    },

    {
      video: "./assets/videos/slide-6.mp4",
      text: "Folding clothes nicely after use",
    },

    {
      video: "./assets/videos/slide-7.mp4",
      text: "Keeping shoes in the shoe rack",
    },

    {
      video: "./assets/videos/slide-8.mp4",
      text: "Throwing waste in the dustbin",
    },
  ],


  // ====================================================
  // TOPIC 3
  // ====================================================

  3: [
    {
      video: "./assets/videos/slide-9.mp4",
      text: "Watering plants with care",
    },

    {
      video: "./assets/videos/slide-10.mp4",
      text: "Helping in cleaning the study table",
    },

    {
      video: "./assets/videos/slide-11.mp4",
      text: "Keeping bags in the correct place",
    },

    {
      video: "./assets/videos/slide-12.mp4",
      text: "Closing books after reading",
    },

    {
      video: "./assets/videos/slide-13.mp4",
      text: "Organizing pencils and stationery",
    },

    {
      video: "./assets/videos/slide-14.mp4",
      text: "Arranging cushions and chairs properly",
    },

    {
      video: "./assets/videos/slide-15.mp4",
      text: "Cleaning up after finishing work",
    },

    {
      video: "./assets/videos/slide-16.mp4",
      text: "Living neatly every day",
    },
  ],


  // ====================================================
  // TOPIC 4
  // ====================================================

  4: [
    {
      video: "./assets/videos/slide-17.mp4",
      langKey: "slide-4.1",
    },

    {
      video: "./assets/videos/slide-18.mp4",
      langKey: "slide-4.2",
    },
  ],

};


// ======================================================
// TOPIC 4 SLIDE TEXT
// ======================================================

/*
  This is a fallback dictionary.

  If your JSON language files already contain
  "slide-4.1" and "slide-4.2", applyLanguage()
  will fill the text and this is never used.

  If the key is missing, this keeps the slide
  from showing an empty paragraph.

  Replace the sample sentences below with your
  real lines.
*/

const slideTranslations = {

  English: {
    "slide-4.1": "Your English line for slide 17",
    "slide-4.2": "Your English line for slide 18",
  },

  Hindi: {
    "slide-4.1": "स्लाइड 17 के लिए हिंदी वाक्य",
    "slide-4.2": "स्लाइड 18 के लिए हिंदी वाक्य",
  },

  Gujrati: {
    "slide-4.1": "સ્લાઇડ 17 માટે ગુજરાતી વાક્ય",
    "slide-4.2": "સ્લાઇડ 18 માટે ગુજરાતી વાક્ય",
  },

};


// ======================================================
// DOM ELEMENTS
// ======================================================

const videoWrapper =
  document.getElementById("video-swiper-wrapper");

const contentWrapper =
  document.getElementById("content-swiper-wrapper");

const prevBtn =
  document.querySelector(".prev-btn");

const nextBtn =
  document.querySelector(".next-btn");

const topicButtons =
  document.querySelectorAll(".topic");

const swiperSection =
  document.querySelector(".custom-swiper-section");

const languageButtons =
  document.querySelectorAll(
    ".language-container div"
  );


// ======================================================
// CURRENT DATA
// ======================================================

let slidesData = [];

let currentTopic = null;


// ======================================================
// CREATE EMPTY SWIPERS
// ======================================================

const videoSwiper = new Swiper(".video-swiper", {

  effect: "fade",

  fadeEffect: {
    crossFade: true,
  },

  speed: 600,

  allowTouchMove: false,

  autoHeight: false,

  observer: true,

  observeParents: true,

});


const contentSwiper = new Swiper(".content-swiper", {

  effect: "fade",

  fadeEffect: {
    crossFade: true,
  },

  speed: 600,

  allowTouchMove: false,

  autoHeight: true,

  observer: true,

  observeParents: true,

});


// ======================================================
// PAUSE ALL VIDEOS
// ======================================================

function pauseAllVideos() {

  const allVideos =
    document.querySelectorAll(
      ".video-slide-inner video"
    );


  allVideos.forEach((video) => {

    video.pause();


    try {

      video.currentTime = 0;

    } catch (error) {

      // Ignore error

    }

  });

}


// ======================================================
// PLAY ACTIVE VIDEO
// ======================================================

function playActiveVideo(index) {

  const activeVideo =
    document.querySelector(
      `.video-swiper .swiper-slide[data-slide-index="${index}"] video`
    );


  if (!activeVideo) return;


  activeVideo.currentTime = 0;


  const playPromise =
    activeVideo.play();


  if (playPromise !== undefined) {

    playPromise.catch(() => {

      // Autoplay may be blocked

    });

  }

}


// ======================================================
// UPDATE PREVIOUS / NEXT BUTTON
// ======================================================

function updateButtons(index) {

  if (!slidesData.length) return;


  // Previous
  prevBtn.classList.toggle(
    "disabled",
    index === 0
  );


  prevBtn.disabled =
    index === 0;


  // Next
  nextBtn.classList.toggle(
    "disabled",
    index === slidesData.length - 1
  );


  nextBtn.disabled =
    index === slidesData.length - 1;

}


// ======================================================
// GET CURRENT LANGUAGE
// ======================================================

function getCurrentLanguage() {

  const storageKey =
    typeof STORAGE_KEY !== "undefined"
      ? STORAGE_KEY
      : "selectedLanguage";


  return (
    localStorage.getItem(storageKey) ||
    "English"
  );

}


// ======================================================
// FILL MISSING LANGUAGE TEXT
// ======================================================

function fillMissingLangText(language) {

  if (!contentWrapper) return;


  const dictionary =
    slideTranslations[language] ||
    slideTranslations.English;


  contentWrapper
    .querySelectorAll("[data-lang-key]")
    .forEach((element) => {

      // Already filled by applyLanguage()
      if (element.textContent.trim()) {

        return;

      }


      const key =
        element.getAttribute("data-lang-key");


      element.textContent =
        dictionary[key] || "";

    });

}


// ======================================================
// APPLY CURRENT LANGUAGE AGAIN
// ======================================================

function refreshCurrentLanguage() {

  const language =
    getCurrentLanguage();


  // Clear slide text first so a language
  // switch actually re-renders
  if (contentWrapper) {

    contentWrapper
      .querySelectorAll("[data-lang-key]")
      .forEach((element) => {

        element.textContent = "";

      });

  }


  // Your existing translation function
  if (typeof applyLanguage === "function") {

    applyLanguage(language);

  }


  // Fallback for any key not found
  fillMissingLangText(language);

}


// ======================================================
// CREATE TOPIC SLIDES
// ======================================================

function createTopicSlides(topicNumber) {

  const selectedSlides =
    topicSlides[topicNumber];


  if (!selectedSlides) {

    return;

  }


  // Store current data
  currentTopic =
    topicNumber;


  slidesData =
    selectedSlides;


  // Stop any old video
  pauseAllVideos();


  // Remove old Swiper slides
  videoSwiper.removeAllSlides();

  contentSwiper.removeAllSlides();


  // Arrays for new slides
  const videoSlides = [];

  const contentSlides = [];


  selectedSlides.forEach((slide, index) => {

    // ==================================================
    // VIDEO SLIDE
    // ==================================================

    videoSlides.push(`
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
    `);


    // ==================================================
    // CONTENT SLIDE
    // ==================================================

    let contentHTML = "";


    // If language key exists
    if (slide.langKey) {

      contentHTML = `
        <p data-lang-key="${slide.langKey}"></p>
      `;

    }

    // Normal text
    else {

      contentHTML = `
        <p>${slide.text}</p>
      `;

    }


    contentSlides.push(`
      <div
        class="swiper-slide"
        data-slide-index="${index}"
      >

        <div class="content-slide-inner">

          ${contentHTML}

        </div>

      </div>
    `);

  });


  // ====================================================
  // ADD SLIDES TO SWIPERS
  // ====================================================

  videoSwiper.appendSlide(
    videoSlides
  );


  contentSwiper.appendSlide(
    contentSlides
  );


  // Update
  videoSwiper.update();

  contentSwiper.update();


  // ====================================================
  // START FROM FIRST SLIDE
  // ====================================================

  videoSwiper.slideTo(
    0,
    0
  );


  contentSwiper.slideTo(
    0,
    0
  );


  // Reapply E / H / G language
  refreshCurrentLanguage();


  // Play first video
  pauseAllVideos();

  playActiveVideo(0);


  // Buttons
  updateButtons(0);

}


// ======================================================
// OPEN SWIPER
// ======================================================

function openTopicSwiper(topicNumber) {

  // Load selected topic
  createTopicSlides(topicNumber);


  // Open same swiper section
  swiperSection.classList.add("active");

}


// ======================================================
// TOPIC BUTTON CLICKS
// ======================================================

topicButtons.forEach((topic) => {

  topic.addEventListener("click", (event) => {

    event.preventDefault();


    const topicNumber =
      Number(topic.dataset.topic);


    // Remove active from all topics
    topicButtons.forEach((item) => {

      item.classList.remove("active");

    });


    // Add active to clicked topic
    topic.classList.add("active");


    // Open swiper
    openTopicSwiper(topicNumber);

  });

});


// ======================================================
// LANGUAGE BUTTON CLICKS
// ======================================================

/*
  Topic slides are created after page load,
  so they must be re-translated whenever the
  user switches E / H / G.

  setTimeout lets your main language handler
  write localStorage first.
*/

languageButtons.forEach((button) => {

  button.addEventListener("click", () => {

    setTimeout(() => {

      refreshCurrentLanguage();

    }, 0);

  });

});


// ======================================================
// PREVIOUS BUTTON
// ======================================================

prevBtn.addEventListener("click", () => {

  const currentIndex =
    contentSwiper.activeIndex;


  if (currentIndex <= 0) {

    return;

  }


  goToSlide(
    currentIndex - 1
  );

});


// ======================================================
// NEXT BUTTON
// ======================================================

nextBtn.addEventListener("click", () => {

  const currentIndex =
    contentSwiper.activeIndex;


  if (
    currentIndex >=
    slidesData.length - 1
  ) {

    return;

  }


  goToSlide(
    currentIndex + 1
  );

});


// ======================================================
// GO TO SLIDE
// ======================================================

function goToSlide(index) {

  if (
    index < 0 ||
    index >= slidesData.length
  ) {

    return;

  }


  pauseAllVideos();


  videoSwiper.slideTo(index);

  contentSwiper.slideTo(index);


  updateButtons(index);

}


// ======================================================
// VIDEO TRANSITION START
// ======================================================

videoSwiper.on(
  "slideChangeTransitionStart",
  () => {

    pauseAllVideos();

  }
);


// ======================================================
// VIDEO TRANSITION END
// ======================================================

videoSwiper.on(
  "slideChangeTransitionEnd",
  () => {

    const activeIndex =
      videoSwiper.activeIndex;


    playActiveVideo(
      activeIndex
    );


    updateButtons(
      activeIndex
    );

  }
);


// ======================================================
// CONTENT SWIPER CHANGE
// ======================================================

contentSwiper.on(
  "slideChange",
  () => {

    const activeIndex =
      contentSwiper.activeIndex;


    // Keep video swiper synced
    if (
      videoSwiper.activeIndex !==
      activeIndex
    ) {

      videoSwiper.slideTo(
        activeIndex
      );

    }


    updateButtons(
      activeIndex
    );

  }
);


// ======================================================
// INITIAL STATE
// ======================================================

window.addEventListener("load", () => {

  /*
    Swiper remains closed initially.

    When user clicks:
    Topic 1
    Topic 2
    Topic 3
    Topic 4

    the same Swiper section opens.
  */

  if (swiperSection) {

    swiperSection.classList.remove(
      "active"
    );

  }

});