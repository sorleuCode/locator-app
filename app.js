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
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}6&lon=${position.coords.longitude}`);

        const data = await response.json();
        console.log(data);

        locationResult.innerText = `${data.address.road}, ${data.address.village}, 
    ${data.address.state}, ${data.address.country}`

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


currentLocationBtn.addEventListener("click", getCurrentLocation)