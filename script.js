const gifts = [

    // =========================
    // ELECTRONICS
    // =========================

    {
        id: "electronics-001",
        name: "N1 Joy-Con Charging Station",
        category: "electronics",
        description:
            "A charging station for Nintendo Switch Joy-Cons.",
        price: Price varies by seller
        image:
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    },

    {
        id: "electronics-002",
        name: "Pink Joy-Cons",
        category: "electronics",
        description:
            "Pink Nintendo Switch Joy-Con controllers. (may available sa ToysRUs Robinsinson's branch)",
        price: ₱4109.00
        image:
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    },

    {
        id: "electronics-003",
        name: "Clear Nintendo Switch Case",
        category: "electronics",
        description:
            "A Nintendo Switch case that is dock-friendly. Preferably",
        price: Price varies by seller
        image:
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    },

    {
        id: "electronics-004",
        name: "Nintendo Switch Game",
        category: "electronics",
        description:
            "Any Nintendo Switch game you think I'd enjoy! You can choose the game.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    },


    // =========================
    // MISCELLANEOUS
    // =========================

    {
        id: "misc-001",
        name: "D&D Dice Set",
        category: "miscellaneous",
        description:
            "A cool set of dice for Dungeons & Dragons. Feel free to choose one based on whatever theme you think I'd like.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09"
    },

    {
        id: "misc-002",
        name: "Avatar — James Cameron's Avatar",
        category: "miscellaneous",
        description:
            "Anything related to the Avatar franchise by James Cameron. Figures, collectibles, books, art, merch — surprise me!",
        price: null,
        image:
            "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64"
    },

    {
        id: "misc-003",
        name: "Marine-Themed Anything",
        category: "miscellaneous",
        description:
            "Anything marine-related! Sea creatures, nautical things, ocean-themed art, decorations, accessories, collectibles, etc.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    },

    {
        id: "misc-004",
        name: "Moth-Themed Anything",
        category: "miscellaneous",
        description:
            "Anything moth-related! Art, decorations, accessories, plushies, collectibles, or anything else you think is cool.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1559251606-c623743a6d76"
    },


    // =========================
    // BOOK COLLECTIONS
    // =========================

    {
        id: "book-001",
        name: "The Wide Window",
        category: "book collections",
        description:
            "A Series of Unfortunate Events — Book 3 by Lemony Snicket.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-002",
        name: "The Ersatz Elevator",
        category: "book collections",
        description:
            "A Series of Unfortunate Events — Book 6 by Lemony Snicket.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-003",
        name: "The Vile Village",
        category: "book collections",
        description:
            "A Series of Unfortunate Events — Book 7 by Lemony Snicket.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-004",
        name: "The Carnivorous Carnival",
        category: "book collections",
        description:
            "A Series of Unfortunate Events — Book 9 by Lemony Snicket.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-005",
        name: "TRESE: Mass Murders",
        category: "book collections",
        description:
            "TRESE — Book 3 by Budjette Tan and Kajo Baldisimo.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-006",
        name: "TRESE: High Tide at Midnight",
        category: "book collections",
        description:
            "TRESE — Book 6 by Budjette Tan and Kajo Baldisimo.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-007",
        name: "TRESE: Shadow Witness",
        category: "book collections",
        description:
            "TRESE — Book 7 by Budjette Tan and Kajo Baldisimo.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-008",
        name: "The Dawn of Yangchen",
        category: "book collections",
        description:
            "Avatar: The Last Airbender — The Dawn of Yangchen.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-009",
        name: "The Legacy of Yangchen",
        category: "book collections",
        description:
            "Avatar: The Last Airbender — The Legacy of Yangchen.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: "book-010",
        name: "The Rise of Kyoshi",
        category: "book collections",
        description:
            "Avatar: The Last Airbender — The Rise of Kyoshi.",
        price: null,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    }

];


// =========================
// WEBSITE ELEMENTS
// =========================

const giftGrid =
    document.getElementById("giftGrid");

const modal =
    document.getElementById("giftModal");

let currentGift = null;


// =========================
// DISPLAY GIFTS
// =========================

function displayGifts(category = "all") {

    giftGrid.innerHTML = "";


    const filteredGifts =
        category === "all"
            ? gifts
            : gifts.filter(
                gift => gift.category === category
            );


    filteredGifts.forEach(gift => {

        const card =
            document.createElement("div");


        card.className =
            "gift-card";


        const price =
            gift.price
                ? `₱${gift.price.toLocaleString()}`
                : "Price varies";


        card.innerHTML = `

            <img
                class="gift-image"
                src="${gift.image}"
                alt="${gift.name}"
            >

            <div class="gift-info">

                <div class="gift-category">
                    ${gift.category}
                </div>

                <div class="gift-name">
                    ${gift.name}
                </div>

                <div class="gift-description">
                    ${gift.description}
                </div>

                <div class="gift-price">
                    ${price}
                </div>

                <div class="gift-status">
                    ♡ Available
                </div>

            </div>
        `;


        card.addEventListener(
            "click",
            function () {
                openGift(gift);
            }
        );


        giftGrid.appendChild(card);

    });

}


// =========================
// CATEGORY FILTER
// =========================

function filterGifts(category) {

    document
        .querySelectorAll(".category")
        .forEach(button => {

            button.classList.remove("active");

        });


    // Find the button that corresponds
    // to the selected category

    document
        .querySelectorAll(".category")
        .forEach(button => {

            const buttonText =
                button.textContent
                    .toLowerCase();

            if (
                category === "all" &&
                buttonText.includes("all")
            ) {
                button.classList.add("active");
            }

            if (
                category === "electronics" &&
                buttonText.includes("electronics")
            ) {
                button.classList.add("active");
            }

            if (
                category === "miscellaneous" &&
                buttonText.includes("miscellaneous")
            ) {
                button.classList.add("active");
            }

            if (
                category === "book collections" &&
                buttonText.includes("book")
            ) {
                button.classList.add("active");
            }

        });


    displayGifts(category);

}


// =========================
// OPEN GIFT MODAL
// =========================

function openGift(gift) {

    currentGift = gift;


    document.getElementById(
        "modalImage"
    ).src = gift.image;


    document.getElementById(
        "modalImage"
    ).alt = gift.name;


    document.getElementById(
        "modalName"
    ).textContent = gift.name;


    document.getElementById(
        "modalCategory"
    ).textContent =
        gift.category;


    document.getElementById(
        "modalDescription"
    ).textContent =
        gift.description;


    document.getElementById(
        "modalPrice"
    ).textContent =
        gift.price
            ? `₱${gift.price.toLocaleString()}`
            : "Price varies";


    document.getElementById(
        "modalStatus"
    ).textContent =
        "♡ This gift is currently available.";


    modal.classList.remove("hidden");

}


// =========================
// CLOSE MODAL
// =========================

function closeModal() {

    modal.classList.add("hidden");

    currentGift = null;

}


// =========================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE THE CARD
// =========================

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


// =========================
// SELECT GIFT
// =========================

document
    .getElementById("selectButton")
    .addEventListener(
        "click",
        function () {

            alert(
                "The anonymous gift-selection system will be connected next! ♡"
            );

        }
    );


// =========================
// INITIAL LOAD
// =========================

displayGifts("all");
