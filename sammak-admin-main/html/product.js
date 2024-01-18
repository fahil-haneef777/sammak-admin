window.addEventListener("load", () => {
  const form = document.querySelector(".addForm");

  setInterval(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "login.html";
    }
  }, 1000);
  form.addEventListener("submit", (e) => {
    // e.preventDefault();
    add();
  });
});

function add() {
  // const token = localStorage.getItem("token");
  // const config = {
  //   headers: {
  //     Accept: "multipart/form-data",
  //     Authorization: `Bearer ` + token,
  //   },
  // };
  // Make an AJAX request to the Spring Boot backend

  var formData = new FormData(document.getElementById("productForm"));

  document.querySelector(".submit-text").classList.add("d-none");
  document.querySelector(".dot-spinner").classList.remove("d-none");

  fetch("http://13.200.180.167:9731/admin/addProducts", {
    method: "POST",
    body: formData,

    headers: {
      // Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the backend
      if (data.status === 200) {
        document.querySelector(".dot-spinner").classList.add("d-none");
        document.querySelector(".submit-text").classList.remove("d-none");
        // initiate toaster value
        showToastOnNextPage(`${data.result}`, `${data.message}`);
        // ends
      } else {
        // Handle other conditions if needed
        console.error("Error:", data.errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Optionally, show an error toaster message
      // toastr.error("An error occurred while adding the product.");
    });
}

function showToastOnNextPage(message, type) {
  const toastDetails = {
    message: message,
    type: type,
  };

  // Store the toast details in local storage
  localStorage.setItem("nextPageToast", JSON.stringify(toastDetails));

  // Redirect to the next page
  window.location.href = "product.html";
}
