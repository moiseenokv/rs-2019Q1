// eslint-disable-next-line no-console
//console.log('Task codejam palette');

document.addEventListener('DOMContentLoaded', function (event) {
    var current_tool = '';
    var current_figure = '';

    var tool = document.querySelector('.tools');

    tool.addEventListener('click', function (e) {
        current_tool = e.target.getAttribute('data-action');
        //var els = document.querySelectorAll('.tools button');

        if (e.target.classList.contains('active')) {
            e.target.classList.remove("active");
            document.body.removeAttribute('class');
            current_tool = '';
        } else {
            Array.prototype.slice.call(document.querySelectorAll('.tools button'))
                .forEach(function (element) {
                    element.classList.remove('active');
                });

            switch (current_tool) {
                case "paint":
                    document.body.setAttribute('class', 'buck');
                    select_color.classList.add("disabled");
                    break;
                case "choose-color":
                    document.body.setAttribute('class', 'picker');
                    select_color.classList.remove("disabled");
                    break;
                case "move":
                    document.body.setAttribute('class', 'move');
                    select_color.classList.add("disabled");
                    break;
                case "transform":
                    document.body.setAttribute('class', 'transform');
                    select_color.classList.add("disabled");
                    break;
            }
            e.target.classList.toggle('active');
        }



    });

    var figures = document.querySelector('.canvas');

    figures.addEventListener('click', function (e) {

        if (e.target.hasAttribute('figure')) {

            if (current_tool == 'paint') {
                e.target.classList.add('active');
                e.target.style.backgroundColor = document.querySelector('.current')
                    .getAttribute('data-color');
                // document.querySelector('body').click();
            }

            if (current_tool == 'transform') {
                e.target.classList.toggle('circle');
                //document.querySelector('body').click();
            }

            if (current_tool == 'choose-color') {
                e.target.classList.toggle('circle');
                // document.querySelector('body').click();
            }

        }
    });



    var curr_color = document.querySelector('.current');
    var prev_color = document.querySelector('.prev');



    prev_color.addEventListener('click', function (e) {
        //prev to current
        var prev = this.getAttribute("data-color");
        var curr = curr_color.getAttribute("data-color");

        var curr_alt = curr;
        curr = prev;
        prev = curr_alt

        curr_color.setAttribute('data-color', curr);
        curr_color.children[0].style.backgroundColor = curr;
        prev_color.setAttribute('data-color', prev);
        prev_color.children[0].style.backgroundColor = prev

    });

    curr_color.addEventListener('click', function (e) {
        //prev to current
        var prev = prev_color.getAttribute("data-color");
        var curr = this.getAttribute("data-color");

        var curr_alt = curr;
        curr = prev;
        prev = curr_alt

        curr_color.setAttribute('data-color', curr);
        curr_color.children[0].style.backgroundColor = curr;
        prev_color.setAttribute('data-color', prev);
        prev_color.children[0].style.backgroundColor = prev

    });

    var select_color = document.querySelector('.select-color');

    select_color.addEventListener('click', function (e) {

        if (current_tool == "choose-color") {
            var curr = document.querySelector('.current')
                .getAttribute('data-color');
            var prev = document.querySelector('.prev')
                .getAttribute('data-color');

            var curr_alt = curr;
            curr = e.target.getAttribute('data-color');
            prev = curr_alt;
            curr_color.setAttribute('data-color', curr);
            curr_color.children[0].style.backgroundColor = curr;
            prev_color.setAttribute('data-color', prev);
            prev_color.children[0].style.backgroundColor = prev
        }

    });

    //save config snippet
    document.querySelector('body')
        .addEventListener('click', function () {
            //console.log('changed');

        })


});

//keyupdown   - https://eloquentjavascript.net/15_event.html
