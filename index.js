const output= document.getElementById("output");
const arrival= document.getElementById("pickupdate");
const departure= document.getElementById("handindate");
const form = document.getElementById("form");
const personsNumber = document.getElementById("personnumber");


//car info//
 
 const carlist = [
     {  
         name: "Suzuki Swift",
         category:"Budget",
         persons:4,
         suitcases:1,
         price: 430,
         image: scr="images/suzukiswift.png"
     },
     {
         name: "Volkswagen Jetta",
         category:"Standard",
         persons:5,
         suitcases:3,
         price: 657,
         image: scr="images/vwjetta.png"     
     },
     {
         name: "Honda Odysseyt",
         category:"Minivan",
         persons:7,
         suitcases:4,
         price: 748,
         image: scr="images/honda.png"
     }
 ]

let template="";
function validDates (arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    return arrival < departure;
}

function calculateDays(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1;
    return diffindays;
}

function calculatePrice(days, price) {
    const totalprice = (495 + (price * days)) * 1.25;
    return totalprice;
}

function calculatePriceWithVAT(price, percentage){
    return price + price * percentage / 100;
}

function validateNumberPersons(){
    return personsNumber.value >= 1 && personsNumber.value <= 7;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.innerHTML = "";
    const arrivalValue = arrival.value;
    const departureValue = departure.value;
    const datesValid = validDates(arrivalValue, departureValue);
    const personsValid = validateNumberPersons();
    if (datesValid && personsValid) {
        window.history.pushState({}, null,"index.html?startDate=" + arrivalValue + "&endDate=" + departureValue + "&persons=" + document.getElementById("personnumber").value + "&suitcases=" + document.getElementById("suitcases").value);
        for (const car of carlist){
        const pnumber = parseFloat(document.getElementById("personnumber").value);
        const snumber = parseFloat(document.getElementById("suitcases").value);
        const days = calculateDays(arrivalValue, departureValue);
        const price = calculatePrice(days, car.price);
        const VATpercentage = 10; // hardcoded value
        const priceAfterVAT = calculatePriceWithVAT(price, VATpercentage);
        if (car.persons >= pnumber && car.suitcases >= snumber) {
            template = `
    <section class="car">
        <img src="${car.image}" alt="car" class="image" style="width:120px " >
            <div class="names">
                ${car.name}

            </div>

            <div class="category">
                category: ${car.category}
            </div>
            <div class="persons">
                persons: ${car.persons}
            </div>
            
            <div class="suitcases">
                suitcases: ${car.suitcases}
            </div>
            
            <div class="costtnbook-cont">
            <div class="cost-cont">
                <p class="cost">${price} dkk</p>
            </div>
            <div class="book-cont">
                <button onclick='buttonClicked(${JSON.stringify(car)}, ${price}, ${priceAfterVAT}, ${days}, ${JSON.stringify(new Date(arrivalValue))}, ${JSON.stringify(new Date(departureValue))})' type="button" class="booknow" >
                    Book now
                </button>
            </div>
    </section>`
    output.insertAdjacentHTML ("beforeend", template);
    }

    }
        
    } else {
        if((arrival.value == "" || departure.value == "") && !personsValid)
        {
            alert("ERROR: Dates are not valid and the number of persons is not inserted.");
        }
        else if((arrival.value == "" || departure.value == "") && personsValid){
            alert("ERROR: Dates are not valid.");
        }
        else if(!datesValid && !personsValid){
            alert("ERROR: Pickup date is later then delivery date and number of persons is not valid.");
        }
        else if(!datesValid && personsValid){
            alert("ERROR: Pickup date is later then delivery date.");
        }
        else if(datesValid && !personsValid){
            alert("ERROR: Number of persons is not valid.");
        }
    }
})

function buttonClicked(car, price, priceAfterVAT, noOfDays, arrivalDate, departureDate){
    localStorage.setItem("car", JSON.stringify(car));
    localStorage.setItem("price", price);
    localStorage.setItem("priceVAT", priceAfterVAT);
    localStorage.setItem("noOfDays", noOfDays);
    localStorage.setItem("pickupDate", JSON.stringify(arrivalDate));
    localStorage.setItem("deliveryDate", JSON.stringify(departureDate));
    window.location.href = "accesories.html";
};
