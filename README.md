# &lt;mj-hydrate&gt;
A powerful mjml component that embed the 
``{{ mustache }}``
syntax in your mjml files.

- Create UI components for emailing
- Create advanced layout logic
- Easily reusable for emails on steroids.


## Usage

### Inject innerHTML in .mjml file
```html
<mj-hydrate path="path/to/mjml.mjml">Lorem ipsum...</mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>{{mjHydrateContent}}</mj-text> 
==> <mj-text>Lorem ipsum...</mj-text>
```

### use global data object <small>(only in nodejs)</small>
see [Define data](#data) section
```html
<mj-hydrate path="path/to/mjml.mjml"></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>Hello {{user.firstname}} {{user.lastname}}</mj-text> 
==> <mj-text>Hello John Doe</mj-text>
```

### use a specific key of the global data object <small>(only in nodejs)</small>
```html
<mj-hydrate path="path/to/mjml.mjml" source="user"></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>Hello {{firstname}} {{lastname}}</mj-text> 
==> <mj-text>Hello John Doe</mj-text>
```

### use your own key/value by passing attributes
```html
<mj-hydrate path="path/to/mjml.mjml" firstname="Jane" lastname="Doh"></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>Hello {{firstname}} {{lastname}}</mj-text> 
==> <mj-text>Hello Jane Doh</mj-text>
```

### use "mapping" attributes to pass a key/value list
```html
<mj-hydrate path="path/to/mjml.mjml" mapping="key:value;foo:baz;"></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>{{key}} / {{foo}}</mj-text> 
==> <mj-text>value / baz</mj-text>
```

### you can embed &lt;mj-hydrate&gt; in &lt;mj-hydrate&gt;
```html
<mj-hydrate path="path/to/mjml.mjml"></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>This is a title</mj-text>
<mj-hydrate path="{{layout.header}}"></mj-hydrate>
==>
<mj-text>This is a title</mj-text>
<mj-section>... HEADER ...</mj-section>
```

### you can use JSON.stringified string
Use simple quote around attribute value

The value of the attribute will be ``JSON.parse()``, the value needs to be valid JSON (with double-quoted property).
If this method throws an error, the value of the attribute will be used as string.
```html
<mj-hydrate path="path/to/mjml.mjml" myJson='{"key": "a json value", "number":42}'></mj-hydrate>
```
and use in `path/to/mjml.mjm`
```html
<mj-text>{{key}} // {{number}}</mj-text> 
==> <mj-text>a json value // 42</mj-text>
```
## <a id="data">#</a> Define data
Before executing the ``mjml2html(...)`` method, add some data to the context.

This is only available if you run the nodejs version. Not available in mjml app.
```js
MjHydrate.setData({
    user: {
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@yopmail.com"
    },
    layout: {
        header: "inc/header.mjml",
        footer: "inc/footer.mjml",
    }
    
})
```

## Quelques liens
- [Documentation MJML](https://documentation.mjml.io/)
- [Documentation {{ mustache }}](https://www.npmjs.com/package/mustache/)
- [Complete exemple](index.mjml)
