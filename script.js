// ========================================
// BIRTHDAY REGISTRY
// ========================================

// ---------- FIREBASE ----------

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {

    apiKey: "AIzaSyDvamfquBqYWFrM22S6hWF71kI8LSgCx48",
  authDomain: "ber-thday-ni-ari.firebaseapp.com",
  projectId: "ber-thday-ni-ari",
  storageBucket: "ber-thday-ni-ari.firebasestorage.app",
  messagingSenderId: "644102572585",
  appId: "1:644102572585:web:b40f911e0ab434a1e2ea38",
  measurementId: "G-TVQ426NXT5"

};


// ========================================
// START FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ========================================
// ANONYMOUS USER
// ========================================

let currentUser = null;

signInAnonymously(auth)
    .then(() => {

        console.log("Anonymous sign-in successful.");

    })
    .catch((error) => {

        console.error(
            "Anonymous sign-in failed:",
            error
        );

        alert(
            "The registry could not connect to the selection system. Please check your Firebase settings."
        );

    });


onAuthStateChanged(
    auth,
    function (user) {

        if (user) {

            currentUser = user;

            console.log(
                "Anonymous user connected:",
                user.uid
            );

            listenForGiftStatus();

        }

    }
);


// ========================================
// GIFTS
// ========================================

const gifts = [

    {
        id: "switch-charging-station",
        name: "N1 Joy-Con Charging Station",
        category: "electronics",
        section: "Switch Accessories",
        description:
            "A charging station for my Switch because my right Joy-Con isn't charging properly.",
        price: "Varies by seller",
        emoji: "🔋🎮",
        jointGift: true
    },

    {
        id: "pink-joycons",
        name: "Nintendo Switch Pink Joy-Cons",
        category: "electronics",
        section: "Switch Accessories",
        description:
            "Because my controllers arent charging properly",
        price: "Price Varies",
        emoji: "🩷🎮",
        jointGift: true
    },

    {
        id: "switch-case",
        name: "Nintendo Switch Case — Dock-Friendly",
        category: "electronics",
        section: "Switch Accessories",
        description:
            "A case for my Switch so I can have protection without sacrificing charging capacity. Preferably clear or white!",
        price: "Varies by seller",
        emoji: "🎮🤍",
        jointGift: true
    },

    {
        id: "enter-the-gungeon",
        name: "Enter the Gungeon",
        category: "electronics",
        section: "Switch Games",
        description:
            "Enter the Gungeon is a fast-paced bullet hell dungeon crawler video game developed by Dodge Roll and published by Devolver Digital. Players choose a misfit hero seeking to change their past by finding a legendary gun that can kill history",
        price: "Varies by seller",
        emoji: "🎮",
        jointGift: true
    },

    {
        id: "cult-of-the-lamb",
        name: "Cult of the Lamb",
        category: "electronics",
        section: "Switch Games",
        description:
            "Cult of the Lamb is an action-adventure roguelike and base management game where you play as an adorable, possessed lamb saved from sacrifice by an imprisoned deity. To repay your debt, you must build a loyal woodland following, perform dark rituals, and defeat rival religious leaders in fast-paced dungeons.",
        price: "Varies by seller",
        emoji: "🐑",
        jointGift: true
    },

    {
        id: "super-smash-bros",
        name: "Super Smash Bros.",
        category: "electronics",
        section: "Switch Games",
        description:
            "Super Smash Bros. is a series of platform fighting video games published by Nintendo. Created by Masahiro Sakurai, the Super Smash Bros. series is a crossover featuring many characters from other video game series created by Nintendo and other developers.",
        price: "Varies by seller",
        emoji: "🥊",
        jointGift: true
    },

    {
        id: "surprise-game",
        name: "Surprise Me lol",
        category: "electronics",
        section: "Switch Games",
        description:
            "A Nintendo Switch game of your choice. Surprise me! lol",
        price: "Up to you ♡",
        emoji: "🎁",
        jointGift: false,
        unlimited: true
    },

    {
        id: "avatar",
        name: "Avatar — James Cameron's Avatar",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything from James Cameron's Avatar franchise!",
        price: "Up to you ♡",
        emoji: "🌊",
        unlimited: true
    },

    {
        id: "ever-after-high",
        name: "Ever After High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything Ever After High related!",
        price: "Up to you ♡",
        emoji: "👑",
        unlimited: true
    },

    {
        id: "monster-high",
        name: "Monster High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything Monster High related!",
        price: "Up to you ♡",
        emoji: "💀",
        unlimited: true
    },

    {
        id: "marine-moth",
        name: "Anything Marine or Moth Related",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything marine or moth related!",
        price: "Up to you ♡",
        emoji: "🐋🦋",
        unlimited: true
    },

    {
        id: "dnd-dice",
        name: "D&D Dice Sets",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "A cool set of D&D dice!",
        price: "Up to you ♡",
        emoji: "🎲",
        unlimited: true
    },

    {
        id: "how-to-train-your-dragon",
        name: "How to Train Your Dragon",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything from How to Train Your Dragon!",
        price: "Up to you ♡",
        emoji: "🐉",
        unlimited: true
    },

    {
        id: "existing-fandom-merch",
        name: "Merch From the Games or Books on My Wishlist",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Any merch related to the games or books mentioned elsewhere in this registry.",
        price: "Up to you ♡",
        emoji: "✨",
        unlimited: true
    },

    {
        id: "wide-window",
        name: "The Wide Window",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "A Series of Unfortunate Events — Book 3 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖"
    },

    {
        id: "ersatz-elevator",
        name: "The Ersatz Elevator",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "A Series of Unfortunate Events — Book 6 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖"
    },

    {
        id: "vile-village",
        name: "The Vile Village",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "A Series of Unfortunate Events — Book 7 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖"
    },

    {
        id: "carnivorous-carnival",
        name: "The Carnivorous Carnival",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "A Series of Unfortunate Events — Book 9 by Lemony Snicket.",
        price: "Varies by seller",
        emoji: "📖"
    },

    {
        id: "trese-mass-murders",
        name: "TRESE: Mass Murders",
        category: "books",
        section: "TRESE",
        description:
            "TRESE — Book 3 by Budjette Tan and Kajo Baldisimo.",
        price: "Varies by seller",
        emoji: "📕"
    },

    {
        id: "trese-high-tide",
        name: "TRESE: High Tide at Midnight",
        category: "books",
        section: "TRESE",
        description:
            "TRESE — Book 6 by Budjette Tan and Kajo Baldisimo.",
        price: "Varies by seller",
        emoji: "📕"
    },

    {
        id: "trese-shadow-witness",
        name: "TRESE: Shadow Witness",
        category: "books",
        section: "TRESE",
        description:
            "TRESE — Book 7 by Budjette Tan and Kajo Baldisimo.",
        price: "Varies by seller",
        emoji: "📕"
    },

    {
        id: "dawn-of-yangchen",
        name: "Avatar: The Last Airbender — The Dawn of Yangchen",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "Avatar: The Last Airbender novel.",
        price: "Varies by seller",
        emoji: "🌊📖"
    },

    {
        id: "legacy-of-yangchen",
        name: "Avatar: The Last Airbender — The Legacy of Yangchen",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "Avatar: The Last Airbender novel.",
        price: "Varies by seller",
        emoji: "🌊📖"
    },

    {
        id: "rise-of-kyoshi",
        name: "Avatar: The Last Airbender — The Rise of Kyoshi",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "Avatar: The Last Airbender novel.",
        price: "Varies by seller",
        emoji: "🌊📖"
    }

];


// ========================================
// ELEMENTS
// ========================================

const giftGrid =
    document.getElementById("giftGrid");

const modal =
    document.getElementById("giftModal");

const closeModalButton =
    document.getElementById("closeModal");

const selectButton =
    document.getElementById("selectButton");

const categoryButtons =
    document.querySelectorAll(".category");


// ========================================
// GIFT STATUS
// ========================================

let giftStatus = {};


// Listen for changes from Firebase

function listenForGiftStatus() {

    const statusRef =
        collection(db, "giftStatus");

    onSnapshot(
        statusRef,
        function (snapshot) {

            giftStatus = {};

            snapshot.forEach(
                function (document) {

                    giftStatus[document.id] =
                        document.data();

                }
            );

            displayGifts(
                document
                    .querySelector(".category.active")
                    ?.dataset.category || "all"
            );

        },
        function (error) {

            console.error(
                "Firestore listener error:",
                error
            );

        }
    );

}


// ========================================
// DISPLAY GIFTS
// ========================================

function displayGifts(category = "all") {

    giftGrid.innerHTML = "";

    const giftsToShow =
        category === "all"
            ? gifts
            : gifts.filter(
                gift =>
                    gift.category === category
            );


    giftsToShow.forEach(
        function (gift) {

            const card =
                document.createElement("div");

            card.className =
                "gift-card";


            // IMAGE

            const imageWrapper =
                document.createElement("div");

            imageWrapper.className =
                "gift-image-wrapper";

            imageWrapper.innerHTML =
                `<div class="image-placeholder">
                    ${gift.emoji}
                </div>`;


            // INFO

            const info =
                document.createElement("div");

            info.className =
                "gift-info";


            const categoryLabel =
                document.createElement("div");

            categoryLabel.className =
                "gift-category";

            categoryLabel.textContent =
                gift.section;


            const name =
                document.createElement("div");

            name.className =
                "gift-name";

            name.textContent =
                gift.name;


            const description =
                document.createElement("div");

            description.className =
                "gift-description";

            description.textContent =
                gift.description;


            const price =
                document.createElement("div");

            price.className =
                "gift-price";

            price.textContent =
                gift.price;


            const status =
                document.createElement("div");

            status.className =
                "gift-status";


            const statusData =
                giftStatus[gift.id];


            if (gift.unlimited) {

                status.textContent =
                    "♡ Available";

            }

            else if (
                statusData &&
                statusData.selected
            ) {

                if (statusData.joint) {

                    status.textContent =
                        "♡ Joint gift in progress";

                } else {

                    status.textContent =
                        "♡ Already selected";

                }

                card.classList.add(
                    "selected"
                );

            }

            else {

                status.textContent =
                    gift.jointGift
                        ? "🤝 Available for joint gift"
                        : "♡ Available";

            }


            info.appendChild(categoryLabel);
            info.appendChild(name);
            info.appendChild(description);
            info.appendChild(price);
            info.appendChild(status);

            card.appendChild(imageWrapper);
            card.appendChild(info);


            card.addEventListener(
                "click",
                function () {

                    openGift(gift);

                }
            );


            giftGrid.appendChild(card);

        }
    );

}


// ========================================
// CATEGORY BUTTONS
// ========================================

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (other) {

                        other.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                displayGifts(
                    button.dataset.category
                );

            }
        );

    }
);


// ========================================
// OPEN MODAL
// ========================================

let selectedGift = null;


function openGift(gift) {

    selectedGift = gift;

    document.getElementById(
        "modalCategory"
    ).textContent =
        gift.section;

    document.getElementById(
        "modalName"
    ).textContent =
        gift.name;

    document.getElementById(
        "modalDescription"
    ).textContent =
        gift.description;

    document.getElementById(
        "modalPrice"
    ).textContent =
        gift.price;

    document.getElementById(
        "modalStatus"
    ).textContent =
        gift.unlimited
            ? "♡ Multiple people can choose different versions of this gift"
            : gift.jointGift
                ? "🤝 This gift can be planned as a joint gift"
                : "♡ Available";

    modal.classList.remove(
        "hidden"
    );

}


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    modal.classList.add(
        "hidden"
    );

    selectedGift = null;

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


// ========================================
// SELECT GIFT
// ========================================

selectButton.addEventListener(
    "click",
    async function () {

        if (!selectedGift) {
            return;
        }

        if (!currentUser) {

            alert(
                "Connecting anonymously... please try again in a moment."
            );

            return;

        }


        const gift =
            selectedGift;


        // Miscellaneous + Surprise Game
        // are intentionally unlimited.

        if (gift.unlimited) {

            alert(
                "You've marked this as something you'd like to get! ♡"
            );

            closeModal();

            return;

        }


        const giftRef =
            doc(
                db,
                "giftStatus",
                gift.id
            );


        try {

            const existing =
                await getDoc(giftRef);


            if (
                existing.exists() &&
                existing.data().selected &&
                !gift.jointGift
            ) {

                alert(
                    "Someone has already selected this gift! ♡"
                );

                closeModal();

                return;

            }


            if (
                existing.exists() &&
                existing.data().selected &&
                gift.jointGift
            ) {

                await updateDoc(
                    giftRef,
                    {
                        joint: true
                    }
                );

            }

            else {

                await setDoc(
                    giftRef,
                    {
                        selected: true,
                        joint: gift.jointGift,
                        updatedAt:
                            new Date()
                                .toISOString()
                    }
                );

            }


            alert(
                gift.jointGift
                    ? "You've joined the gift plan! 🤝♡"
                    : "Gift selected! ♡"
            );


            closeModal();


        }

        catch (error) {

            console.error(
                "Selection error:",
                error
            );

            alert(
                "The registry couldn't connect to the selection system. Please refresh and try again."
            );

        }

    }
);


// ========================================
// START
// ========================================

displayGifts("all");
