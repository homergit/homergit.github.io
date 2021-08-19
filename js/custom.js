(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();


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

(function () {
    var tablist = document.querySelectorAll('[role="tablist"]')[0];
    var tabs;
    var panels;
    var delay = determineDelay();

    generateArrays();

    function generateArrays () {
        tabs = document.querySelectorAll('[role="tab"]');
        panels = document.querySelectorAll('[role="tabpanel"]');
    };

    var keys = {
        space: 32,
        enter: 13,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
    };

    var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
    };

    for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
    };

    function addListeners (index) {
        tabs[index].addEventListener('click', clickEventListener);
        tabs[index].addEventListener('keydown', keydownEventListener);
        tabs[index].addEventListener('keyup', keyupEventListener);

        tabs[index].index = index;
    };

    function clickEventListener (event) {
        console.log('clickEventListener', event);

        var tab = event.target;
        activateTab(tab, false);
    };

    function keydownEventListener (event) {
        console.log('keydownEventListener', event);
        var key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                activateTab(tabs[tabs.length - 1]);
                break;
            case keys.home:
                event.preventDefault();
                activateTab(tabs[0]);
                break;

            case keys.space:
            case keys.enter:
                event.preventDefault();
                const focused = document.activeElement;

                activateTab(focused, false);
                break;

            case keys.up:
            case keys.down:
                determineOrientation(event);
                break;
        };
    };

    function keyupEventListener (event) {
        console.log('keyupEventListener', event);
        var key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                determineOrientation(event);
                break;
        };
    };

    function determineOrientation (event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
            if (key === keys.up || key === keys.down) {
                event.preventDefault();
                proceed = true;
            };
        }
        else {
            if (key === keys.left || key === keys.right) {
                proceed = true;
            };
        };

        if (proceed) {
            switchTabOnArrowPress(event);
        };
    };

    function switchTabOnArrowPress (event) {
        var pressed = event.keyCode;

        if (direction[pressed]) {
            var target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                }
                else if (pressed === keys.left || pressed === keys.up) {
                    focusLastTab();
                }
                else if (pressed === keys.right || pressed == keys.down) {
                    focusFirstTab();
                };
            };
        };
    };


    function activateTab (tab, setFocus) {
        setFocus = setFocus || true;
        deactivateTabs();

        tab.removeAttribute('tabindex');
        tab.setAttribute('aria-selected', 'true');

        var controls = tab.getAttribute('aria-controls');

        document.getElementById(controls).removeAttribute('hidden');

        if (setFocus) {
            tab.focus();
        };
    };

    function deactivateTabs () {
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
        };

        for (p = 0; p < panels.length; p++) {
            panels[p].setAttribute('hidden', 'hidden');
        };
    };

    function focusFirstTab () {
        tabs[0].focus();
    };

    function focusLastTab () {
        tabs[tabs.length - 1].focus();
    };

    function determineDelay () {
        var hasDelay = tablist.hasAttribute('data-delay');
        var delay = 0;

        if (hasDelay) {
            var delayValue = tablist.getAttribute('data-delay');
            if (delayValue) {
                delay = delayValue;
            }
            else {
                delay = 300;
            };
        };

        return delay;
    };
}());

