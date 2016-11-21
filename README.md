# Query

A lightweight ES6 query selector that works with native JavaScript methods. It will support all queries supported with .querySelectorAll() [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

#### Tested browsers
* Chrome Desktop 54.0.2840.99 m
* Edge 14.14393
* FireFox 49.0.2

This will need to be transpiled to support older browsers like Internet Explorer.

*********************************************************************************************************************
## Query([selector, parent])
The class constructor.

**Paramters**

* selector (String) A string for selecting a list of nodes
* parent (Node) A parent node to run the query against

```javascript
let Q = new Query();
````
```javascript
let Q = new Query(".className");
````
```javascript
let Q = new Query(".className", document.getElementById("myId"));
````
**Returns** Query Object
*********************************************************************************************************************
## .select(selector, [parent])
**Parameters**

* selector (String) A string for selecting a list of nodes
* parent (Node) A parent node to run the query against

```javascript
let Q = new Query();
Q.select(".className");
````

```javascript
let Q = new Query();
Q.select(".className", document.getElementById("myId"));
````
**Returns** Query Object
*********************************************************************************************************************
## .before(html)
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
**Returns** Query Object
*********************************************************************************************************************
## .after(html)
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
**Returns** Query Object
*********************************************************************************************************************
## .start(html)
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
**Returns** Query Object
*********************************************************************************************************************
## .end(html)
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
**Returns** Query Object
*********************************************************************************************************************
## .empty()
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
**Returns** Query Object
*********************************************************************************************************************
## .html([html])
Returns the html of the nodes when html is false or sets the html when set.

**Parameters**
* html (String) When set will replace the html of the nodes.

```javascript
let Q = new Query();
Q.select(".className").html("<div>Some Text</div>");
// <p class="className">Text</p>
// becomes
// <p class="className">"<div>Some Text</div>"</p>
````
**Returns** Query Object | String
*********************************************************************************************************************
## .prop(attribute, [value])
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
**Returns** Query Object | Value
*********************************************************************************************************************
## .each(function, [useDom])
Applies a function to each node

**Parameters**
* function (Function) The function to execute
* useDom (Boolean) When true will apply the function against a node. When false will apply the function against a Query object.

```javascript
let Q = new Query();
Q.select(".link").each(function(node){
    console.log(node.prop("href"));
});
````
**Returns** Query Object | Value
*********************************************************************************************************************
## .once(function, [...parameters])
Executes a function once during a key chain

**Parameters**
* function (Function) The function to execute
* ...parameters (Values) A list of parameters to apply to the function

```javascript
let Q = new Query();
Q.select(".link").once(function(a,b){
    console.log(a,b);
    // outputs 4,5
},4,5).select(".anotherClass");
````
**Returns** Query Object
*********************************************************************************************************************
## .on(event, function, [allowBubble])
Adds an eventListener to the nodes

**Parameters**
* event (String) The event to listen for
* function (Function) The function to execute
* allowBubble (Boolean) When true will allow the event to bubble up

```javascript
let Q = new Query();
Q.select(".link").on('click', function(event){
    console.log("clicked");
});
````
**Returns** Query Object
*********************************************************************************************************************
## .trigger(event)
Adds an eventListener to the nodes

**Parameters**
* event (String) The event to listen for

```javascript
let Q = new Query();
Q.select(".link").on('click', function(event){
    console.log("clicked");
}).trigger('click');
````
**Returns** Query Object
*********************************************************************************************************************
## .off(event)
Removes a named event added via an eventListener to the nodes

**Parameters**
* event (String) The event to listen for
* function (Function) The function to remove

```javascript
let Q = new Query();
let F = function(event){
    console.log("clicked");
}
Q.select(".link").on('click', F).off('click', F);
````
**Returns** Query Object
*********************************************************************************************************************
## .toggle(class)
Alternatively adds and removes a class from the nodes

**Parameters**
* class (String) The class to add and remove

```javascript
let Q = new Query();
Q.select(".link").toggle('clicked');
````
**Returns** Query Object
*********************************************************************************************************************
## .addClass(class)
Adds a class to the nodes

**Parameters**
* class (String) The class to add

```javascript
let Q = new Query();
Q.select(".link").addClass("clicked");
````
**Returns** Query Object
*********************************************************************************************************************
## .removeClass(class)
Removes a class from the nodes

**Parameters**
* class (String) The class to remove

```javascript
let Q = new Query();
Q.select(".link").removeClass("clicked");
````
**Returns** Query Object
*********************************************************************************************************************
## .css(class, [value])
Gets/Sets a css value

**Parameters**
* style (String) The style to set or change
* value (String) The value to apply

```javascript
let Q = new Query();
console.log(Q.select(".link").css("color"));
````
```javascript
let Q = new Query();
Q.select(".link").css("color", "blue");
````
**Returns** Query Object | Value
*********************************************************************************************************************
## .find(selector)
Finds children of the current nodes

**Parameters**
* selector (String) A string for selecting a list of child nodes

```javascript
let Q = new Query();
Q.select("div").find("a");
````
**Returns** Query Object
*********************************************************************************************************************
## .parent([selector])
Finds parent of the current nodes

**Parameters**
* selector (String) When set will find the parent node that matches the selector. When not set will return the immediate parent.

```javascript
let Q = new Query();
Q.select("a").parent();
````
```javascript
let Q = new Query();
Q.select("a").parent("div");
````
**Returns** Query Object
*********************************************************************************************************************
## .next([selector])
Get the immediate next sibling or the next sibling that matches the selector

**Parameters**
* selector (String) When set will find the next sibling node that matches the selector. When not set will return the immediate next sibling.

```javascript
let Q = new Query();
Q.select("a").next();
````
```javascript
let Q = new Query();
Q.select("a").next("span");
````
**Returns** Query Object
*********************************************************************************************************************
## .prev([selector])
Get the immediate previous sibling or the previous sibling that matches the selector

**Parameters**
* selector (String) When set will find the next sibling node that matches the selector. When not set will return the immediate next sibling.

```javascript
let Q = new Query();
Q.select("a").next();
````
```javascript
let Q = new Query();
Q.select("a").next("span");
````
**Returns** Query Object
*********************************************************************************************************************
## .is(selector)
Checks if at least one of the nodes matches the selector

**Parameters**
* selector (String) A string for testing against the nodes

```javascript
let Q = new Query();
console.log(Q.select("a").is('.class'));
````
**Returns** Boolean
*********************************************************************************************************************
## .remove()
Removes the nodes

**Parameters**
none

```javascript
let Q = new Query();
console.log(Q.select("a").remove());
````
**Returns** Query Object
*********************************************************************************************************************
## .length
The number of nodes in the node list

```javascript
let Q = new Query();
console.log(Q.select("a").length);
````
**Returns** Integer
