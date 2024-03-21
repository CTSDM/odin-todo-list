const defaultItemsParameters = [["Send email", "Send email to buy new computer", getDateString(), true, true]
    ,["Finish series", "Finish the backlog of series you are watching", getDateString(), true, false]
    ,["Prepare weekend call", "Get ready for the weekly call in order to practice and improve your language skills", getDateString(), true, true]
];

function getDateString() {
    const today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yy = String(today.getFullYear());

    // adding leading zeros to the Date if needed
    if (dd.length < 2) {
        dd = '0' + dd;
    }

    if (mm.length < 2) {
        mm = '0' + mm;
    }

    return `${yy}-${mm}-${dd}`
}

export default defaultItemsParameters;
