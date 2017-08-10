### .filter(selector)

Reduces the nodes by testing with a function

**Parameters**

- selector (String) A string for selecting a list of nodes

**Returns** 

Query Object

**Example**

```js
let Q = new Query();
Q.select("span").filter(".class");
```
