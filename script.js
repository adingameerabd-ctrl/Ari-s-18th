const gifts = [
    {
        id: "enter-the-gungeon",
        name: "Enter the Gungeon",
        category: "electronics",
        section: "Switch Games",
        description: "Nintendo Switch game.",
        price: "Varies by seller",
        emoji: "🎮",
        image: "images/enter-the-gungeon.jpg",
        jointGift: true
    },

    {
        id: "cult-of-the-lamb",
        name: "Cult of the Lamb",
        category: "electronics",
        section: "Switch Games",
        description: "Nintendo Switch game.",
        price: "Varies by seller",
        emoji: "🐑",
        image: "images/cult-of-the-lamb.jpg",
        jointGift: true
    },

    {
        id: "super-smash-bros",
        name: "Super Smash Bros.",
        category: "electronics",
        section: "Switch Games",
        description: "Nintendo Switch game.",
        price: "Varies by seller",
        emoji: "🥊",
        image: "images/super-smash-bros.jpg",
        jointGift: true
    },

    {
        id: "surprise-game",
        name: "Surprise Me lol",
        category: "electronics",
        section: "Switch Games",
        description: "A Nintendo Switch game of your choice. Surprise me! lol",
        price: "Up to you ♡",
        emoji: "🎁",
        image: "",
        jointGift: false
    },

    {
        id: "avatar",
        name: "Avatar — James Cameron's Avatar",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "Anything from James Cameron's Avatar franchise!",
        price: "Up to you ♡",
        emoji: "🌊",
        image: "images/avatar.jpg",
        jointGift: false
    },

    {
        id: "ever-after-high",
        name: "Ever After High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "Anything Ever After High related!",
        price: "Up to you ♡",
        emoji: "👑",
        image: "images/ever-after-high.jpg",
        jointGift: false
    },

    {
        id: "monster-high",
        name: "Monster High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "Anything Monster High related!",
        price: "Up to you ♡",
        emoji: "💀",
        image: "images/monster-high.jpg",
        jointGift: false
    },

    {
        id: "marine-moth",
        name: "Anything Marine or Moth Related",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "Anything marine or moth related!",
        price: "Up to you ♡",
        emoji: "🐋🦋",
        image: "images/marine-moth.jpg",
        jointGift: false
    },

    {
        id: "dnd-dice",
        name: "D&D Dice Sets",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "A cool set of D&D dice.",
        price: "Up to you ♡",
        emoji: "🎲",
        image: "images/dnd-dice.jpg",
        jointGift: false
    },

    {
        id: "how-to-train-your-dragon",
        name: "How to Train Your Dragon",
        category: "miscellaneous",
        section: "Miscellaneous",
        description: "Anything from How to Train Your Dragon!",
        price: "Up to you ♡",
        emoji: "🐉",
        image: "images/how-to-train-your-dragon.jpg",
        jointGift: false
    },

    {
        id: "wide-window",
        name: "The Wide Window",
        category: "books",
        section: "A Series of Unfortunate Events",
        description: "A Series of Unfortunate Events — Book 3 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖",
        image: "images/wide-window.jpg",
        jointGift: false
    },

    {
        id: "ersatz-elevator",
        name: "The Ersatz Elevator",
        category: "books",
        section: "A Series of Unfortunate Events",
        description: "A Series of Unfortunate Events — Book 6 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖",
        image: "images/ersatz-elevator.jpg",
        jointGift: false
    },

    {
        id: "vile-village",
        name: "The Vile Village",
        category: "books",
        section: "A Series of Unfortunate Events",
        description: "A Series of Unfortunate Events — Book 7 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖",
        image: "images/vile-village.jpg",
        jointGift: false
    }
];


// ========================================
// GET WEBSITE ELEMENTS
// ========================================

const giftGrid = document.getElementById("giftGrid");
const categoryButtons = document.querySelectorAll(".category");


// ========================================
// CREATE PLACEHOLDER
// ========================================

function createPlaceholder(emoji) {

    const placeholder = document.createElement("div");

    placeholder.className = "image-placeholder";

    placeholder.textContent = emoji;

    return placeholder;
}


// ========================================
// DISPLAY GIFTS
// ========================================

function displayGifts(category) {

    console.log("Displaying category:", category);

    giftGrid.innerHTML = "";

    let giftsToShow = gifts;

    if (category !== "all") {

        giftsToShow = gifts.filter(function(gift) {

            return gift.category === category;

        });

    }

    console.log("Gifts found:", giftsToShow.length);


    giftsToShow.forEach(function(gift) {

        const card = document.createElement("div");

        card.className = "gift-card";


        // IMAGE

        const imageWrapper = document.createElement("div");

        imageWrapper.className = "gift-image-wrapper";


        if (gift.image) {

            const image = document.createElement("img");

            image.className = "gift-image";

            image.src = gift.image;

            image.alt = gift.name;

            image.onerror = function() {

                image.remove();

                imageWrapper.appendChild(
                    createPlaceholder(gift.emoji)
                );

            };

            imageWrapper.appendChild(image);

        } else {

            imageWrapper.appendChild(
                createPlaceholder(gift.emoji)
            );

        }


        // INFORMATION

        const info = document.createElement("div");

        info.className = "gift-info";


        const categoryLabel = document.createElement("div");

        categoryLabel.className = "gift-category";

        categoryLabel.textContent = gift.section;


        const name = document.createElement("div");

        name.className = "gift-name";

        name.textContent = gift.name;


        const description = document.createElement("div");

        description.className = "gift-description";

        description.textContent = gift.description;


        const price = document.createElement("div");

        price.className = "gift-price";

        price.textContent = gift.price;


        const status = document.createElement("div");

        status.className = "gift-status";

        status.textContent = gift.jointGift
            ? "♡ Available for joint gift"
            : "♡ Available";


        // ADD EVERYTHING

        info.appendChild(categoryLabel);
        info.appendChild(name);
        info.appendChild(description);
        info.appendChild(price);
        info.appendChild(status);

        card.appendChild(imageWrapper);
        card.appendChild(info);

        giftGrid.appendChild(card);

    });

}


// ========================================
// CATEGORY BUTTONS
// ========================================

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(otherButton) {

            otherButton.classList.remove("active");

        });

        button.classList.add("active");

        displayGifts(button.dataset.category);

    });

});


// ========================================
// START
// ========================================

displayGifts("all");
