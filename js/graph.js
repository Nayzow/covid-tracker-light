// Ajout des donnees aux graphiques
function graphAddData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}

// Reset les donnees des graphiques
function graphClearData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chart.update();
}

const options = {
    // A definir pour l'affichage des graphiques
};

// La data et la configuration de chaque graphique
const data = {
    labels: [],
    datasets: [{
            label: "Nombre de patients actuellement hospitalisés pour COVID-19",
            backgroundColor: 'rgb(118,201,99)',
            borderColor: 'rgb(118,201,99)',
            data: [],
        }]
};

const config = {
    type: "line",
    data: data,
    options: options
};

const data2 = {
    labels: [],
    datasets: [{
        label: "Total décès en hôpital",
        backgroundColor: 'rgb(118,201,99)',
        borderColor: 'rgb(118,201,99)',
        data: [],
    }]
};

const config2 = {
    type: "line",
    data: data2,
    options: options
};

const data3 = {
    labels: [],
    datasets: [{
        label: "Nombre de patients actuellement en réanimation",
        backgroundColor: 'rgb(118,201,99)',
        borderColor: 'rgb(118,201,99)',
        data: [],
    }]
};

const config3 = {
    type: "line",
    data: data3,
    options: options
};

const data4 = {
    labels: [],
    datasets: [{
        label: "Nombre de patients admis en réanimation par jour",
        backgroundColor: 'rgb(118,201,99)',
        borderColor: 'rgb(118,201,99)',
        data: [],
    }]
};

const config4 = {
    type: "line",
    data: data4,
    options: options
};

const data5 = {
    labels: [],
    datasets: [{
        label: "Nombre de patients hospitalisés par jour",
        backgroundColor: 'rgb(118,201,99)',
        borderColor: 'rgb(118,201,99)',
        data: [],
    }]
};

const config5 = {
    type: "line",
    data: data5,
    options: options
};

const data6 = {
    labels: [],
    datasets: [{
        label: "Nombre de patients décédés à l’hôpital par jour",
        backgroundColor: 'rgb(118,201,99)',
        borderColor: 'rgb(118,201,99)',
        data: [],
    }]
};

const config6 = {
    type: "line",
    data: data6,
    options: options
};
