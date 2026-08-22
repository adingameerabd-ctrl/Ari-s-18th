// ============================================================
// ARI'S BIRTHDAY REGISTRY
// FIREBASE + ANONYMOUS GIFT SELECTION
// ============================================================


// ============================================================
// FIREBASE
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ============================================================
// YOUR FIREBASE CONFIG
// ============================================================

const firebaseConfig = {

    apiKey: "AIzaSyDvamfquBqYWrM22S6hWF1k1L8LgCxg48",

    authDomain:
        "ber-thday-ni-ari.firebaseapp.com",

    projectId:
        "ber-thday-ni-ari",

    storageBucket:
        "ber-thday-ni-ari.firebasestorage.app",

    messagingSenderId:
        "644102572585",

    appId:
        "1:644102572585:web:b40f911e0ab434a1e2ea38",

    measurementId:
        "G-TVQ426NXT5"
};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


// ============================================================
// ANONYMOUS LOGIN
// ============================================================

let currentUser = null;


async function startAnonymousSession() {

    try {

        const result =
            await signInAnonymously(auth);

        currentUser =
            result.user;

        console.log(
            "Anonymous session started."
        );

        displayGifts("all");

    }

    catch (error) {

        console.error(
            "Anonymous login failed:",
            error
        );

        alert(
            "Oops! The registry couldn't connect to Firebase. Please refresh the page."
        );

    }

}


// ============================================================
// GIFTS
// ============================================================
//
// mode:
// "single"     = only one person/group can select
// "joint"      = multiple people can join one gift
// "unlimited"  = multiple people can independently choose
//
// ============================================================


const gifts = [

    // ========================================================
    // ELECTRONICS — SWITCH ACCESSORIES
    // ========================================================

    {
        id: "switch-charging-station",

        name: "N1 Joy-Con Charging Station",

        category: "electronics",

        section: "Switch Accessories",

        description:
            "A charging station for my Switch because my right Joy-Con isn't charging properly.",

        price:
            "Varies by seller",

        emoji:
            "🔋🎮",

        image:
            "",

        reference:
            "https://share.google/O76lDy5YBKwnk0OZE",

        mode:
            "joint"
    },


    {
        id: "pink-joycons",

        name: "Nintendo Switch Pink Joy-Cons",

        category: "electronics",

        section: "Switch Accessories",

        description:
            "There are some at the Robinsons Toys 'R' Us branch for around ₱4,106, but the price may differ depending on where they're bought.",

        price:
            "Around ₱4,106*",

        emoji:
            "🩷🎮",

        image:
            "",

        reference:
            "https://share.google/NzgQW1r0bhOf4Lr2k",

        mode:
            "single"
    },


    {
        id: "switch-case",

        name: "Nintendo Switch Case — Dock-Friendly",

        category: "electronics",

        section: "Switch Accessories",

        description:
            "A case for my Switch so I can have protection without sacrificing charging capacity. Preferably clear or white!",

        price:
            "Varies by seller",

        emoji:
            "🎮🤍",

        image:
            "",

        reference:
            "https://share.google/ysTNoeMbaMwaogwt2",

        mode:
            "single"
    },


    // ========================================================
    // ELECTRONICS — SWITCH GAMES
    // ========================================================

    {
        id: "enter-the-gungeon",

        name: "Enter the Gungeon",

        category: "electronics",

        section: "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🎮",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "cult-of-the-lamb",

        name: "Cult of the Lamb",

        category: "electronics",

        section: "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🐑",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "super-smash-bros",

        name: "Super Smash Bros.",

        category: "electronics",

        section: "Switch Games",

        description:
            "Nintendo Switch game.",

        price:
            "Varies by seller",

        emoji:
            "🥊",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "surprise-game",

        name: "Surprise Me lol",

        category: "electronics",

        section: "Switch Games",

        description:
            "A Nintendo Switch game of your choice. Surprise me! Different people can independently choose different games.",

        price:
            "Up to you ♡",

        emoji:
            "🎁",

        image:
            "",

        mode:
            "unlimited"
    },


    // ========================================================
    // MISCELLANEOUS
    // ========================================================

    {
        id: "avatar",

        name: "Avatar — James Cameron's Avatar",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Anything from James Cameron's Avatar franchise! Figures, collectibles, books, decorations, merch, etc. Go wild with the topic.",

        price:
            "Up to you ♡",

        emoji:
            "🌊",

        image:
            "",

        reference:
            "https://share.google/O76lDy5YBKwnk0OZE",

        mode:
            "unlimited"
    },


    {
        id: "ever-after-high",

        name: "Ever After High",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Anything Ever After High related! Dolls, accessories, collectibles, merch, art, etc.",

        price:
            "Up to you ♡",

        emoji:
            "👑",

        image:
            "",

        reference:
            "https://pin.it/4V4COxtdH",

        mode:
            "unlimited"
    },


    {
        id: "monster-high",

        name: "Monster High",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Anything Monster High related! Dolls, accessories, collectibles, merch, art, etc.",

        price:
            "Up to you ♡",

        emoji:
            "💀",

        image:
            "",

        reference:
            "https://pin.it/43l4xo99v",

        mode:
            "unlimited"
    },


    {
        id: "marine-moth",

        name: "Anything Marine or Moth Related",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Anything marine or moth related! Sea creatures, nautical things, moths, art, decorations, accessories, plushies, collectibles — basically anything you think fits.",

        price:
            "Up to you ♡",

        emoji:
            "🐋🦋",

        image:
            "",

        reference:
            "https://pin.it/B94IMDmpq",

        mode:
            "unlimited"
    },


    {
        id: "dnd-dice",

        name: "D&D Dice Sets",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "A cool set of D&D dice. Feel free to choose whatever colors, theme, or design you think I'd like!",

        price:
            "Up to you ♡",

        emoji:
            "🎲",

        image:
            "",

        reference:
            "https://pin.it/3k85XACJI",

        mode:
            "unlimited"
    },


    {
        id: "how-to-train-your-dragon",

        name: "How to Train Your Dragon",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Anything from How to Train Your Dragon! Merch, collectibles, books, decorations, etc.",

        price:
            "Up to you ♡",

        emoji:
            "🐉",

        image:
            "",

        reference:
            "https://pin.it/76XvOxBmk",

        mode:
            "unlimited"
    },


    {
        id: "existing-fandom-merch",

        name: "Merch From the Games or Books on My Wishlist",

        category: "miscellaneous",

        section: "Miscellaneous",

        description:
            "Any merch related to the games or books mentioned elsewhere in this registry. Surprise me!",

        price:
            "Up to you ♡",

        emoji:
            "✨",

        image:
            "",

        reference:
            "https://pin.it/RXuruO2JU",

        mode:
            "unlimited"
    },


    // ========================================================
    // BOOK COLLECTIONS
    // ========================================================

    {
        id: "wide-window",

        name: "The Wide Window",

        category: "books",

        section: "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 3 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "ersatz-elevator",

        name: "The Ersatz Elevator",

        category: "books",

        section: "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 6 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "vile-village",

        name: "The Vile Village",

        category: "books",

        section: "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 7 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "carnivorous-carnival",

        name: "The Carnivorous Carnival",

        category: "books",

        section: "A Series of Unfortunate Events",

        description:
            "A Series of Unfortunate Events — Book 9 by Lemony Snicket.",

        price:
            "Varies by seller",

        emoji:
            "📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "trese-mass-murders",

        name: "TRESE: Mass Murders",

        category: "books",

        section: "TRESE",

        description:
            "TRESE — Book 3 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "trese-high-tide",

        name: "TRESE: High Tide at Midnight",

        category: "books",

        section: "TRESE",

        description:
            "TRESE — Book 6 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "trese-shadow-witness",

        name: "TRESE: Shadow Witness",

        category: "books",

        section: "TRESE",

        description:
            "TRESE — Book 7 by Budjette Tan and Kajo Baldisimo.",

        price:
            "Varies by seller",

        emoji:
            "📕",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "dawn-of-yangchen",

        name: "Avatar: The Last Airbender — The Dawn of Yangchen",

        category: "books",

        section: "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Dawn of Yangchen.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "legacy-of-yangchen",

        name: "Avatar: The Last Airbender — The Legacy of Yangchen",

        category: "books",

        section: "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Legacy of Yangchen.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        mode:
            "single"
    },


    {
        id: "rise-of-kyoshi",

        name: "Avatar: The Last Airbender — The Rise of Kyoshi",

        category: "books",

        section: "Avatar: The Last Airbender",

        description:
            "Avatar: The Last Airbender novel — The Rise of Kyoshi.",

        price:
            "Varies by seller",

        emoji:
            "🌊📖",

        image:
            "",

        mode:
            "single"
    }

];


// ============================================================
// WEBSITE ELEMENTS
// ============================================================

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

let selectedGift = null;


// ============================================================
// CATEGORY NAME
// ============================================================

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


// ============================================================
// PLACEHOLDER IMAGE
// ============================================================

function createPlaceholder(emoji) {

    const placeholder =
        document.createElement("div");

    placeholder.className =
        "image-placeholder";

    placeholder.textContent =
        emoji;

    return placeholder;
}


// ============================================================
// GET GIFT STATUS
// ============================================================

async function getGiftStatus(gift) {

    try {

        const statusRef =
            doc(
                db,
                "giftStatus",
                gift.id
            );

        const statusSnapshot =
            await getDoc(statusRef);


        if (!statusSnapshot.exists()) {

            return {
                count: 0,
                claimed: false
            };

        }


        return statusSnapshot.data();

    }

    catch (error) {

        console.error(
            "Could not get gift status:",
            error
        );

        return {
            count: 0,
            claimed: false
        };

    }

}


// ============================================================
// CHECK WHETHER CURRENT PERSON ALREADY SELECTED
// ============================================================

async function alreadySelected(gift) {

    if (!currentUser) {
        return false;
    }


    const selectionId =
        gift.id + "_" + currentUser.uid;


    const selectionRef =
        doc(
            db,
            "selections",
            selectionId
        );


    const snapshot =
        await getDoc(selectionRef);


    return snapshot.exists();

}


// ============================================================
// STATUS TEXT
// ============================================================

function getStatusText(gift, status) {

    const count =
        status.count || 0;


    if (gift.mode === "single") {

        if (status.claimed) {

            return "🔒 Someone has already selected this";

        }

        return "♡ Available";

    }


    if (gift.mode === "joint") {

        if (count === 0) {

            return "♡ Available for a joint gift";

        }

        return (
            "♡ Joint gift · " +
            count +
            (count === 1
                ? " person joined"
                : " people joined")
        );

    }


    if (gift.mode === "unlimited") {

        if (count === 0) {

            return "♡ Available";

        }

        return (
            "♡ " +
            count +
            (count === 1
                ? " person selected"
                : " people selected")
        );

    }


    return "♡ Available";

}


// ============================================================
// DISPLAY GIFTS
// ============================================================

async function displayGifts(category = "all") {

    giftGrid.innerHTML = "";


    let giftsToShow;


    if (category === "all") {

        giftsToShow = gifts;

    }

    else {

        giftsToShow =
            gifts.filter(
                function (gift) {

                    return (
                        gift.category === category
                    );

                }
            );

    }


    for (const gift of giftsToShow) {

        const card =
            document.createElement("div");


        card.className =
            "gift-card";


        // ----------------------------------------------------
        // IMAGE
        // ----------------------------------------------------

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
                function () {

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

        }

        else {

            imageWrapper.appendChild(
                createPlaceholder(
                    gift.emoji
                )
            );

        }


        // ----------------------------------------------------
        // INFORMATION
        // ----------------------------------------------------

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


        const giftStatus =
            await getGiftStatus(gift);


        status.textContent =
            getStatusText(
                gift,
                giftStatus
            );


        // ----------------------------------------------------
        // PUT INFORMATION TOGETHER
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // CLICK CARD
        // ----------------------------------------------------

        card.addEventListener(
            "click",
            function () {

                openGift(gift);

            }
        );


        giftGrid.appendChild(
            card
        );

    }

}


// ============================================================
// CATEGORY BUTTONS
// ============================================================

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (otherButton) {

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


// ============================================================
// OPEN GIFT MODAL
// ============================================================

async function openGift(gift) {

    selectedGift =
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


    const status =
        await getGiftStatus(gift);


    const mine =
        await alreadySelected(gift);


    modalStatus.textContent =
        getStatusText(
            gift,
            status
        );


    // --------------------------------------------------------
    // BUTTON
    // --------------------------------------------------------

    if (mine) {

        selectButton.textContent =
            "✓ You've selected this";

        selectButton.disabled =
            true;

    }

    else if (
        gift.mode === "single"
        &&
        status.claimed
    ) {

        selectButton.textContent =
            "Already selected";

        selectButton.disabled =
            true;

    }

    else if (
        gift.mode === "joint"
    ) {

        selectButton.textContent =
            "Join this gift ♡";

        selectButton.disabled =
            false;

    }

    else {

        selectButton.textContent =
            "Select this gift ♡";

        selectButton.disabled =
            false;

    }


    // --------------------------------------------------------
    // IMAGE
    // --------------------------------------------------------

    modalImageWrapper.innerHTML =
        "";


    if (gift.image) {

        const image =
            document.createElement("img");


        image.src =
            gift.image;


        image.alt =
            gift.name;


        image.className =
            "modal-image";


        image.onerror =
            function () {

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

    }

    else {

        modalImageWrapper.appendChild(
            createPlaceholder(
                gift.emoji
            )
        );

    }


    modal.classList.remove(
        "hidden"
    );

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    modal.classList.add(
        "hidden"
    );

    selectedGift =
        null;

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


// ============================================================
// SELECT / JOIN GIFT
// ============================================================

selectButton.addEventListener(
    "click",
    async function () {

        if (!selectedGift) {
            return;
        }


        if (!currentUser) {

            alert(
                "Please wait a moment and try again."
            );

            return;

        }


        const gift =
            selectedGift;


        selectButton.disabled =
            true;


        selectButton.textContent =
            "Saving...";


        try {

            const selectionId =
                gift.id +
                "_" +
                currentUser.uid;


            const selectionRef =
                doc(
                    db,
                    "selections",
                    selectionId
                );


            const statusRef =
                doc(
                    db,
                    "giftStatus",
                    gift.id
                );


            await runTransaction(
                db,
                async function (transaction) {

                    // ----------------------------------------
                    // GET CURRENT DATA
                    // ----------------------------------------

                    const selectionSnapshot =
                        await transaction.get(
                            selectionRef
                        );


                    const statusSnapshot =
                        await transaction.get(
                            statusRef
                        );


                    // ----------------------------------------
                    // PREVENT DOUBLE SELECTION
                    // ----------------------------------------

                    if (
                        selectionSnapshot.exists()
                    ) {

                        throw new Error(
                            "ALREADY_SELECTED"
                        );

                    }


                    const currentStatus =
                        statusSnapshot.exists()
                            ? statusSnapshot.data()
                            : {
                                count: 0,
                                claimed: false
                            };


                    const currentCount =
                        currentStatus.count || 0;


                    // ----------------------------------------
                    // SINGLE GIFTS
                    // ----------------------------------------

                    if (
                        gift.mode === "single"
                        &&
                        currentStatus.claimed
                    ) {

                        throw new Error(
                            "ALREADY_CLAIMED"
                        );

                    }


                    // ----------------------------------------
                    // NEW COUNT
                    // ----------------------------------------

                    const newCount =
                        currentCount + 1;


                    const newStatus = {

                        count:
                            newCount,

                        claimed:
                            gift.mode === "single"
                                ? true
                                : false,

                        mode:
                            gift.mode,

                        updatedAt:
                            new Date()

                    };


                    // ----------------------------------------
                    // SAVE PUBLIC STATUS
                    // ----------------------------------------

                    transaction.set(
                        statusRef,
                        newStatus
                    );


                    // ----------------------------------------
                    // SAVE PRIVATE SELECTION
                    // ----------------------------------------

                    transaction.set(
                        selectionRef,
                        {

                            uid:
                                currentUser.uid,

                            giftId:
                                gift.id,

                            mode:
                                gift.mode,

                            selectedAt:
                                new Date()

                        }
                    );

                }
            );


            // =================================================
            // SUCCESS
            // =================================================

            if (
                gift.mode === "joint"
            ) {

                alert(
                    "You're in! ♡ You've joined this joint gift anonymously."
                );

            }

            else if (
                gift.mode === "unlimited"
            ) {

                alert(
                    "Selected! ♡ Your choice is anonymous."
                );

            }

            else {

                alert(
                    "Selected! ♡ Nobody will see that it was you."
                );

            }


            await displayGifts(
                document.querySelector(
                    ".category.active"
                )?.dataset.category
                || "all"
            );


            closeModal();

        }

        catch (error) {

            console.error(
                "Selection failed:",
                error
            );


            if (
                error.message ===
                "ALREADY_SELECTED"
            ) {

                alert(
                    "You've already selected this gift. ♡"
                );

            }

            else if (
                error.message ===
                "ALREADY_CLAIMED"
            ) {

                alert(
                    "Someone else already selected this gift! ♡"
                );

            }

            else {

                alert(
                    "Something went wrong while saving your selection. Please try again."
                );

            }


            selectButton.disabled =
                false;


            selectButton.textContent =
                "Select this gift ♡";

        }

    }
);


// ============================================================
// START
// ============================================================

startAnonymousSession();
