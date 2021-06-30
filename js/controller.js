import Archive from "./views/Archive.js";
import Decryption from "./views/Decryption.js";
import Encryption from "./views/Encryption.js";
import MyAccount from "./views/MyAccount.js";

//RegExp per verificare che l'url sia scritto correttamente
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

//Funzione che permette di ottenere eventuali parametri aggiuntivi dall'URL
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

//Funzione per aggiungere alla cronologia tutte le view visitate
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

//Funzione che implementa il routing delle Views
const router = async () => {
  //Definisco i percorsi URL e li indirizzo alla View corretta
  const routes = [
    { path: "/", view: Encryption },
    { path: "/archive", view: Archive },
    { path: "/decryption", view: Decryption },
    { path: "/encryption", view: Encryption },
    { path: "/my-account", view: MyAccount },
  ];

  //Verifico ogni percorso per trovare quello corretto
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  //Percorso di default alla View Encryption
  if (!match) {
    match = {
      route: routes[4],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#appContent").innerHTML = await view.getHtml();
  view.loadScripts();
};

//Gestisco il click sul pulsante indietro del browser
window.addEventListener("popstate", (e) => {
  eventHandler(e);
});

//Visualizzo la View corretta al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      eventHandler(e);
    }
  });

  router();

  var currPath = document.location.pathname.replace("/", "");
  if (currPath) {
    document.getElementById(currPath).classList.add("active");
  } else {
    document.getElementById("encryption").click();
  }
});

//Aggiorno la View corrente nel menu a tendina
const eventHandler = (e) => {
  e.preventDefault();
  if (e.target.href) {
    navigateTo(e.target.href);
  }
  $(".active").removeClass("active");
  if (e.target.classList) {
    e.target.classList.add("active");
  } else {
    document
      .getElementById(document.location.pathname.replace("/", ""))
      .classList.add("active");
  }
  router();
};
