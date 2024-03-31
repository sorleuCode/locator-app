const locationResult = document.getElementById("location");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const loader = document.querySelector(".loader");

const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }

    else {
        locationResult.innerText = "The browser does not support geolocation";
    }
}


// Error checks

const showLocation = async (position) => {
    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&Key=bdc_cae158a386e445ffbb8b3a562aae4f47&localityLanguage=en`;
    try {

        loader.style.display = "block";
        locationResult.style.display = "none";
        
        const response = await fetch(apiUrl);

        if (!response.ok) throw Error("Try reloading the app");

        const data = await response.json();
        
        


        setTimeout(() => {

            loader.style.display = "none";

            locationResult.style.display = "block";

            locationResult.innerText = `${data.locality}, ${data.city}, ${data.principalSubdivision} State, ${data.countryName}, ${data.continent}.`;
        }, 2000);


    } catch (error) {
        locationResult.innerText = error.message;
    }
}


currentLocationBtn.addEventListener("click", getCurrentLocation);