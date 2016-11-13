# query

A lightweight ES6 query selector

#### Tested browsers
* Chrome Desktop 54.0.2840.99 m
* Edge 14.14393
* FireFox 49.0.2
This will need transpilation to support older browsers like Internet Explorer.

#### Methods

### Query
**Paramters**
 
* selector (String) A string for selecting a list of nodes
* parent (Object<Node>) A parent node to run the query against

```javascript
let Q = new Query();
````
```javascript
let Q = new Query('.className');
````
### Returns
Query Object
