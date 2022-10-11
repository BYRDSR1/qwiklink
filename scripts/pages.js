/**
 * pages.js - controls which parts of the app to show
 *
 */

// Pages
const errorPage = document.getElementById("error-page");
const splashPage = document.getElementById("splash-page");
const homePage = document.getElementById("home-page");

const showErrorPage = () => {
  
}

// switch between pages
const switchPage = (page) => {
  if(typeof page != "string") {
    switchPage("home")
  } else {
    if(page !== "home" && page !== "splash" && page !== "error") {
      switchPage("home")
    } else {
      if(page === "splash") {
        errorPage.hidden = true;
        homePage.hidden = true;
        splashPage.hidden = false;
      } else if(page === "error") {
        splashPage.hidden = true;
        homePage.hidden = true;
        showErrorPage();
        errorPage.hidden = false;
      } else {
        splashPage.hidden = true;
        errorPage.hidden = true;
        homePage.hidden = false;

        //console.log("switched page");

        resizeBox();
        resizeBox();
      }
    }
  } 
}

const displayError = (error) => {
  if(!errorPage.hasAttribute("hidden")) {
    const errorDisplay = document.getElementById("error-display");
    if(error === "camera") {
      errorDisplay.innerHTML = "Please allow camera access"
    } else if(error === "internet") {
      errorDisplay.innerHTML = "This app needs access to the internet to recognize and go to URLs";
    }
  }
}

const goToLink = () => {
  const link = document.getElementById("link").value;
  location.href = link;
}
