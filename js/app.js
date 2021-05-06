import Archive from './views/Archive.js';
import ArchiveView from './views/ArchiveView.js';
import Decryption from './views/Decryption.js';
import Encryption from './views/Encryption.js';
import MyAccount from './views/MyAccount.js';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    //Define the routes the app can provide to URL and addresses them to the correct View
    const routes = [
        { path: "/", view: Encryption },
        { path: "/archive", view: Archive },
        { path: "/archive/:id", view: ArchiveView },
        { path: "/decryption", view: Decryption },
        { path: "/encryption", view: Encryption },
        { path: "/my-account", view: MyAccount }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    //Default route to Encryption
    if (!match) {
        match = {
            route: routes[4],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#appContent").innerHTML = await view.getHtml();
    view.loadScripts();
};

window.addEventListener("popstate", (e) => {
    eventHandler(e);
});

document.addEventListener("DOMContentLoaded", () => {

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            eventHandler(e);
        }
    });

    router();

    var currPath = document.location.pathname.replace('/', '');
    if(currPath) {
        document.getElementById(currPath).classList.add('active');
    } else {
        document.getElementById('encryption').click();
    }
});

const eventHandler = (e) => {
    e.preventDefault();
    if(e.target.href) {
        navigateTo(e.target.href);
    }
    $('.active').removeClass('active');
    if(e.target.classList) {
        e.target.classList.add('active');
    } else {
        document.getElementById(document.location.pathname.replace('/', '')).classList.add('active');
    }
    router();
}