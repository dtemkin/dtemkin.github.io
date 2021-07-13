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