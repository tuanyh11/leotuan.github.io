
    const e = document.querySelector.bind(document);
    const ee = document.querySelectorAll.bind(document);
    const header = e('.header');
    const btnMenu = e('.header-menu');
    const btnMenuElement = e('.menu-bars');
    const navHeader = e('.navbar');
    window.onscroll = function() {
        if(this.scrollY > 20) {
            header.classList.add('sticky')
        } else {
            header.classList.remove('sticky')
        }
        
    }

    btnMenu.onclick = function() {
        ee('.nav__item-link').forEach(element => {
            element.onclick = () => {
                navHeader.classList.toggle('active')
                btnMenuElement.classList.toggle('active')
            }
        });
        navHeader.classList.toggle('active')
        btnMenuElement.classList.toggle('active')
        
        console.log()
    }




    $('.owl-carousel').owlCarousel({
        loop:true,
        nav: false,
        margin:20,
        stagePadding: 10,
        dotsEach: true,
        outoplayHoverPause: true,
        autoplaySpeed: 10000,
        responsive:{
            0:{
                items:1,
                nav: true
            },
            600:{
                items:2,
                nav: true
                
            },
            1000:{
                items:3,
                nav: true
            }
        }
    })

    var typed = new Typed(".name-job", {
        strings: ["Designers Website","Youtuber", "Handsome Guy :))"], 
        typeSpeed: 100,
        backSpeed: 40,
        startDelay: 40,
        loop: true
    })

    var typed = new Typed(".name-job-2", {
        strings: ["Designers Website","Youtuber", "Handsome Guy :))"], 
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
    })

    // xử lý form

    function validator (option) {
        let selectorRules = {};

        // xử lí submit
        // console.log(option.form)
        e(option.form).onsubmit = (event) => {
            event.preventDefault();
            option.rules.forEach((rule) => {
                var element = e(rule.selector).parentElement.querySelector('span');
                validate(element, rule);
            })
            
        }

        // xử lí khi có lỗi
        let validate = ( element, rule,  errorMes) => {
            let valueInput = e(rule.selector).value;
            
            let rules = selectorRules[rule.selector]
            for (let i = 0; i < rules.length; i++) {
                errorMes = rules[i](valueInput);
                console.log(errorMes)
                if(errorMes) break;
            }

            if(errorMes) {
                element.innerText = errorMes;
                element.classList.toggle("active", true);
                e(rule.selector).classList.toggle("active", true);
           } else {
                element.innerText = '';
                element.classList.toggle("active", false);
                e(rule.selector).classList.toggle("active", false);
           }
        } 
        
        if(e(option.form)) {
            option.rules.forEach((rule) => {

                var element = e(rule.selector).parentElement.querySelector('span');
                // lặp qua các rules rồi lưu lại

                if(Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.check)
                } else {
                    selectorRules[rule.selector] = [rule.check];
                }

                e(rule.selector).onblur = () => {
                   validate(element, rule);
                }

                e(rule.selector).onfocus = () => {
                    element.innerText = '';
                    element.classList.toggle("active", false);
                    e(rule.selector).classList.toggle("active", false);
                }
                
            })
        }
    }

    validator.isRequired = selector => ({
        selector: selector,
        check: (value) => {
            return value.trim() ? undefined : 'vui lòng nhập trường này'; 
        }
    })

        

    validator.isConfirmed = (selector, mes) => ({
        selector: selector,
        check: (value) => {
              var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
              return regex.test(value.trim()) ? undefined : mes;
        }   
    })

    validator.isPhone = (selector, mes) => ({
        selector: selector,
        check: (value) => {
              var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
              return regex.test(value.trim()) ? undefined : mes;
        }   
    })
    
