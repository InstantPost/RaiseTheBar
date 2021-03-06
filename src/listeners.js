import { id, cls, $ } from "./selectors";
import { order } from "./OrderForm";
import { volunteer } from "./VolunteerForm";
import { commodities } from "./CommoditiesForm";
import { printers } from "./PrintersForm";
import { requirement } from "./RequirementsForm";
import { manufacturer } from "./ManufacturersForm";
import { EditCard } from "./Card";
import { doctor } from "./DoctorsForm";
import { CloseModal } from "./Modal";
import { ViewImg } from "./ImgViewer";
import { filter } from "./FilterData";
import { search } from "./SearchBar";
import { Authenticate } from "./Auth";

var flagima=0;

id("login_btn").addEventListener("click", () => {
  Authenticate("", {
    func: function() {
      CloseModal();
    },
    args: ""
  });
  $("#modal .title").forEach(e => (e.style.display = "none"));
});
id("search_input").addEventListener("input", search);
id("doctor_init").addEventListener("click", doctor);
id("volunteer_init").addEventListener("click", volunteer);
id("commodity_init").addEventListener("click", commodities);
id("printer_init").addEventListener("click", printers);
id("requirement_init").addEventListener("click", requirement);
id("manufacturer_init").addEventListener("click", manufacturer);
document.querySelector("body").addEventListener("wheel", event => {
  const target = event.target;
  if (target.classList.contains("obj_img")) {
    if (event.deltaX) {
      return;
    }
    if (event.deltaY > 0) target.parentNode.scrollLeft += 50;
    else target.parentNode.scrollLeft -= 50;
  }
});
document.querySelector("body").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("filter_table_data")) {
    filter(target);
  }
  if (target.classList.contains("form_cancel")) {
    CloseModal();
  }
  if (target.classList.contains("obj_img")) {
    ViewImg(target);
  }
  if (target.classList.contains("obj-edit")) {
    EditCard(target);
  }
  if (target.id == "logout_btn") {
    localStorage.clear();
    id("logout_btn").style.display = "none";
    id("login_btn").style.display = "block";
  }
  if (target.classList.contains("navbar-item")) {
    const tab = target.getAttribute("data-href");
    if (!tab) return;
    if (tab == "home") id("search_input_container").style.display = "none";
    else id("search_input_container").style.display = "flex";
    Array.from(cls("navbar-item")).forEach(el => {
      el.classList = "navbar-item is-white has-text-grey";
    });
    target.classList = "navbar-item is-white has-text-primary active-tab-link";
    Array.from(cls("tab")).forEach(el => {
      el.classList.remove("active");
    });
    id("search_input").setAttribute("data-entity", tab);
    document.querySelector(`#${tab}`).classList += " active";
    document.querySelector(".burger").click();
  }

  if(target.id=="imabtn")
  {
    if(flagima==0)
    {
      document.getElementsByClassName("all_options")[0].style.display="flex";
      flagima=1;
    }
    else if(flagima==1)
    {
      document.getElementsByClassName("all_options")[0].style.display="none";
      flagima=0;
    }
  }
  if(target.id=="backtotop")
  {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});


document.querySelector("#homemainlinks").addEventListener("click", (event) => {
  const tab = event.target.getAttribute("data-href");
  console.log(tab)
  if (!tab) return;
  if (tab == "home") id("search_input_container").style.display = "none";
  else id("search_input_container").style.display = "flex";
  Array.from(cls("navbar-item")).forEach((el) => {
    el.classList = "navbar-item is-white has-text-grey";
  });
  event.target.classList = "navbar-item is-white has-text-primary active-tab-link";
  Array.from(cls("tab")).forEach((el) => {
    el.classList.remove("active");
  });
  id("search_input").setAttribute("data-entity", tab);
  document.querySelector(`#${tab}`).classList += " active";
  document.querySelector(".burger").click();

});

document.querySelector("#allops").addEventListener("click", (event) => {
  const tab = event.target.getAttribute("data-href");
  console.log(tab)
  if (!tab) return;
  if (tab == "home") id("search_input_container").style.display = "none";
  else id("search_input_container").style.display = "flex";
  Array.from(cls("navbar-item")).forEach((el) => {
    el.classList = "navbar-item is-white has-text-grey";
  });
  event.target.classList = "navbar-item is-white has-text-primary active-tab-link";
  Array.from(cls("tab")).forEach((el) => {
    el.classList.remove("active");
  });
  id("search_input").setAttribute("data-entity", tab);
  document.querySelector(`#${tab}`).classList += " active";
  document.querySelector(".burger").click();

});

document.querySelector("body").addEventListener("mouseover", (event) => {
  const target = event.target;
  if (target.classList.contains("link")) {
    var text = event.target.innerText;
    target.setAttribute("title", text);
  }
});

document.querySelector("body").addEventListener("mouseover", event => {
  const target = event.target;
  if (target.classList.contains("link")) {
    var text = event.target.innerText;
    target.setAttribute("title", text);
  }
});


var mybutton=document.getElementById("backtotop");

document.addEventListener("scroll", (event) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
});