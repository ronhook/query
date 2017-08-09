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
