/**
 * Created by juanma on 10/02/17.
 */
function render(html_string,parametros) {
    var variables= html_string.match(/[^\{\}]+(?=\})/g);

    for(var i=0;i<variables.length;i++) {
        var variable = variables[i];
        //parametros[variables[i]]
        html_string= html_string.replace("{"+variables[i]+"}",parametros[variable]);
    }

    return html_string;
}

module.exports.render=render;