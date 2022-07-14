async function chartIt() {
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in Celsius(Global)',
                data: data.globTemp,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
            },
            {
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in Celsius(Northern Hemisphere)',
                data: data.nhemTemp,
                backgroundColor: 'rgba(0, 99, 132, 0.2)',
                borderColor: 'rgba(0, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
            },
            {
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in Celsius(Southern Hemisphere)',
                data: data.shemTemp,
                backgroundColor: 'rgba(0, 206, 100, 0.2)',
                borderColor: 'rgba(0, 206, 100, 1)',
                borderWidth: 1,
                fill: false,
            }
        ],
        },
        options: {
            interaction: {
                mode: 'index'
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + '°';
                        }
                    }
                }
            }
        }
    });
};


//Data from: https://data.giss.nasa.gov/gistemp/
//Golbal mean (14 degrees Celsius) from: https://earthobservatory.nasa.gov/world-of-change/global-temperatures

async function getData() {
    const xs = [];
    const globTemp = [];
    const nhemTemp = [];
    const shemTemp = [];
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        const glob = columns[1];
        const nHem = columns[2];
        const sHem = columns[3];
        xs.push(year);
        globTemp.push(parseFloat(glob) + 14);
        nhemTemp.push(parseFloat(nHem) + 14);
        shemTemp.push(parseFloat(sHem) + 14);
    });
    return {xs, globTemp, nhemTemp, shemTemp};
}

chartIt();

