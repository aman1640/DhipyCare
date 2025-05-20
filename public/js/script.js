// List of available locations
const availableLocations = ["Delhi", "Mumbai", "Bangalore", "Lucknow"];

// Sample doctor services
const doctorServices = [
  {
    id: 'general',
    name: 'General Physician',
    info: 'Consult for common illnesses, fever, cough, and general health issues.'
  },
  {
    id: 'pediatrician',
    name: 'Pediatrician',
    info: 'Specialist for children and infants.'
  },
  {
    id: 'dermatologist',
    name: 'Dermatologist',
    info: 'Skin, hair, and nail specialist.'
  }
];

// Sample nurse services
const nurseServices = [
  {
    id: 'general-nurse',
    name: 'General Nurse',
    info: 'Home care for injections, wound dressing, and basic medical needs.'
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care Nurse',
    info: 'Specialized care for elderly patients at home.'
  },
  {
    id: 'post-surgery',
    name: 'Post-Surgery Nurse',
    info: 'Care and monitoring after surgery or hospitalization.'
  }
];

// Sample emergency services
const emergencyServices = [
  {
    id: 'ambulance',
    name: 'Ambulance Service',
    info: 'Quick ambulance dispatch for medical emergencies.'
  },
  {
    id: 'emergency-consult',
    name: 'Emergency Doctor Consult',
    info: 'Immediate video/phone consult with a doctor.'
  }
];

function navigate(service) {
  const content = document.getElementById('service-content');
  let html = '';
  switch (service) {
    case 'doctor':
      html = `<button class="back-btn" onclick="goBack()">&larr; Back</button><h2>Book a Doctor</h2><div class='service-list'>`;
      doctorServices.forEach(doc => {
        html += `<div class='service-item'><h3>${doc.name}</h3><p>${doc.info}</p><button onclick="showDoctorBookingForm('${doc.id}')">Book</button></div>`;
      });
      html += `</div>`;
      break;
    case 'nurse':
      html = `<button class="back-btn" onclick="goBack()">&larr; Back</button><h2>Book a Nurse</h2><div class='service-list'>`;
      nurseServices.forEach(nurse => {
        html += `<div class='service-item'><h3>${nurse.name}</h3><p>${nurse.info}</p><button onclick="showNurseBookingForm('${nurse.id}')">Book</button></div>`;
      });
      html += `</div>`;
      break;
    case 'emergency':
      html = `<button class="back-btn" onclick="goBack()">&larr; Back</button><h2>Emergency Help</h2><div class='service-list'>`;
      emergencyServices.forEach(em => {
        html += `<div class='service-item'><h3>${em.name}</h3><p>${em.info}</p><button onclick="showEmergencyContact('${em.id}')">Contact</button></div>`;
      });
      html += `</div>`;
      break;
    case 'bookings':
      html = `<button class="back-btn" onclick="goBack()">&larr; Back</button><h2>View Bookings</h2><p>See your upcoming and past bookings here.</p>`;
      break;
    default:
      html = '';
  }
  document.querySelector('.grid').style.display = 'none';
  content.innerHTML = html;
}

function goBack() {
  document.getElementById('service-content').innerHTML = '';
  document.querySelector('.grid').style.display = 'grid';
}

window.showDoctorBookingForm = function(serviceId) {
  const doc = doctorServices.find(d => d.id === serviceId);
  const content = document.getElementById('service-content');
  content.innerHTML = `
    <button class="back-btn" onclick="goBack()">&larr; Back</button>
    <h2>Book: ${doc.name}</h2>
    <form id="doctor-booking-form" class="booking-form">
      <input type="text" id="patient-name" placeholder="Your Name" required><br>
      <input type="text" id="symptoms" placeholder="Symptoms" required><br>
      <input type="datetime-local" id="preferred-time" required><br>
      <select id="urgency" required>
        <option value="normal">Normal</option>
        <option value="emergency">Emergency</option>
      </select><br>
      <button type="submit">Submit Booking</button>
      <div id="booking-message" class="booking-message"></div>
    </form>
  `;
  document.getElementById('doctor-booking-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-name').value;
    const symptoms = document.getElementById('symptoms').value;
    const preferredTime = document.getElementById('preferred-time').value;
    const urgency = document.getElementById('urgency').value;
    const booking = {
      serviceType: 'doctor',
      doctorType: doc.name,
      name,
      symptoms,
      preferredTime,
      urgency,
      created: new Date().toISOString()
    };
    try {
      await db.collection('bookings').add(booking);
      document.getElementById('booking-message').textContent = 'Booking submitted successfully!';
      document.getElementById('doctor-booking-form').reset();
    } catch (err) {
      document.getElementById('booking-message').textContent = 'Error submitting booking.';
    }
  };
};

window.showNurseBookingForm = function(serviceId) {
  const nurse = nurseServices.find(n => n.id === serviceId);
  const content = document.getElementById('service-content');
  content.innerHTML = `
    <button class="back-btn" onclick="goBack()">&larr; Back</button>
    <h2>Book: ${nurse.name}</h2>
    <form id="nurse-booking-form" class="booking-form">
      <input type="text" id="patient-name" placeholder="Your Name" required><br>
      <input type="text" id="symptoms" placeholder="Symptoms/Reason" required><br>
      <input type="datetime-local" id="preferred-time" required><br>
      <select id="urgency" required>
        <option value="normal">Normal</option>
        <option value="emergency">Emergency</option>
      </select><br>
      <button type="submit">Submit Booking</button>
      <div id="booking-message" class="booking-message"></div>
    </form>
  `;
  document.getElementById('nurse-booking-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-name').value;
    const symptoms = document.getElementById('symptoms').value;
    const preferredTime = document.getElementById('preferred-time').value;
    const urgency = document.getElementById('urgency').value;
    const booking = {
      serviceType: 'nurse',
      nurseType: nurse.name,
      name,
      symptoms,
      preferredTime,
      urgency,
      created: new Date().toISOString()
    };
    try {
      await db.collection('bookings').add(booking);
      document.getElementById('booking-message').textContent = 'Booking submitted successfully!';
      document.getElementById('nurse-booking-form').reset();
    } catch (err) {
      document.getElementById('booking-message').textContent = 'Error submitting booking.';
    }
  };
};

window.showEmergencyContact = function(serviceId) {
  const em = emergencyServices.find(e => e.id === serviceId);
  const content = document.getElementById('service-content');
  let contactInfo = '';
  if (serviceId === 'ambulance') {
    contactInfo = '<b>Call: 102 or 108</b>';
  } else if (serviceId === 'emergency-consult') {
    contactInfo = '<b>Call: +91-XXXXXXXXXX</b> or use our app chat for instant consult.';
  }
  content.innerHTML = `
    <button class="back-btn" onclick="goBack()">&larr; Back</button>
    <h2>${em.name}</h2>
    <p>${em.info}</p>
    <div class='service-item' style='align-items:center;text-align:center;'>
      <div style='margin: 12px 0 8px 0;'>${contactInfo}</div>
      <button onclick="goBack()">Back to Emergency List</button>
    </div>
  `;
};

document.addEventListener('DOMContentLoaded', function() {
  const profileIcon = document.getElementById('profile-icon');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');

  profileIcon.addEventListener('click', function() {
    sidebar.classList.add('open');
    // Fetch and display user profile info
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const auth = firebase.auth();
      const db = firebase.firestore();
      auth.onAuthStateChanged(function(user) {
        if (user) {
          db.collection('users').doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
              const data = doc.data();
              console.log("User data from Firestore:", data); // Debugging
              document.getElementById('profile-photo').innerHTML = data.photoURL
                ? `<img src="${data.photoURL}" style="width:60px;height:60px;border-radius:50%;">`
                : '';
              document.getElementById('profile-name').textContent = data.fullName || '';
              document.getElementById('profile-email').textContent = data.email || '';
              document.getElementById('profile-phone').textContent = data.phoneNumber || '';
            } else {
              document.getElementById('profile-photo').innerHTML = '';
              document.getElementById('profile-name').textContent = '';
              document.getElementById('profile-email').textContent = '';
              document.getElementById('profile-phone').textContent = '';
            }
          });
        }
      });
    }
  });
  closeSidebar.addEventListener('click', function() {
    sidebar.classList.remove('open');
  });

  // Enable clicking on the location text to open the location modal
  const modernLocationText = document.getElementById('modern-location-text');
  const locationOverlay = document.getElementById('location-overlay');
  if (modernLocationText && locationOverlay) {
    modernLocationText.style.cursor = 'pointer';
    modernLocationText.addEventListener('click', function() {
      locationOverlay.style.display = '';
    });
  }

  if (window.location.pathname.endsWith('home.html')) {
    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC62wo52XfJDOBnJc6VAQDDbse3a-KKy-k",
        authDomain: "dhipycare.firebaseapp.com",
        projectId: "dhipycare",
        appId: "1:493427173597:web:379ad40ef8360df81ad334"
      });
    }
    const auth = firebase.auth();
    const db = firebase.firestore();
    auth.onAuthStateChanged(function(user) {
      if (user) {
        db.collection('users').doc(user.uid).get().then(function(doc) {
          if (doc.exists) {
            const data = doc.data();
            console.log("User data from Firestore:", data); // Debugging
            var headerNameEl = document.getElementById('user-profile-name-header');
            if (headerNameEl) {
              console.log("Setting header name:", data.fullName);
              headerNameEl.textContent = data.fullName || '';
            } else {
              console.warn("Element with id 'user-profile-name-header' not found in DOM");
            }
          } else {
            var headerNameEl = document.getElementById('user-profile-name-header');
            if (headerNameEl) headerNameEl.textContent = '';
          }
        }).catch(function() {
          var headerNameEl = document.getElementById('user-profile-name-header');
          if (headerNameEl) headerNameEl.textContent = '';
        });
      } else {
        var headerNameEl = document.getElementById('user-profile-name-header');
        if (headerNameEl) headerNameEl.textContent = '';
      }
    });
  }
});

// --- Location Modal with Google Maps, Places Autocomplete, and Geocoding ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('location-overlay');
    const container = document.querySelector('.main-content');
    if (container) container.style.display = 'none';
    if (overlay) overlay.style.display = '';
    const mapDiv = document.getElementById('map');
    const searchInput = document.getElementById('location-search');
    const useCurrentBtn = document.getElementById('use-current-location');
    const addressDiv = document.getElementById('selected-address');
    const submitBtn = document.getElementById('location-submit');
    const errorDiv = document.getElementById('location-error');

    let map, marker, geocoder, autocomplete, selectedLatLng = null, selectedAddress = '';

    function setAddress(address) {
      selectedAddress = address;
      addressDiv.textContent = address;
    }

    function setLatLng(lat, lng, zoom=16) {
      const latLng = new google.maps.LatLng(lat, lng);
      map.setCenter(latLng);
      map.setZoom(zoom);
      marker.setPosition(latLng);
      selectedLatLng = [lat, lng];
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });
    }

    function initMap() {
      geocoder = new google.maps.Geocoder();
      map = new google.maps.Map(mapDiv, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        streetViewControl: false,
        mapTypeControl: false,
      });
      marker = new google.maps.Marker({
        position: { lat: 20.5937, lng: 78.9629 },
        map,
        draggable: true,
      });
      // Marker drag event
      marker.addListener('dragend', function() {
        const pos = marker.getPosition();
        setLatLng(pos.lat(), pos.lng());
      });
      // Map click event
      map.addListener('click', function(e) {
        setLatLng(e.latLng.lat(), e.latLng.lng());
      });
      // Autocomplete
      autocomplete = new google.maps.places.Autocomplete(searchInput, { types: ['geocode'] });
      autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        setLatLng(place.geometry.location.lat(), place.geometry.location.lng());
        setAddress(place.formatted_address || place.name);
      });
    }

    // Use current location
    useCurrentBtn.addEventListener('click', function() {
      if (!navigator.geolocation) {
        errorDiv.textContent = 'Geolocation not supported.';
        return;
      }
      navigator.geolocation.getCurrentPosition(function(pos) {
        setLatLng(pos.coords.latitude, pos.coords.longitude, 17);
      }, function() {
        errorDiv.textContent = 'Unable to access your location.';
      });
    });

    // Submit location
    submitBtn.onclick = function() {
      if (!selectedLatLng || !selectedAddress) {
        errorDiv.textContent = 'Please select a valid location.';
        return;
      }
      overlay.style.display = 'none';
      container.style.display = '';
      updateHeaderDropdown(selectedAddress);
      // Update modern header location text
      const modernLocationText = document.getElementById('modern-location-text');
      if (modernLocationText) modernLocationText.textContent = selectedAddress;
    };

    // Wait for Google Maps to be loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }
  });
})();

// FAQ dropdown/accordion logic
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', function() {
        const item = btn.closest('.faq-item');
        // Close all others
        document.querySelectorAll('.faq-item').forEach(i => {
          if (i !== item) i.classList.remove('active');
        });
        // Toggle this one
        item.classList.toggle('active');
      });
    });
  });
})();

// Modern H Card click logic to show a list of providers, then a form on select
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.modern-h-card');
    const servicesSection = document.querySelector('.services-list');
    const sectionTitle = document.querySelector('.section-title');
    let formContainer = document.getElementById('modern-form-container');
    if (!formContainer) {
      formContainer = document.createElement('div');
      formContainer.id = 'modern-form-container';
      formContainer.style.margin = '24px 0';
      servicesSection.parentNode.insertBefore(formContainer, servicesSection);
    }

    // Sample data
    const doctorList = [
      { name: 'Dr. A. Sharma', specialty: 'General Physician', details: '10 yrs exp · MBBS, MD', img: '415.jpg' },
      { name: 'Dr. S. Verma', specialty: 'Pediatrician', details: '8 yrs exp · MBBS, DCH', img: '415.jpg' },
      { name: 'Dr. R. Singh', specialty: 'Dermatologist', details: '12 yrs exp · MBBS, DDVL', img: '415.jpg' }
    ];
    const nurseList = [
      { name: 'Nurse Priya', specialty: 'Home Care', details: '5 yrs exp · GNM', img: '8465661.jpg' },
      { name: 'Nurse Kavita', specialty: 'Elderly Care', details: '7 yrs exp · BSc Nursing', img: '8465661.jpg' }
    ];
    const homeList = [
      { name: 'Home Service Team', specialty: 'General Assistance', details: 'Available 24/7', img: '5020796.jpg' }
    ];

    function showServices() {
      if (servicesSection) servicesSection.style.display = '';
      if (sectionTitle) sectionTitle.style.display = '';
      formContainer.innerHTML = '';
    }

    function renderList(type) {
      let list = [];
      let title = '';
      if (type === 0) { list = doctorList; title = 'Available Doctors'; }
      if (type === 1) { list = nurseList; title = 'Available Nurses'; }
      if (type === 2) { list = homeList; title = 'Available Home Services'; }
      // Hide services section and title
      if (servicesSection) servicesSection.style.display = 'none';
      if (sectionTitle) sectionTitle.style.display = 'none';
      // Render list with back arrow
      formContainer.innerHTML = `
        <div class='modern-provider-list'>
          <div class='modern-provider-back-arrow'>&larr; Back</div>
          <h3>${title}</h3>
          ${list.map((p, idx) => `
            <div class='modern-provider-card'>
              <img src='${p.img}' alt='${p.name}' class='modern-provider-img'>
              <div class='modern-provider-info'>
                <div class='modern-provider-name'>${p.name}</div>
                <div class='modern-provider-specialty'>${p.specialty}</div>
                <div class='modern-provider-details'>${p.details}</div>
              </div>
              <button class='modern-provider-select' data-type='${type}' data-idx='${idx}'>Select</button>
            </div>
          `).join('')}
        </div>`;
      // Add select button listeners
      formContainer.querySelectorAll('.modern-provider-select').forEach(btn => {
        btn.addEventListener('click', function() {
          const t = parseInt(btn.getAttribute('data-type'));
          const i = parseInt(btn.getAttribute('data-idx'));
          showForm(t, i);
        });
      });
      // Add back arrow listener
      const backArrow = formContainer.querySelector('.modern-provider-back-arrow');
      if (backArrow) backArrow.addEventListener('click', showServices);
    }

    function showForm(type, idx) {
      let provider = null;
      let formTitle = '';
      if (type === 0) { provider = doctorList[idx]; formTitle = 'Doctor Appointment'; }
      if (type === 1) { provider = nurseList[idx]; formTitle = 'Nurse Visit'; }
      if (type === 2) { provider = homeList[idx]; formTitle = 'Home Service'; }
      formContainer.innerHTML = `
        <form class="modern-service-form">
          <div class='modern-provider-back-arrow'>&larr; Back</div>
          <h3>${formTitle} Request</h3>
          <div class='modern-provider-form-info'>
            <img src='${provider.img}' alt='${provider.name}' class='modern-provider-img'>
            <div>
              <div class='modern-provider-name'>${provider.name}</div>
              <div class='modern-provider-specialty'>${provider.specialty}</div>
              <div class='modern-provider-details'>${provider.details}</div>
            </div>
          </div>
          <label>Name<br><input type="text" name="name" required></label><br>
          <label>Phone Number<br><input type="tel" name="phone" required></label><br>
          <label>Address<br><input type="text" name="address" required></label><br>
          <label>Preferred Date & Time<br><input type="datetime-local" name="datetime" required></label><br>
          <label>Describe Your Need<br><textarea name="need" rows="3" required></textarea></label><br>
          <button type="submit">Submit</button>
        </form>
      `;
      // Add back arrow listener
      const backArrow = formContainer.querySelector('.modern-provider-back-arrow');
      if (backArrow) backArrow.addEventListener('click', showServices);
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', function() {
        renderList(idx);
      });
    });
  });
})();

let initialLocationSet = false;

function showLocationModal() {
    locationOverlay.classList.add('active');
    setTimeout(initMap, 100);
}

function closeLocationModal() {
    locationOverlay.classList.remove('active');
    locationError.textContent = '';
}

if (closeLocationModalBtn) {
    closeLocationModalBtn.addEventListener('click', () => {
        if (initialLocationSet) {
            closeLocationModal();
        } else {
            locationError.textContent = 'Please select and confirm a location to continue.';
        }
    });
}

window.addEventListener('click', (event) => {
    if (event.target == locationOverlay) {
        if (initialLocationSet) {
            closeLocationModal();
        } else {
            locationError.textContent = 'Please select and confirm a location to proceed.';
        }
    }
});

if (locationSubmitBtn) {
    locationSubmitBtn.addEventListener('click', () => {
        let locationToSet = "Location Not Set";
        if (selectedLatLng && selectedAddressDisplay.textContent !== 'Address not found.' && selectedAddressDisplay.textContent !== 'Could not fetch address.' && selectedAddressDisplay.textContent !== 'Not set') {
            locationToSet = selectedAddressDisplay.textContent;
        } else if (manualAddressInput.value.trim() !== "") {
            locationToSet = manualAddressInput.value.trim();
        }
        if (locationToSet !== "Location Not Set") {
            updateHeaderLocation(locationToSet);
            localStorage.setItem('userLocation', locationToSet);
            if(selectedLatLng) localStorage.setItem('userLatLng', JSON.stringify(selectedLatLng));
            const justSetInitial = !initialLocationSet;
            initialLocationSet = true;
            closeLocationModal();
            if (justSetInitial) {
                showFullServicesOverview();
            }
        } else {
            locationError.textContent = 'Please select a location on the map or enter an address.';
        }
    });
}

// On page load:
const savedLocationOnLoad = localStorage.getItem('userLocation');
if (savedLocationOnLoad) {
    updateHeaderLocation(savedLocationOnLoad);
    if (selectedAddressDisplay) selectedAddressDisplay.textContent = savedLocationOnLoad;
    if (manualAddressInput) manualAddressInput.value = savedLocationOnLoad;
    if (locationSubmitBtn) locationSubmitBtn.disabled = false;
    const savedLatLngOnLoad = localStorage.getItem('userLatLng');
    if (savedLatLngOnLoad) {
        selectedLatLng = JSON.parse(savedLatLngOnLoad);
    }
    initialLocationSet = true;
    showFullServicesOverview();
} else {
    showLocationModal();
} 