window.addEventListener("load", () => {
  setInterval(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "login.html";
    }
  }, 1000);

  const formEle = document.querySelector("#productForm");

  const prname = document.getElementById("name");
  const smDescription = document.querySelector("#small_description");
  const description = document.getElementById("description");
  const image = document.querySelector("#refImage");
  const imageContainer = document.querySelector("#preview");
  const oriPrice = document.querySelector("#original_price");
  const sellPrice = document.querySelector("#selling_price");
  const category = document.querySelector("#category");
  const quantity = document.querySelector("#quantity");

  const dataEdit = JSON.parse(localStorage.getItem("editproData"));

  formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(dataEdit);
    editProduct();
    console.log(dataEdit[0].originalPrice);
  });

  //   title.value = dataEdit[0].heroTitle;
  //   description.value = dataEdit[0].description;
  //   image.src = dataEdit[0].imageUrl;
  //   console.log(dataEdit[0].imageUrl);

  prname.value = dataEdit[0].productName;
  smDescription.value = dataEdit[0].smallDescription;
  description.value = dataEdit[0].productDescription;
  oriPrice.value = dataEdit[0].originalPrice;
  sellPrice.value = dataEdit[0].sellingPrice;
  category.value = dataEdit[0].categoryName;
  quantity.value = dataEdit[0].quantity;

  dataEdit[0].images.forEach((x) => {
    let imgEle = `<img src=${x.imageUrl}  width:"100px"; height="100px">`;
    imageContainer.insertAdjacentHTML("beforeend", imgEle);
  });

  // call toaster
  const toastDetailsJSON = localStorage.getItem("nextPageToast");

  if (toastDetailsJSON) {
    const toastDetails = JSON.parse(toastDetailsJSON);

    // Show the toast using the showToast function
    showToast(toastDetails.message, toastDetails.type);

    // Clear the stored toast details from local storage
    localStorage.removeItem("nextPageToast");
  }
  // ends
});

function editProduct() {
  let formData = new FormData(document.getElementById("productForm"));

  document.querySelector(".update-text").classList.add("d-none");
  document.querySelector(".dot-spinner").classList.remove("d-none");

  fetch(
    "https://developmentsamak-production-7c7b.up.railway.app/admin/updateProductById/" +
      localStorage.getItem("editpro"),
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
      console.log(data);
      if (data.status === 200) {
        document.querySelector(".update-text").classList.remove("d-none");
        document.querySelector(".dot-spinner").classList.add("d-none");
        showToastOnNextPage(`${data.message}`, `success`);
      }
      // if (data) {
      //   const jsonData = JSON.parse(data);
      //   redirectUrl(jsonData);
      //   console.log("Response:", jsonData);
      // } else {
      //   console.log("Empty response received.");
      //   // Handle empty response if needed
      // }
    })
    .catch((error) => {
      document.querySelector(".update-text").classList.remove("d-none");
      document.querySelector(".dot-spinner").classList.add("d-none");
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
  window.location.href = "product.html";
}
