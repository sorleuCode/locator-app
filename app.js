const locationResult = document.getElementById("location");
const currentLocationBtn = document.getElementById("currentLocationBtn");

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
        const response = await fetch(apiUrl);

        const data = await response.json();
        console.log(data);

        locationResult.innerText = `${data.locality}, ${data.city}, ${data.principalSubdivision} State, ${data.countryName}, ${data.continent}.`;

    } catch (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationResult.innerText = "Please allow access to location";
                break;
            case error.POSITION_UNAVAILABLE:
                locationResult.innerText = "Location info is not available";
                break;
            case error.TIMEOUT:
                locationResult.innerText = "The request to get user location is timed out";
                break;
            default:
                break;
        }
    }
}


currentLocationBtn.addEventListener("click", getCurrentLocation);