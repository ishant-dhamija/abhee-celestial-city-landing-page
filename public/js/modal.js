// Get the modal and close button
var modal = document.getElementById("myModal");
var closeModal = document.getElementById("closeModal");

// Show the modal 5 seconds after page loads
window.onload = function () {
  setTimeout(function () {
    modal.style.display = "block";
  }, 15000);
};

// Handle form submission
// var form = document.getElementById("wf-form-Request-a-Demo");
// form.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent default form submission

//   // Handle form submission via fetch API
//   var formData = new URLSearchParams(new FormData(form)).toString();

//   fetch('/submit', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: formData
//   })
//   .then(response => {
//     if (response.ok) {
//       // Redirect to success page after form submission
//       window.location.href = 'success.html';
//     } else {
//       alert('Form submission failed.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     alert('Form submission failed.');
//   });
// });

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const urlParams = new URLSearchParams(window.location.search);
const source = document.getElementById("source");
source.value = urlParams.get("src");
