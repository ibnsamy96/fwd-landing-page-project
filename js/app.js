let siteSections = document.querySelectorAll("section");

// document.querySelector(`a[id='header-link']`).classList.add("active");

window.addEventListener("scroll", function () {
  siteSections = document.querySelectorAll("section");

  for (section of siteSections) {
    const sectionRect = section.getBoundingClientRect();
    const sectionAnchorElement = document.querySelector(
      `a[id='${section.dataset.nav}-link']`
    );
    if (
      sectionRect.top <=
        (window.innerHeight / 2 || document.documentElement.clientHeight / 2) &&
      sectionRect.bottom >=
        (window.innerHeight / 2 || document.documentElement.clientHeight / 2)
    ) {
      sectionAnchorElement.classList.add("active");
    } else {
      sectionAnchorElement.classList.remove("active");
    }
  }
});

console.log("app started");

const newSections = [];

for (section of siteSections) {
  console.log(section.dataset.nav);
  addSectionToNav(section.dataset.nav, section.id);
}

document.querySelector(`a[id='header-link']`).classList.add("active");

const submitNewElement = () => {
  const sectionTitle = prompt("Choose section title");
  const idWordsArray = prompt("Choose its special ID").split(" ");
  const sectionContent = prompt("Choose its content");

  if (
    sectionTitle !== null &&
    idWordsArray.length !== 0 &&
    sectionContent !== null
  ) {
    let sectionID = "";

    for (idWord of idWordsArray) {
      if (idWord !== "" && idWord !== " ") {
        sectionID =
          "id" +
          sectionID +
          idWord +
          Math.round(Math.random() * 10000).toString();
      }
    }

    addSectionToBody(sectionTitle, sectionID, sectionContent);
    addSectionToNav(sectionTitle, sectionID);
    handleStoring(sectionTitle, sectionID, sectionContent);
  }
};

function addSectionToNav(sectionTitle, sectionID) {
  const navMenu = document.querySelector("nav ul");
  const newMenuItem = document.createElement("li");
  // newMenuItem;
  newMenuItem.innerHTML = `<a  id='${sectionTitle}-link' onclick = "scrollToSection(this)">${sectionTitle.toUpperCase()}</a>`;
  console.log(navMenu);
  console.log(newMenuItem);
  navMenu.appendChild(newMenuItem);
}

function addSectionToBody(sectionTitle, sectionID, sectionContent) {
  newSection = document.createElement("section");
  newSection.id = sectionID;
  newSection.dataset.nav = sectionTitle;
  console.log(sectionID);
  newSection.innerHTML = `<h1> ${generateEyeSVG(
    sectionID
  )} ${sectionTitle}</h1><p>${sectionContent}</p>`;
  document.body.appendChild(newSection);
}

const scrollToSection = (clickedAnchor) => {
  const sectionDataNav = clickedAnchor.id.split("-link")[0];

  const neededSection = document.querySelector(
    `section[data-nav='${sectionDataNav}']`
  );

  collapseSection(neededSection.id, "open");

  neededSection.scrollIntoView({ behavior: "smooth" });
};

const handleStoring = (sectionTitle, sectionID, sectionContent) => {
  newSections.push(
    JSON.stringify({
      title: sectionTitle,
      id: sectionID,
      content: sectionContent,
    })
  );
  toLocalStorage();
};

const toLocalStorage = () => {
  sectionsData = newSections.toString();
  localStorage.setItem("sections", sectionsData);
  console.log(sectionsData);
  // console.log(sectionsList);
};

function handleRetrieve() {
  sectionsList = fromLocalStorage();
  console.log(sectionsList);
  if (sectionsList) {
    sectionsList.forEach((element, index) => {
      if (index !== 0) {
        section = JSON.parse("{" + element);
      } else {
        section = JSON.parse(element);
      }
      newSections.push(JSON.stringify(section));
      siteSections = [...siteSections, ...newSections];
      addSectionToBody(section.title, section.id, section.content);
      addSectionToNav(section.title, section.id);
    });
  }
}

const fromLocalStorage = () => {
  sectionsData = localStorage.getItem("sections");
  if (sectionsData) {
    sectionsList = sectionsData.split(",{");
    return sectionsList;
  }
};

handleRetrieve();

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

const toggleNav = () => {
  // var navbarToggle = document.getElementById("navbarToggle");

  if (navbar.style.display === "flex") {
    console.log("if");
    console.log(navbar.style.display);
    navbar.style.display = "none";
    console.log(navbar.style.display);
    // navbarToggle.style.display = "none";
  } else {
    console.log("else");
    navbar.style.display = "flex";
    // navbarToggle.style.display = "block";
  }
};

function generateEyeSVG(sectionID) {
  const svgCode = `<svg
  onclick="collapseSection('${sectionID}')"
  class="decollapseIcon"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  width="16"
  height="16"
  viewBox="0 0 16 16"
>
  <path
    fill="#000"
    d="M12.9 5.2l-.8.8c1.7.9 2.5 2.3 2.8 3-.7.9-2.8 3.1-7 3.1-.7 0-1.2-.1-1.8-.2l-.8.8c.8.3 1.7.4 2.6.4 5.7 0 8.1-4 8.1-4s-.6-2.4-3.1-3.9z"
  />
  <path
    fill="#000"
    d="M12 7.1c0-.3 0-.6-.1-.8L7.1 11c.3 0 .6.1.9.1 2.2 0 4-1.8 4-4z"
  />
  <path
    fill="#000"
    d="M15.3 0l-4.4 4.4C10.1 4.2 9.1 4 8 4 1.3 4 0 9.1 0 9.1s1 1.8 3.3 3L0 15.3v.7h.7L16 .7V0h-.7zM4 11.3C2.4 10.6 1.5 9.5 1.1 9c.3-.7 1.1-2.2 3.1-3.2-.1.4-.2.8-.2 1.3 0 1.1.5 2.2 1.3 2.9L4 11.3zm2.2-3.4l-1 .2s-.3-.5-.3-1.2c0-.8.4-1.5.4-1.5.5-.3 1.3-.3 1.3-.3s-.5.9-.5 1.7c-.1.7.1 1.1.1 1.1z"
  />
  <metadata>
    <rdf:RDF
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      ><rdf:Description
        about="https://iconscout.com/legal#licenses"
        dc:title="eye,slash"
        dc:description="eye,slash"
        dc:publisher="Iconscout"
        dc:date="2017-09-19"
        dc:format="image/svg+xml"
        dc:language="en"
        ><dc:creator
          ><rdf:Bag><rdf:li>Vaadin Icons</rdf:li></rdf:Bag></dc:creator
        ></rdf:Description
      ></rdf:RDF
    >
  </metadata>
</svg>
<svg
  onclick="collapseSection('${sectionID}')"
  class="collapseIcon"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  width="16"
  height="16"
  viewBox="0 0 16 16"
>
  <path
    fill="#000"
    d="M8 3.9C1.3 3.9 0 9 0 9s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c.5-.3 1.3-.3 1.3-.3s-.5.9-.5 1.6c0 .7.2 1.1.2 1.1L5.2 8s-.3-.5-.3-1.2c0-.8.4-1.4.4-1.4zm2.6 6.7c-4.1 0-6.2-2.3-6.8-3.2.3-.7 1.1-2.2 3.1-3.2-.1.4-.2.8-.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.5-.1-.9-.2-1.3 2 .9 2.8 2.5 3.1 3.2-.7.9-2.8 3.2-7 3.2z"
  />
  <metadata>
    <rdf:RDF
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      ><rdf:Description
        about="https://iconscout.com/legal#licenses"
        dc:title="eye"
        dc:description="eye"
        dc:publisher="Iconscout"
        dc:date="2017-09-19"
        dc:format="image/svg+xml"
        dc:language="en"
        ><dc:creator
          ><rdf:Bag><rdf:li>Vaadin Icons</rdf:li></rdf:Bag></dc:creator
        ></rdf:Description
      ></rdf:RDF
    >
  </metadata>
</svg>`;

  return svgCode;
}

const collapseSection = (sectionID, ...params) => {
  console.log(params);
  section = document.getElementById(sectionID);
  sectionParagraph = document.querySelector("#" + sectionID + " p");
  decollapseIcon = document.querySelector("#" + sectionID + " .decollapseIcon");
  collapseIcon = document.querySelector("#" + sectionID + " .collapseIcon");
  console.log(sectionParagraph);

  if (sectionParagraph.style.display !== "none" && !params[0]) {
    console.log("fired");
    section.style.paddingTop = "20px";
    section.style.paddingBottom = "20px";
    sectionParagraph.style.display = "none";

    decollapseIcon.style.display = "none";
    collapseIcon.style.display = "inline-block";
  } else {
    section.style.paddingTop = "20%";
    section.style.paddingBottom = "20%";
    sectionParagraph.style.display = "block";

    decollapseIcon.style.display = "inline-block";
    collapseIcon.style.display = "none";
  }
};
