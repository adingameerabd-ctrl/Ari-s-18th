const gifts = [

    {
        id: "gaming-001",

        name: "Nintendo Switch Game",

        category: "gaming",

        description:
            "A game from my wishlist. Any edition is okay unless specified.",

        price: 2500,

        image:
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    },


    {
        id: "gaming-002",

        name: "Wireless Headphones",

        category: "gaming",

        description:
            "Something good for gaming, music, and everyday use.",

        price: 5000,

        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },


    {
        id: "books-001",

        name: "Book from my Wishlist",

        category: "books",

        description:
            "Any edition is fine unless otherwise specified.",

        price: 900,

        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },


    {
        id: "clothes-001",

        name: "Oversized Hoodie",

        category: "clothes",

        description:
            "Something cozy for everyday wear.",

        price: 1500,

        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    },


    {
        id: "other-001",

        name: "Something Cute",

        category: "other",

        description:
            "A little surprise that you think I'd like.",

        price: 500,

        image:
            "https://images.unsplash.com/photo-1513201099705-a9746e1e201f"
    }

];


const giftGrid =
    document.getElementById("giftGrid");


const modal =
    document.getElementById("giftModal");


let currentGift = null;


/* DISPLAY GIFTS */

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
                    ₱${gift.price.toLocaleString()}
                </div>

                <div class="gift-status">
                    Available ♡
                </div>

            </div>
        `;


        card.onclick =
            () => openGift(gift);


        giftGrid.appendChild(card);

    });

}


/* CATEGORY FILTER */

function filterGifts(category) {

    document
        .querySelectorAll(".category")
        .forEach(button => {

            button.classList.remove("active");

        });


    event.target.classList.add("active");


    displayGifts(category);
}


/* OPEN GIFT */

function openGift(gift) {

    currentGift = gift;


    document.getElementById("modalImage").src =
        gift.image;


    document.getElementById("modalName").textContent =
        gift.name;


    document.getElementById("modalCategory").textContent =
        gift.category;


    document.getElementById("modalDescription").textContent =
        gift.description;


    document.getElementById("modalPrice").textContent =
        `₱${gift.price.toLocaleString()}`;


    document.getElementById("modalStatus").textContent =
        "♡ This gift is currently available.";


    modal.classList.remove("hidden");

}


/* CLOSE MODAL */

function closeModal() {

    modal.classList.add("hidden");

}


/* SELECT BUTTON */

document
    .getElementById("selectButton")
    .addEventListener("click", () => {

        alert(
            "Gift selection will be connected to the anonymous registry system next!"
        );

    });


/* INITIAL DISPLAY */

displayGifts("all");
