/* ========================================================
   SERVICE DATA
======================================================== */

const servicesData = {
  /* ================= SALON ================= */
  salon: [
    {
      id: "wax-1",
      title: "Upper Lip",
      price: 1079,
      duration: "1 hr 15 mins",
      badge: null,
      subtitle: null,
      image: "assets/images/upper-lip.png",
      initialQty: 0,
    },

    {
      id: "hand-1",
      title: "Hands",
      price: 3599,
      duration: "1 hr 30 mins",
      badge: "Most Booked",
      subtitle: null,
      image: "assets/images/full-hand.webp",
      initialQty: 0,
    },

    {
      id: "legs-1",
      title: "Legs",
      price: 4799,
      duration: "1 hr 30 mins",
      badge: "Most Booked",
      subtitle: null,
      image: "assets/images/legs1.jpeg",
      initialQty: 0,
    },

    {
      id: "back-1",
      title: "Back",
      price: 3599,
      duration: "1 hr 30 mins",
      badge: "Most Booked",
      subtitle: null,
      image: "https://barewaxingandlaser.com/wp-content/uploads/2026/03/Bare-Waxing-And-Laser-Waxa-nd-Skincare-Huntington-Beach-Laser-Hair-Removal-for-Womens-Lower-Backs.jpg",
      initialQty: 0,
    },

    {
      id: "stomach-1",
      title: "Under Arms",
      price: 1079,
      duration: "1 hr 30 mins",
      badge: "Most Booked",
      subtitle: null,
      image: "assets/images/underarms.png",
      initialQty: 0,
    },

   
  ],

  /* ================= HYDRAGLO / FACIAL ================= */
  hydraglo: [
    {
      id: "facial-1",
      title: "Korean Facial",
      price: 3599,
      duration: "1 hr 15 mins",
      badge: "Most Booked",
      subtitle: "Glass Skin Glow Treatment",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80",
      initialQty: 0,
    },

    {
      id: "facial-2",
      title: "Body diamond polish (per part)",
      price: 2399,
      duration: "1 hr 00 mins",
      badge: "Trending",
      subtitle: "Instant Hydration & Radiance",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DkwGkvW8OQlKuZLV06RfFhuI9dPh0qUBrzwyT9DqlQ&s=10",
      initialQty: 0,
    },

    {
      id: "facial-3",
      title: "Medi Facial",
      price: 3599,
      duration: "1 hr 15 mins",
      badge: "Popular",
      subtitle: "Advanced Skin Rejuvenation",
      image:
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80",
      initialQty: 0,
    },

    {
      id: "facial-4",
      title: "RF Anti-Aging Facial",
      price: 2399,
      duration: "1 hr 00 mins",
      badge: "Anti-Aging",
      subtitle: "Firm & Youthful Looking Skin",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7hACPDNvNHvhDDPjNxrguKsphIUCeDxltssth0ckIeg&s",
      initialQty: 0,
    },

    {
      id: "facial-5",
      title: "Korean Premium Facial",
      price: 4599,
      duration: "1 hr 30 mins",
      badge: "Premium",
      subtitle: "Deep Cleanse + Brightening",
      image:
        "https://images.unsplash.com/photo-1647004692483-c5d942fe1137?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW50aSUyMGFnaW5nfGVufDB8fDB8fHww",
      initialQty: 0,
    },

    {
      id: "facial-6",
      title: "Buttocks",
      price: 3599,
      duration: "1 hr 10 mins",
      badge: "Skin Care",
      subtitle: "Helps Improve Uneven Skin Tone",
      image: "assets/images/buttocks1.jpeg",
      initialQty: 0,
    },

    {
      id: "facial-7",
      title: "Bikini",
      price: 3599,
      duration: "1 hr 15 mins",
      badge: "Skin Care",
      subtitle: "Deep Cleanse & Clarifying Care",
      image: "assets/images/bikini1.avif",
      initialQty: 0,
    },

    {
      id: "facial-8",
      title: "Full Body (7 Part)",
      price: 14000,
      duration: "2 hr 00 mins",
      badge: "Combo",
      subtitle: "Complete Glow & Polish",
      image: "assets/images/full-body(7parts).png",
      initialQty: 0,
    },
  ],

  /* ================= LASER ================= */
  laser: [
    {
      id: "laser-1",
      title: "Face",
      price: 3599,
      duration: "2 hr 30 mins",
      badge: "Best Value",
      subtitle: "Painless Cooling Technology",
      image: "https://www.informclinic.com/backend/service/section/facialhair1.jpg",
      initialQty: 0,
    },
  ],
};

/* ========================================================
   ACTIVE CATEGORY
======================================================== */

let activeCategory = "salon";

/* ========================================================
   CART
======================================================== */

let cart = {};

/* ========================================================
   INITIAL CART
======================================================== */

Object.keys(servicesData).forEach((category) => {
  servicesData[category].forEach((item) => {
    if (item.initialQty > 0) {
      cart[item.id] = {
        ...item,
        qty: item.initialQty,
      };
    }
  });
});

/* ========================================================
   RENDER SERVICE CARDS
======================================================== */

function renderCards() {
  const grid = document.getElementById("cardsGrid");

  if (!grid) return;

  const items = servicesData[activeCategory] || [];

  grid.innerHTML = items
    .map((item) => {
      const qty = cart[item.id] ? cart[item.id].qty : 0;

      return `
        <div
          class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300"
        >

          <!-- ================= IMAGE COLUMN ================= -->

          <div class="relative flex-shrink-0 w-28 sm:w-32 pb-1">

            <!-- IMAGE -->

            <div
              class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner"
            >

              <img
                src="${item.image}"
                alt="${item.title}"
                class="w-full h-full object-cover"
                onerror="this.src='https://placehold.co/150x150/fce8ef/a0284c?text=Service'"
              />

              <!-- BADGE -->

              ${
                item.badge
                  ? `
                    <div
                      class="absolute top-0 left-0 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-br-lg rounded-tl-xl tracking-wide"
                    >
                      ${item.badge}
                    </div>
                  `
                  : ""
              }

            </div>


            <!-- ================= ADD / STEPPER ================= -->

            <div
              class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] flex justify-center z-10"
            >

              ${
                qty > 0
                  ? /* ACTIVE STEPPER */

                    `
                    <div
                      class="flex items-center justify-between w-full bg-white border-2 border-primary rounded-lg px-2 py-1 shadow-md text-primary font-bold text-sm"
                     style="margin-left:100px;">

                      <!-- MINUS -->

                      <button
                        type="button"
                        onclick="updateQuantity('${item.id}', -1)"
                        class="hover:bg-primary-light rounded w-6 h-6 flex items-center justify-center transition-colors text-base font-bold leading-none select-none"
                       >
                        −
                      </button>


                      <!-- QUANTITY -->

                      <span
                        class="text-xs font-bold select-none text-gray-900"
                      >
                        ${qty}
                      </span>


                      <!-- PLUS -->

                      <button
                        type="button"
                        onclick="updateQuantity('${item.id}', 1)"
                        class="hover:bg-primary-light rounded w-6 h-6 flex items-center justify-center transition-colors text-base font-bold leading-none select-none"
                      >
                        +
                      </button>

                    </div>
                  `
                  : /* ADD BUTTON */

                    `
                    <button
                      type="button"
                      onclick="updateQuantity('${item.id}', 1)"
                      class="w-full bg-white hover:bg-pink-50 border-2 border-primary text-primary font-bold text-xs tracking-wider py-1.5 px-3 rounded-lg shadow-md transition-all duration-150 uppercase active:scale-95 text-center"
                     style="margin-left:100px;">
                      ADD
                    </button>
                  `
              }

            </div>

          </div>


          <!-- ================= SERVICE DETAILS ================= -->

          <div class="flex-1 pt-1 pr-1 min-w-0">

            <!-- TITLE -->

            <h3
              class="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2"
            >
              ${item.title}
            </h3>


            <!-- SUBTITLE -->

            ${
              item.subtitle
                ? `
                  <p
                    class="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1"
                  >
                    <i
                      data-lucide="sparkles"
                      class="w-3 h-3 text-amber-500"
                    ></i>

                    ${item.subtitle}
                  </p>
                `
                : ""
            }


            <!-- PRICE + DURATION -->

            <div
              class="mt-3 flex items-center gap-2 flex-wrap"
            >

              <!-- PRICE -->

              <span
                class="font-bold text-sm sm:text-base text-gray-900"
              >
                ₹${item.price.toLocaleString("en-IN")}
              </span>


              <!-- DURATION -->

              <span
                class="text-xs text-gray-500 font-normal flex items-center gap-1"
              >

                <i
                  data-lucide="clock"
                  class="w-3 h-3 text-gray-400"
                ></i>

                ${item.duration}

              </span>

            </div>

          </div>

        </div>
      `;
    })
    .join("");

  /* ========================================================
     RECREATE LUCIDE ICONS
  ======================================================== */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* ========================================================
     UPDATE CART
  ======================================================== */

  updateCartSummary();
}

/* ========================================================
   UPDATE QUANTITY
======================================================== */

function updateQuantity(serviceId, change) {
  let serviceItem = null;

  /* ================= FIND SERVICE ================= */

  for (const category in servicesData) {
    const found = servicesData[category].find(
      (service) => service.id === serviceId,
    );

    if (found) {
      serviceItem = found;

      break;
    }
  }

  if (!serviceItem) return;

  /* ================= CURRENT QUANTITY ================= */

  const currentQty = cart[serviceId] ? cart[serviceId].qty : 0;

  /* ================= NEW QUANTITY ================= */

  const newQty = currentQty + change;

  /* ================= REMOVE ITEM ================= */

  if (newQty <= 0) {
    delete cart[serviceId];
  } else {
    /* ================= ADD / UPDATE ITEM ================= */
    cart[serviceId] = {
      ...serviceItem,
      qty: newQty,
    };
  }

  /* ================= RE-RENDER ================= */

  renderCards();
}

/* ========================================================
   SWITCH CATEGORY
======================================================== */

function switchCategory(category) {
  activeCategory = category;

  const categories = ["salon", "hydraglo", "laser"];

  categories.forEach((cat) => {
    const tabBtn = document.getElementById(`tab-${cat}`);

    if (!tabBtn) return;

    /* ================= ACTIVE ================= */

    if (cat === category) {
      tabBtn.className = `
        px-5 py-2.5
        rounded-full
        text-sm
        font-semibold
        transition-all
        duration-200
        whitespace-nowrap
        bg-primary-light
        text-primary
        shadow-xs
        border
        border-pink-200/50
        `;
    } else {
      /* ================= INACTIVE ================= */
      tabBtn.className = `
        px-5 py-2.5
        rounded-full
        text-sm
        font-medium
        transition-all
        duration-200
        whitespace-nowrap
        bg-gray-100
        text-gray-600
        hover:bg-gray-200
        `;
    }
  });

  /* ================= RENDER ================= */

  renderCards();
}

/* ========================================================
   UPDATE CART SUMMARY
   + MOBILE BOOKING BADGE
======================================================== */

function updateCartSummary() {
  const badgeEl = document.getElementById("mobileBookingBadge");

  const totalPriceEl = document.getElementById("cartTotalPrice");

  const itemsLabelEl = document.getElementById("cartItemsLabel");

  let totalItems = 0;

  let totalPrice = 0;

  /* ================= CALCULATE CART ================= */

  Object.values(cart).forEach((item) => {
    totalItems += item.qty;

    totalPrice += item.price * item.qty;
  });

  /* ================= PRICE ================= */

  if (totalPriceEl) {
    totalPriceEl.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
  }

  /* ================= ITEMS ================= */

  if (itemsLabelEl) {
    itemsLabelEl.innerText = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
  }

  /* ====================================================
     MOBILE BOOKING BADGE
  ==================================================== */

  if (!badgeEl) return;

  /* ================= SHOW ================= */

  if (totalItems > 0) {
    /* Set Count */

    badgeEl.innerText = totalItems;

    /* Show Badge */

    badgeEl.classList.remove("hidden");

    /* Restart Animation */

    badgeEl.classList.remove("badge-pop");

    void badgeEl.offsetWidth;

    badgeEl.classList.add("badge-pop");
  } else {
    /* ================= HIDE ================= */
    badgeEl.classList.add("hidden");
  }
}

/* ========================================================
   PAGE LOAD
======================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* Render Cards */

  renderCards();

  /* Create Lucide Icons */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// Treatments js

/* =========================================================
           TREATMENTS DATA
        ========================================================= */

const treatments = [
  /* ================= LASER ================= */

  {
    name: "Upper Lip",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,079",
    image: "assets/images/upper-lip.png",
  },

  {
    name: "Chin",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,079",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80",
  },

  {
    name: "Side Locks",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,079",
    image: "assets/images/side-lockes.png",
  },

  {
    name: "Underarms",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,079",
    image: "assets/images/underarms.png",
  },

  {
    name: "Neck Line",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,179",
    image: "assets/images/neck.jpeg",
  },

  {
    name: "Midriff",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹1,439",
    image: "https://www.eveclinics.co.uk/wp-content/uploads/2019/05/tummy-tuck-600x400.png",
  },

  {
    name: "Face",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "https://www.informclinic.com/backend/service/section/facialhair1.jpg",
  },

  {
    name: "Hands",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "assets/images/full-hand.webp",
  },

  {
    name: "Front",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "https://soleabeautylounge.com/wp-content/uploads/2022/11/laser-treatment-on-the-chest.jpg",
  },

  {
    name: "Back",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "https://barewaxingandlaser.com/wp-content/uploads/2026/03/Bare-Waxing-And-Laser-Waxa-nd-Skincare-Huntington-Beach-Laser-Hair-Removal-for-Womens-Lower-Backs.jpg",
  },

  {
    name: "Bikini",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "assets/images/bikini1.avif",
  },

  {
    name: "Buttocks",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹3,599",
    image: "assets/images/buttocks1.jpeg",
  },

  {
    name: "Legs",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹4,799",
    image: "assets/images/legs1.jpeg",
  },

  {
    name: "Full Body (5 Part)",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹12,000",
    image: "assets/images/full-body(5parts).png",
  },

  {
    name: "Full Body (7 Part)",
    category: "laser",
    label: "Laser Hair Reduction",
    price: "₹14,000",
    image: "assets/images/full-body(7parts).png",
  },

  /* ================= BODY ================= */

  {
    name: "U-Lipo",
    category: "body",
    label: "Body Toning",
    price: "₹2,500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRteyzFahitY4-WBTVSWP2T6v5CFgTefOI8yjU58Ti3Ww&s=10",
  },

  {
    name: "Stomach Contouring",
    category: "body",
    label: "Body Contouring",
    price: "₹2,500",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDrsejniEOGrQkg_tvE_Lti7bmOoXWZzbpw1_aHXung&s=10"
  },

  {
    name: "Thigh Contouring",
    category: "body",
    label: "Body Contouring",
    price: "₹2,500",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR76H_hBpK-RzDBNePZaWxdnxo727JiS5wkxcijAvFIw&s=10"
  },

  {
    name: "Arm Contouring",
    category: "body",
    label: "Body Contouring",
    price: "₹2,500",
    image:"https://www.jacobsonplasticsurgery.com//files/2024/08/Arm-fat-reduction-1024x683.jpeg"
  },

  /* ================= FACIAL ================= */

  {
    name: "Korean Facial",
    category: "facial",
    label: "Facial",
    price: "₹3,599",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Qr1L-1XkrpGPPdJ8KKz2rVUkQakr9seGWwhranyCqQ&s=10",
  },

  {
    name: "Medi Facial",
    category: "facial",
    label: "Facial",
    price: "₹3,599",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOj6YTSkBeNnQ7s5Mly6FlgUwIOpNDNe-teufPJbjjQ&s=10",
  },

  {
    name: "Polishing Combined with Facial",
    category: "facial",
    label: "Facial",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80",
  },

  {
    name: "Body Diamond Polish",
    category: "facial",
    label: "Body Polish",
    price: "₹2,399",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeX29PmHze3u0EewXjmA0XMKpOBTCV4w5iqU41WSz8aA&s=10",
  },

  {
    name: "RF with Anti-Aging Facial",
    category: "facial",
    label: "Anti-Aging Facial",
    price: "₹2,399",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
];

/* =========================================================
           RENDER TREATMENTS
        ========================================================= */

function renderTreatments(filter = "all", search = "") {
  const grid = document.getElementById("treatmentGrid");

  const noResults = document.getElementById("noResults");

  const searchText = search.toLowerCase().trim();

  const filtered = treatments.filter((item) => {
    const categoryMatch = filter === "all" || item.category === filter;

    const searchMatch =
      item.name.toLowerCase().includes(searchText) ||
      item.label.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");

    return;
  }

  noResults.classList.add("hidden");

  filtered.forEach((item) => {
    const detailsUrl = `treatment-details.html?treatment=${encodeURIComponent(item.name)}`;

    const card = document.createElement("div");

    card.className =
      "treatment-card bg-white rounded-3xl overflow-hidden border border-border";

    card.innerHTML = `

                    <!-- IMAGE -->
                    <a
                        href="${detailsUrl}"
                        class="block relative h-56 overflow-hidden group"
                        aria-label="View ${item.name} details">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="treatment-image w-full h-full object-cover"
                            loading="lazy"
                            onerror="this.src='https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'">

                        <div
                            class="image-overlay absolute inset-0">
                        </div>


                        <!-- Category -->
                        <div
                            class="absolute top-4 left-4">

                            <span
                                class="bg-white/95 backdrop-blur-sm text-primary text-[11px] font-bold px-3 py-1.5 rounded-full">

                                ${item.label}

                            </span>

                        </div>


                        <!-- Price -->
                        <div
                            class="absolute bottom-4 left-4 text-white">

                            <div class="text-xs opacity-80">
                                Starting from
                            </div>

                            <div class="text-xl font-bold">
                                ${item.price}
                            </div>

                        </div>


                        <!-- Arrow -->
                        <div
                            class="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">

                            <i data-lucide="arrow-up-right"
                                class="w-5 h-5">
                            </i>

                        </div>

                    </a>


                    <!-- CONTENT -->
                    <div class="p-5">

                        <div
                            class="text-xs uppercase tracking-widest text-primary font-bold mb-2">

                            ${item.category}

                        </div>


                        <!-- TITLE CLICKABLE -->
                        <a
                            href="${detailsUrl}"
                            class="group inline-block">

                            <h3
                                class="text-xl font-bold text-dark group-hover:text-primary transition">

                                ${item.name}

                            </h3>

                        </a>


                        <p
                            class="text-sm text-muted mt-2">

                            Single session • Professional treatment

                        </p>


                        <div
                            class="flex items-center justify-between gap-3 mt-5">

                            <a
                                href="${detailsUrl}"
                                class="text-sm font-bold text-primary hover:underline">

                                View Details

                            </a>


                            <!-- IMPORTANT:
                                 Book button is NOT inside <a>
                                 so it will open modal properly -->

                            <button
                                type="button"
                                onclick='openBooking(${JSON.stringify(item.name)})'
                                class="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-full text-sm font-bold transition">

                                Book Now

                            </button>

                        </div>

                    </div>

                `;

    grid.appendChild(card);
  });

  /*
   * Lucide icons are dynamically added
   * after innerHTML.
   */

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* =========================================================
           FILTER
        ========================================================= */

let currentFilter = "all";

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    const search = document.getElementById("treatmentSearch").value;

    renderTreatments(currentFilter, search);
  });
});

/* =========================================================
           SEARCH
        ========================================================= */

document
  .getElementById("treatmentSearch")
  .addEventListener("input", function () {
    renderTreatments(currentFilter, this.value);
  });

/* =========================================================
           BOOKING MODAL
        ========================================================= */

function openBooking(treatment = "") {
  const modal = document.getElementById("bookingModal");

  const selectedTreatment = document.getElementById("selectedTreatment");

  const treatmentSelect = document.getElementById("treatmentSelect");

  selectedTreatment.value = treatment;

  /*
   * Try to select matching treatment
   */

  if (treatment) {
    let found = false;

    for (const option of treatmentSelect.options) {
      if (option.value.toLowerCase() === treatment.toLowerCase()) {
        treatmentSelect.value = option.value;

        found = true;

        break;
      }
    }

    /*
     * If exact option isn't available,
     * add it temporarily.
     */

    if (!found) {
      const option = document.createElement("option");

      option.value = treatment;
      option.textContent = treatment;

      treatmentSelect.appendChild(option);

      treatmentSelect.value = treatment;
    }
  }

  modal.classList.add("show");

  document.body.style.overflow = "hidden";
}

function closeBooking() {
  const modal = document.getElementById("bookingModal");

  modal.classList.remove("show");

  document.body.style.overflow = "";
}

/* =========================================================
           SUBMIT BOOKING
        ========================================================= */

function submitBooking(event) {
  event.preventDefault();

  const form = document.getElementById("bookingForm");

  const success = document.getElementById("bookingSuccess");

  success.classList.remove("hidden");

  setTimeout(() => {
    success.classList.add("hidden");

    form.reset();

    closeBooking();
  }, 2500);
}

/* =========================================================
           MODAL OUTSIDE CLICK
        ========================================================= */

document
  .getElementById("bookingModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeBooking();
    }
  });

/* =========================================================
           ESCAPE KEY
        ========================================================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeBooking();

    closeMobileMenu();
  }
});

/* =========================================================
           MOBILE MENU
        ========================================================= */

function openMobileMenu() {
  document.getElementById("mobileMenu").classList.add("open");

  document.getElementById("mobileOverlay").classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");

  document.getElementById("mobileOverlay").classList.add("hidden");

  document.body.style.overflow = "";
}

/* =========================================================
           CATEGORY FROM URL
           Example:
           treatments.html?category=laser
        ========================================================= */

const urlParams = new URLSearchParams(window.location.search);

const urlCategory = urlParams.get("category");

if (urlCategory && ["laser", "body", "facial"].includes(urlCategory)) {
  currentFilter = urlCategory;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");

    if (btn.dataset.filter === urlCategory) {
      btn.classList.add("active");
    }
  });
}

/* =========================================================
           INITIAL RENDER
        ========================================================= */

renderTreatments(currentFilter, "");

/* =========================================================
           INITIAL LUCIDE
        ========================================================= */

if (window.lucide) {
  lucide.createIcons();
}
