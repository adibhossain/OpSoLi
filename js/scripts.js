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

});