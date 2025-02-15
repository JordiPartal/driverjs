let data;

let main = "main";
let section = "section";
let color = "color";

initIndex();

/**
 * It's the main function to build the elements of index.html. If you take a look to the code you can see 5
 * different functions: getJsonData(), addItemWithId(), addTextIn(), addDivItemWithId() and addItems()
 * @returns {Promise<void>}
 */
async function initIndex() {
    try {
        await getJsonData();
        addItemWithId(isId(main), data.header);
        addTextIn(isId(data.header.idOrClass), data.header.txt);
        addDivItemWithId(isId(main), section);
        addItems(isId(section), data.section);
        addDivItemWithId(isId(section), color);
        addItems(isId(color), data.color);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * This function read the './data/data.json' file. This file get the information it has needed to make the index.html.
 * @returns {Promise<void>}
 */
function getJsonData() {
    return fetch("./data/data.json")
        .then(response => response.json())
        .then(json => {
            data = new DOMItems().setHeader(json.header).setSection(json.section).setColor(json.color).build();
        })
        .catch(error =>{
            console.log(error.message);
        });
}

/**
 * Add a bunch of elements from a collection in the index file.
 * @param parent
 * @param collection
 */
function addItems(parent, collection) {
    try {
        for (let count = 0; count < collection.length; count++) {
            if (collection[count].txt !== undefined) {
                addItemWithId(parent, collection[count]);
                addTextIn(isId(collection[count].idOrClass), collection[count].txt);
            } else {
                if(collection[count].color !== null) {
                    addItemWithIdAndColor(parent, collection[count])
                }
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Basically, add a text inside an element.
 * @param elementIdOrClass
 * @param txt
 */
function addTextIn(elementIdOrClass, txt) {
    const item = document.querySelector(elementIdOrClass);
    item.innerText = txt;
}

/**
 * Add and Item with ID to the parent DOMElement
 * @param parent
 * @param element
 */
function addItemWithId(parent, element) {
    try {
        const main = getItem(parent);
        const item = document.createElement(element.element);
        item.setAttribute("id", element.idOrClass);
        main.appendChild(item);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Add a DOMElement to a parent, and define its background color.
 * @param parent
 * @param DOMElement
 */
function addItemWithIdAndColor(parent, DOMElement) {
    try {
        const main = getItem(parent);
        const item = document.createElement(DOMElement.element);
        item.style.backgroundColor = DOMElement.color;
        item.addEventListener("click", () => {
            getBackgroundColor(isId(DOMElement.idOrClass));
            onClickGuideIndex(true, "custom");
        });
        item.setAttribute("id", DOMElement.idOrClass);
        main.appendChild(item);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Add a Div with ID to the parent DOMElement
 * @param parent
 * @param elementId
 */
function addDivItemWithId(parent, elementId) {
    try {
        const main = getItem(parent);
        const item = document.createElement("div");
        item.setAttribute("id", elementId);
        main.appendChild(item);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Gets background color of a DOMElement.
 * @param DOMElement
 */
function getBackgroundColor(DOMElement) {
    const item = getItem(DOMElement);
    let css = document.styleSheets[0];
    for (let rule of css.cssRules) {
        if (rule.selectorText === "div.driver-popover.custom") {
            rule.style.setProperty("--set-background-color", item.style.backgroundColor);
            rule.style.color = "white";
        }
    }
}

/**
 * Go to index.html page
 */
function goToIndex() {
    location.href = "index.html";
}

/**
 * Gets a name of an id or class and turn into identifier of an element
 * @param element
 * @returns {string}
 */
function isId(element) {
    return "#".concat("", element);
}

/**
 * Select an element of a website
 * @param selector
 * @returns {HTMLAnchorElement | HTMLElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement}
 */
function getItem(selector) {
    return document.querySelector(selector);
}