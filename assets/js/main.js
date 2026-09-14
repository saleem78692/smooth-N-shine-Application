
    const servicesData = {
      salon: [
        {
          id: 'wax-1',
          title: 'Full Arms + Full Legs + Underarms Korean Waxing',
          price: 899,
          duration: '1 hr 15 mins',
          badge: null,
          subtitle: null,
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        },
        {
          id: 'body-1',
          title: 'Korean Body Polishing',
          price: 1899,
          duration: '2 hr 10 mins',
          badge: 'Most Booked',
          subtitle: 'Free Gifts Included',
          image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        },
        {
          id: 'pedi-1',
          title: 'Korean Mani & Pedi',
          price: 1089,
          duration: '1 hr 55 mins',
          badge: 'Candle Massage',
          subtitle: null,
          image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        }
      ],
      hydraglo: [
        {
          id: 'facial-1',
          title: 'Deep Hydration Glow Facial',
          price: 1499,
          duration: '1 hr 00 mins',
          badge: 'Trending',
          subtitle: 'Instant Radiance Boost',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        },
        {
          id: 'facial-2',
          title: 'Korean Glass Skin HydraFacial',
          price: 2299,
          duration: '1 hr 30 mins',
          badge: 'Most Booked',
          subtitle: 'Free Vitamin C Serum',
          image: 'https://images.unsplash.com/photo-1512290900673-700201211e4f?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        }
      ],
      laser: [
        {
          id: 'laser-1',
          title: 'Full Body Laser Hair Reduction',
          price: 3999,
          duration: '2 hr 30 mins',
          badge: 'Best Value',
          subtitle: 'Painless Cooling Technology',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
          initialQty: 0
        }
      ]
    };

    let activeCategory = 'salon';
    let cart = {};

    Object.keys(servicesData).forEach(cat => {
      servicesData[cat].forEach(item => {
        if (item.initialQty > 0) {
          cart[item.id] = { ...item, qty: item.initialQty };
        }
      });
    });

    function renderCards() {
      const grid = document.getElementById('cardsGrid');
      const items = servicesData[activeCategory] || [];

      grid.innerHTML = items.map(item => {
        const qty = cart[item.id] ? cart[item.id].qty : 0;

        return `
          <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300">
            <!-- Left Column: Image & Stepper Button -->
            <div class="relative flex-shrink-0 w-28 sm:w-32">
              <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
                <img 
                  src="${item.image}" 
                  alt="${item.title}" 
                  class="w-full h-full object-cover"
                  onerror="this.src='https://placehold.co/150x150/fce8ef/a0284c?text=Service'"
                />
                ${item.badge ? `
                  <div class="absolute top-0 left-0 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-br-lg rounded-tl-xl tracking-wide">
                    ${item.badge}
                  </div>
                ` : ''}
              </div>

              <!-- Stepper / ADD Button Overlay (Perfectly Centered at Image Bottom) -->
              <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-[80%] flex justify-center z-10">
                ${qty > 0 ? `
                  <!-- Active Quantity Stepper -->
                  <div class="flex items-center justify-between w-full bg-white border-2 border-primary rounded-lg px-2 py-1 shadow-md text-primary font-bold text-sm" style="margin-left:100px;">
                    <button 
                      onclick="updateQuantity('${item.id}', -1)"
                      class="hover:bg-primary-light rounded w-5 h-5 flex items-center justify-center transition-colors text-base font-bold leading-none select-none">
                      −
                    </button>
                    <span class="text-xs font-bold select-none text-gray-900">${qty}</span>
                    <button 
                      onclick="updateQuantity('${item.id}', 1)"
                      class="hover:bg-primary-light rounded w-5 h-5 flex items-center justify-center transition-colors text-base font-bold leading-none select-none">
                      +
                    </button>
                  </div>
                ` : `
                  <!-- Default ADD Button -->
                  <button 
                    onclick="updateQuantity('${item.id}', 1)"
                    class="w-full bg-white hover:bg-pink-50 border-2 border-primary text-primary font-bold text-xs tracking-wider py-1.5 px-3 rounded-lg shadow-md transition-all duration-150 uppercase active:scale-95 text-center" style="margin-left:100px;">
                    ADD
                  </button>
                `}
              </div>
            </div>

            <!-- Right Column: Details -->
            <div class="flex-1 pt-1 pr-1">
              <h3 class="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
                ${item.title}
              </h3>
              
              ${item.subtitle ? `
                <p class="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                  <i data-lucide="sparkles" class="w-3 h-3 text-amber-500"></i> ${item.subtitle}
                </p>
              ` : ''}

              <div class="mt-3 flex items-center gap-2 flex-wrap">
                <span class="font-bold text-sm sm:text-base text-gray-900">
                  ₹${item.price.toLocaleString('en-IN')}
                </span>
                <span class="text-xs text-gray-500 font-normal flex items-center gap-1">
                  <i data-lucide="clock" class="w-3 h-3 text-gray-400"></i> ${item.duration}
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      lucide.createIcons();
      updateCartSummary();
    }

    function updateQuantity(serviceId, change) {
      let serviceItem = null;
      for (const cat in servicesData) {
        const found = servicesData[cat].find(s => s.id === serviceId);
        if (found) {
          serviceItem = found;
          break;
        }
      }

      if (!serviceItem) return;

      const currentQty = cart[serviceId] ? cart[serviceId].qty : 0;
      const newQty = currentQty + change;

      if (newQty <= 0) {
        delete cart[serviceId];
      } else {
        cart[serviceId] = {
          ...serviceItem,
          qty: newQty
        };
      }

      renderCards();
    }

    function switchCategory(cat) {
      activeCategory = cat;

      ['salon', 'hydraglo', 'laser'].forEach(category => {
        const tabBtn = document.getElementById(`tab-${category}`);
        if (category === cat) {
          tabBtn.className = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap bg-primary-light text-primary shadow-xs border border-pink-200/50";
        } else {
          tabBtn.className = "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200";
        }
      });

      renderCards();
    }

    function updateCartSummary() {
      const badgeEl = document.getElementById('bookingBadge');
      const totalPriceEl = document.getElementById('cartTotalPrice');
      const itemsLabelEl = document.getElementById('cartItemsLabel');

      let totalItems = 0;
      let totalPrice = 0;

      Object.values(cart).forEach(item => {
        totalItems += item.qty;
        totalPrice += item.price * item.qty;
      });

      totalPriceEl.innerText = `₹${totalPrice.toLocaleString('en-IN')}`;
      itemsLabelEl.innerText = `${totalItems} item${totalItems === 1 ? '' : 's'}`;

      if (totalItems > 0) {
        badgeEl.innerText = totalItems;
        badgeEl.classList.remove('hidden');
        
        // Re-trigger CSS pop animation on count change
        badgeEl.classList.remove('badge-pop');
        void badgeEl.offsetWidth; // reflow trigger
        badgeEl.classList.add('badge-pop');
      } else {
        badgeEl.classList.add('hidden');
      }
    }

    window.onload = function() {
      renderCards();
    };