window.addEventListener("load", () => {
  const form = document.querySelector(".heroSlider");

  setInterval(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "login.html";
    }
  }, 1000);

  // form.addEventListener("submit", (e) => {
  //   // e.preventDefault();
  //   // add();
  // });
});

function addHero() {
  // const token = localStorage.getItem("token");
  // const config = {
  //   headers: {
  //     Accept: "multipart/form-data",
  //     Authorization: `Bearer ` + token,
  //   },
  // };
  // Make an AJAX request to the Spring Boot backend
  var formData = new FormData(document.getElementById("heroSlider"));
  console.log(formData);
  fetch(
    "https://developmentsamak-production-7c7b.up.railway.app/HeroSlider/addHeroSlider",
    {
      method: "POST",
      body: formData,

      headers: {
        // Accept: "*/*",
        Authorization: `Bearer ` + localStorage.getItem("token"),
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      if (data.status === 200) {
        console.log(data);
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
  window.location.href = "hero-slider.html";
}
