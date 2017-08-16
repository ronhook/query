window.onload = function() {
    Q = new Query();
    /*
    Q.select("span");
    Q.before('<p>yaya</p>').after('<p>hello</p>').empty().html('<div>Ook-A-Boo</div>');
    Q.prev('.one').html('boo').prop('data-funky', 'hello');
    console.log('-----------------------------------------------------------------');
    console.log("colour:", Q.select('.one').css({
        color: 'red'
    }).length);
    console.log('-----------------------------------------------------------------');
    Q.select(".two").each(function(node){
       //console.log("each: ", this, node);
    });
    console.log('-----------------------------------------------------------------');

    Q.select(".target").listen("click", function(node, e){
        console.log("clicked", node, e);
        node.toggle("clicked");
    });
    console.log('Find:', Q.select('.content').find('span'));
    console.log('Parent:', Q.select('.one, .two').parent(".content"));
    //console.clear();
    Q.select('.find-me span').each(function(node){
        console.log(node.is('.two'));
    });
    Q1 = new Query(".find-me span").filter(":nth-child(even)");
    */
    //Q1 = new Query(".three").prev(".one");
    //console.log('Q1:', Q1.length, Q1.prop("class"));
    //Q1.select(".find-me").after("<script>console.log('yay!');</script>");


    const count = 100000;
    let counterA, counterB, JQ, nodes;
    console.clear();

    counterA = document.querySelectorAll("#counter-a")[0];

    start = performance.now();
    for (i=0; i<count; i++) {
        nodes = document.querySelectorAll(".two");
        /*
        newNodes = [];
        for (node of nodes) {
            sibling = node.previousElementSibling;
            while (sibling && sibling.nodeType != 1) {
                sibling = sibling.previousElementSibling;
            }
            newNodes.push(node.previousElementSibling);
        };
        counterA.textContent = newNodes.length;
        */
        counterA.textContent = nodes.length;
    }
    native = performance.now() - start;

    counterA = new Query("#counter-b");
    start = performance.now();

    for (i=0; i<count; i++) {
        Q.select(".two");
        //counterA.text(Q.length);
        //Q.select(".two").prev();
        counterA.text(Q.length);

        //Q.select(".three").prev("span");
        //counterB = new Query("#counter-b").text(Q.length);
    }
    query = performance.now() - start;

    console.time("jQuery");
    start = performance.now();
    for (i=0; i<count; i++) {
        //counterA.text($(".two").prev().length)
        counterA.text($(".two").length)
    }
    jquery = performance.now() - start;
    console.timeEnd("jQuery");

    console.log({
        native: native,
        query: query,
        loss: query - native,
        jquery_loss: jquery - native,
        save: jquery - query,
        jquery: jquery
    });

};

