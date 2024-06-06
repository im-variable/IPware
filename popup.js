document.addEventListener('DOMContentLoaded', function() {
  const ipAddressElement = document.getElementById('ip-address-block');

  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      // Optionally, fetch more information about the IP
      fetch(`https://ipinfo.io/${data.ip}/json`)
        .then(response => response.json())
        .then(info => {
          const ipInfoDiv = document.getElementById('ip-info');
          ipAddressElement.innerHTML = `<p>Your IP address is: <span id="ip-address">${data.ip}</span></p>`;

          ipInfoDiv.innerHTML += `<p>Location: ${info.city}, ${info.region}, ${info.country}</p>`;
          ipInfoDiv.innerHTML += `<p>ISP: ${info.org}</p>`;
        })
        .catch(error => console.error('Error fetching IP info:', error));
      
      // Add click event listener to copy IP address
      ipAddressElement.addEventListener('click', function() {
        navigator.clipboard.writeText(data.ip).then(() => {
          console.log('IP address copied to clipboard');
          alert('IP address copied to clipboard');
        }).catch(err => {
          console.error('Error copying IP address:', err);
        });
      });
    })
    .catch(error => console.error('Error fetching IP:', error));
});
