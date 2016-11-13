# query

A lightweight ES6 query selector

#### Tested browsers
* Chrome Desktop 54.0.2840.99 m
* Edge 14.14393
* FireFox 49.0.2
This will need transpilation to support older browsers like Internet Explorer.

### Methods

#### Query
**Paramters**

* selector (String) A string for selecting a list of nodes
* parent (Node) A parent node to run the query against

```javascript
let Q = new Query();
````
```javascript
let Q = new Query('.className');
````
### Returns
Query Object

#### select
**Paramters**

* selector (String) A string for selecting a list of nodes
* parent (Node) A parent node to run the query against

```javascript
let Q = new Query();
Q.select('.className');
````
### Returns
Query Object

#### before
Adds html/text before each node
**Parameters**

* html (String) A string of html or plain text

```javascript
let Q = new Query();
Q.select(".className").before("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <div>Some Text</div><p class="className">Text</p>
````
### Returns
Query Object

#### after
Adds html/text after each node
**Parameters**

* html (String) A string of html or plain text

```javascript
let Q = new Query();
Q.select(".className").after("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <p class="className">Text</p><div>Some Text</div>
````
### Returns
Query Object

#### start
Adds html/text after inside each node as the first child
**Parameters**

* html (String) A string of html or plain text

```javascript
let Q = new Query();
Q.select(".className").start("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <p class="className"><div>Text</div>Some Text</p>
````
### Returns
Query Object

#### end
Adds html/text after inside each node as the last child
**Parameters**

* html (String) A string of html or plain text

```javascript
let Q = new Query();
Q.select(".className").end("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <p class="className">Text<div>Some Text</div></p>
````
### Returns
Query Object

#### empty
Removes the contents from each node
**Parameters**

none
```javascript
let Q = new Query();
Q.select(".className").empty();
// <p class="className">Text</p>
// becomes
// <p class="className"></p>
````
### Returns
Query Object

#### html
Removes the contents from each node
**Parameters**
* html (String) A string of html or plain text

```javascript
let Q = new Query();
Q.select(".className").html("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <p class="className">"<div>Some Text</div>"</p>
````
### Returns
Query Object

#### prop
Gets/Sets a dom attribute for each node
**Parameters**
* attribute (String) The attribute to return the value of
* value (String) The value to set for the attribute

```javascript
let Q = new Query();
console.log(Q.select(".link").prop("href");
// <a class="link" href="http://www.example.com">Text</a>
// outputs "http://www.example.com"
````

```javascript
let Q = new Query();
Q.select(".link").prop("href", "http://www.google.com");
// <a class="link" href="http://www.example.com">Text</a>
// becomes
// <a class="link" href="http://www.google.com">Text</a>
````
### Returns
Query Object
