**Query([selector, parent])**

The class constructor.

**Parameters**

- selector (String) A string for selecting a list of nodes
parent (Node) A parent node to run the query against

**Examples**

```js
let Q = new Query();
let Q = new Query(".className");
let Q = new Query(".className", document.getElementById("myId"));
```

**Returns** 

Query Object

**Live Sample**

<iframe height='265' scrolling='no' title='Query' src='//codepen.io/ronhook/embed/dzRYxw/?height=265&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/ronhook/pen/dzRYxw/'>Query</a> by Ron Hook (<a href='https://codepen.io/ronhook'>@ronhook</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
