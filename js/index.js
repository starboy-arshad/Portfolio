$(window).on('load',function(){
  gsap.to('#loader',1,{y:"-100%"});
  gsap.to('#loader',1,{opacity:0});
  gsap.to('#loader',0,{display:"none",delay:1});
  gsap.to('#header',0,{display:"block",delay:1})
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{display:"flex",delay:1});
})
$(function(){
  $('.color-panel').on("click",function(e) {
    e.preventDefault();
    $('.color-changer').toggleClass('color-changer-active');
});
$('.colors a').on("click",function(e) {
  e.preventDefault();
  var attr = $(this).attr("title");
  console.log(attr);
  $('head').append('<link rel="stylesheet" href="css/'+attr+'.css">');
});
});
$(function(){
     $('.menubar').on('click',function(){
         gsap.to('#navigation-content',.6,{y:0});
     })
     $('.navigation-close').on('click',function(){
        gsap.to('#navigation-content',.6,{y:"-100%"});
    });
   }); 

$(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
        document.body.appendChild(css);
      };
})
$(function(){
    function navigateTo(sectionId) {
        // Close the navigation menu
        gsap.to('#navigation-content', .6, {y: "-100%"});
        // Scroll to section smoothly
        document.querySelector(sectionId).scrollIntoView({behavior: 'smooth'});
    }

    $('#home-link').on('click', function(e){ e.preventDefault(); navigateTo('#header'); });
    $('#about-link').on('click', function(e){ e.preventDefault(); navigateTo('#about'); });
    $('#portfolio-link').on('click', function(e){ e.preventDefault(); navigateTo('#portfolio'); });
    $('#contact-link').on('click', function(e){ e.preventDefault(); navigateTo('#contact'); });
    // Footer CTA Link handling
    $('#contact-link-footer').on('click', function(e) {
        e.preventDefault();
        $('#contact-link').click();
    });
})
$(function(){
 var body =  document.querySelector('body');
 var $cursor = $('.cursor')
   function cursormover(e){
    
    gsap.to( $cursor, {
      x : e.clientX ,
      y : e.clientY,
      stagger:.002
     })
   }
   function cursorhover(e){
    gsap.to( $cursor,{
     scale:1.4,
     opacity:1
    })
    
  }
  function cursor(e){
    gsap.to( $cursor, {
     scale:1,
     opacity:.6
    }) 
  }
  $(window).on('mousemove',cursormover);
  $('.menubar').hover(cursorhover,cursor);
  $('a').hover(cursorhover,cursor);
  $('.navigation-close').hover(cursorhover,cursor);

})




// Map each project to its specific image set
const projectImages = {
  "erode-marine-aquarium": [
    "images/erodemarineaquarium.png"
  ],
  "yaseen-tea": [
    "images/yaseentea.png"
  ],
  "app-idea": [
    "images/Screenshot (6).png",
    "images/Screenshot (7).png",
    "images/Screenshot (8).png",
    "images/Screenshot (9).png",
    "images/Screenshot (10).png",
    "images/Screenshot (11).png",
    "images/Screenshot (12).png",
    "images/Screenshot (13).png",
    "images/Screenshot (14).png",
    "images/Screenshot (15).png",
    "images/Screenshot (16).png"
  ],
  "web-designing": [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png"
  ],
  "ui-designing": [
    "images/Screenshot (20).png",
    "images/Screenshot (21).png"
  ],
  "wow-graphics": [
    "images/Screenshot (18).png",
    "images/Screenshot (19).png"
  ]
};

const modal = document.getElementById("portfolio-modal");
const closeBtn = modal.querySelector(".close");
const prevBtn = modal.querySelector(".prev");
const nextBtn = modal.querySelector(".next");
const carousel = modal.querySelector(".carousel");
const viewProjectButtons = document.querySelectorAll('.button a[data-project]');

let currentSlide = 0;
let currentImages = [];

function showSlide(index) {
  const imgs = carousel.querySelectorAll('.carousel-image');
  imgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Load new images into modal carousel
function loadCarousel(images) {
  carousel.innerHTML = '';
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'carousel-image' + (idx === 0 ? ' active' : '');
    img.alt = `Project image ${idx+1}`;
    carousel.appendChild(img);
  });
}

// Show modal on clicking view project, with relevant images
viewProjectButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const key = this.getAttribute('data-project');
    currentImages = projectImages[key] || [];
    if (currentImages.length === 0) return; // No images, do nothing
    currentSlide = 0;
    loadCarousel(currentImages);
    showSlide(currentSlide);
    modal.style.display = "block";
  });
});

// Close modal logic
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Navigate slides
nextBtn.onclick = function () {
  if (!currentImages.length) return;
  currentSlide = (currentSlide + 1) % currentImages.length;
  showSlide(currentSlide);
};

prevBtn.onclick = function () {
  if (!currentImages.length) return;
  currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
  showSlide(currentSlide);
};

// Close when clicking outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Contact Form Handling
$(function() {
  $('#submit').on('click', function() {
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const subject = $('#subject').val().trim();
    const body = $('#body').val().trim();
    const messageBox = $('#form-message');

    if (!name || !email || !subject || !body) {
      messageBox.text('Please fill in all fields.').css({
        'display': 'block',
        'background-color': 'rgba(255, 0, 0, 0.1)',
        'color': '#ff4d4d',
        'border': '1px solid #ff4d4d'
      });
      return;
    }

    // Simulate sending
    $(this).text('Sending...').prop('disabled', true);
    
    setTimeout(() => {
      messageBox.text('Message sent successfully!').css({
        'display': 'block',
        'background-color': 'rgba(0, 255, 0, 0.1)',
        'color': '#2ecc71',
        'border': '1px solid #2ecc71'
      });
      $('#submit').text('Submit').prop('disabled', false);
      $('#myForm')[0].reset();
      
      setTimeout(() => {
        messageBox.fadeOut();
      }, 5000);
    }, 1500);
  });
});

// Skill Bars Animation on Scroll
$(function() {
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).find('.prog div').each(function() {
          const width = $(this).text();
          $(this).css('width', width);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});

// Back to Top Logic
$(function() {
    const backToTop = $('#back-to-top');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            backToTop.addClass('active');
        } else {
            backToTop.removeClass('active');
        }
    });
    
    backToTop.on('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
