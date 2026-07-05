import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "PASTE_FIREBASE_API_KEY",
    authDomain: "PASTE_FIREBASE_AUTH_DOMAIN",
    projectId: "PASTE_FIREBASE_PROJECT_ID",
    storageBucket: "PASTE_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "PASTE_FIREBASE_MESSAGING_SENDER_ID",
    appId: "PASTE_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }

    return "";
}

function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function usernameFromUser(user) {
    if (!user) return "";
    if (user.displayName && user.displayName.trim()) {
        return user.displayName.trim();
    }
    const email = user.email || "";
    return email.split("@")[0] || "";
}

function storeUsernameCookieFromUser(user) {
    const username = usernameFromUser(user);
    if (username) {
        setCookie("ft_username", username, 30);
    } else {
        clearCookie("ft_username");
    }
    return username;
}

export async function registerWithEmailPassword(username, email, password) {
    const cleanUsername = String(username || "").trim();
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    if (cleanUsername) {
        await updateProfile(credential.user, { displayName: cleanUsername });
    }

    storeUsernameCookieFromUser(credential.user);
    return credential.user;
}

export async function loginWithEmailPassword(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    storeUsernameCookieFromUser(credential.user);
    return credential.user;
}

export function syncUsernameCookieFromAuth() {
    return onAuthStateChanged(auth, (user) => {
        storeUsernameCookieFromUser(user);
        const badge = document.querySelector("#usernameBadge");
        if (badge) {
            renderUsernameBadge("usernameBadge");
        }
    });
}

export function renderUsernameBadge(elementId) {
    const badge = document.getElementById(elementId);
    if (!badge) return;

    const username = getCookie("ft_username");
    if (!username) {
        badge.classList.add("hidden");
        badge.textContent = "";
        badge.removeAttribute("title");
        return;
    }

    badge.classList.remove("hidden");
    badge.textContent = username.charAt(0).toUpperCase();
    badge.title = username;
}
