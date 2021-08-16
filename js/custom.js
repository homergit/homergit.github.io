(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
      tab.setAttribute("aria-active", "true");
    } else {
      tab.style.display = "none";
      tab.setAttribute("aria-active", "false");
    }
  });
}


(function() {
  const emailValidation = document.querySelector("#emailValidation");
  const emailInput = document.querySelector("#email");
  emailInput.addEventListener("blur", ({target}) => {
    const enteredEmail = target.value;

    emailValidation.setAttribute("aria-hidden", "false");

    if (isEmailValid(enteredEmail)) {
      emailValidation.innerHTML = enteredEmail + " email is valid, check please";

      emailInput.setAttribute("aria-invalid", "false");
      emailValidation.removeAttribute("role");

      emailInput.classList.add("is-success");
      emailInput.classList.remove("is-danger");
      emailValidation.classList.add("is-success");
      emailValidation.classList.remove("is-danger");
    } else {
      emailValidation.innerHTML = enteredEmail + " email is invalid";

      emailInput.setAttribute("aria-invalid", "true");
      emailValidation.setAttribute("role", "alert");

      emailInput.classList.add("is-danger");
      emailInput.classList.remove("is-success");
      emailValidation.classList.add("is-danger");
      emailValidation.classList.remove("is-success");
    }
  });
})();


function isEmailValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
