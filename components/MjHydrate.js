import fs from 'fs'
import {BodyComponent} from 'mjml-core'
import Mustache from 'mustache'
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
        // Tell the validator which tags are allowed as our component's children
        'mj-hydrate': []
    }

    // Tells the validator which attributes are allowed for mj-layout
    static allowedAttributes = {
        'path': 'string',
        'mapping': 'string',
        'source': 'string'
    }

    static defaultAttributes = {}

    /*
      Render is the only required function in a component.
      It must return an html string.
    */
    getAvailableData (file) {
        const mapping = this.getAttribute("mapping")
        const source = this.getAttribute("source")

        let data = Object.assign({}, MjHydrate.prototype.externalData)

        if (mapping) {
            const sp = mapping.split(';')
            for (let keyVar of sp) {
                const [key, value] = keyVar.split(':')
                data[key] = value
            }
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
            const data = Object.assign(
                {},
                MjHydrate.prototype.externalData || {},
                this.attributes,
                this.getAvailableData(file),
                {
                    mjHydrateContent: this.props.content
                }
            )
            let file = fs.readFileSync(this.getAttribute('path'), {encoding: 'utf8', flag: 'r'});
            file = Mustache.render(file, data);
            return this.renderMJML(`${file}`)
        } catch (e) {
            console.log(e)
            return `<!-- ${e.message} -->`
        }

    }
}

MjHydrate.prototype.externalData = {}
MjHydrate.setData = function (data) {
    MjHydrate.prototype.externalData = data
}
