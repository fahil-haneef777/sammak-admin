window.addEventListener("load", () => {
  const formEle = document.querySelector("#lgForm");
  const email = document.querySelector("#adminemail");
  const password = document.querySelector("#adminpassword");
  const encryptkey = encrypt(
    "https://developmentsamak-production-7c7b.up.railway.app/"
  );
  // ui elements

  const log = document.querySelector(".log");
  const loader = document.querySelector(".dot-spinner");
  const toast = document.querySelector(".toast");
  const toastBody = document.querySelector(".toast-body");
  // ends
  formEle.addEventListener("submit", (e) => {
    e.preventDefault();

    if (email.value === "" || password.value === "") {
      console.log("please enter the email or password");
    }
    if (email.value && password.value) {
      log.classList.add("d-none");
      loader.classList.remove("d-none");

      fetch(
        "https://developmentsamak-production-7c7b.up.railway.app/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => {
          let data = response.json();
          console.log(data);
          return data;
        })
        .then((data) => {
          if (data.result.roleName === "ROLE_Admin") {
            log.classList.remove("d-none");
            loader.classList.add("d-none");
            toast.classList.add("show");
            toastBody.innerHTML = "Logged in successfully";
            localStorage.setItem("token", data.result.accessToken);
            window.location.href = "index.html";
          } else {
            log.classList.remove("d-none");
            loader.classList.add("d-none");
            toast.classList.add("show");
            toastBody.innerHTML = "Please enter a valid user login credential ";
          }
        })
        .catch((err) => {
          log.classList.remove("d-none");
          loader.classList.add("d-none");
          toast.classList.add("show");
          toastBody.innerHTML = err;
          console.warn(err);
        });
    }
  });
});
