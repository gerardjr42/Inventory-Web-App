//---------------------------------Setting DOM and variables------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  //Created own variables
    const $ = function(args) {
      return document.querySelector(args);
    }

    const $$ = function(args) {
      return document.querySelectorAll(args);
    }
  
    const create = function(args) {
      return document.createElement(args);
    }
  
    HTMLElement.prototype.on = function(a, b, c) {
      this.addEventListener(a, b, c);
    };

    HTMLElement.prototype.off = function(a,b,c) {
      this.removeEventListener(a,b,c);
    }

    HTMLElement.prototype.$ = function(a,b,c) {
      return this.querySelector(a,b,c);
    }

    HTMLElement.prototype.$$ = function(a,b,c) {
      this.querySelectorAll(a,b,c);
    }
  
    //custom eventListener
    function addGlobalEventListener(type, selector, callback) {
      document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
      })
    };
//---------------------------------Start of DOM Implementation------------------------------------//
  //Query Select Form Inputs
  const form = $("form");
  const name = $("#name");
  const author = $("#author");
  const imgURL = $("#imageURL");
  const price = $("#price");
  const stock = $("#In-Stock");
  const reset = $("#reset");
  const submit = $("#submit");
  const container = $(".container");
  const sectionForm = $(".section-form");

  form.on("submit", (event) => {
    event.preventDefault();

    const section = create("section")
    section.className = "section-item";
    section.innerHTML = `
      <div class="item-img">
        <img src="" alt="Book Title" class="item-img">
      </div>
      <div class="item-info">
        <h1 class="item__title section-headers"></h1>
        <hr>
        <h2 class="item__author"></h2>
        <h3 class="item__price"></h3>
        <h4 class="item__stock"></h4>
        <br>
      <label for="remove"></label>
      <button id="remove" name="remove">Remove</button>
      </div>
    `;

    const h1 = section.$(".item__title");
    const h2 = section.$(".item__author");
    const h3 = section.$(".item__price");
    const h4 = section.$(".item__stock");
    const img = section.$(".item__img");

    const ul = create("ul");
    ul.className = "error";
    sectionForm.appendChild(ul);

    //Append section to container
    container.appendChild(section)

    //Add Errors for each text box
    if (name.value.length < 3) {
      const li = create("li");
      li.textContent = "Name must be more than 3 characters";
      ul.appendChild(li);
    } else {
      h1.innerText = name.value;
    }

    if(author.value.length < 3) {
      const li = create("li");
      li.textContent = "Author must be more than 3 characters";
      ul.appendChild(li);
    } else {
      h2.innerText = author.value;
    }

    if(price.value < 1) {
      const li = create("li");
      li.textContent = "Price must be greater than $1";
      ul.appendChild(li);
    } else {
      h3.innerText = `$${price.value}`;
    }

    // Fix below as it's not targeting value;
    if(stock.value === "") {
      const li = create("li");
      li.textContent = "In Stock cannot be blank";
      ul.appendChild(li);
      } else {
        h4.innerText = stock.value;
      }

      if(imgURL.value.startsWith("http")) {
        img.src = imgURL.value;
      } else {
        const li = create("li");
        li.textContent = "URL path does not exist";
      }
  });

  addGlobalEventListener("click", "#remove", e => {
    e.target.parentNode.remove();
  })
});
