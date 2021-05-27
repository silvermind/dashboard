
const renderInfo = (resp) => {
    const { data } = resp;
    document.getElementById('node_net_ip').innerHTML = `${data.networkDevices[0].addresses[0].ip}`
    document.getElementById('node_hostinfo_name').innerHTML = `${data.hostInfo.name}`
    document.getElementById('node_hostinfo_uptime').innerHTML = `${data.hostInfo.uptime}`
    document.getElementById('node_ram_free').innerHTML = `${data.ram.free}`
    document.getElementById('node_ram_total').innerHTML = `${data.ram.total}`
    document.getElementById('node_ram_usage').innerHTML = `${data.ram.usage}`
    document.getElementById('node_disk_mount').innerHTML = `${data.disks[1].mountPoint}`
    document.getElementById('node_disk_free').innerHTML = `${data.disks[1].free}`
    document.getElementById('node_disk_size').innerHTML = `${data.disks[1].size}`
    document.getElementById('node_disk_used').innerHTML = `${data.disks[1].used}`
    document.getElementById('node_disk_percent').innerHTML = `${data.disks[1].percent}`
};

const renderData = (resp) => {
    const { data } = resp;
    document.getElementById('node_block').innerHTML = `${data.height}`
    document.getElementById('node_jailed').innerHTML = `${data.result.jailed}`
    document.getElementById('node_tokens').innerHTML = `${data.result.tokens}`
    document.getElementById('node_rate').innerHTML = `${data.result.commission.commission_rates.rate}`
    document.getElementById('node_max_rate').innerHTML = `${data.result.commission.commission_rates.max_rate}`
    document.getElementById('node_self').innerHTML = `${data.result.min_self_delegation}`
};

axios
    .get('http://blckchn.pro:3000/')
    .then(renderInfo);

axios
    .get('https://lcd.terra.dev/staking/validators/terravaloper15qjn7ke9s47qn4mte3lerkxtjjgp38n5qquzsu')
    .then(renderData)
