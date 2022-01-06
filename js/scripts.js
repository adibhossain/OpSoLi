/*!
* Start Bootstrap - Agency v7.0.10 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

var fixHash = function (url) {
    var tmp = '';
    var ignore = false;
    var encodedHash = ['%','2','3'];
    var cnt = 0;
    for(var i=0;i<url.length;i++) {
        if(cnt==3) {
            ignore = true;
            cnt = 0;
        }
        if(url[i]==encodedHash[cnt]) cnt++;
        if(url[i]=='#') ignore = true;
        if(url[i]=='&' || url[i]=='?') ignore = false;
        if(ignore) continue;
        tmp = tmp + url[i];
    }
    return tmp;
}

var getLogStatus = function () {
    var url = document.location.href;
    url = fixHash(url);
    var queryy = url.split('?');
    if(queryy.length==1 || queryy[1]=="") return 'false';
    var params = queryy[1].split('&');
    var tmp = params[0].split('=');
    return decodeURIComponent(tmp[1]);
}

var renderLogStatus = function () {
    var log = getLogStatus();
    if(log=='true') {
        document.getElementById('logged-in-icon').style.display = "block";
        document.getElementById('logged-out-icon').style.display = "none";
    }
    else if(log=='false'){
        document.getElementById('logged-in-icon').style.display = "none";
        document.getElementById('logged-out-icon').style.display = "block";
    }
}

var login = function () {
    if(document.getElementById('customRadioInline1').checked) {
        var url = document.location.href;
        url = fixHash(url);
        var queryy = url.split('?');
        url = queryy[0] + '?logstat=' + encodeURIComponent('true');
        if(queryy.length==1 || queryy[1]=="") {
            document.location.href = url;
            return;
        }
        var params = queryy[1].split('&');
        for (var i = 1, l = params.length; i < l; i++) {
            url = url + '&' + params[i];
        }
        document.location.href = url;
    }
    else if(document.getElementById('customRadioInline2').checked) {
        var email = document.getElementById('exampleInputEmail1').value;
        var password = document.getElementById('exampleInputPassword1').value;

        firebase.database().ref('Admin').once('value').then(function(snapshot) {
            if(snapshot.exists()) {
                if(snapshot.val().email == email && snapshot.val().password == password) {
                    var url = 'admin panel.html';
                    url = url + '?logstat=' + encodeURIComponent('true');
                    document.location.href = url;
                }
                else {

                }
            }
            else {
                
            }
        }, function(error) {
            if(error) {

            }
            else {

            }
        });
    }
    
};

var logout = function () {
    var url = document.location.href;
    url = fixHash(url);
    var queryy = url.split('?');
    url = queryy[0] + '?logstat=' + encodeURIComponent('false');
    if(queryy.length==1 || queryy[1]=="") {
        document.location.href = url;
        return;
    }
    var params = queryy[1].split('&');
    for (var i = 1, l = params.length; i < l; i++) {
        url = url + '&' + params[i];
    }
    document.location.href = url;
};

var getQueries = function () {
    var url = document.location.href;
    url = fixHash(url);
    var queryy = url.split('?');
    if(queryy.length==1) return '';
    return queryy[1];
}

var visit = function (url) {
    var logstat = getLogStatus();
    url = url + '?logstat=' + encodeURIComponent(logstat);
    document.location.href = url;
}

var getSearchVal = function () {
    // var tmp = url.split('#');
    // url = tmp[0];
    var searched = document.getElementById('searcher').value;
    var selector = document.getElementById('inputGroupSelect04');
    var selected = selector.options[selector.selectedIndex].text;
    var log = getLogStatus();
    url = 'search results.html?logstat=' + encodeURIComponent(log) + '&searched=' + encodeURIComponent(searched) + '&selected=' + encodeURIComponent(selected);
    document.location.href = url;
};

var setSearchVal = function () {
    var url = document.location.href;
    url = fixHash(url);
    var queryy = url.split('?');
    if(queryy.length==1 || queryy[1]=="") return;
    var params = queryy[1].split('&');
    if(params.length==1) return;
    var data = {}, tmp;
    for (var i = 1, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = decodeURIComponent(tmp[1]);
    }
    document.getElementById('selected').innerHTML = data.selected;
    document.getElementById('searched').innerHTML = data.searched;
    document.title = 'Search Results of ' + data.searched;
};

var changeProfileImg = function () {
    var fileList = document.getElementById('img-input').files;
    if(fileList.length == 0) return;
    console.log(fileList);
    document.getElementById('profile-img').src = URL.createObjectURL(fileList[0]);
};

var clearSearch = function () {
    document.getElementById('searcher').value = "";
    document.getElementById('del-search').style.display = "none";
};

var showX = function () {
    if(document.getElementById('searcher').value.length == 0) document.getElementById('del-search').style.display = "none";
    else document.getElementById('del-search').style.display = "block";
};

var showSearchBar = function () {
    if(document.getElementById('discover-search-bar').style.display == "block") document.getElementById('discover-search-bar').style.display = "none";
    else document.getElementById('discover-search-bar').style.display = "block";
};

var signup = function (e) {
    e.preventDefault();

    var datanotmepty = true;

    var first_name = document.querySelector("input[name='first_name']").value;
    if(first_name == '') datanotmepty=false;

    var last_name = document.querySelector("input[name='last_name']").value;
    if(last_name == '') datanotmepty=false;

    var userid = document.querySelector("input[name='userid']").value;
    if(userid == '') datanotmepty=false;

    var birth_date = document.getElementById('inputGroupSelect02').value + '/'
               + document.getElementById('inputGroupSelect01').value + '/'
               + ( parseInt(document.getElementById('inputGroupSelect03').value) + 1990 );
    if(birth_date == '') datanotmepty=false;

    var nation = document.querySelector("input[name='nation']").value;
    if(nation == '') datanotmepty=false;

    var religion = document.querySelector("input[name='religion']").value;
    if(religion == '') datanotmepty=false;

    var work = document.querySelector("input[name='work']").value;
    if(work == '') datanotmepty=false;

    var email = document.querySelector("input[name='email']").value;
    if(email == '') datanotmepty=false;

    var phone = document.querySelector("input[name='phone']").value;
    if(phone == '') datanotmepty=false;

    var fb_id = document.querySelector("input[name='fb-id']").value;
    if(fb_id == '') datanotmepty=false;

    var twitter_id = document.querySelector("input[name='twitter-id']").value;
    if(twitter_id == '') datanotmepty=false;

    var insta_id = document.querySelector("input[name='insta-id']").value;
    if(insta_id == '') datanotmepty=false;

    var password = document.querySelector("input[name='password']").value;
    if(password == '') datanotmepty=false;
    
    var confirm_password = document.querySelector("input[name='confirm_password']").value;
    var accept_terms = document.getElementById('accept_terms').checked;
      
    if(password == confirm_password && accept_terms && datanotmepty) {
        firebase.database().ref('User/'+ userid).once('value').then(function(snapshot) {
            if(snapshot.exists()) {
                alert('This user id already exists!');
            }
            else {
                firebase.database().ref('User/' + userid).set({
                    first_name : first_name,
                    last_name : last_name,
                    userid : userid,
                    birth_date : birth_date,
                    nation : nation,
                    religion : religion,
                    work : work,
                    email : email,
                    phone : phone,
                    fb_id : fb_id,
                    twitter_id : twitter_id,
                    insta_id : insta_id,
                    password : password,
                    }, function(error) {
                    if (error) {
                        // The write failed...
                    }
                    else {
                        alert("DONE");
                    }
                });
            }
        }, function(error) {
            if(error) {

            }
            else {

            }
        });
    }
    else {
        alert("Please give correct data and accept the terms and policies!");
    }
}

var chapter_view = function () {
    // chapter-title chapter-text description start_read pager
    document.getElementById('chapter-title').innerHTML = 'Chapter 1' + ': The Awakening';
    document.getElementById('description').style.display = "none";
    document.getElementById('chapter-text').style.display = "block";
    document.getElementById('start_read').style.display = "none";
    document.getElementById('pager').style.display = "block";
}

var trigger_night = function () {
    var nightmode = document.getElementById('nightmode').checked;
    if(nightmode) {
        document.getElementById('main-content').style.backgroundColor = "#212529";
        document.getElementById('pager').style.backgroundColor = "#212529";
        document.getElementById('main-content').style.color = "white";
    }
    else {
        document.getElementById('main-content').style.backgroundColor = "white";
        document.getElementById('pager').style.backgroundColor = "white";
        document.getElementById('main-content').style.color = "#212529";
    }
}

var rendercomments = function () {
    if(document.getElementById('commentsloaded') == null) return;
    //console.log('inside rendercomments');
    firebase.database().ref('Comments/').once('value').then(function(snapshot) {
        document.getElementById('commentsloaded').innerHTML = "";
        snapshot.forEach(function(child) {
            document.getElementById('nocomments').style.display = "none";
            //console.log(child.val().userid + " " + child.val().date + " " + child.val().comment);
            var default_comment = document.getElementById('default-comment').cloneNode(true);
            default_comment.children[0].children[0].innerHTML = child.val().userid;
            default_comment.children[0].children[1].innerHTML = child.val().date;
            default_comment.children[1].innerHTML = child.val().comment;
            default_comment.style.display = "block";
            document.getElementById('commentsloaded').appendChild(default_comment);
        });
        }, function(error) {
            if (error) {
            } else {

            }
    });
}

var addcomment = function () {
    var comment_text = document.getElementById('comment-text').value;
    document.getElementById('comment-text').value = "";
    var d = new Date().toString();
    //console.log(new Date().toString());
    var userid = "Anonymous" + (Math.floor(Math.random() * 400) + 101);
    firebase.database().ref('Comments/' + userid).set({
        userid : userid,
        date : d,
        comment : comment_text
      }, function(error) {
        if (error) {
          // The write failed...
        } else {

        }
    });
    rendercomments();
}

var showchapter = function (chapno) {
    document.getElementById('chapter-write').style.display = 'block';
    document.getElementById('savenpublish').style.display = 'block';
    document.getElementById('chapno').innerHTML = chapno;
}

var addchapter = function () {
    var chapno = document.getElementById('chapter-list').querySelectorAll("li").length;
    var litag = document.getElementById('default-chapno').cloneNode(true);
    litag.style.display = "block";
    litag.childNodes[0].innerHTML = 'Chapter #' + chapno;
    document.getElementById('chapter-list').appendChild(litag);
    showchapter(litag.childNodes[0].innerHTML);
}

var addcatalogue = function (listitem) {
    var litag = document.getElementById('default-component').cloneNode(true);
    litag.style.display = "block";
    litag.childNodes[0].innerHTML = listitem;
    document.getElementById('components').appendChild(litag);
}

var removecomponent = function (listitem) {
    document.getElementById('components').removeChild(listitem);
}

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    rendercomments();
    renderLogStatus();
    // Shrink the navbar 
    navbarShrink();
    setSearchVal();
    showX();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // document.getElementById('searcher').addEventListener("keyup", function(event) {
    //     if (event.key === "Enter") {
    //       event.preventDefault();
    //       getSearchVal();
    //     }
    //   }); 

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
    scrollFunction();
    };

    function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }

});