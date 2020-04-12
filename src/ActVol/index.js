export function ActVol() {
  var addhere = document.getElementById("activevol");
  const data = {
    volunteer: [
      "f67fa300-616d-47b7-be60-97ed9abc3a3e",
      "1592ce9d-9d62-4018-8e72-dd6862e06fad",
      "32c8f727-99ca-462f-8b68-362d20a3ef3d",
      "c8dec029-c4a4-437e-9e34-cdc4ad2bce27",
      "001885d6-72d8-4021-b5f4-1bb9d079ea20",
      "d334645c-e673-48b5-b8de-0aac1c96211a",
      "fb8db99d-e593-4bc3-8df3-571bd7be35c0",
      "8d61111a-d2ca-4075-88c4-5e3ab3689c36",
      "58ae6b53-e7b0-480b-ae36-c162c8732fd1",
      "e77d1386-8a5f-4308-9ee8-91b4af78d103",
      "b460bce2-d336-4054-bb1c-0fca02755fb0",
      "e201c5b6-4747-4dc2-b265-8c262dcaa390"
    ],
    doctor: [],
    printer: [
      "794cf34d-b4af-44a9-a94c-69262b1cdba8",
      "b69f917d-6637-4b28-b7b1-d91f24d44918",
      "e8d2c402-3f59-46e3-aaac-3ab07cff5fb0"
    ],
    manufacturer: [],
    requirement: [],
    commodity: []
  };
  for (const entity in data) {
    console.log(entity);
    const objects = data[entity];
    let uri = `${process.env.BACKEND_URI}${entity}/?id=`;
    if (!objects.length) continue;
    for (let i = 0; i < objects.length; i++) {
      uri += objects[i];
    }
    fetch(uri)
      .then(e => {
        if (e.status == 200) return e.json();
        else throw "Error";
      })
      .then(json => {
        for (let i = 0; i < json.length; i++) {
          let p = json[i];
          var htmlstring = `<div  data-entity="volunteer" class="data-row box databox"><div class="columns">
                        <div class="column is-half ">
                            <div class="obj-details-photos"><img class="obj_img"
                            src=${process.env.FILE_STORE}${p.id}/${
            p.data.images[0]
          }
                             alt="No Images Attached"></div>
                            <div class="obj-category">${p.data.category}</div>
                        </div>
                        <div class="column is-half obj-details-table">
                            <div class="obj-created-time is-pulled-right" style="position: relative;bottom:5px">${p.created.slice(
                              0,
                              10
                            )}</div>

                                <div>
                                    <span >${
                                      p.data.public_data.name
                                        ? p.data.name
                                        : "Name Not Disclosed"
                                    }</span>
                                </div>

                                <div>
                                    <span data="volunteer" >${
                                      p.data.public_data.email
                                        ? p.data.email
                                        : "Email Not Disclosed"
                                    }</span>
                                </div>
                                <div>
                                    <span data="volunteer" data-filter-by="phone">${
                                      p.data.public_data.phone
                                        ? p.data.phone
                                        : "Phone Not Disclosed"
                                    }</span>
                                </div>
                                <div>
                                    <span data-specific="region" data="volunteer" data-filter-by="city">${
                                      p.data.public_data.ciy
                                        ? p.data.city
                                        : "City Not Disclosed"
                                    }</span>
                                </div>
                                <div>
                                    <span data-specific="pincode" data="volunteer" data-filter-by="city_pin">${
                                      p.data.public_data.name
                                        ? p.data.city_pin
                                        : "Pin Not Disclosed"
                                    }</span>
                                </div>
                            </div>
                    </div>
                    <div class=" ">
                        <pre class=" obj-details-desc">${
                          p.data.public_data.description
                            ? p.data.description
                            : "Description Not Disclosed"
                        }</pre>
                    </div></div>`;
          addhere.innerHTML += htmlstring;
        }
      })
      .catch(err => console.log(err));
    // request.open("GET", uri, true);
    // request.onload = function() {
    //   if (request.status >= 200 && request.status < 400) {
    //     j.forEach(function(p) {});
    //   } else {
    //     console.log("error");
    //   }
    // };
    // request.send();
  }
}
