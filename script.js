// ========================================
// BIRTHDAY REGISTRY
// FIREBASE + ANONYMOUS SELECTION SYSTEM
// ========================================


// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    runTransaction,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ========================================
// FIREBASE CONFIG
// ========================================
//
// PASTE YOUR FIREBASE CONFIG HERE
//
// ========================================

const firebaseConfig = {

    apiKey: "PASTE_YOUR_API_KEY_HERE",

    authDomain:
        "PASTE_YOUR_AUTH_DOMAIN_HERE",

    projectId:
        "PASTE_YOUR_PROJECT_ID_HERE",

    storageBucket:
        "PASTE_YOUR_STORAGE_BUCKET_HERE",

    messagingSenderId:
        "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",

    appId:
        "PASTE_YOUR_APP_ID_HERE"

};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);

const db =
    getFirestore(app);


// ========================================
// GIFT DATA
// ========================================

const gifts = [

    // ====================================
    // ELECTRONICS
    // ====================================

    {
        id: "switch-charging-station",

        name:
            "N1 Joy-Con Charging Station",

        category:
            "electronics",

        section:
            "Switch Accessories",

        description:
            "A charging station for my Switch because my right Joy-Con isn't charging properly.",

        price:
            "Varies by seller",

        emoji:
            "🔋🎮",

        image:
            "",

        selectionType:
            "joint"

    },


    {
        id: "pink-joycons",

        name:
            "Nintendo Switch Pink Joy-Cons",

        category:
            "electronics",

        section:
            "Switch Accessories",

        description:
            "There are some at the Robinsons Toys 'R' Us branch for around ₱4,106, but the price may differ depending on where they're bought.",

        price:
            "Around ₱4,106*",

        emoji:
            "🩷🎮",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id: "switch-case",

        name:
            "Nintendo Switch Case — Dock-Friendly",

        category:
            "electronics",

        section:
            "Switch Accessories",

        description:
            "A case for my Switch so I can have protection without sacrificing charging capacity. Preferably clear or white!",

        price:
            "Varies by seller",

        emoji:
            "🎮🤍",

        image:
            "",

        selectionType:
            "joint"

    },


    // ====================================
    // SWITCH GAMES
    // ====================================

    {
        id:
            "enter-the-gungeon",

        name:
            "Enter the Gungeon",

        category:
            "electronics",

        section:
            "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🎮",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "cult-of-the-lamb",

        name:
            "Cult of the Lamb",

        category:
            "electronics",

        section:
            "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🐑",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "super-smash-bros",

        name:
            "Super Smash Bros.",

        category:
            "electronics",

        section:
            "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🥊",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "surprise-game",

        name:
            "Surprise Me lol",

        category:
            "electronics",

        section:
            "Switch Games",

        description:
            "Get me a Nintendo Switch game of your choice. Surprise me! lol",

        price:
            "Up to you ♡",

        emoji:
            "🎁",

        image:
            "",

        selectionType:
            "open"

    },


    // ====================================
    // MISCELLANEOUS
    // ====================================

    {
        id:
            "avatar",

        name:
            "Avatar — James Cameron's Avatar",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Anything from James Cameron's Avatar franchise! Figures, collectibles, books, decorations, merch, etc.",

        price:
            "Up to you ♡",

        emoji:
            "🌊",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "ever-after-high",

        name:
            "Ever After High",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Anything Ever After High related! Dolls, accessories, collectibles, merch, art, etc.",

        price:
            "Up to you ♡",

        emoji:
            "👑",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "monster-high",

        name:
            "Monster High",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Anything Monster High related! Dolls, accessories, collectibles, merch, art, etc.",

        price:
            "Up to you ♡",

        emoji:
            "💀",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "marine-moth",

        name:
            "Anything Marine or Moth Related",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Anything marine or moth related! Sea creatures, nautical things, moths, art, decorations, accessories, plushies, collectibles — basically anything you think fits.",

        price:
            "Up to you ♡",

        emoji:
            "🐋🦋",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "dnd-dice",

        name:
            "D&D Dice Sets",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "A cool set of D&D dice. Feel free to choose whatever colors, theme, or design you think I'd like!",

        price:
            "Up to you ♡",

        emoji:
            "🎲",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "how-to-train-your-dragon",

        name:
            "How to Train Your Dragon",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Anything from How to Train Your Dragon! Merch, collectibles, books, decorations, etc.",

        price:
            "Up to you ♡",

        emoji:
            "🐉",

        image:
            "",

        selectionType:
            "open"

    },


    {
        id:
            "existing-fandom-merch",

        name:
            "Merch From the Games or Books on My Wishlist",

        category:
            "miscellaneous",

        section:
            "Miscellaneous",

        description:
            "Any merch related to the games or books mentioned elsewhere in this registry. Surprise me!",

        price:
            "Up to you ♡",

        emoji:
            "✨",

        image:
            "",

        selectionType:
            "open"

    },


    // ====================================
    // BOOKS
    // ====================================

    {
        id:
            "wide-window",

        name:
            "The Wide Window",

        category:
            "books",

        section:
            "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 3 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "ersatz-elevator",

        name:
            "The Ersatz Elevator",

        category:
            "books",

        section:
            "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 6 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "vile-village",

        name:
            "The Vile Village",

        category:
            "books",

        section:
            "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 7 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "carnivorous-carnival",

        name:
            "The Carnivorous Carnival",

        category:
            "books",

        section:
            "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 9 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "trese-mass-murders",

        name:
            "TRESE: Mass Murders",

        category:
            "books",

        section:
            "TRESE",

        description:
            "TRESE — Book 3 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "trese-high-tide",

        name:
            "TRESE: High Tide at Midnight",

        category:
            "books",

        section:
            "TRESE",

        description:
            "TRESE — Book 6 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "trese-shadow-witness",

        name:
            "TRESE: Shadow Witness",

        category:
            "books",

        section:
            "TRESE",

        description:
            "TRESE — Book 7 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "dawn-of-yangchen",

        name:
            "Avatar: The Last Airbender — The Dawn of Yangchen",

        category:
            "books",

        section:
            "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Dawn of Yangchen.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "legacy-of-yangchen",

        name:
            "Avatar: The Last Airbender — The Legacy of Yangchen",

        category:
            "books",

        section:
            "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Legacy of Yangchen.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        selectionType:
            "single"

    },


    {
        id:
            "rise-of-kyoshi",

        name:
            "Avatar: The Last Airbender — The Rise of Kyoshi",

        category:
            "books",

        section:
            "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Rise of Kyoshi.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        selectionType:
            "single"

    }

];


// ========================================
// DOM ELEMENTS
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
// CURRENT STATE
// ========================================

let currentGift = null;

let currentSelections = {};


// ========================================
// CATEGORY NAME
// ========================================

function getCategoryName(category) {

    if (category === "electronics") {
        return "Electronics";
    }

    if (category === "miscellaneous") {
        return "Miscellaneous";
    }

    if (category === "books") {
        return "Book Collections";
    }

    return category;
}


// ========================================
// PLACEHOLDER
// ========================================

function createPlaceholder(emoji) {

    const placeholder =
        document.createElement("div");

    placeholder.className =
        "image-placeholder";

    placeholder.textContent =
        emoji;

    return placeholder;
}


// ========================================
// AUTHENTICATION
// ========================================

async function startAnonymousLogin() {

    try {

        await signInAnonymously(auth);

        console.log(
            "Anonymous visitor signed in."
        );

    } catch (error) {

        console.error(
            "Anonymous login failed:",
            error
        );

        alert(
            "The registry couldn't connect to the selection system. Please refresh and try again."
        );

    }

}


// ========================================
// FIRESTORE DATA
// ========================================

async function getGiftStatus(giftId) {

    const giftRef =
        doc(
            db,
            "giftStatus",
            giftId
        );

    const snapshot =
        await getDoc(giftRef);


    if (!snapshot.exists()) {

        return {
            selected: false,
            contributorCount: 0
        };

    }


    return snapshot.data();

}


// ========================================
// LISTEN FOR CHANGES
// ========================================
//
// This makes the website update when another
// person selects something.
//

function listenToGift(gift) {

    const giftRef =
        doc(
            db,
            "giftStatus",
            gift.id
        );


    onSnapshot(
        giftRef,
        function(snapshot) {

            if (snapshot.exists()) {

                currentSelections[gift.id] =
                    snapshot.data();

            } else {

                currentSelections[gift.id] = {

                    selected: false,

                    contributorCount: 0

                };

            }


            displayGifts(
                getActiveCategory()
            );

        },

        function(error) {

            console.error(
                "Firestore listener error:",
                error
            );

        }
    );

}


// ========================================
// INITIALIZE LISTENERS
// ========================================

function initializeGiftListeners() {

    gifts.forEach(
        function(gift) {

            listenToGift(gift);

        }
    );

}


// ========================================
// GET ACTIVE CATEGORY
// ========================================

function getActiveCategory() {

    const active =
        document.querySelector(
            ".category.active"
        );


    if (!active) {

        return "all";

    }


    return active.dataset.category;

}


// ========================================
// DISPLAY GIFTS
// ========================================

function displayGifts(category = "all") {

    giftGrid.innerHTML = "";


    let giftsToShow;


    if (category === "all") {

        giftsToShow = gifts;

    } else {

        giftsToShow =
            gifts.filter(
                function(gift) {

                    return (
                        gift.category === category
                    );

                }
            );

    }


    giftsToShow.forEach(
        function(gift) {

            const card =
                document.createElement("div");

            card.className =
                "gift-card";


            // ====================================
            // IMAGE
            // ====================================

            const imageWrapper =
                document.createElement("div");

            imageWrapper.className =
                "gift-image-wrapper";


            if (gift.image) {

                const image =
                    document.createElement("img");

                image.className =
                    "gift-image";

                image.src =
                    gift.image;

                image.alt =
                    gift.name;


                image.onerror =
                    function() {

                        image.remove();

                        imageWrapper.appendChild(
                            createPlaceholder(
                                gift.emoji
                            )
                        );

                    };


                imageWrapper.appendChild(
                    image
                );

            } else {

                imageWrapper.appendChild(
                    createPlaceholder(
                        gift.emoji
                    )
                );

            }


            // ====================================
            // INFORMATION
            // ====================================

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


            // ====================================
            // STATUS
            // ====================================

            const status =
                document.createElement("div");

            status.className =
                "gift-status";


            const data =
                currentSelections[gift.id];


            if (
                gift.selectionType === "single"
            ) {

                if (
                    data &&
                    data.selected === true
                ) {

                    status.textContent =
                        "♡ Selected";

                } else {

                    status.textContent =
                        "♡ Available";

                }

            }


            else if (
                gift.selectionType === "joint"
            ) {

                const count =
                    data?.contributorCount || 0;


                if (count === 0) {

                    status.textContent =
                        "🤝 Available for a joint gift";

                } else {

                    status.textContent =
                        `🤝 ${count} ${
                            count === 1
                                ? "person"
                                : "people"
                        } contributing`;

                }

            }


            else if (
                gift.selectionType === "open"
            ) {

                const count =
                    data?.contributorCount || 0;


                if (count === 0) {

                    status.textContent =
                        "♡ Open — surprise me!";

                } else {

                    status.textContent =
                        `♡ ${count} ${
                            count === 1
                                ? "person"
                                : "people"
                        } getting something`;

                }

            }


            // ====================================
            // ASSEMBLE CARD
            // ====================================

            info.appendChild(
                categoryLabel
            );

            info.appendChild(
                name
            );

            info.appendChild(
                description
            );

            info.appendChild(
                price
            );

            info.appendChild(
                status
            );


            card.appendChild(
                imageWrapper
            );

            card.appendChild(
                info
            );


            card.addEventListener(
                "click",
                function() {

                    openGift(gift);

                }
            );


            giftGrid.appendChild(
                card
            );

        }
    );

}


// ========================================
// CATEGORY BUTTONS
// ========================================

categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(otherButton) {

                        otherButton.classList.remove(
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

function openGift(gift) {

    currentGift =
        gift;


    const modalImageWrapper =
        document.getElementById(
            "modalImageWrapper"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    const modalStatus =
        document.getElementById(
            "modalStatus"
        );


    modalCategory.textContent =
        gift.section;


    modalName.textContent =
        gift.name;


    modalDescription.textContent =
        gift.description;


    modalPrice.textContent =
        gift.price;


    updateModalStatus(
        gift,
        modalStatus
    );


    modalImageWrapper.innerHTML =
        "";


    if (gift.image) {

        const image =
            document.createElement("img");

        image.src =
            gift.image;

        image.alt =
            gift.name;


        image.onerror =
            function() {

                modalImageWrapper.innerHTML =
                    "";

                modalImageWrapper.appendChild(
                    createPlaceholder(
                        gift.emoji
                    )
                );

            };


        modalImageWrapper.appendChild(
            image
        );

    } else {

        modalImageWrapper.appendChild(
            createPlaceholder(
                gift.emoji
            )
        );

    }


    updateSelectButton(
        gift
    );


    modal.classList.remove(
        "hidden"
    );

}


// ========================================
// MODAL STATUS
// ========================================

function updateModalStatus(
    gift,
    element
) {

    const data =
        currentSelections[gift.id];


    if (
        gift.selectionType === "single"
    ) {

        if (
            data &&
            data.selected
        ) {

            element.textContent =
                "♡ Someone has already selected this gift.";

        } else {

            element.textContent =
                "♡ This gift is currently available.";

        }

    }


    else if (
        gift.selectionType === "joint"
    ) {

        const count =
            data?.contributorCount || 0;


        if (count === 0) {

            element.textContent =
                "🤝 No one has joined this gift yet.";

        } else {

            element.textContent =
                `🤝 ${count} ${
                    count === 1
                        ? "person is"
                        : "people are"
                } contributing.`;

        }

    }


    else if (
        gift.selectionType === "open"
    ) {

        const count =
            data?.contributorCount || 0;


        element.textContent =
            count === 0
                ? "♡ You're free to choose your own gift from this theme."
                : `♡ ${count} ${
                    count === 1
                        ? "person has"
                        : "people have"
                } chosen something from this theme.`;

    }

}


// ========================================
// BUTTON TEXT
// ========================================

function updateSelectButton(gift) {

    if (
        gift.selectionType === "single"
    ) {

        const selected =
            currentSelections[gift.id]?.selected;


        if (selected) {

            selectButton.textContent =
                "Already Selected ♡";

            selectButton.disabled =
                true;

        } else {

            selectButton.textContent =
                "I've Got This ♡";

            selectButton.disabled =
                false;

        }

    }


    else if (
        gift.selectionType === "joint"
    ) {

        selectButton.textContent =
            "Join This Gift ♡";

        selectButton.disabled =
            false;

    }


    else {

        selectButton.textContent =
            "I'm Getting Something From This ♡";

        selectButton.disabled =
            false;

    }

}


// ========================================
// SELECT GIFT
// ========================================

async function selectGift(gift) {

    if (!auth.currentUser) {

        alert(
            "Please wait a moment and try again."
        );

        return;

    }


    const uid =
        auth.currentUser.uid;


    const giftRef =
        doc(
            db,
            "giftStatus",
            gift.id
        );


    const mySelectionRef =
        doc(
            db,
            "selections",
            `${uid}_${gift.id}`
        );


    try {

        selectButton.disabled =
            true;


        // ====================================
        // SINGLE GIFT
        // ====================================

        if (
            gift.selectionType === "single"
        ) {

            await runTransaction(
                db,
                async function(transaction) {

                    const giftSnapshot =
                        await transaction.get(
                            giftRef
                        );


                    if (
                        giftSnapshot.exists() &&
                        giftSnapshot.data().selected
                    ) {

                        throw new Error(
                            "ALREADY_SELECTED"
                        );

                    }


                    transaction.set(
                        giftRef,
                        {
                            selected: true,

                            contributorCount: 1,

                            updatedAt:
                                serverTimestamp()
                        },
                        {
                            merge: true
                        }
                    );


                    transaction.set(
                        mySelectionRef,
                        {
                            giftId:
                                gift.id,

                            uid:
                                uid,

                            selectionType:
                                "single",

                            createdAt:
                                serverTimestamp()
                        }
                    );

                }
            );


            alert(
                "Gift selected! ♡ Your selection is anonymous."
            );

        }


        // ====================================
        // JOINT GIFT
        // ====================================

        else if (
            gift.selectionType === "joint"
        ) {

            const alreadySelected =
                await getDoc(
                    mySelectionRef
                );


            if (
                alreadySelected.exists()
            ) {

                alert(
                    "You've already joined this gift ♡"
                );

                return;

            }


            await runTransaction(
                db,
                async function(transaction) {

                    const giftSnapshot =
                        await transaction.get(
                            giftRef
                        );


                    let count = 0;


                    if (
                        giftSnapshot.exists()
                    ) {

                        count =
                            giftSnapshot.data()
                                .contributorCount || 0;

                    }


                    transaction.set(
                        giftRef,
                        {
                            selected: true,

                            contributorCount:
                                count + 1,

                            updatedAt:
                                serverTimestamp()
                        },
                        {
                            merge: true
                        }
                    );


                    transaction.set(
                        mySelectionRef,
                        {
                            giftId:
                                gift.id,

                            uid:
                                uid,

                            selectionType:
                                "joint",

                            createdAt:
                                serverTimestamp()
                        }
                    );

                }
            );


            alert(
                "You've joined the gift! ♡ Your identity is anonymous."
            );

        }


        // ====================================
        // OPEN GIFT
        // ====================================

        else if (
            gift.selectionType === "open"
        ) {

            const alreadySelected =
                await getDoc(
                    mySelectionRef
                );


            if (
                alreadySelected.exists()
            ) {

                alert(
                    "You've already chosen something from this category ♡"
                );

                return;

            }


            await runTransaction(
                db,
                async function(transaction) {

                    const giftSnapshot =
                        await transaction.get(
                            giftRef
                        );


                    let count = 0;


                    if (
                        giftSnapshot.exists()
                    ) {

                        count =
                            giftSnapshot.data()
                                .contributorCount || 0;

                    }


                    transaction.set(
                        giftRef,
                        {
                            selected: true,

                            contributorCount:
                                count + 1,

                            updatedAt:
                                serverTimestamp()
                        },
                        {
                            merge: true
                        }
                    );


                    transaction.set(
                        mySelectionRef,
                        {
                            giftId:
                                gift.id,

                            uid:
                                uid,

                            selectionType:
                                "open",

                            createdAt:
                                serverTimestamp()
                        }
                    );

                }
            );


            alert(
                "Got it! ♡ Your selection is anonymous."
            );

        }


        closeModal();

    }


    catch (error) {

        console.error(
            "Selection error:",
            error
        );


        if (
            error.message ===
            "ALREADY_SELECTED"
        ) {

            alert(
                "Someone just selected this gift before you! ♡"
            );

        } else {

            alert(
                "Something went wrong. Please try again."
            );

        }

    }


    finally {

        selectButton.disabled =
            false;


        updateSelectButton(
            gift
        );

    }

}


// ========================================
// SELECT BUTTON
// ========================================

selectButton.addEventListener(
    "click",
    function() {

        if (currentGift) {

            selectGift(
                currentGift
            );

        }

    }
);


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    modal.classList.add(
        "hidden"
    );

    currentGift =
        null;

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


// ========================================
// START
// ========================================

async function startRegistry() {

    displayGifts("all");

    await startAnonymousLogin();

    initializeGiftListeners();

}


startRegistry();
