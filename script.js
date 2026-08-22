selectButton.addEventListener(
    "click",
    async function () {

        if (!selectedGift) {
            return;
        }

        if (!currentUser) {

            alert(
                "Still connecting to the registry. Please try again in a moment."
            );

            return;

        }

        const gift = selectedGift;


        // ========================================
        // UNLIMITED GIFTS
        // ========================================

        if (gift.unlimited) {

            const selectionId =
                gift.id + "_" + currentUser.uid;

            const selectionRef =
                doc(
                    db,
                    "selections",
                    selectionId
                );

            try {

                await setDoc(
                    selectionRef,
                    {
                        uid: currentUser.uid,
                        giftId: gift.id,
                        createdAt:
                            new Date().toISOString()
                    }
                );

                alert(
                    "You've marked this as something you'd like to get! ♡"
                );

                closeModal();

            }

            catch (error) {

                console.error(
                    "Unlimited selection error:",
                    error
                );

                alert(
                    "Something went wrong. Please try again."
                );

            }

            return;
        }


        // ========================================
        // NORMAL / JOINT GIFTS
        // ========================================

        const giftRef =
            doc(
                db,
                "giftStatus",
                gift.id
            );


        const selectionId =
            gift.id + "_" + currentUser.uid;


        const selectionRef =
            doc(
                db,
                "selections",
                selectionId
            );


        try {

            // Check whether someone has already
            // selected this gift.

            const existing =
                await getDoc(giftRef);


            // ------------------------------------
            // NORMAL GIFT ALREADY SELECTED
            // ------------------------------------

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


            // ------------------------------------
            // RECORD PRIVATE SELECTION
            // ------------------------------------

            await setDoc(
                selectionRef,
                {
                    uid: currentUser.uid,
                    giftId: gift.id,
                    joint: gift.jointGift === true,
                    createdAt:
                        new Date().toISOString()
                }
            );


            // ------------------------------------
            // UPDATE PUBLIC STATUS
            // ------------------------------------

            if (!existing.exists()) {

                await setDoc(
                    giftRef,
                    {
                        selected: true,
                        joint: gift.jointGift === true
                    }
                );

            }

            else if (gift.jointGift) {

                await updateDoc(
                    giftRef,
                    {
                        selected: true,
                        joint: true
                    }
                );

            }


            // ------------------------------------
            // SUCCESS
            // ------------------------------------

            if (gift.jointGift) {

                alert(
                    "You've joined the gift plan! 🤝♡"
                );

            }

            else {

                alert(
                    "Gift selected! Nobody will see that it was you. ♡"
                );

            }


            closeModal();

        }

        catch (error) {

            console.error(
                "SELECTION ERROR:",
                error
            );

            alert(
                "The registry couldn't connect to the selection system. Please try again."
            );

        }

    }
);
