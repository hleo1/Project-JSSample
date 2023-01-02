let COUNTRY_LAYER_API_KEY = "e2049809c47f770840a7eaf1d899de44"
let select = document.querySelector("#countries")

//initialize the dropdown menu only ONCE
fetch(`https://cs280-countries-api.herokuapp.com/v2/all?access_key=${COUNTRY_LAYER_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      for (let point of data) {
        if (point.alpha2Code != "US") {
            let option = document.createElement("option");
            option.text = point.name;
            option.value = point.alpha2Code;
            //append to the dropdown
            select.appendChild(option);
        }
      }
    })
    .catch((err) => console.log(err));


//everytime dropdown changes, execute find_stat. Also, call it once to find info about the default value, the US
select.onchange = find_stat;
find_stat();

//main function that calls finding flag picture and country covid stats
function find_stat() {
    let country = select.value;
    display_covid_stats(country);
}

//fetch API to get disease information
function display_covid_stats(country_id) {
    fetch(`https://disease.sh/v3/covid-19/countries/` + country_id)
    .then((response) => response.json())
    .then((data) => {
        updateUI(data, country_id);
    })
    .catch((err) => console.log(err));
}


//finally, update the UI of the website with the COVID data and the flag
//notice how the image is automatically called from the api as well
function updateUI(data, country_id) {

    
    let cases = numberWithCommas((data.cases ? data.cases : 'N/A'));
    document.getElementById("confirmed").innerHTML = `<img src="https://www.countryflags.io/${country_id}/flat/32.png"/> <br>
    ${cases}`;
    
    let active = numberWithCommas((data.active ? data.active : 'N/A'));
    document.getElementById("active").innerHTML = `<img src="https://www.countryflags.io/${country_id}/flat/32.png"/> <br>
    ${active}`;

    let recovered = numberWithCommas((data.recovered ? data.recovered : 'N/A'));
    document.getElementById("recovered").innerHTML = `<img src="https://www.countryflags.io/${country_id}/flat/32.png"/> <br>
    ${recovered}`;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  