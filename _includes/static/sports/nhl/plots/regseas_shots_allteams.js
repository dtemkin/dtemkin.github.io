jQuery.getJSON('regseas_shots_allteams.json', function (data) {
    let layout = {
        title: {text: 'NHL Regular Season Shots Heatmap (2009 - 2019) [All Teams]'},
        images: [
            {
                x: 41.5,
                y: 0.0,
                xref: 'x',
                yref: 'y',
                layer: 'above',
                sizex: 86,
                sizey: 100,
                sizing: 'stretch',
                source: 'http://www.dtemkin.com/assets/img/posts/sports/nhl/half_rink.png',
                opacity: 0.2,
                visible: true,
                xanchor: 'center',
                yanchor: 'bottom'
            }
        ]
    };
    Plotly.plot('regseas_shots_allteams', {
        data: data,
        layout: layout
    });
});