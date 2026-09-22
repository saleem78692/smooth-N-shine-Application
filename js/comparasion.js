const container = document.getElementById("comparisonSlider");

const beforeLayer = container.querySelector(".before");

const handle = document.getElementById("comparisonHandle");

const divider = document.getElementById("comparisonDivider");

const beforeImage = document.getElementById("beforeImage");

const afterImage = document.getElementById("afterImage");

const imageUpload = document.getElementById("imageUpload");

let isDragging = false;

/* =========================
           IMAGE UPLOAD
        ========================== */

imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  /* Check file */

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");

    return;
  }

  /* Create image URL */

  const imageURL = URL.createObjectURL(file);

  /*
                    SAME IMAGE
                    BEFORE = Original
                    AFTER = Filtered
                */

  beforeImage.src = imageURL;

  afterImage.src = imageURL;
});

/* =========================
           GET SLIDER POSITION
        ========================== */

function getPercent(clientX) {
  const rect = container.getBoundingClientRect();

  const x = clientX - rect.left;

  return Math.max(0, Math.min(100, (x / rect.width) * 100));
}

/* =========================
           UPDATE SLIDER
        ========================== */

function updateSlider(percent) {
  beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;

  handle.style.left = percent + "%";

  divider.style.left = percent + "%";
}

/* =========================
           START DRAG
        ========================== */

function startDrag(e) {
  isDragging = true;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;

  updateSlider(getPercent(clientX));
}

/* =========================
           DRAG
        ========================== */

function drag(e) {
  if (!isDragging) return;

  e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;

  updateSlider(getPercent(clientX));
}

/* =========================
           STOP DRAG
        ========================== */

function stopDrag() {
  isDragging = false;
}

/* =========================
           MOUSE
        ========================== */

container.addEventListener("mousedown", startDrag);

document.addEventListener("mousemove", drag);

document.addEventListener("mouseup", stopDrag);

/* =========================
           TOUCH / MOBILE
        ========================== */

container.addEventListener("touchstart", startDrag, { passive: false });

document.addEventListener("touchmove", drag, { passive: false });

document.addEventListener("touchend", stopDrag);

/* =========================
           INITIAL POSITION
        ========================== */

updateSlider(50);
