let GRAPH_1;
let GRAPH_2;
let GRAPH_3;
let GRAPH_4;
let GRAPH_5;
let GRAPH_6;
let allDepartements = [];
let allDepartementsDataByDate = [];

// Fonction qui se lance quand on clique sur un departement et qui sert a mettre a jour la data des graphiques et du texte
function dataView(depId) {
    let objDep = null;
    allDepartements.forEach(departement => {

        // Verifier si le numero de departement est le bon
        if (depId === departement.dep) {
            objDep = departement;
        }
    })
    if (objDep) {
        document.getElementById("departement_name").innerText = objDep.lib_dep;
        document.getElementById("nb_departement").innerText = objDep.dep;
        document.getElementById("region").innerText = objDep.lib_reg;
        document.getElementById("nb_hospitalisation").innerText = objDep.hosp;
        document.getElementById("nb_hospitalisation_24h").innerText = objDep.incid_hosp;
        document.getElementById("nb_reanimation").innerText = objDep.rea;
        document.getElementById("nb_reanimation_24h").innerText = objDep.incid_rea;
        document.getElementById("dc_hosp").innerText = objDep.dchosp;
        document.getElementById("dc_hosp_24h").innerText = objDep.incid_dchosp;

        // Tri par dates chronologiques
        let tmp = allDepartementsDataByDate.map(value => value.find(value2 => value2.dep === objDep.dep));
        tmp = tmp.sort((a, b) => {
            if(a.date < b.date) return -1;
            else if(a.date > b.date) return 1;
            return 0;
        });

        // Update des graphiques
        graphClearData(GRAPH_1);
        graphAddData(GRAPH_1, tmp.map(value => value.date), tmp.map(value => value.hosp));

        graphClearData(GRAPH_2);
        graphAddData(GRAPH_2, tmp.map(value => value.date), tmp.map(value => value.dchosp));

        graphClearData(GRAPH_3);
        graphAddData(GRAPH_3, tmp.map(value => value.date), tmp.map(value => value.rea));

        graphClearData(GRAPH_4);
        graphAddData(GRAPH_4, tmp.map(value => value.date), tmp.map(value => value.incid_rea));

        graphClearData(GRAPH_5);
        graphAddData(GRAPH_5, tmp.map(value => value.date), tmp.map(value => value.incid_hosp));

        graphClearData(GRAPH_6);
        graphAddData(GRAPH_6, tmp.map(value => value.date), tmp.map(value => value.incid_dchosp));
    }
}

// Barre de recherche
function updateSearchBarList() {
    let contenu = document.getElementById('input_search').value;
    allDepartements.forEach(departement => {
        if(contenu.toUpperCase() == departement.lib_dep.toUpperCase()){
            dataView(departement.dep);
        }
    });
}

// Fonction main
window.onload = function () {
    // Creation des graphiques
    GRAPH_1 = new Chart(document.getElementById('graph1'), config);
    GRAPH_2 = new Chart(document.getElementById('graph2'), config2);
    GRAPH_3 = new Chart(document.getElementById('graph3'), config3);
    GRAPH_4 = new Chart(document.getElementById('graph4'), config4);
    GRAPH_5 = new Chart(document.getElementById('graph5'), config5);
    GRAPH_6 = new Chart(document.getElementById('graph6'), config6);

    // Requete API pour la data de touts les departements
    fetch("https://coronavirusapifr.herokuapp.com/data/live/departements")
        .then(response => response.json())
        .then(departements => {
            allDepartements = departements;
            allDepartementsDataByDate.push(departements);

            // Afficher la couleur d'un departement en fonction du nombre d'hospitalisation
            allDepartements.forEach(departement => {
                let color = "green";
                if(departement.hosp >= 100 && departement.hosp < 200) color = "yellow";
                if(departement.hosp >= 200 && departement.hosp < 300) color = "orange";
                if(departement.hosp >= 300 && departement.hosp < 400) color = "red";
                if(departement.hosp >= 400) color = "brown";
                document.getElementById("dep" + departement.dep)?.classList.add(color);
            })

            // Creation d'un objet date qui va servir a requeter l'API sur plusieurs dates
            let date = new Date();
            for (let i = 0; i < 7; i++) {
                // 86400000ms = 1 jour -> -1 jour à chaque tour de boucle
                date.setTime(date.getTime() - 86400000);
                fetch(`https://coronavirusapifr.herokuapp.com/data/departements-by-date/${date.getDate() - 1}-${date.getMonth() + 1}-${date.getFullYear()}`)
                    .then(response => response.json())
                    .then(data => {
                        allDepartementsDataByDate.push(data);
                    })
            }

            // Liste de la barre de recherche
            let dataList = document.getElementById("liste-dep");
            allDepartements.forEach(departement => {
                let newOption = document.createElement("option");
                newOption.text = departement.lib_dep;
                dataList.appendChild(newOption)
            });
        })
}
