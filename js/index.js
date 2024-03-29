const searchPhone=()=>{
    const searchInput=document.getElementById("search-input");
    const searchText=searchInput.value;
    // clear search input
    searchInput.value='';
    // fetching element
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResult(data.data));
}

const searchResult=(phones)=>{
    const newPhones=phones.slice(0,20);
    const output=document.getElementById("output");
    const error=document.getElementById("extra");
    // showing if no phones found
    if(phones.length==0){
        error.style.display="block";
    }else{
        error.style.display="none";
    }
    
    output.innerHTML='';
    newPhones.forEach(phone => {
            const phoneDetails=document.getElementById("phone-details");
    phoneDetails.innerHTML='';
        // console.log(phone);
        // adding element 
        const div=document.createElement('div');
        div.classList.add("col");
        div.innerHTML=`
        <div  class="card border-0">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h5 class="card-title">${phone.brand}</h5>
                    <button onclick="details('${phone.slug}')"  type="button" class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        output.appendChild(div);
    });
}

const details=(id)=>{
    // fetching details 
    const link=`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(link)
    .then(res=>res.json())
    .then(data=>displayDetails(data));
    // output.innerHTML='';
}

const displayDetails=(data)=>{
    console.log(data);
    // checking if there is no release day 
    const isReleaseDate=(date)=>{
        if(date===""){
            return "No release date";
        }else{
            return date;
        }
    }
    let others=data.data.others;
    let othersValue;
    if(others ==undefined){
        // console.log(others);
        othersValue="No values";
    }else{
        othersValue=Object.values(others);
    }
    
    const phoneDetails=document.getElementById("phone-details");
    phoneDetails.innerHTML='';
    const div=document.createElement('div');
    div.classList.add("card");
    div.innerHTML=`
    <img src="${data.data.image}" class="card-img-top w-25 mx-auto" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-text">${data.data.mainFeatures.storage} <br>
                <span> '${isReleaseDate(data.data.releaseDate)}'</span> <br>
                <span>${data.data.mainFeatures.displaySize}</span> <br>
                <span>${data.data.mainFeatures.chipSet}</span><br>
                <span>Sensors: ${data.data.mainFeatures.sensors}</span><br>
                <span>Others: ${othersValue}</span>
                </p>
            </div>
    `;
    phoneDetails.appendChild(div);
    // phoneDetails.innerHTML='';
    
}