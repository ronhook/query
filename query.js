
'use strict';

class Query {
    constructor (sel = false, parent = false) {
        // Based on the jQuery regular expression to test if a string is html
        this.regHTML    = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        this.length     = 0;
        let that        = this;
        this.nodes      = new Proxy([], {
            get: function(tgt, prop) {
                return tgt[prop];
            },
            set: function(tgt, prop, val) {
                tgt[prop] = val;
                that.length = tgt.length;
                return true;
            }
        });
        if (sel) {
            this.select(sel, parent);
        }
    }
    /*
     * Gets a list of Dom objects
     * @param {String} sel
     * @param {String} parent
     * @returns {self}
     */
    select (sel, parent = false) {
        let nodes = [];
        //console.log('type:', this._type(sel), sel);
        //console.log(parent);
        switch(this._type(sel)){
            case "string":
                parent = parent || document;
                if(parent.nodeType != 1){
                    parent = document;
                }
                let found = parent.querySelectorAll(sel);
                for (let i=0; i<found.length; i++) {
                    if (found[i].nodeType == 1) {
                        nodes.push(found[i]);
                    }
                }
                break;
            case "node":
                nodes.push(sel);
                break;
        }
       this._setNodes(nodes);
       return this;
    }
    /*
     * Determines the type of element
     * @param {type} elem
     * @returns {String|Boolean}
     */
    _type (elem) {
        switch(typeof(elem)){
            case "string":
                // test if the string is a selector or html format
                let match = elem = this.regHTML.exec(elem);
                if(match){
                    return "stringHTML"
                }else{
                    return "string";
                }
                break;
            case "object":
                if(elem.nodeType == 1){
                    return "node";
                }else{
                    return Object.prototype.toString.call(elem).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
                }
                break;
        }
        return false;
    }
    /*
     * Adds html before each node
     * @param {String} html
     * @returns {Query}
     */
    before (html) {
        this._attach(html, 'beforebegin');
        return this;
    }
    /*
     * Adds html after each node
     * @param {String} html
     * @returns {Query}
     */
    after (html) {
        this._attach(html, 'afterend');
        return this;
    }
    /*
     * Adds html to yhe start of each node
     * @param {String} html
     * @returns {Query}
     */
    start (html) {
        this._attach(html, 'afterbegin');
        return this;
    }
    /*
     * Adds html to the end of each node
     * @param {String} html
     * @returns {Query}
     */
    end (html) {
        this._attach(html, 'beforeend');
        return this;
    }
    /*
     * Adds html before or after each node
     * @param {String} html
     * @param {String} before
     * @returns {undefined}
     */
    _attach (html, before) {
        switch(this._type(html)){
            case "stringHTML":
            case "string":
                break;
            /*
            case "node":
                nodes = [html];
                html = html.outerHTML;
                break;
            */
        }
        this.nodes.forEach(function(node){
            node.insertAdjacentHTML(before, html);
        }, this);
        // execute scripts
        this._execScripts(html);
    }
    /*
     * Parses html into nodes
     * @param {String} html
     * @returns {Array}
     */
    _getNodesFromString (html) {
        let nodes       = [];
        let parsedNodes = new DOMParser().parseFromString(html, "text/html").querySelectorAll("body")[0].childNodes;
        for (let i=0; i<parsedNodes.length; i++) {
            if (parsedNodes[i].nodeType == 1) {
                nodes.push(parsedNodes[i]);
            }
        }
        return nodes;
    }
    /*
     * Removes all nodes from the object
     * @returns {Query}
     */
    empty (){
        this.nodes.forEach(function(node){
            node.innerHTML = "";
        });
        return this;
    }
    /*
     * Adds html to an object
     * @param {String} html
     * @returns {Query}
     */
    html (html){
        this.nodes.forEach(function(node){
            node.innerHTML = html;
        });
        this._execScripts(html);
        return this;
    }
    /*
     * Turns a html string into html elements
     * @param {String} html
     * @returns {Array}
     */
    _parseHTML (html) {
        //let parser = new DOMParser();
        //let node = parser.parseFromString(html, "text/html").querySelectorAll("body");
        return new DOMParser().parseFromString(html, "text/html").querySelectorAll("body")[0].childNodes;
    }
    /*
     * Gets/Sets a dom attribute
     * @param {String} attr
     * @param {String} val
     * @returns {Query}
     */
    prop (attr, val = false) {
        this.nodes.forEach(function(node){
            if(val !== false){
                node.setAttribute(attr, val);
            }else{
                return node.getAttribute(attr);
            }
        });
        return this;
    }
    /*
     * Applies a function to each node
     * @param {Function} func
     * @pamam (Boolean} domNode
     * @returns {Query}
     */
    each (func, domNode = false) {
        this.nodes.forEach(function(node) {
            func.apply(this, [domNode ? node  : new Query(node)]);
        }.bind(this));
        return this;
    }
    /*
     * Executes a function
     * @param {Function} func
     * @param {Array} params
     * @returns {Query}
     */
    once (func, ...params) {
        func.apply(this, params);
        return this;
    }
    /*
     * Adds an event to a node
     * @param {String} event
     * @param {Function} func
     * @param {Boolean} allowBubble
     * @returns {Query}
     */
    listen (event, func, allowBubble = false) {
        this.nodes.forEach(function(node){
            node.addEventListener(event, function(e) {
                if(!allowBubble){
                    e.stopPropagation();
                }
                func.apply(this, [new Query(node), e]);
            });
        }.bind(this));
        return this;
    }
    /*
     * Adds/Removes a class
     * @param {String} className
     * @returns {Query}
     */
    toggle (className) {
        this.nodes.forEach(function(node) {
            node.classList.toggle(className);
        });
        return this;
    }
    /*
     * Adds a class
     * @param {String} className
     * @returns {Query}
     */
    addClass (className) {
        this._class(className);
        return this;
    }
    /*
     * Removes a class
     * @param {String} className
     * @returns {Query}
     */
    removeClass (className) {
        this._class(className, true);
        return this;
    }
    /*
     * Add or removes a class
     * @param {String} className
     * @param {String} remove
     * @returns {undefined}
     */
    _class (className, remove = false) {
        this.nodes.forEach(function(node) {
            if (remove) {
                node.classList.remove(className);
            } else {
                node.classList.add(className);
            }
        });
    }
    /*
     *
     * @param {String|Object} styles
     * @param {String} value
     * @returns {Query|String}
     */
    css (styles, value = false){
        let response = value ? this : [];
        this.nodes.forEach(function(node) {
            switch(this._type(styles)){
                case "string":
                    if(!value){
                        response.push(getComputedStyle(node)[styles]);
                    }else{
                        node.style[styles] = value;
                    }
                    break;

                case "object":
                    for(let index in styles){
                        node.style[index] = styles[index];
                    }
                    break;
            }
        }.bind(this));
        return value ? response : (this.nodes.length > 1 ? response : response.join());
    }
    /*
     * Finds children of the current nodes
     * @param {String} sel
     * @returns {Query}
     */
    find (sel) {
        let newNodes = [];
        this.nodes.forEach(function(node){
            let obj = node.querySelectorAll(sel);
            for(let index in obj){
                if(obj[index].nodeType == 1) {
                    newNodes.push(obj[index]);
                }
            }
        }, this);
        this.nodes = newNodes;
        return this;
    }
    /*
     * Gets the parent nodes
     * @param {type} sel
     * @returns {Query}
     */
    parent (sel = false) {
        let newNodes = [];
        this.nodes.forEach(function(node){
            let parent = node.parentNode;
            while (parent && (parent.nodeType != 1 || (sel ? !parent.matches(sel) : false))) {
                parent = parent.parentNode;
            }
            if(parent && parent.nodeType == 1){
                newNodes.push(parent);
            }
        });
        this._setNodes(newNodes);
        return this;
    }
    /*
     * replaces the current nodes with a new set
     * @param {Array} nodes
     * @returns {undefined}
     */
    _setNodes (nodes) {
        this.nodes.length = 0;
        nodes.forEach(function(node){
            // must be a unique set of nodes
            if (!this.nodes.includes(node)) {
                this.nodes.push(node);
            }
        }, this);
    }
    /*
     * Executes scripts in the hrml
     * @param {String} html
     * @returns {undefined}
     */
    _execScripts (html) {
        let nodeList = [];
        switch(this._type(html)){
            case "stringHTML":
            case "string":
                nodeList = this._getNodesFromString(html);
                break;
            /*
            case "node":
                nodes = [html];
                html = html.outerHTML;
                break;
            */
        }
        nodeList.forEach(function(node){
            this._doScript(this._findScripts(node));
        }, this);
    }
    /*
     * Gets all the code for script tags
     * @param {Node} node
     * @returns {Array}
     */
    _findScripts (node){
        let scripts = [];
        if(this._type(node) == "node"){
            if(node.localName  == "script"){
                scripts.push(node.textContent);
            }else{
                let found = new Query("script", node);
                found.each(function(node){
                    scripts.push(node.textContent);
                }, true);
            }
        }
        return scripts;
    }
    /*
     * Executes an array of javascript code
     * @param {Array} sciptList
     * @returns {undefined}
     */
    _doScript (sciptList) {
        sciptList.forEach(function(code){
            let script  = document.createElement("script");
            let head    = document.getElementsByTagName("head")[0];
            script.appendChild(document.createTextNode(code));
            head.insertBefore(script, head.firstChild);
            head.removeChild(script);
        });
    }
   /*
    * Get the immediate next sibling or the next that matches the selector
    * @param {String|Boolean} sel
    * @returns {Query}
    */
    next (sel = false) {
        this._sibling(true, sel);
        return this;
    }
    /*
     * Get the immediate previous sibling or the previous that matches the selector
     * @param {String|Boolean} sel
     * @returns {Query}
     */
    prev (sel = false) {
        this._sibling(false, sel);
        return this;
    }
    /*
     * Get the immediate previous or next sibling or the one that matches the selector
     * @param {Boolean} next
     * @param {String|Boolean} sel
     * @returns {undefined}
     */
    _sibling(next, sel) {
        let newNodes = [];
        this.nodes.forEach(function(node){
            let sibling = next ? node.nextElementSibling : node.previousElementSibling;
            while (sibling && (sibling.nodeType != 1 || (sel ? !sibling.matches(sel) : true))) {
                sibling = next ? sibling.nextElementSibling : sibling.previousElementSibling;
            }
            if(sibling && sibling.nodeType == 1){
                newNodes.push(sibling);
            }
        });
        this._setNodes(newNodes);
    }
};

