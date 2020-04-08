export function ActVol()
{
    var addhere = document.getElementById("activevol")
    var request = new XMLHttpRequest()
    var listofid='1a6da233-abb8-482f-a72e-e113a7fec8b6,b88b767d-b851-45ca-a171-b17dfa328e35'
    request.open('GET', 'https://dev.instantpost.org/covid/api/volunteer/?id='+listofid, true)
    request.onload = function() {
    var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.forEach(
                function(p){
                    var htmlstring = `<div id="${p.id}" data-entity="volunteer" class="data-row box databox"><div class="columns">
                    <div class="column is-half ">
                        <div class="obj-details-photos"><img class="obj_img" src="https://dev.instantpost.org/covid_img_store/${p.id}/${p.data.images}" alt="No Images Attached"></div>
                        <div class="obj-category">${p.data.category}</div>
                    </div>
                    <div class="column is-half obj-details-table">
                        <div class="obj-created-time is-pulled-right" style="position: relative;bottom:5px">${p.created.slice(0,10)}</div>
                    
                            <div>
                                <span class="filter_table_data obj_data_private">${p.data.public_data.name?p.data.name:"Name Not Disclosed"}</span>
                            </div>
                            
                            <div>
                                <span data="volunteer" data-filter-by="email" class="link filter_table_data ">${p.data.public_data.email?p.data.email:"Email Not Disclosed"}</span>
                            </div>
                            <div>
                                <span data="volunteer" class="link filter_table_data " data-filter-by="phone">${p.data.public_data.phone?p.data.phone:"Phone Not Disclosed"}</span>
                            </div>
                            <div>
                                <span data-specific="region" data="volunteer" class="link filter_table_data " data-filter-by="city">${p.data.public_data.ciy?p.data.city:"City Not Disclosed"}</span>
                            </div>
                            <div>
                                <span data-specific="pincode" data="volunteer" class="link filter_table_data  " data-filter-by="city_pin">${p.data.public_data.name?p.data.city_pin:"Pin Not Disclosed"}</span>
                            </div>
                        </div>
                </div>
                <div class=" ">
                    <pre class=" obj-details-desc">${p.data.public_data.description?p.data.description:"Description Not Disclosed"}</pre>
                </div></div>`
                addhere.innerHTML+=htmlstring;
              })
        } 
        else {
            console.log('error')
        }
    }

    request.send()

}