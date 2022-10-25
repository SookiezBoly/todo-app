const createElement = (type, attributes, ...children) => {
    const element = document.createElement(type);

    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    
    children.forEach(child => {
        if(typeof child === 'string'){
            element.appendChild(document.createTextNode(child));
        }else{
            element.appendChild(child);
        }
    });

    return element;
}

export{ createElement };