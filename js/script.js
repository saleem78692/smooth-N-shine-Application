/**
 * Smooth N Shine - Master JavaScript Engine
 * Handles Mobile Menu, Mega Dropdowns, Swiper Sliders, Treatment Filters,
 * Before/After Comparison, FAQ Accordions, Coupon Clipboard, Universal Booking Modal,
 * and Multi-Step Booking Page.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  initLucideIcons();

  // 2. Mobile Drawer Navigation
  initMobileDrawer();

  // 3. Desktop Dropdowns & Mega Menus
  initDesktopNav();

  // 4. Hero Swiper Slider
  initHeroSwiper();

  // 6. Treatment Filter
  initTreatmentFilter();

  // 7. Interactive Before/After Comparison
  initBeforeAfterSliders();

  // 8. FAQ Accordions
  initFaqAccordion();

  // 9. Copy Coupon Clipboard
  initCopyCoupons();

  // 10. Universal Booking Modal
  initBookingModal();

  // 11. Multi-Step Booking Flow (on booking.html)
  initBookingMultiStep();

  // 12. Dashboard Mobile Drawer
  initDashboardDrawer();

  // 13. Active Mobile Nav State
  initMobileNavActiveState();
});

// Helper: Refresh Lucide Icons safely
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

// 2. Mobile Drawer
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById("mobileHamburgerBtn");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const drawerBackdrop = document.getElementById("drawerBackdrop");

  if (!hamburgerBtn || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.remove("translate-x-full");
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove("hidden");
      setTimeout(() => drawerBackdrop.classList.remove("opacity-0"), 10);
    }
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.add("translate-x-full");
    if (drawerBackdrop) {
      drawerBackdrop.classList.add("opacity-0");
      setTimeout(() => drawerBackdrop.classList.add("hidden"), 300);
    }
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

  // Mobile submenu toggles
  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle",
  );
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute("data-target");
      const targetMenu = document.getElementById(targetId);
      const icon = toggle.querySelector(".chevron-icon");

      if (targetMenu) {
        const isOpen = !targetMenu.classList.contains("hidden");
        targetMenu.classList.toggle("hidden");
        if (icon) {
          icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
        }
      }
    });
  });
}

// 3. Desktop Navigation Mega Menus
function initDesktopNav() {
  const navItems = document.querySelectorAll(".has-mega-menu, .has-dropdown");
  navItems.forEach((item) => {
    const menu = item.querySelector(".mega-menu, .dropdown-menu");
    if (!menu) return;

    item.addEventListener("mouseenter", () => {
      menu.classList.remove(
        "opacity-0",
        "invisible",
        "translate-y-2",
        "pointer-events-none",
      );
      menu.classList.add(
        "opacity-100",
        "visible",
        "translate-y-0",
        "pointer-events-auto",
      );
    });

    item.addEventListener("mouseleave", () => {
      menu.classList.add(
        "opacity-0",
        "invisible",
        "translate-y-2",
        "pointer-events-none",
      );
      menu.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0",
        "pointer-events-auto",
      );
    });
  });
}

// 4. Hero Swiper Slider
function initHeroSwiper() {
  if (typeof Swiper !== "undefined" && document.querySelector(".hero-swiper")) {
    new Swiper(".hero-swiper", {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".hero-next",
        prevEl: ".hero-prev",
      },
      on: {
        init: function () {
          initLucideIcons();
        },
      },
    });
  }
}

// 6. Treatment Filter
function initTreatmentFilter() {
  const filterButtons = document.querySelectorAll(".treatment-filter-btn");
  const treatmentCards = document.querySelectorAll(".treatment-card");

  if (!filterButtons.length || !treatmentCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      // Toggle active classes on buttons
      filterButtons.forEach((b) => {
        b.classList.remove("bg-primary", "text-white", "shadow-md");
        b.classList.add("bg-white", "text-text", "border", "border-border");
      });
      btn.classList.remove("bg-white", "text-text", "border", "border-border");
      btn.classList.add("bg-primary", "text-white", "shadow-md");

      // Filter cards with smooth opacity transition
      treatmentCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category") || "";
        const categories = cardCategory.split(" ");

        if (category === "all" || categories.includes(category)) {
          card.style.display = "";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// 7. Interactive Before/After Comparison Slider
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll(".ba-container");
  containers.forEach((container) => {
    const beforeImg = container.querySelector(".ba-before-image");
    const handle = container.querySelector(".ba-slider-handle");
    const imgElement = beforeImg ? beforeImg.querySelector("img") : null;

    if (!beforeImg || !handle || !imgElement) return;

    // Keep internal image width equal to container width
    function syncImgWidth() {
      imgElement.style.width = container.offsetWidth + "px";
    }
    syncImgWidth();
    window.addEventListener("resize", syncImgWidth);

    let isDragging = false;

    function moveSlider(clientX) {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percent = (x / rect.width) * 100;
      beforeImg.style.width = percent + "%";
      handle.style.left = percent + "%";
    }

    // Mouse events
    handle.addEventListener("mousedown", () => (isDragging = true));
    window.addEventListener("mouseup", () => (isDragging = false));
    container.addEventListener("mousemove", (e) => {
      if (isDragging) moveSlider(e.clientX);
    });

    // Touch events
    handle.addEventListener("touchstart", () => (isDragging = true));
    window.addEventListener("touchend", () => (isDragging = false));
    container.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches[0]) moveSlider(e.touches[0].clientX);
    });
  });
}

// 8. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden");

      // Close all other accordions
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-icon");
          if (otherAnswer) otherAnswer.classList.add("hidden");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      if (isOpen) {
        answer.classList.add("hidden");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        answer.classList.remove("hidden");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

// 9. Copy Coupon Clipboard
function initCopyCoupons() {
  const copyButtons = document.querySelectorAll(".copy-coupon-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const code = btn.getAttribute("data-code") || "GLOW500";

      navigator.clipboard
        .writeText(code)
        .then(() => {
          showToast(`Coupon code "${code}" copied to clipboard!`);
          const originalText = btn.innerHTML;
          btn.innerHTML = "✓ Copied!";
          btn.classList.add("bg-success", "text-white");
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove("bg-success", "text-white");
            initLucideIcons();
          }, 2500);
        })
        .catch(() => {
          showToast(`Use coupon: ${code}`);
        });
    });
  });
}

// 10. Toast notification helper
function showToast(message) {
  let toast = document.getElementById("globalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalToast";
    toast.className =
      "fixed bottom-20 right-6 z-[99999] bg-dark text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border border-border toast-animate";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-primary">✨</span> <span>${message}</span>`;
  toast.style.display = "flex";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

// 11. Universal Booking Modal
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const modalTriggers = document.querySelectorAll(
    '[data-open-modal="booking"], .open-booking-btn, a[href="#bookingModal"]',
  );
  const closeTriggers = modal.querySelectorAll(
    '[data-close-modal="booking"], .modal-close-btn',
  );

  modalTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const treatmentName = btn.getAttribute("data-treatment") || "";
      openBookingModal(treatmentName);
    });
  });

  closeTriggers.forEach((btn) => {
    btn.addEventListener("click", () => closeBookingModal());
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBookingModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeBookingModal();
    }
  });

  const bookingForm = document.getElementById("universalBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const successBox = document.getElementById("modalSuccessBox");
      if (successBox) {
        successBox.classList.remove("hidden");
        bookingForm.classList.add("hidden");
        setTimeout(() => {
          bookingForm.reset();
          bookingForm.classList.remove("hidden");
          successBox.classList.add("hidden");
          closeBookingModal();
        }, 3000);
      } else {
        alert(
          "Your appointment request has been submitted successfully! Our dermatologist coordinator will call you shortly.",
        );
        closeBookingModal();
      }
    });
  }
}

// 12. Booking Modal
window.openBookingModal = function (treatment = "") {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const treatmentSelect = modal.querySelector('select[name="treatment"]');
  if (treatmentSelect && treatment) {
    let matched = false;
    for (let opt of treatmentSelect.options) {
      if (
        opt.value.toLowerCase() === treatment.toLowerCase() ||
        opt.text.toLowerCase().includes(treatment.toLowerCase())
      ) {
        treatmentSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched && treatment) {
      const newOpt = new Option(treatment, treatment, true, true);
      treatmentSelect.add(newOpt);
    }
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  initLucideIcons();
};

//13. close booking modal
window.closeBookingModal = function () {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
};

// 14. Multi-Step Booking Page (booking.html)
function initBookingMultiStep() {
  const stepTabs = document.querySelectorAll(".booking-step-tab");
  const stepContents = document.querySelectorAll(".booking-step-content");
  const nextBtns = document.querySelectorAll(".booking-next-step");
  const prevBtns = document.querySelectorAll(".booking-prev-step");

  if (!stepTabs.length || !stepContents.length) return;

  let currentStep = 1;

  function goToStep(stepNumber) {
    currentStep = stepNumber;

    stepTabs.forEach((tab) => {
      const tabStep = parseInt(tab.getAttribute("data-step"), 10);
      if (tabStep === currentStep) {
        tab.classList.add("bg-primary", "text-white");
        tab.classList.remove("bg-white", "text-text");
      } else if (tabStep < currentStep) {
        tab.classList.add("bg-success", "text-white");
        tab.classList.remove("bg-primary", "bg-white", "text-text");
      } else {
        tab.classList.add("bg-white", "text-text");
        tab.classList.remove("bg-primary", "bg-success", "text-white");
      }
    });

    stepContents.forEach((content) => {
      const contentStep = parseInt(
        content.getAttribute("data-step-content"),
        10,
      );
      if (contentStep === currentStep) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });

    window.scrollTo({ top: 150, behavior: "smooth" });
    initLucideIcons();
  }

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < 4) goToStep(currentStep + 1);
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  });

  stepTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const stepNum = parseInt(tab.getAttribute("data-step"), 10);
      goToStep(stepNum);
    });
  });
}

// 15. Dashboard Mobile Drawer
function initDashboardDrawer() {
  const openBtn = document.getElementById("openDashboardSidebarBtn");
  const closeBtn = document.getElementById("closeDashboardSidebarBtn");
  const sidebar = document.getElementById("dashboardSidebar");
  const backdrop = document.getElementById("dashboardSidebarBackdrop");

  if (!openBtn || !sidebar) return;

  openBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
  });

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);
}

// 16. Mobile Bottom Navigation active status
function initMobileNavActiveState() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const mobileLinks = document.querySelectorAll("#mobileBottomNav a");

  mobileLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("text-primary");
      link.classList.remove("text-text");
    }
  });
}

// 17. Testomonial
const testimonialSwiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 700,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { el: ".testimonial-pagination", clickable: true },
  breakpoints: {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
});
function openReviewModal() {
  const modal = document.getElementById("reviewModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  lucide.createIcons();
}
function closeReviewModal() {
  const modal = document.getElementById("reviewModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  resetReviewForm();
}

document
  .getElementById("reviewModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeReviewModal();
    }
  });
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    !document.getElementById("reviewModal").classList.contains("hidden")
  ) {
    closeReviewModal();
  }
});
function setRating(rating) {
  document.getElementById("reviewRating").value = rating;
  document.getElementById("ratingError").classList.add("hidden");
  document.querySelectorAll(".rating-star").forEach(function (star) {
    const starRating = Number(star.dataset.rating);
    if (starRating <= rating) {
      star.classList.remove("text-gray-300");
      star.classList.add("text-warning");
    } else {
      star.classList.remove("text-warning");
      star.classList.add("text-gray-300");
    }
  });
}
function submitReview(event) {
  event.preventDefault();
  const rating = document.getElementById("reviewRating").value;
  if (!rating) {
    document.getElementById("ratingError").classList.remove("hidden");
    return;
  }
  const form = document.getElementById("reviewForm");
  const success = document.getElementById("reviewSuccess");
  form.classList.add("hidden");
  success.classList.remove("hidden");
  lucide.createIcons(); /* * Yahan baad me API / backend connect kar sakte hain. * Example: * * fetch("/api/reviews", { * method: "POST", * body: new FormData(form) * }); */
}
function resetReviewForm() {
  const form = document.getElementById("reviewForm");
  const success = document.getElementById("reviewSuccess");
  form.reset();
  form.classList.remove("hidden");
  success.classList.add("hidden");
  document.getElementById("reviewRating").value = "";
  document.getElementById("ratingError").classList.add("hidden");
  document.querySelectorAll(".rating-star").forEach(function (star) {
    star.classList.remove("text-warning");
    star.classList.add("text-gray-300");
  });
}
