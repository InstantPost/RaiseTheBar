export function ActVol() {
  var addhere = document.getElementById("activevol");
  const data = {
    volunteer: ["9ff40f59-5680-4323-9f90-ade868dfef87"],
    doctor: ["7ca0cd8d-7d45-4d36-b36a-43d02e81d6d0"],
    printer: [],
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
