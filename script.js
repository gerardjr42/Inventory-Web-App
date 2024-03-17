//---------------------------------Setting DOM and variables------------------------------------//
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

  const ul = create("ul");
  ul.className = "error";
  sectionForm.appendChild(ul);

  form.on("submit", (event) => {
    event.preventDefault();

    const section = create("section")
    section.className = "section-item";
    section.innerHTML = `
      <div class="item-img">
        <img src="" alt="Book Title" class="item__src">
      </div>
      <div class="item-info">
        <h1 class="item__title section-headers"></h1>
        <hr class="item__line">
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
    const img = section.$(".item__src"); 

    //Append section to container, below appends to end
    // container.appendChild(section);

    //Append section to container, below appends to start
    container.insertBefore(section, container.firstChild);


    //Reset innerHTML from ul for each error submission
    ul.innerHTML = "";


    //Add Errors for each text box
    if (name.value.length < 3) {
      const li = create("li");
      li.textContent = "Name must be more than 3 characters";
      ul.appendChild(li);
      section.remove();
    } else {
      h1.innerText = name.value;
    }

    if(author.value.length < 3) {
      const li = create("li");
      li.textContent = "Author must be more than 3 characters";
      ul.appendChild(li);
      section.remove();
    } else {
      h2.innerText = author.value;
    }

    if(isNaN(price.value) || price.value < 1){
      const li = create("li");
      li.textContent = "Price must be greater than $1";
      ul.appendChild(li);
      section.remove();
    } else {
      h3.innerText = `$${price.value}`;
    }

    // Fix below as it's not targeting value;
    if(stock.value === "") {
      const li = create("li");
      li.textContent = "In Stock cannot be blank";
      ul.appendChild(li);
      section.remove();
      } else {
        h4.innerText = stock.value;
      }


      if(imgURL.value.startsWith("http")) {
        img.src = imgURL.value;
      } else {
        const li = create("li");
        li.textContent = "URL path does not exist";
        ul.append(li);
        section.remove();
      }
      form.reset();
      ul.inner
  });

  addGlobalEventListener("click", "#remove", e => {
    e.target.parentNode.parentNode.remove();
  });

  reset.addEventListener("click", (e) => {
    ul.innerHTML = "";
    ul.style.display = "none";
    form.reset();
  });
