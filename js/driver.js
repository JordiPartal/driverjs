const driver = window.driver.js.driver;
let font;

const side = "left";
const align = "start";
font = "white";

/**
 * Start a driver.js 'tutorial'
 * @param allowCloseDriverJs
 * @param idOrClass
 */
function onClickGuideIndex(allowCloseDriverJs, idOrClass) {
    const main = "Sección";
    const child = "Ítem";
    const mainPageGuide = new driver({
        showProgress: false,
        prevBtnText: "Anterior",
        nextBtnText: "Siguiente",
        doneBtnText: "Cerrar",
        allowClose: allowCloseDriverJs,
        popoverClass: idOrClass,
        steps: [
            popoverChild(child, data.header),
            popoverParent(main, section),
            popoverChild(child, data.section[0]),
            popoverChild(child, data.section[1]),
            popoverChild(child, data.section[2]),
            popoverChild(child, data.section[3]),
            popoverParent(main, color)
        ],
    });
    mainPageGuide.drive();
}

/**
 * Create a 'highlight' to specific DOMElements on a website
 */
function onFocusElementFormPage() {
    const idOrClass = "custom";
    addFocusOn(idOrClass, getItem(isId("mail")), "Correo");
    addFocusOn(idOrClass, getItem(isId("first-name")), "1r apellido");
    addFocusOn(idOrClass, getItem(isId("second-name")), "2o apellido");
}

/**
 * Add a popover to a parent element
 * @param titleTxt
 * @param DOMElement
 * @returns {{element: string, popover: {title, description: string, side: string, align: string}}}
 */
function popoverParent(titleTxt, DOMElement) {
    return {
        element: isId(DOMElement),
        popover: {
            title: writeATitle(titleTxt, DOMElement),
            description: "Aquí está ubicada la sección principal del apartado de '#section'.",
            side: side,
            align: align
        }
    };
}

/**
 * Add a popover to a child of parent element
 * @param titleTxt
 * @param DOMElement
 * @returns {{element: string, popover: {title, description: (string|AllowSharedBufferSource|string|*), side: string, align: string}}}
 */
function popoverChild(titleTxt, DOMElement) {
    return {
        element: isId(DOMElement.idOrClass),
        popover: {
            title: writeATitle(titleTxt, DOMElement.idOrClass),
            description: DOMElement.driver.description,
            side: side,
            align: align
        }
    };
}

/**
 * Creat an element 'highlight'
 * @param idOrClass
 * @param DOMElement
 * @param title
 */
function addFocusOn(idOrClass, DOMElement, title) {
    const driverJsFocus = new driver({
        popoverClass: idOrClass
    });
    DOMElement.addEventListener("focus", () => {
        driverJsFocus.highlight({
            stagePadding: 0,
            element: DOMElement,
            popover: {
                title: title,
                description: writeADescription(title.toLowerCase())
            },
            onDestroyed: () => {
                document?.activeElement?.blur();
            }
        })
    })
}

/**
 * Write an element title
 * @param txt
 * @param DOMElement
 * @returns {*}
 */
function writeATitle(txt, DOMElement) {
    return txt.concat(" ", isId(DOMElement))
}

/**
 * Write an element description
 * @param title
 * @returns {string}
 */
function writeADescription(title) {
    return "".concat("Escriba su ", title);
}