/*=============== ELEMENTS ===============*/
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

/*=============== FUNCTIONS ===============*/
const onGenerateSubmit = (e) => {
    e.preventDefault();

    // Clear the UI before anything else
    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert("Please enter a URL");
    } else {
        // Show spinner
        showSpinner();

        // Hide spinner after 1 second
        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            // This timeout is to get the image url
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }

}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size
    });
}

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
}

const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
}

const clearUI = () => {
    qr.innerHTML = "";
    
    const saveLink = document.getElementById("save-link");
    
    // Check if the save link exists, if it does remove it from the DOM
    if (saveLink) {
        saveLink.remove();
    }

}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a");
    link.id = 'save-link';
    link.classList = "bg-red-500 text-white font-bold py-2 rounded w-1/3 m-auto my-5 hover:bg-red-700";
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(link);

}


/*=============== EVENT LISTENERS ===============*/
hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
