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

    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&Key=bdc_cae158a386e445ffbb8b3a562aae4f47&localityLanguage=en`);
        // const response = await fetch(`https://api.positionstack.com/v1/reverse?access_key=2a27b4745240196a4c034c5d525cfd27&query= ${position.coords.latitude},${position.coords.longitude}&country_module=1`);

        const data = await response.json();
        console.log(data);

        locationResult.innerText = `${data.locality}, ${data.city}, ${data.countryName}`;

        // locationResult.innerText = `${data.data[0].name}, ${data.data[0].county}, ${data.data[0].region}, ${data.data[0].country}`;

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