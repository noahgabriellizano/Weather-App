let dayNum = 0
let newLoad = true
let address = "Montreal"
let celcius = false

const input = document.getElementById("input")
const day = document.getElementById("day")
const min = document.getElementById("min")
const max = document.getElementById("max")
const temp = document.getElementById("temp")
const precip = document.getElementById("precip")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const locationText = document.getElementById("location")
const previous = document.getElementById("previous")
const next = document.getElementById("next")
const enter = document.getElementById("enter")
const converter = document.getElementById("converter")

function capitalize(word) {
    const cap = word.slice(0,1).toUpperCase()
    const min = word.slice(1)
    return cap + min
}

converter.addEventListener("click", () => {
    if(celcius == false) {
        celcius = true
        converter.innerText = "°F"
        query(address)
    } else {
        celcius = false
        converter.innerText = "°C"
        query(address)
    }
})

async function query(address) {
    try {
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=PGRA4JHMPWPGAUN2JJSKGLFM6&timezone=America/New_York`)
        if(data.ok) {
            const parsedData = await data.json()
            if (dayNum == 0) {
                day.innerText = "Today"
            } else {
                day.innerText = parsedData.days[dayNum].datetime
            }
            locationText.innerText = `${capitalize(parsedData.address)}`
            if (celcius == true) {
                temp.innerText = `${Math.round(((parsedData.days[dayNum].temp - 32) * 5/9)*10)/10}°C`
            } else {
                temp.innerText = `${parsedData.days[dayNum].temp}°F`
            }
            if (celcius == true) {
                min.innerText = `Min: ${Math.round(((parsedData.days[dayNum].tempmin - 32) * 5/9)*10)/10}°C`
            } else {
                min.innerText = `Min: ${parsedData.days[dayNum].tempmin}°F`
            }
            if (celcius == true) {
                max.innerText = `Max: ${Math.round(((parsedData.days[dayNum].tempmax - 32) * 5/9)*10)/10}°C`
            } else {
                max.innerText = `Max: ${parsedData.days[dayNum].tempmax}°F`
            }
            humidity.innerText = `Humidity%: ${parsedData.days[dayNum].humidity}%`
            precip.innerText = `Precipitation: ${parsedData.days[dayNum].precipprob}%`
            wind.innerText = `Wind speed: ${parsedData.days[dayNum].windspeed} mph`
            input.value = ""
            console.log(parsedData)
            console.log(dayNum)
            console.log(parsedData.days[dayNum])
            if(parsedData.days[dayNum].precipprob >= 40) {
                document.body.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/thumbnails/023/755/092/small_2x/abstract-rain-of-particles-luminous-drops-fall-on-the-floor-animation-of-falling-neon-rain-on-blue-background-moving-glowing-line-4k-motion-3d-video.jpg')"
            } else if (dayNum == 0) {
                if (+parsedData.currentConditions.datetime.split(":").join("") < +parsedData.currentConditions.sunrise.split(":").join("") || +parsedData.currentConditions.datetime.split(":").join("") > +parsedData.currentConditions.sunset.split(":").join("")) {
                    document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/1363947120/photo/dramatic-sky-with-clouds-black-blue-green-night-sky.jpg?s=612x612&w=0&k=20&c=FgytZExb1YU4dPRpVRt_fqx3n6w5DtE3CFjG9CAO7GU=')"
            } else {
                document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/962500712/video/4k-tl-cloudy-sky-with-sun-rays.jpg?s=640x640&k=20&c=XQrz-Y4FIzovVlayePLhPZpHoM8-iLN7gZ_uSdnoe-8=')"
            }
            } else {
                document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/962500712/video/4k-tl-cloudy-sky-with-sun-rays.jpg?s=640x640&k=20&c=XQrz-Y4FIzovVlayePLhPZpHoM8-iLN7gZ_uSdnoe-8=')"
            }   
        } else {
            alert("Error with query. Make sure you're putting in well-known locations.")
        }   
    }
    catch(error) {
        alert("Issue with request!")
        locationText.innerText = "Error! Type other location."
    }
}

enter.addEventListener("click", () => {
    if(input.value == false) {
        alert("Input location!")
        return
    }
    dayNum = 0
    previous.style.backgroundColor = "slategrey"        
    next.style.backgroundColor = "rgb(27, 27, 27)"
    address = input.value
    query(address)
})

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        if(input.value == false) {
        alert("Input location!")
        return
    }
    dayNum = 0
    previous.style.backgroundColor = "slategrey"
    next.style.backgroundColor = "rgb(27, 27, 27)"
    address = input.value
    query(address)
    }
})
if (newLoad == true) {
    query("Montreal")
    newLoad = false
}

previous.addEventListener("click", () => {
    dayNum--
    if(dayNum <= 0) {
        dayNum = 0
        previous.style.backgroundColor = "slategrey"
    } else {
        previous.style.backgroundColor = "rgb(27, 27, 27)"
        next.style.backgroundColor = "rgb(27, 27, 27)"
    }
    query(address)
})

next.addEventListener("click", () => {
    dayNum++
    if(dayNum >= 13) {
        dayNum = 13
        next.style.backgroundColor = "slategrey"
    } else {
        next.style.backgroundColor = "rgb(27, 27, 27)"
        previous.style.backgroundColor = "rgb(27, 27, 27)"
    }
    query(address)
})