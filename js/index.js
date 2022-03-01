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
    phones.forEach(phone => {
        console.log(phone);
        const div=document.createElement('div');
        div.classList.add("col");
        div.innerHTML=`
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button id="details" onclick="details('${phone.slug}')">Details</button>
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

}

const displayDetails=(data)=>{
    console.log(data);
    const detailInfo=document.getElementById("details");
    // detailInfo.style.display=none;
    const p=document.createElement('p');
    p.innerHTML=`
    <span>${data.data.mainFeatures.storage}</span> <br>
    <span>${data.data.mainFeatures.displaySize}</span> <br>
    <span>${data.data.mainFeatures.chipSet}</span> <br>
    <span>${data.data.mainFeatures.memory}</span>
    `;
    detailInfo.appendChild(p);
}