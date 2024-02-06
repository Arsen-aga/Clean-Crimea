// menu scroll
document.querySelectorAll(".menu a, .popup-menu__list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    document.getElementById("popup-menu").classList.remove("active");
    document.querySelector(".hamb__field").classList.remove("active");
    document.querySelector("body").classList.toggle("noscroll");
    e.preventDefault();

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    const topOffset = 0;
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
if (document.querySelector(".top-nav")) {
  // инициализируем top Navigation
  const topNavigation = document.querySelector(".top-nav");
  // попап меню - блок
  const popupMenu = document.getElementById("popup-menu");
  // Функция добавляет класс элементу в зависимости от координат окна
  function checkСoordinatesElem(elem) {
    // запуск функции по движению скролла
    window.addEventListener("scroll", function () {
      // инициализируем координаты окна по Y
      const coordWindow = window.scrollY;
      // если координаты окна больше 80, то добавляем класс, иначе - нет
      coordWindow > 0
        ? (elem.classList.add("active", "container"),
          popupMenu.classList.add("top-scroll"))
        : (elem.classList.remove("active", "container"),
          popupMenu.classList.remove("top-scroll"));
    });
  }

  checkСoordinatesElem(topNavigation);
}

// menu
if (document.querySelector("#popup-menu")) {
  // бургер
  const humb = document.querySelector(".hamb__field");
  // body
  const body = document.querySelector("body");
  // попап меню - блок
  const popupMenu = document.getElementById("popup-menu");

  // при клике на бургер выполняются действия
  humb.addEventListener("click", () => {
    // добавяем/удаляем класс active у элемента
    popupMenu.classList.toggle("active");
    // добавяем/удаляем класс active бургеру
    // humb.classList.toggle("active");
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
  const callPopupBtn = document.querySelector(".request-a-call");
  const popups = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close-btn");
  const backBtns = document.querySelectorAll(".back-btn");
  const continueBtns = document.querySelectorAll(".continue-btn");

  callPopup(callPopupBtn, popups[0]);

  closeBtns.forEach((btn) => (btn.onclick = closeBtnClick(btn)));
  continueBtns.forEach((btn) => (btn.onclick = continueBtnClick(btn)));
  backBtns.forEach((btn) => (btn.onclick = backBtnClick(btn)));

  function closeBtnClick(btn) {
    popups.forEach((popup) => {
      btn.dataset.id === popup.dataset.id ? closePopup(btn, popup) : "";
    });
  }

  function continueBtnClick(btn) {
    popups.forEach((popup, j) => {
      if (btn.dataset.id === popup.dataset.id) {
        callPopup(btn, popups[j + 1]);
        closePopup(btn, popup);
      }
    });
  }

  function backBtnClick(btn) {
    popups.forEach((popup, j) => {
      if (btn.dataset.id === popup.dataset.id) {
        callPopup(btn, popups[j - 1]);
        closePopup(btn, popup);
      }
    });
  }

  function callPopup(btn, popup) {
    if (!btn || !popup) return;
    btn.addEventListener("click", () => {
      popup.classList.add("active");
      body.classList.add("noscroll");
    });
  }

  function closePopup(btn, popup) {
    if (!btn || !popup) return;
    btn.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  }

  document.addEventListener("keydown", function (e) {
    popups.forEach((popup) => {
      if (popup.classList.contains("active")) {
        e.key === "Escape" ? popup.classList.remove("active") : "";
      }
    });
  });
}

// add img
let multipleUploader = new MultipleUploader("#multiple-uploader").init({
  maxUpload: 6, // maximum number of uploaded images
  maxSize: 2, // in size in mb
  filesInpName: "images", // input name sent to backend
  formSelector: "#my-form", // form selector
});

//tabs
if (document.querySelector(".tabs")) {
  const tabsBtn = document.querySelectorAll(".tabs-btn");
  const filterItems = document.querySelectorAll(".filter-items>div");

  tabsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.currentTarget.dataset.filter;

      tabsBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      filterItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "flex";
        } else if (item.classList.contains(filter)) {
          item.style.display = "flex";
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

// crop img
const image = document.getElementById("image-crop");
if (image) {
  const fileInput = document.getElementById("file");
  const imageContainer = document.querySelector(".image-container");
  const downloadButton = document.getElementById("download-btn");
  const previewButton = document.getElementById("preview-btn");
  const previewImage = document.getElementById("preview-image");

  let cropper = "";
  let fileName = "";

  fileInput.onchange = () => {
    previewImage.src = "";

    const reader = new FileReader();

    reader.readAsDataURL(fileInput.files[0]);

    reader.onload = () => {
      image.setAttribute("src", reader.result);
      imageContainer.classList.remove("w-[60%]");
      imageContainer.classList.add("w-max");

      if (cropper) {
        cropper.destroy();
      }

      cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        autoCrop: true,
        minCropBoxWidth: 150,
        minCropBoxHeight: 150,
        background: false,
        zoomable: false,
        mouseWheelZoom: false,
        touchDragZoom: false,
        rotatable: false,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
        },
      });
    };
    fileName = fileInput.files[0].name.split(".")[0];
  };

  previewButton.addEventListener("click", (e) => {
    e.preventDefault();
    let imgSrc = cropper.getCroppedCanvas().toDataURL();
    console.log(fileInput.files[0]);
    previewImage.src = imgSrc;
    fileInput.files[0] = imgSrc;
    console.log(fileInput.files[0]);
    downloadButton.download = `cropped_${fileName}.png`;
    downloadButton.setAttribute("href", imgSrc);
  });
}
