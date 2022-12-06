window.addEventListener("DOMContentLoaded", function () {
    // אירועי לחיצה
    document.getElementById('find-me').addEventListener('click', geoFindMe);
    document.getElementById('shareBtn').addEventListener('click', share);
  
    let linktoshare = "";
  
    // משתנים גלובלים 
    const loadStatus = document.getElementById('status');
    const mapLink = document.getElementById('map-link');
    const iframe = document.getElementById('iframe');
  
    //  הצגת המיקום שלי
    function geoFindMe() {

      mapLink.href = '';
      mapLink.textContent = '';
      iframe.src = '';
      iframe.classList.add("d-none");
  
      if (navigator.geolocation) {
        loadStatus.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        loadStatus.textContent = 'Geolocation is not supported by your browser';
      }
  
    }
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      loadStatus.textContent = '';
  
      const linktoembed = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
      linktoshare = `https://maps.google.com/?q=${latitude},${longitude}`;
      iframe.src = linktoembed;
      iframe.classList.remove("d-none");
  
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      mapLink.href = linktoshare;
    }
  
    function error() {
      loadStatus.textContent = 'Unable to retrieve your location';
    }
  
    //  פונקציית שיתוף 
    function share() {
      if (navigator.canShare) {
        navigator.share({
          title: 'שיתוף המיקום שלי',
          text: linktoshare,
        })
          .then(() => console.log('Share was successful.'))
          .catch((error) => console.log('Sharing failed', error));
      } else {
        console.log(`Your system doesn't support sharing files.`);
      }
    }
  })