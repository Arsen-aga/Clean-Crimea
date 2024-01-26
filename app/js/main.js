document
  .querySelectorAll(".menu a, .popup-menu__list a")
  .forEach((link) => {
    link.addEventListener("click", function (e) {

      document.getElementById("popup-menu").classList.toggle("active");
      document.querySelector("body").classList.toggle("noscroll");
      e.preventDefault();

      let href = this.getAttribute("href").substring(1);

      const scrollTarget = document.getElementById(href);

      const topOffset = 60;
      // const topOffset = 0; // если не нужен отступ сверху
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

// menu

if (document.querySelector("#popup-menu")) {
  // бургер
  const humbs = document.querySelectorAll(".hamb__field");
  // body
  const body = document.querySelector("body");
  // попап меню - блок
  const popupMenu = document.getElementById("popup-menu");

  // при клике на бургер выполняются действия
  humbs.forEach((humb) => {
    humb.addEventListener("click", () => {
      // добавяем/удаляем класс active у элемента
      popupMenu.classList.toggle("active");
      // добавяем/удаляем класс active бургеру
      // humb.classList.toggle("active");
      humbs.forEach((humb) => humb.classList.toggle("active"));
      // добавяем/удаляем класс noscroll у body
      body.classList.toggle("noscroll");
    });
  });
}

//lazyload
if (document.querySelector("img[data-src]")) {
  //lazyload
  let images = document.querySelectorAll("img[data-src]");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  function handleImg(myImg, observer) {
    myImg.forEach((myImgSingle) => {
      if (myImgSingle.intersectionRatio > 0) {
        loadImage(myImgSingle.target);
      }
    });
  }

  function loadImage(image) {
    image.src = image.getAttribute("data-src");
  }

  const observer = new IntersectionObserver(handleImg, options);

  images.forEach((img) => {
    observer.observe(img);
  });
}

// map
if (document.querySelector("#map")) {
  initMap();

  async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    const map = new YMap(document.getElementById("map"), {
      location: {
        center: [34.11379250000001, 44.947650204413435],
        zoom: 10,
      },
    });
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
  }
}
//swiper
const swiper1 = new Swiper(".swiper", {
  loop: true,
  spaceBetween: 10,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// popup-call
if (document.querySelector("#popup-call")) {
  const pageBtns = document.querySelectorAll(".request-a-call");
  const popupCall = document.querySelector("#popup-call");
  const popupCallSendBtn = document.querySelector("#popup-call-send");
  const popupSent = document.querySelector("#popup-sent");
  const popupCloseBtn = document.querySelectorAll(".popup-close");
  const popupCloseBg = document.querySelectorAll(".popup-bg");

  const addClassElem = (btn, elem, className) => {
    btn.addEventListener("click", () => {
      elem.classList.add(className);
    });
  };
  const removeClassElem = (btn, elem, className) => {
    btn.addEventListener("click", () => {
      elem.classList.remove(className);
    });
  };

  const changePopup = (popup, operation, ...btnArr) => {
    btnArr.forEach((btn) => {
      operation(btn, popup, "active");
    });
  };

  changePopup(popupCall, addClassElem, ...pageBtns);
  changePopup(popupCall, removeClassElem, ...popupCloseBtn);
  changePopup(popupCall, removeClassElem, ...popupCloseBg);
  changePopup(popupCall, removeClassElem, popupCallSendBtn);
  changePopup(popupSent, addClassElem, popupCallSendBtn);
  changePopup(popupSent, removeClassElem, ...popupCloseBtn);
  changePopup(popupSent, removeClassElem, ...popupCloseBg);
}
