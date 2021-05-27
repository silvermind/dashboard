const renderInfo = (resp) => {
    const { data } = resp;
    return data;
};

var node = [
    "terravaloper15qjn7ke9s47qn4mte3lerkxtjjgp38n5qquzsu",
    "terravaloper13307pxehvt0qply3kw9vk578u4az0u4mu9eef4",
    "terravaloper1n9jrtnz57zupejzhu4v0uth9ax5fktdenxy8hm",
    "terravaloper1f4d3gkp544x8rswn229eas2vsj60uvc8mmppsq"
];

var api = [
    "http://202.61.253.70:3000",
    "http://45.9.60.250:3000",
    "http://193.26.159.233:3000",
    "http://202.61.228.167:3000",
]

async function getData(lcdURLmain,lcdURLtest, nodeId) {
    try {
       let res = await axios({
            url: lcdURLmain,
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status == 200){
            div = document.getElementById(nodeId);
            div.innerHTML = 
            `
            <div class="card mb-4 rounded-3 shadow-sm shadow-sm border-primary">
            <div class="card-header py-3 text-white bg-primary border-primary">
            <h4 class="my-0 fw-normal">Terra</h4>
            </div>
            <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
            <li>${res.data.result.description.moniker}</li>
            <h1 class="card-title pricing-card-title">${Math.round(res.data.result.tokens/1000000).toFixed(0)}<small class="text-muted fw-light">luna</small></h1>
            <li>JAILED : ${res.data.result.jailed}</li>
            <li>HEIGHT : ${res.data.height}</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">More Info</button>
            </div>
            </div>
            </div>
            `
        }
        return res.data
    }
    catch (err) {
        let res = await axios({
            url: lcdURLtest,
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status == 200){
            div = document.getElementById(nodeId);
            div.innerHTML = 
            `
            <div class="card mb-4 rounded-3">
            <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Terra</h4>
            </div>
            <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
            <li>${res.data.result.description.moniker}</li>
            <h1 class="card-title pricing-card-title">${Math.round(res.data.result.tokens/1000000).toFixed(0)}<small class="text-muted fw-light">luna</small></h1>
            <li>JAILED : ${res.data.result.jailed}</li>
            <li>HEIGHT : ${res.data.height}</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">More Info</button>
            </div>
            </div>
            </div>
            `
        }
        return res.data
    }
}

setInterval(function(){ 
    console.log("UPDATE_DATA")
    for(i = 0; i < node.length; i++) {
        lcdURLmain= 'https://lcd.terra.dev/staking/validators/'
        lcdURLtest = 'https://tequila-lcd.terra.dev/staking/validators/'
        nodeId = "node_" + i
        lcdURLmain = lcdURLmain + node[i]
        lcdURLtest = lcdURLtest + node[i]
        console.log(lcdURLmain,lcdURLtest,nodeId)
        getData(lcdURLmain,lcdURLtest,nodeId)
        }
    },
    3000)

async function getRAW(nodeId,api){
    try {
        let raw = await axios({
             url: api,
             method: 'get',
             timeout: 8000,
             headers: {
                 'Content-Type': 'application/json',
             }
         })
         if(raw.status == 200){
            console.log(nodeId,raw.data)
            document.getElementById(nodeId).innerHTML = 
            `
            <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
            <span>RAM Free</span>
            <strong>${Math.round((raw.data.ram.free)/1000000).toFixed(0)} Mb</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>RAM Total</span>
            <strong>${Math.round((raw.data.ram.total)/1000000).toFixed(0)} Mb</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>RAM Usage</span>
            <strong>${Math.round((raw.data.ram.usage)/1000000).toFixed(0)} Mb</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>Disk Free</span>
            <strong>${Math.round((raw.data.disks[1].free)/1000000).toFixed(0)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>Disk Size</span>
            <strong>${Math.round((raw.data.disks[1].size)/1000000).toFixed(0)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>Disk Used</span>
            <strong>${Math.round((raw.data.disks[1].used)/1000000).toFixed(0)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>Disk %</span>
            <strong>${Math.round((raw.data.disks[1].percent)).toFixed(0)}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
            <span>Uptime</span>
            <strong>${Math.round((raw.data.hostInfo.uptime)/60/60/24).toFixed(0)} Days</strong>
            </li>
            </ul>
             `
            }
        }
    catch (err){}
}

setInterval(function(){ 
    console.log("UPDATE_RAW")
    for(i = 0; i < api.length; i++) {
        nodeId = "node_" + i + "_"  + i
        getRAW(nodeId,api[i])
    }
},
    5000)