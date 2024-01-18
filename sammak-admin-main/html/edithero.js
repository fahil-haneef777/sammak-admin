window.addEventListener("load", () => {
  setInterval(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "login.html";
    }
  }, 1000);

  const formEle = document.querySelector("#heroslider");
  const title = document.getElementById("title");
  const description = document.getElementById("smallDescription");
  const image = document.getElementById("previewImg");
  const dataEdit = JSON.parse(localStorage.getItem("editData"));

  console.log(image);
  formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    addHero();
  });

  title.value = dataEdit[0].heroTitle;
  description.value = dataEdit[0].description;
  image.src = dataEdit[0].imageUrl;
  console.log(dataEdit[0].imageUrl);
});

function addHero() {
  let formData = new FormData(document.getElementById("heroslider"));
  if (formData) {
    console.log("Form data is not empty ");
  }
  fetch(
    "http://13.200.180.167:9731/HeroSlider/updateSlider/" +
      localStorage.getItem("edit"),
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if the response body is not empty before parsing as JSON
      return response.json();
    })
    .then((data) => {
      if (data.status === 200) {
        showToastOnNextPage(`${data.result}`, `${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle the error, possibly show a user-friendly message
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
