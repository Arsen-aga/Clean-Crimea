const callPopupBtn = document.querySelector(".request-a-call");
const popups = document.querySelectorAll(".popup");
const closeBtns = document.querySelectorAll(".close-btn");
const backBtns = document.querySelectorAll(".back-btn");
const continueBtns = document.querySelectorAll(".continue-btn");

// callPopupBtn.
openPopup(callPopupBtn, popups[0]);

function openPopup(btn, popup) {
  btn.addEventListener("click", () => popup.classList.add("active"));
}



// callPopup(callPopupBtn, popups[0]);

// closeBtns.forEach((btn) => (btn.onclick = closeBtnClick(btn)));
// continueBtns.forEach((btn) => (btn.onclick = continueBtnClick(btn)));
// backBtns.forEach((btn) => (btn.onclick = backBtnClick(btn)));

// function closeBtnClick(btn) {
//   popups.forEach((popup) => {
//     btn.dataset.id === popup.dataset.id ? closePopup(btn, popup) : "";
//   });
// }

// function continueBtnClick(btn) {
//   popups.forEach((popup, j) => {
//     if (btn.dataset.id === popup.dataset.id) {
//       callPopup(btn, popups[j + 1]);
//       closePopup(btn, popup);
//     }
//   });
// }

// function backBtnClick(btn) {
//   popups.forEach((popup, j) => {
//     if (btn.dataset.id === popup.dataset.id) {
//       callPopup(btn, popups[j - 1]);
//       closePopup(btn, popup);
//     }
//   });
// }

// function callPopup(btn, popup) {
//   if (!btn || !popup) return;
//   btn.addEventListener("click", () => popup.classList.add("active"));
// }

// function closePopup(btn, popup) {
//   if (!btn || !popup) return;
//   btn.addEventListener("click", () => popup.classList.remove("active"));
// }

// document.addEventListener("click", (e) => {
//   popups.forEach((popup) => {
//     if (popup.classList.contains("active")) {
//       e.composedPath().includes(popup) ? popup.classList.remove("active") : '';
//     }
//   });
// });

// document.addEventListener("keydown", function (e) {
//   popups.forEach((popup) => {
//     if (popup.classList.contains("active")) {
//       e.key === "Escape" ? popup.classList.remove("active") : "";
//     }
//   });
// });
