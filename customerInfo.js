const FORM = document.getElementById("form");

FORM.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const streetname = document.getElementById("streetname").value;
    const numberfloor = document.getElementById("numberfloor").value;
    const postalcode = document.getElementById("postalcode").value;

    const person = {
        firstName: firstName,
        lastName:lastName,
        email:email,
        streetname: streetname,
        numberfloor: numberfloor,
        postalcode: postalcode
    }

    localStorage.setItem("customer", JSON.stringify(person));
    document.location.href = "receipt.html";
})
