document.querySelectorAll(".menu a, .popup-menu__list a").forEach((link) => {
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
if (document.querySelector("#popup-complaint-step-1")) {
  const body = document.querySelector("body");
  // кнопка в header
  const pageBtn = document.querySelector(".request-a-call");
  // все попапы в массииве
  const popupsCall = document.querySelectorAll(".popup-complaint");
  // кнопка продолжить
  const popupCallContinueBtns = document.querySelectorAll(
    ".popup-complaint-btn"
  );
  // кнопка назад
  const popupBackBtns = document.querySelectorAll(".popup-back");
  // кнопка закрытия
  const popupCloseBtn = document.querySelectorAll(".popup-close");
  // фон для закрытия
  const popupCloseBg = document.querySelectorAll(".popup-bg");

  // функция добавляет определенный класс элементу при нажатии кнопки
  const addClassElem = (btn, elem, className) => {
    btn.addEventListener("click", () => {
      elem.classList.add(className);
    });
  };

  // функция удаляет определенный класс элементу при нажатии кнопки
  const removeClassElem = (btn, elem, className) => {
    btn.addEventListener("click", () => {
      elem.classList.remove(className);
    });
  };

  // функция по добавлению и удалению класса попапу
  // попап, функция (добавить/удалить), ...кнопки
  const changePopup = (popup, operation, ...btnArr) => {
    btnArr.forEach((btn) => {
      operation(btn, popup, "active");
    });
  };

  // Функция по удалению определенного класса
  // Исользуется для нескольких элементов
  const removeClassElems = (popups, className, index) => {
    popups.forEach((popup, j) => {
      index === j ? popup.classList.remove(className) : "";
      body.classList.add("noscroll");
    });
  };

  const disablePopups = (btns, popups, operation) => {
    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        operation(popups, "active", i);
      });
    });
  };

  // 1) Вызов первого попапа
  changePopup(popupsCall[0], addClassElem, pageBtn);

  // 2) Удаление попапов

  disablePopups(popupCloseBtn, popupsCall, removeClassElems);
  disablePopups(popupCloseBg, popupsCall, removeClassElems);

  popupCallContinueBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      removeClassElems(popupsCall, "active", i);
      if (i < popupCallContinueBtns.length - 1) {
        popupsCall[i + 1].classList.add("active");
      }
    });
  });

  popupBackBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (i < popupBackBtns.length) {
        popupsCall[i + 1].classList.remove("active");
        popupsCall[i].classList.add("active");
      }
    });
  });
}

if (document.querySelector(".img-input")) {
  const input = document.querySelector(".img-input");
  const preview = document.querySelector(".preview");
  const imgPlace = document.querySelector(".img-place");

  const defaultInner = `
  <img class="p-2 mb-3" src="img/icons/file-image.svg" alt="doc">
  <p class="text-sm text-default mb-1">
    <span class="mr-1 text-accent-b">
      Выберите фото
    </span>
    или перетащите
  </p>
  <p class="text-xs">
    (Максимальный размер файла: 25 MB)
  </p>
  `;

  input.addEventListener("change", updateImageDisplay);
  imgPlace.addEventListener("dragenter", updateImageDisplay);
  imgPlace.addEventListener("dragover", updateImageDisplay);
  imgPlace.addEventListener("dragleave", updateImageDisplay);
  imgPlace.addEventListener("drop", updateImageDisplay);

  function updateImageDisplay() {
    while (preview.firstChild && imgPlace.innerHTML) {
      preview.removeChild(preview.firstChild);
      imgPlace.innerHTML = "";
    }
    const curFiles = input.files;
    if (curFiles.length === 0) {
      preview.innerHTML = `
      <p class="mb-2 font-inter-700 overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
      img_dlinnoenazvanie_chtoby_pokazanm.jpg</p>
      <p class="text-accent-b">40% Загрузка · 8.77 MB</p>`;
      imgPlace.innerHTML = defaultInner;
    } else {
      const para1 = document.createElement("p");
      const para2 = document.createElement("p");
      para1.classList.add(
        "mb-2",
        "font-inter-700",
        "overflow-ellipsis",
        "w-full",
        "whitespace-nowrap",
        "overflow-hidden"
      );
      para2.classList.add("text-accent-b");
      preview.innerHTML = "";
      preview.appendChild(para1);
      preview.appendChild(para2);
      for (let i = 0; i < curFiles.length; i++) {
        if (validFileType(curFiles[i])) {
          para1.textContent = curFiles[i].name;
          para2.textContent = `100% Загрузка · ${returnFileSize(
            curFiles[i].size
          )}`;
          const image = document.createElement("img");
          image.src = window.URL.createObjectURL(curFiles[i]);
          imgPlace.appendChild(image);
        } else {
          imgPlace.innerHTML = defaultInner;
          para1.textContent = curFiles[i].name;
          para1.textContent = "Not a valid file type. Update your selection.";
          preview.appendChild(para1);
          preview.appendChild(para2);
        }
      }
    }
  }

  var fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];

  function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }

    return false;
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }
}
