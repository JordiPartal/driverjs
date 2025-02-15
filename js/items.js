class DOMItems {
    constructor() {
        this.header = null;
        this.section = null;
        this.color = null;
    }

    setHeader(header) {
        this.header = header;
        return this;
    }

    setSection(section) {
        this.section = section;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    build() {
        return {
            header: this.header,
            section: this.section,
            color: this.color
        }
    }
}