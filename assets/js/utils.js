(function(){

function reloadByID(element_id){
    var container = document.getElementById(element_id);
    if (!container) return;
    // re-assign innerHTML to force a reflow/repaint if needed
    container.innerHTML = container.innerHTML;
}

function reloadByClass(element_class) {
    var containers = document.getElementsByClassName(element_class);
    if (!containers || containers.length === 0) return;
    for (var i = 0; i < containers.length; i++) {
        containers[i].innerHTML = containers[i].innerHTML;
    }
}

function reloadByTagName(element_tagname) {
    var containers = document.getElementsByTagName(element_tagname);
    if (!containers || containers.length === 0) return;
    for (var i = 0; i < containers.length; i++) {
        containers[i].innerHTML = containers[i].innerHTML;
    }
}

// Helper to build a Plotly heatmap trace. Accepts the heatmap z-data as "data", an index "x",
// and an optional name. If x is provided as a number, the first trace (x === 0) will be visible by default.
function plotlyMakeHeatmapTrace(data, x, name){
        name = typeof name !== 'undefined' ? name : x;
        return {
            opacity: 1.0,
            colorscale: [
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
            visible: (typeof x === 'number') ? (x === 0) : true,
            name: name
        };
}

// expose functions in global scope (if needed)
window.reloadByID = reloadByID;
window.reloadByClass = reloadByClass;
window.reloadByTagName = reloadByTagName;
window.plotlyMakeHeatmapTrace = plotlyMakeHeatmapTrace;

})();
