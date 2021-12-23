import fs from 'fs'
import {BodyComponent} from 'mjml-core'

const Handlebars = require("handlebars");
/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class MjHydrate extends BodyComponent {

    constructor (initialDatas = {}) {
        super(initialDatas)
    }

    static endingTag = true

    static dependencies = {
        // Tell the validator which tags are allowed as our component's parent
        'mj-body': ['mj-hydrate'],
        'mj-section': ['mj-hydrate'],
        'mj-column': ['mj-hydrate'],
        'mj-text': ['mj-hydrate'],
        'mj-wrapper': ['mj-hydrate'],
        // Tell the validator which tags are allowed as our component's children
        'mj-hydrate': ['mj-hydrate']
    }

    // Tells the validator which attributes are allowed for mj-layout
    static allowedAttributes = {
        'path': 'string',
        'mapping': 'string',
        'source': 'string'
    }

    getAvailableData (file) {
        const mapping = this.getAttribute("mapping")
        const source = this.getAttribute("source")
        let data = {}

        if (mapping) {
            mapping
                .split(';')
                .forEach((variable) => {
                const [key, value] = variable.split(':')
                data[key] = value
            })
        }
        if (source) {
            try {
                data = Object.assign({}, data, JSON.parse(source))
            } catch (e) {
                data = Object.assign({}, data, MjHydrate.prototype.externalData[source] || {})
            }
        }
        return data
    }

    render () {
        try {
            const path = this.getAttribute('path')
            const data = Object.assign(
                {},
                MjHydrate.prototype.externalData || {},
                this.attributes,
                this.getAvailableData(file),
                {
                    mjHydrateContent: this.props.content
                }
            )
            let file = fs.readFileSync(path, {encoding: 'utf8', flag: 'r'});
            const template = Handlebars.compile(file);
            file = template(data)
            return this.renderMJML(`${file}`)
        } catch (e) {
            return `<!-- ${e.message} -->`
        }
    }
}

MjHydrate.prototype.externalData = {}
MjHydrate.setData = function (data) {
    MjHydrate.prototype.externalData = data
}
