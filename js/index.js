const searchPhone=()=>{
    const searchInput=document.getElementById("search-input");
    const searchText=searchInput.value;
    searchInput.value='';
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResult(data.data));
}

const searchResult=(phones)=>{
    const output=document.getElementById("output");
    output.innerHTML='';
    phones.forEach(phone => {
        // console.log(phone);
        const div=document.createElement('div');
        div.classList.add("col");
        div.innerHTML=`
        <div onclick="details('${phone.slug}')" class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>

                </div>
            </div>
        `;
        output.appendChild(div);
    });
}

const details=(id)=>{
    const link=`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(link)
    .then(res=>res.json())
    .then(data=>displayDetails(data));
    output.innerHTML='';
}

const displayDetails=(data)=>{
    console.log(data);
    
    const phoneDetails=document.getElementById("phone-details");
    phoneDetails.innerHTML='';
    const div=document.createElement('div');
    div.classList.add("card");
    div.innerHTML=`
    <img src="${data.data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-text">${data.data.mainFeatures.storage} <br>
                <span> ${data.data.releaseDate}</span> <br>
                <span>${data.data.mainFeatures.displaySize}</span> <br>
                <span>${data.data.mainFeatures.chipSet}</span>
                </p>
            </div>
    `;
    phoneDetails.appendChild(div);
}