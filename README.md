# <mj-hydrate>
A powerful mjml component that embed the {{ mustache }} syntax in your mjml files.
Allow you to create UI components, easily reusable for emails on steroids.

# Usage

```html
<!-- inject content in template -->
<mj-hydrate path="path/to/mjml.mjml">Lorem ipsum...</mj-hydrate>

<!-- use global data object (see "Define data" section) -->
<mj-hydrate path="path/to/mjml.mjml"></mj-hydrate>

<!-- use 1 specific key of the global data object -->
<mj-hydrate path="path/to/mjml.mjml" source="user"></mj-hydrate>

<!-- use your own key/value by passing attributes -->
<mj-hydrate path="path/to/mjml.mjml" firstname="John" lastname="Doe"></mj-hydrate>

<!-- use mapping attributes to pass an object -->
<mj-hydrate path="path/to/mjml.mjml" mapping="key:value;foo:baz;"></mj-hydrate>
```

See index.mjml for example
# Define data
Before executing the ``mjml2html(...)`` method, add some data to the context.
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
