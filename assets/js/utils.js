function reloadByID(element_id){
    var container = document.getElementById(element_id);
    var container_content = container.innerHTML;
    container.innerHTML = container_content;
}

function reloadByClass(element_class) {
    var container = document.getElementsByClassName(element_class);
    var container_content = container.innerHTML;
    container.innerHTML = container_content;
}

function reloadByTagName(element_tagname) {
    var container = document.getElementsByName(element_tagname);
    var container_content = container.innerHTML;
    container.innerHTML = container_content;
}





function plotlyMakeHeatmapTrace(games){
        return {
            "opacity": 1.0,
            "colorscale": [
                [0.0, "rgb(255,255,255)"], [0.04, "rgb(0,255,0)"],
                [0.08, "rgb(51,255,0)"], [0.12, "rgb(102,255,0)"],
                [0.16, "rgb(153,255,0)"], [0.2, "rgb(178,255,0)"],
                [0.24, "rgb(204,255,0)"], [0.28, "rgb(255,255,0)"],
                [0.32, "rgb(254,233,0)"], [0.36, "rgb(254,212,0)"],
                [0.4, "rgb(254,191,0)"], [0.44, "rgb(253,170,0)"],
                [0.48, "rgb(253,149,0)"], [0.52, "rgb(253,128,0)"],
                [0.56, "rgb(253,107,0)"], [0.6, "rgb(253,101,0)"],
                [0.64, "rgb(253,95,0)"], [0.68, "rgb(253,89,0)"],
                [0.72, "rgb(253,83,0)"], [0.76, "rgb(253,77,0)"],
                [0.8, "rgb(253,71,0)"], [0.84, "rgb(253,56,0)"],
                [0.88, "rgb(253,42,0)"], [0.92, "rgb(254,28,0)"],
                [0.96, "rgb(254,14,0)"], [1.0, "rgb(255,0,0)"]
            ],
            z: data,
            type: "heatmap",
            visible: x === 0,
            name: x
        };
}