const fetch = require("node-fetch");

async function getFundNav() {
    const option = {
        headers: {
            cookie: 'hasCookie=true'
        }
    };
    const response = await fetch('https://codequiz.azurewebsites.net', option);
    const data = await response.text();
    const tb = data.match(/<table>.*.<\/table>/);
    const listTr = tb[0].replace(/<table>|<\/table>|<\/tr>|<\/td>/g, '').split('<tr>');
    listTr.splice(0, 2);
    const listFund = listTr.map(e => {
        const item = e.split('<td>');
        return {
            fund: item[1].trim(),
            nav: item[2]
        }
    })
    const fund = process.argv.slice(2)[0];
    const item = listFund.find(e => e.fund == fund);
    if (item) {
        console.log(item.nav);
    }
}

getFundNav();