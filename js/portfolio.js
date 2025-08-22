$(()=> {

    //스크롤 내릴 때
    let scrollTop = 0;
    const winHeight = $(window).height() - 50;
    $(window).scroll(()=> {

        scrollTop = $(window).scrollTop();
        const topTop = $("#top").offset().top; //#top의 y좌표
        const aboutTop = $("#about").offset().top; //#about의 y좌표
        const eventTop = $("#event").offset().top; //#event의 y좌표
        const contactTop = $("#contact").offset().top; //#contact의 y좌표

        const port1Top = $("#portfolio").offset().top;
        const port2Top = $("#port2").offset().top;
        
        const port3Top = $("#port3").offset().top;
        const port4Top = $("#port4").offset().top;
        const port5Top = $("#port5").offset().top;
        
        //메뉴 하이라이트 변화
        if($(window).scrollTop() >= topTop) {
            $("#menu a").eq(0).addClass('act').siblings().removeClass('act');
        }
        if($(window).scrollTop() >= aboutTop - 200) {
            $("#menu a").eq(1).addClass('act').siblings().removeClass('act');
        }
        if($(window).scrollTop() >= port1Top - 200) {
            $("#menu a").eq(2).addClass('act').siblings().removeClass('act');
        }
        if($(window).scrollTop() >= eventTop  - 200) {
            $("#menu a").eq(3).addClass('act').siblings().removeClass('act');
        }
        if($(window).scrollTop() >= contactTop - 200) {
            $("#menu a").eq(4).addClass('act').siblings().removeClass('act');
        }

        //스크롤바를 내리면 #about 의 #skill 바가 애니메이션 된다.
        if($(window).scrollTop() >= aboutTop - 200 ) {
            progressAni();
        }
        //스크롤 시 포트폴리오 나온다.
        if($(window).scrollTop() >= port1Top - 200) {
            $("#port1").addClass('act');
        }
        if($(window).scrollTop() >= port2Top - 600) {
            $("#port2").addClass('act');
        }
        if($(window).scrollTop() >= port3Top - 600) {
            $("#port3").addClass('act');
        }
        if($(window).scrollTop() >= port4Top - 600) {
            $("#port4").addClass('act');
        }
        if($(window).scrollTop() >= port5Top - 600) {
            $("#port5").addClass('act');
        }

        //모바일이 아닐 때(넓이가 800px 보다 클 때)
        if($(window).innerWidth() > 800 ) {
            if(scrollTop > winHeight) {
               $("#top nav").addClass('act') 
            } else {
                $("#top nav").removeClass('act')
            }
        }
    });

    //스크롤 내려갔을 때 'top으로 이동하는 화살표' slide로 보이기
    $(window).scroll(()=> {
        scrollTop = $(window).scrollTop();

        if($(window).scrollTop() >= 300) {
            $("#topbtn button").slideDown();
        }
        if ($(window).scrollTop() < 300) {
            $("#topbtn button").slideUp();
        }
    });

    //영어 text 한글 text로 변경
    $("#top p").mouseenter(()=> {
        $("#top p").stop().text("신 다 해");
    });
    $("#top p").mouseleave(()=> {
        $("#top p").stop().text("Shin Da Hae");
    });


    //모바일 화면에서 메뉴 보이기
    const menuClose = ()=> {
        $("#top nav").removeClass('act');
        $("#top button").text('menu');
        $("body").css('overflow', 'auto');
    }
    if($(window).innerWidth() <= 800) {
        $("#top button").click(()=> {
            const txt = $("#top button").text() === 'menu';
            txt ? ($("#top nav").addClass('act'), $("#top button").text('close'), $('body').css('overflow', 'hidden')) :  menuClose();

            /* if($("#top button").text() === 'menu') {
                $("#top nav").addClass('act');
                $("#top button").text('close');
            } else {
                menuClose();
            } */
        });
        $("#menu a").click(()=> {
            menuClose();
        });
    }

    //타이핑 효과
    const text = "안녕하세요.\n계속 성장하며 늘 성실히 앞으로 나아가는\n신다해의 포트폴리오입니다."
    const arrText = [...text]
    const $typeText = $('#typeText');

    let i = 0;
    const tt = ()=> {
        const char = arrText[i++];
        $typeText.append(char === '\n' ? '<br>' : char )
        if(i === arrText.length) clearInterval(timer);

    }

    const timer = setInterval(tt , 150);

    //About Skill (포토샵/일러스트/HTML/CSS ...)
    const progressAni = ()=> {
        let num = 0;
        $("#skill progress").each((i, j)=> {
            num = i * 200; //index를 0.1초씩 곱한다.
            const x = parseInt($("#skill progress").eq(i).text());
            /* console.log(x + '...' + typeof x); */
            $("#skill progress").eq(i).delay(num).animate({value:x}, 1000);
        });
    }


    //포티폴리오에서 (모바일웹 바로가기) 클릭할때
    $(".mobile-1").click(e=> {
        e.preventDefault(); //기본 동작 방지(여기서는 <a>링크 방지)
        window.open(
            e.currentTarget.href,
            'win1',
            'top=50, left=100, width=414, height=740, toolbar=no, scrollbars=no, resizable=no'
        );
        //return fales;
    });
    $(".mobile-1").keypress(e=>{
        if(e.key === "Enter") {
            e.currentTarget.trigger('click'); //<a>링크 이동 전에 먼저 동작한다.
        }
    });

    //이벤트 이미지 클릭 시 큰 이미지 보이기 (팝업 모달)
    $("#event button").click(e=> {
        //버튼 이미지 주소(src) 가져오기
        let src = $(e.currentTarget).children('img').attr('src');
        const alt = $(e.currentTarget).children('img').attr('alt');
        //큰 이미지 주소(scr) 가져오기
        src = src.replace(".jpg", "_big.jpg");
        $("#popup img").attr({"src" : src, "alt":alt});
        $("#popup").fadeIn();
        $("#popup h3").text(alt);
    });
    $("#popup").click(()=> {
        $("#popup").fadeOut();
    });
    $(document).keydown(e=>{
        if(e.key === "Escape") $("#popup").fadeOut();
    });
}); //js 끝.