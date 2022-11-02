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

    console.log(url, size);

    if (url === '') {
        alert("Please enter a URL");
    } else {
        // Show spinner
        showSpinner();

        // Hide spinner after 1 second
        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);
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
}


/*=============== EVENT LISTENERS ===============*/
hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
