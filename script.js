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
    */
    Q1 = new Query(".find-me span").text("Hello");
    console.log('Q1:', Q1.text(), Q1);
};

