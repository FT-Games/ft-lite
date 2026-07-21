// FT Games Favourites Sidebar

document.addEventListener("DOMContentLoaded", () => {

    const star = document.getElementById("favouritesButton");
    const sidebar = document.getElementById("favouritesSidebar");
    const close = document.getElementById("closeFavourites");
    const list = document.getElementById("favouritesList");

    // Open sidebar
    star.addEventListener("click", () => {
        sidebar.classList.add("open");
        loadFavourites();
    });

    // Close sidebar
    close.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Close when clicking outside
    document.addEventListener("click", e => {
        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            e.target !== star
        ) {
            sidebar.classList.remove("open");
        }
    });

    function loadFavourites() {

        list.innerHTML = "";

        // Gets favourites saved by your existing cloud system
        const favourites = JSON.parse(localStorage.getItem("ftgames_favourites") || "[]");

        if (favourites.length === 0) {
            list.innerHTML =
                '<div class="empty">⭐ No favourite games yet.</div>';
            return;
        }

        favourites.forEach(game => {

            const item = document.createElement("a");
            item.className = "favGame";
            item.href = game.url;
            item.textContent = game.name;

            list.appendChild(item);

        });

    }

});
