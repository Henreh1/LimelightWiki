"use strict";

const body = document.body;
const sidebar = document.getElementById("documentationSidebar");
const menuToggle = document.getElementById("menuToggle");
const navigationLinks = document.querySelectorAll(".navigation-link");

function setSidebarOpen(isOpen) {
    body.classList.toggle("sidebar-open", isOpen);

    if (menuToggle) {
        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close documentation navigation"
                : "Open documentation navigation"
        );
    }
}

function updateActiveNavigationLink() {
    const currentFile =
        window.location.pathname.split("/").pop() ||
        "index.html";

    navigationLinks.forEach(link => {
        const linkFile = link
            .getAttribute("href")
            ?.split("/")
            .pop();

        link.classList.toggle(
            "active",
            linkFile === currentFile
        );
    });
}

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", event => {
        event.stopPropagation();

        const isCurrentlyOpen =
            body.classList.contains("sidebar-open");

        setSidebarOpen(!isCurrentlyOpen);
    });

    // I close the menu after navigation so it never covers the next page.
    navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
            setSidebarOpen(false);
        });
    });

    document.addEventListener("click", event => {
        if (!body.classList.contains("sidebar-open")) {
            return;
        }

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (!clickedInsideSidebar && !clickedMenuButton) {
            setSidebarOpen(false);
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            body.classList.contains("sidebar-open")
        ) {
            setSidebarOpen(false);
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            setSidebarOpen(false);
        }
    });
}

// I calculate this from the current file so copied page layouts stay accurate.
updateActiveNavigationLink();