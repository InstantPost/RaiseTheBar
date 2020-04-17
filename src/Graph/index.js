export function Graph()
{
    const boxdata = [
        {
            name : "Startups",
            number : 3,
            color : "red"
        },
        {
            name :"3D Printers",
            number :5,
            color :"#0BF"
        },
        {
            name :"Individuals",
            number :"10",
            color :"#F33"
        },
        {
            name :"Time to print",
            number :"5 minutes",
            color :"#5A0"
        },
        {
            name :"Man hours per day",
            number :150,
            color :"#A68"
        },
        {
            name :"Next Milestone",
            number :3000,
            color :"#0AA"
        },
        {
            name :"Face Shields Manufactured",
            number :569,
            color :"#47F"
        },
        {
            name :"Shields Donated",
            number :180,
            color :"#555"
        }
    ]

    var putHere = document.getElementById("graphs")

    boxdata.forEach(
        function(x)
        {
            let htmlstring = `<div class="graphbox">
                                <div>
                                    <span class="graphnumbers">
                                        ${x.number}
                                    </span>
                                    <br>
                                    ${x.name}
                                </div>
                            </div>`

            putHere.innerHTML+=htmlstring;
        }
    )
}