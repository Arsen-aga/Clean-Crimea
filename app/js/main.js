document.querySelectorAll(".menu a, .popup-menu__list a").forEach((link) => {
  link.addEventListener("click", function (e) {
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

//menu sticky
if (document.querySelector(".subheader")) {
  // инициализируем subheader
  const subheader = document.querySelector(".subheader");
  // попап меню - блок
  const popupMenu = document.getElementById("popup-menu");
  // Функция добавляет класс элементу в зависимости от координат окна
  function checkСoordinatesElem(elem) {
    // запуск функции по движению скролла
    window.addEventListener("scroll", function () {
      // инициализируем координаты окна по Y
      const coordWindow = window.scrollY;
      // если координаты окна больше 80, то добавляем класс, иначе - нет
      coordWindow > 80
        ? (elem.classList.add("active"), popupMenu.classList.add("top-scroll"))
        : (elem.classList.remove("active"),
          popupMenu.classList.remove("top-scroll"));
    });
  }

  checkСoordinatesElem(subheader);
}

// menu
if (document.querySelector("#popup-menu")) {
  // бургер
  const humb = document.getElementById("hamb");
  // body
  const body = document.querySelector("body");
  // попап меню - блок
  const popupMenu = document.getElementById("popup-menu");

  // при клике на бургер выполняются действия
  humb.addEventListener("click", () => {
    // добавяем/удаляем класс active у элемента
    popupMenu.classList.toggle("active");
    // добавяем/удаляем класс active бургеру
    humb.classList.toggle("active");
    // добавяем/удаляем класс noscroll у body
    body.classList.toggle("noscroll");
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

    const addNewMarker = () => {
      let count = 1;
      return function (a, b) {
        const newMarker = document.createElement("div");
        newMarker.innerHTML = `<div class="map-marker marker-${count}"></div>`;

        const marker = new ymaps3.YMapMarker(
          {
            coordinates: [a, b],
            draggable: false,
            mapFollowsOnDrag: true,
          },
          newMarker
        );
        map.addChild(marker);
        count++;
      };
    };

    const newMarker = addNewMarker();
    newMarker(34.071185499999984, 44.97955057457932);
    newMarker(34.07559599999993, 44.97416907459107);
    newMarker(34.09326599999996, 44.97775907460032);
    newMarker(34.09383200000003, 44.967480574599456);
    newMarker(34.10436899999996, 44.9579200746003);
    newMarker(34.12512899999999, 44.96383857459005);
  }

  // [34.071185499999984, 44.97955057457932];
  // [34.07559599999993, 44.97416907459107];
  // [34.09326599999996, 44.97775907460032];
  // [34.09383200000003, 44.967480574599456];
  // [34.10436899999996, 44.9579200746003];
  // [34.12512899999999, 44.96383857459005];
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


//tabs
if (document.querySelector(".tabs")) {
  const tabs = document.querySelector(".tabs");
  const tabsBtn = document.querySelectorAll(".tabs-btn");
  const filterItems = document.querySelectorAll(".filter-items div");
  const filterSearch = document.querySelector(".filter-search");

  filterSearch.addEventListener("input", (event) => {
    const inpValue = event.target.value.toLowerCase();
    filterItems.forEach((item) => {
      const itemTitle = item.querySelector("h4").textContent.toLowerCase();
      if (itemTitle.includes(inpValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  tabsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.currentTarget.dataset.filter;

      tabsBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      filterItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else if (item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // filterItems.forEach((item) => {
  //   item.classList.contains("cat-b")
  //     ? (item.style.display = "block")
  //     : (item.style.display = "none");
  // });
}

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

