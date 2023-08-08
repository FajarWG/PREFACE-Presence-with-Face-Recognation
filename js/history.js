const urlParams = new URLSearchParams(window.location.search)
let names = urlParams.get('name')

let history = {};
setTimeout(async function() {
    const table = document.getElementById('table');
    history = await getAllData({name: names});
    let html = '';
    history.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.date}</td>
                <td>${item.hour}</td>
                <td>${item.description}</td>
            </tr>
        `;
    });

    table.innerHTML = html;
    }
, 1000);


    


