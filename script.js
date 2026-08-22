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
// ========================================
// GIFTS
// ========================================

const gifts = [

    // ========================================
    // I. ELECTRONICS — SWITCH ACCESSORIES
    // ========================================

    {
        id: "switch-charging-station",
        name: "N1 Joy-Con Charging Station",
        category: "electronics",
        section: "Switch Accessories",
        description:
            "A charging station for my Switch because my right Joy-Con isn't charging properly.",
        price: "Varies by seller",
        emoji: "🔋🎮",
        image: "images/switch-charging-station.jpg",
        jointGift: true
    },

    {
        id: "pink-joycons",
        name: "Nintendo Switch Pink Joy-Cons",
        category: "electronics",
        section: "Switch Accessories",
        description:
            "There are some at the Robinsons Toys 'R' Us branch for around ₱4,106, but the price may differ depending on where they're bought.",
        price: "Around ₱4,106*",
        emoji: "🩷🎮",
        image: "images/pink-joycons.jpg",
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
        image: "images/switch-case.jpg",
        jointGift: true
    },


    // ========================================
    // I. ELECTRONICS — SWITCH GAMES
    // ========================================

    {
        id: "enter-the-gungeon",
        name: "Enter the Gungeon",
        category: "electronics",
        section: "Switch Games",
        description:
            "A fast-paced bullet-hell dungeon crawler where you explore a constantly changing gun-themed dungeon, fight enemies and bosses, collect bizarre weapons, and search for a legendary gun.",
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
        description:
            "A cute-but-dark action game where you play as a possessed lamb who builds a loyal cult while exploring mysterious lands and battling enemies.",
        price: "Varies by seller",
        emoji: "🐑",
        image: "images/cult-of-the-lamb.jpg",
        jointGift: true
    },

    {
        id: "super-smash-bros",
        name: "Super Smash Bros. Ultimate",
        category: "electronics",
        section: "Switch Games",
        description:
            "A crossover fighting game featuring characters from across Nintendo and gaming history. Fight on tons of stages with friends or against the computer.",
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
        description:
            "A Nintendo Switch game of your choice. Surprise me! lol",
        price: "Up to you ♡",
        emoji: "🎁",
        image: "",
        jointGift: false,
        unlimited: true
    },


    // ========================================
    // II. MISCELLANEOUS
    // ========================================

    {
        id: "avatar",
        name: "Avatar — James Cameron's Avatar",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything from James Cameron's Avatar franchise! Figures, collectibles, books, decorations, merch, etc. Go wild with the topic.",
        price: "Up to you ♡",
        emoji: "🌊",
        image: "images/avatar.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "ever-after-high",
        name: "Ever After High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything Ever After High related! Dolls, accessories, collectibles, merch, art, etc.",
        price: "Up to you ♡",
        emoji: "👑",
        image: "images/ever-after-high.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "monster-high",
        name: "Monster High",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything Monster High related! Dolls, accessories, collectibles, merch, art, etc.",
        price: "Up to you ♡",
        emoji: "💀",
        image: "images/monster-high.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "marine-moth",
        name: "Anything Marine or Moth Related",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything marine or moth related! Sea creatures, nautical things, moths, art, decorations, accessories, plushies, collectibles — basically anything you think fits.",
        price: "Up to you ♡",
        emoji: "🐋🦋",
        image: "images/marine-moth.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "dnd-dice",
        name: "D&D Dice Sets",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "A cool set of D&D dice. Feel free to choose whatever colors, theme, or design you think I'd like!",
        price: "Up to you ♡",
        emoji: "🎲",
        image: "images/dnd-dice.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "how-to-train-your-dragon",
        name: "How to Train Your Dragon",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Anything from How to Train Your Dragon! Merch, collectibles, books, decorations, etc.",
        price: "Up to you ♡",
        emoji: "🐉",
        image: "images/how-to-train-your-dragon.jpg",
        jointGift: false,
        unlimited: true
    },

    {
        id: "existing-fandom-merch",
        name: "Merch From the Games or Books on My Wishlist",
        category: "miscellaneous",
        section: "Miscellaneous",
        description:
            "Any merch related to the games or books mentioned elsewhere in this registry. Surprise me!",
        price: "Up to you ♡",
        emoji: "✨",
        image: "images/existing-fandom-merch.jpg",
        jointGift: false,
        unlimited: true
    },


    // ========================================
    // III. BOOK COLLECTIONS
    // ========================================

    // ----------------------------------------
    // A SERIES OF UNFORTUNATE EVENTS
    // ----------------------------------------

    {
        id: "wide-window",
        name: "The Wide Window",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "Book 3. The Baudelaire orphans are sent to live with their fearful Aunt Josephine near Lake Lachrymose, where a dangerous storm, hungry leeches, and Count Olaf await them.",
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
        description:
            "Book 6. Violet, Klaus, and Sunny live in a luxurious penthouse with the Squalors and discover a mysterious elevator, a secret passage, and another scheme involving Count Olaf.",
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
        description:
            "Book 7. The Baudelaires are placed under the care of an entire village, where bizarre rules and a terrible accusation put them in even greater danger.",
        price: "Varies by seller",
        emoji: "📖",
        image: "images/vile-village.jpg",
        jointGift: false
    },

    {
        id: "carnivorous-carnival",
        name: "The Carnivorous Carnival",
        category: "books",
        section: "A Series of Unfortunate Events",
        description:
            "Book 9. The Baudelaires arrive at Caligari Carnival while following clues about Count Olaf and the mysterious V.F.D., forcing them to hide among the performers.",
        price: "Varies by seller",
        emoji: "📖",
        image: "images/carnivorous-carnival.jpg",
        jointGift: false
    },


    // ----------------------------------------
    // TRESE
    // ----------------------------------------

    {
        id: "trese-mass-murders",
        name: "TRESE: Mass Murders",
        category: "books",
        section: "TRESE",
        description:
            "Book 3. Alexandra Trese investigates a series of supernatural crimes across Manila involving strange rituals, ancient forces, and entities from Philippine mythology.",
        price: "Varies by seller",
        emoji: "📕",
        image: "images/trese-mass-murders.jpg",
        jointGift: false
    },

    {
        id: "trese-high-tide",
        name: "TRESE: High Tide at Midnight",
        category: "books",
        section: "TRESE",
        description:
            "Book 6. As strange events unfold across a flooded Manila, Alexandra Trese investigates supernatural crimes while confronting powerful forces hiding beneath the city's surface.",
        price: "Varies by seller",
        emoji: "📕",
        image: "images/trese-high-tide.jpg",
        jointGift: false
    },

    {
        id: "trese-shadow-witness",
        name: "TRESE: Shadow Witness",
        category: "books",
        section: "TRESE",
        description:
            "Book 7. A collection of supernatural cases takes Trese through haunted places, mysterious creatures, unusual crimes, and forgotten pieces of Manila's history.",
        price: "Varies by seller",
        emoji: "📕",
        image: "images/trese-shadow-witness.jpg",
        jointGift: false
    },


    // ----------------------------------------
    // AVATAR: THE LAST AIRBENDER
    // ----------------------------------------

    {
        id: "dawn-of-yangchen",
        name: "Avatar: The Last Airbender — The Dawn of Yangchen",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "A novel following Yangchen, the young Air Nomad Avatar, as she struggles with political tensions, dangerous spirits, and the difficult choices required to maintain balance.",
        price: "Varies by seller",
        emoji: "🌊📖",
        image: "images/dawn-of-yangchen.jpg",
        jointGift: false
    },

    {
        id: "legacy-of-yangchen",
        name: "Avatar: The Last Airbender — The Legacy of Yangchen",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "The second Yangchen novel, continuing her journey as Avatar as she deals with the consequences of her decisions and works to protect the fragile peace between the Four Nations.",
        price: "Varies by seller",
        emoji: "🌊📖",
        image: "images/legacy-of-yangchen.jpg",
        jointGift: false
    },

    {
        id: "rise-of-kyoshi",
        name: "Avatar: The Last Airbender — The Rise of Kyoshi",
        category: "books",
        section: "Avatar: The Last Airbender",
        description:
            "The first Kyoshi novel. After discovering she is the Avatar, Kyoshi must master the elements while facing political corruption, powerful enemies, and the complicated legacy of her predecessors.",
        price: "Varies by seller",
        emoji: "🌊📖",
        image: "images/rise-of-kyoshi.jpg",
        jointGift: false
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

console.log("SCRIPT IS RUNNING");
console.log("NUMBER OF GIFTS:", gifts.length);

displayGifts("all");
