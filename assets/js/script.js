var ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

// On Ready
ready(() => {
  initPopup();
  initVideoPopup();
  initStoryVideos();
  initTestimonials();
  initPartners();
  initTags();
  initScroll();
  initOS();
  initReveal();
  initRedirect();
  initCleanLinks();
  initPricingGetStarted();
  initBackForwardCacheRestore();
});

// When user returns via back button (bfcache restore), reset layout so header/content aren't shifted
function initBackForwardCacheRestore() {
  window.addEventListener('pageshow', function(event) {
    if (!event.persisted) return;
    // Reset scroll (can be wrong after bfcache restore)
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    // Clear body state that might have been left when navigating away (e.g. popup open)
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    // Close any popups that were visible when user navigated away
    document.querySelectorAll('.popup.visible').forEach(function(popup) {
      popup.classList.remove('open');
      popup.classList.remove('visible');
    });
  });
}

function initPopup() {
  function preventDefault(e) {
    e.preventDefault();
  }

  // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      }
    }));
  } catch (e) {
  }
  var wheelOpt = supportsPassive ? {passive: false} : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function disableScroll() {
    if (window.innerHeight > 600) {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
  }

  function enableScroll() {
    if (window.innerHeight > 600) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
  }

  function togglePopup(event) {
    var target = event.currentTarget.area, isNavbar = event.currentTarget.navbar;
    if (target) {
      if (target.classList.contains('visible')) {
        setTimeout(function () {
          target.classList.remove('open');
          if (isNavbar) {
            document.body.classList.remove('menu-open');
            //enableScroll();
          }
          setTimeout(function () {
            target.classList.remove('visible');
          }, 250);
        }, 25);
      } else {
        target.classList.add('visible');
        setTimeout(function () {
          target.classList.add('open');
        }, 25);
        setTimeout(function () {
          if (isNavbar) {
            document.body.classList.add('menu-open');
            //disableScroll();
          }
        }, 300);
      }
    }
    return false;
  }

  function showPopup(target) {
    if (!target) return false;
    target.classList.add('visible');
    setTimeout(function () {
      target.classList.add('open');
    }, 25);
    return false;
  }

  function closePopups(event) {
    var target = event.target.closest('.popup');
    setTimeout(function () {
      target.classList.remove('open');
      setTimeout(function () {
        target.classList.remove('visible');
      }, 250);
    }, 25);
    return false;
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function acceptConsent(event) {
    setCookie('Consent_Status', 'granted', 90);
    closePopups.call(this, event);
  }

  function rejectConsent(event) {
    setCookie('Consent_Status', 'denied', 90);
    closePopups.call(this, event);
  }

  var navbar = document.querySelector('.header__nav'),
    toggle = document.querySelector('.header__toggle'),
    close = navbar ? navbar.querySelector('.header__close') : null;

  if (toggle && navbar) {
    toggle.area = navbar;
    toggle.navbar = true;
    toggle.addEventListener('click', togglePopup, false);
  }

  if (close && navbar) {
    close.area = navbar;
    close.navbar = true;
    close.addEventListener('click', togglePopup, false);
  }

  document.querySelectorAll('.close-nav').forEach((link) => {
    if (navbar) {
      link.area = navbar;
      link.addEventListener('click', togglePopup, false);
      link.navbar = true;
    }
  });

  document.querySelectorAll('.popup-open').forEach((link) => {
    var target = link.getAttribute('href');
    // Skip if href is a URL path (starts with / or http) rather than a CSS selector
    if (target && (target.startsWith('/') || target.startsWith('http://') || target.startsWith('https://'))) {
      return; // Skip this link, it's not a popup trigger
    }
    var popup = document.querySelector(target);
    if (popup) {
      link.area = popup;
      // Skip pricing-get-started buttons - they'll be handled separately
      if (!link.classList.contains('pricing-get-started')) {
        link.addEventListener('click', togglePopup, false);
      }
    }
  });

  document.querySelectorAll('.popup').forEach((popup) => {
    let link = popup.querySelector('.popup__close');
    if (link) {
      link.area = popup;
      link.addEventListener('click', closePopups, false);
    }
  });

  let c = getCookie('Consent_Status');
  if (!c) {
    // Wait a bit to ensure DOM is fully ready
    setTimeout(function() {
      document.querySelectorAll('.cookies-consent').forEach((consent) => {
        const acceptBtn = consent.querySelector('.cookie-accept');
        const rejectBtn = consent.querySelector('.cookie-reject');
        if (acceptBtn) acceptBtn.addEventListener('click', acceptConsent, false);
        if (rejectBtn) rejectBtn.addEventListener('click', rejectConsent, false);
      });

      let t = document.querySelector('#cookies-consent');
      if (t) {
        showPopup(t);
      }
    }, 100);
  }

  // If page was loaded with #download-app in the URL, open the download popup
  function openDownloadPopupIfHash() {
    if (window.location.hash !== '#download-app') return;
    var downloadPopup = document.querySelector('#download-app');
    if (downloadPopup && !downloadPopup.classList.contains('visible')) {
      showPopup(downloadPopup);
    }
  }
  if (window.location.hash === '#download-app') {
    setTimeout(openDownloadPopupIfHash, 150);
    if (document.readyState === 'complete') {
      setTimeout(openDownloadPopupIfHash, 300);
    } else {
      window.addEventListener('load', function() {
        setTimeout(openDownloadPopupIfHash, 50);
      });
    }
  }
  window.addEventListener('hashchange', openDownloadPopupIfHash);
}

function initVideoPopup() {
  // Create video popup element if it doesn't exist
  let videoPopup = document.querySelector('.popup--video');
  if (!videoPopup) {
    videoPopup = document.createElement('div');
    videoPopup.className = 'popup popup--video';
    videoPopup.innerHTML = `
      <div class="popup--video__container">
        <video class="popup--video__video" controls autoplay muted></video>
        <div class="popup--video__close"></div>
      </div>
      <div class="popup--video__background"></div>
    `;
    document.body.appendChild(videoPopup);
  }

  const videoElement = videoPopup.querySelector('.popup--video__video');
  const closeButton = videoPopup.querySelector('.popup--video__close');
  const background = videoPopup.querySelector('.popup--video__background');

  // Handle video popup triggers
  document.querySelectorAll('.popup-video-trigger').forEach((trigger) => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const videoSource = this.getAttribute('data-video-source');
      if (videoSource) {
        // Reset video
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.src = videoSource;
        videoElement.load(); // Force reload
        
        // Add error handling
        videoElement.addEventListener('error', function(e) {
          console.error('Video error:', e);
          console.error('Video error details:', videoElement.error);
        }, { once: true });
        
        videoPopup.classList.add('visible');
        setTimeout(function() {
          videoPopup.classList.add('open');
          // Wait for video to have enough data before playing
          const tryPlay = () => {
            if (videoElement.readyState >= 2) {
              videoElement.play().catch(function(error) {
                console.log('Autoplay prevented or play failed:', error);
                // User can click play manually
              });
            }
          };
          
          // Try immediately if ready
          tryPlay();
          
          // Also wait for canplay event (video has enough data to start)
          videoElement.addEventListener('canplay', tryPlay, { once: true });
          
          // And wait for loadeddata (metadata loaded)
          videoElement.addEventListener('loadeddata', function() {
            if (videoElement.paused) {
              tryPlay();
            }
          }, { once: true });
        }, 25);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close popup handlers
  function closeVideoPopup() {
    videoPopup.classList.remove('open');
    setTimeout(function() {
      videoPopup.classList.remove('visible');
      videoElement.pause();
      videoElement.src = '';
      document.body.style.overflow = '';
    }, 250);
  }

  closeButton.addEventListener('click', closeVideoPopup);
  background.addEventListener('click', closeVideoPopup);

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoPopup.classList.contains('visible')) {
      closeVideoPopup();
    }
  });
}

function initStoryVideos() {
  // Preserve playback position and prevent unexpected resets
  document.querySelectorAll('.story__image video').forEach((video) => {
    let savedTime = 0;
    let wasPlaying = false;
    
    // Save current time periodically
    setInterval(() => {
      if (!video.ended && video.currentTime > 0) {
        savedTime = video.currentTime;
      }
    }, 1000);
    
    // If video gets reset to beginning unexpectedly, restore position
    video.addEventListener('loadeddata', function() {
      // If we have a saved time and video is at the beginning, restore it
      if (savedTime > 1 && this.currentTime < 1 && this.duration > savedTime) {
        this.currentTime = savedTime;
        if (wasPlaying) {
          this.play().catch(() => {});
        }
      }
    });
    
    // Track playing state
    video.addEventListener('play', function() {
      wasPlaying = true;
    });
    
    video.addEventListener('pause', function() {
      wasPlaying = false;
      // Save time when paused
      if (this.currentTime > 0) {
        savedTime = this.currentTime;
      }
    });
    
    // If video time jumps to 0 unexpectedly, restore
    let lastKnownTime = 0;
    video.addEventListener('timeupdate', function() {
      if (this.currentTime > 0) {
        lastKnownTime = this.currentTime;
      } else if (lastKnownTime > 1 && this.duration > lastKnownTime) {
        // Time jumped to 0 unexpectedly, restore
        this.currentTime = lastKnownTime;
      }
    });
  });
}

function initTestimonials() {
  const testimonials = document.querySelectorAll('.box__testimonials');
  testimonials.forEach((entry, index) => {
    entry.classList.add('init');
    entry.querySelector('.swiper').classList.add('testimonials-swiper-' + (index + 1));
    new Swiper('.testimonials-swiper-' + (index + 1), {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  });
}

function initPartners() {
  const partners = document.querySelectorAll('.partners');
  partners.forEach((partner, index) => {
    partner.querySelector('.partners__logos').classList.add('init');
    partner.querySelector('.swiper').classList.add('partners-swiper-' + (index + 1));
    new Swiper('.partners-swiper-' + (index + 1), {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 5
        },
        768: {
          spaceBetween: 15
        },
        1200: {
          slidesPerView: 4,
          centeredSlides: false
        },
      }
    });
  });
}

function initTags() {
  if (document.querySelector('.blog__tags')) {

    const tags = document.querySelector('.blog__tags');
    const space = document.querySelector('.blog__space');

    const fixedClass = 'blog__tags-fixed';
    const fixedClassBottom = 'blog__tags-fixed-bottom';

    let offsetTop = 526;
    let offsetbottom = 1130;

    const initOffset = () => {
      offsetTop = 526;
      offsetbottom = 1130;
      if (window.innerWidth >= 1200) {
        offsetTop = 735;
        offsetbottom = 870;
      }
    }

    let allHeight = space.getBoundingClientRect().height + tags.getBoundingClientRect().height - offsetbottom;
    setTimeout(function () {
      allHeight = space.getBoundingClientRect().height + tags.getBoundingClientRect().height - offsetbottom;
    }, 1000);

    let updating = false
    const handleScroll = () => {
      if (window.scrollY >= offsetTop || window.pageYOffset >= offsetTop) {
        tags.classList.add(fixedClass);
        if (window.scrollY >= allHeight || window.pageYOffset >= allHeight) {
          tags.classList.add(fixedClassBottom);
        } else {
          tags.classList.remove(fixedClassBottom);
        }
      } else {
        tags.classList.remove(fixedClass);
      }
      updating = false;
    }

    tags.querySelectorAll('.blog__tags-list a').forEach((link) => {
      var target = link.getAttribute('href');
      target = target.replaceAll('#', '');
      target = document.getElementById(target);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToView(target);
      }, false);
    });

    window.onscroll = () => {
      if (updating) {
        return;
      } else {
        updating = true;
        requestAnimationFrame(handleScroll);
      }
    }

    window.onresize = () => {
      initOffset();
      handleScroll();
    }
    initOffset();
    handleScroll();
  }
}

function initScroll() {
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  window.scrollToView = (elem) => {
    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: elem.getBoundingClientRect().top + window.pageYOffset
      });
    } else {
      elem.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }

  document.querySelectorAll('.scrollto').forEach((link) => {
    var target = link.getAttribute('href');
    target = target.replaceAll('#', '');
    target = document.getElementById(target);
    link.addEventListener('click', function (event) {
      event.preventDefault();
      scrollToView(target);
    }, false);
  });
}

function initOS() {
  let OSName = 'Unknown OS';
  var ua = navigator.userAgent;
  var platform = (navigator.platform || '').toLowerCase();

  // Raspberry Pi first: Chromium 113+ on Pi often spoofs UA to "Linux x86_64", but navigator.platform
  // still reports "Linux armv7l" or "Linux aarch64". Trust platform for ARM so Pi is never mis-detected as Mac/Linux x86.
  if (/armv[67]l|aarch64/.test(platform)) {
    OSName = /aarch64/.test(platform) ? 'Raspberry Pi 64' : 'Raspberry Pi';
  }
  if (ua.indexOf('Raspberry') !== -1 || ua.indexOf('Raspbian') !== -1) {
    OSName = (/aarch64|arm64/i.test(ua) || /aarch64/.test(platform)) ? 'Raspberry Pi 64' : 'Raspberry Pi';
  }

  if (OSName !== 'Unknown OS') {
    // Already identified as Raspberry Pi; skip other OS checks
  } else if (ua.indexOf('Win') !== -1) {
    OSName = 'Windows';
  } else if (ua.indexOf('Mac') !== -1 && ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1) {
    OSName = 'MacOS ARM'; // default; may be corrected to MacOS Intel via userAgentData below
  } else if (ua.indexOf('iPod') !== -1 || ua.indexOf('iPad') !== -1 || ua.indexOf('iPhone') !== -1) {
    OSName = "iOS";
  } else if (ua.indexOf('Android') !== -1) {
    OSName = 'Android';
  } else if (ua.indexOf('Linux') !== -1) {
    var isArm = ua.indexOf('arm') !== -1 || ua.indexOf('aarch64') !== -1 || /aarch64|armv[67]l|arm64/i.test(ua);
    OSName = (/aarch64|arm64/i.test(ua)) ? 'Raspberry Pi 64' : (isArm ? 'Raspberry Pi' : 'Linux');
  }

  let os = OSName.toLowerCase().replace(/\s+/g, '-');

  function applyDetectedOS(selectedOs) {
    document.querySelectorAll('.detect-os').forEach((entry) => {
      var target = entry.querySelector('.' + selectedOs);
      if (target) {
        var all = entry.querySelectorAll('.os');
        all.forEach((one) => {
          one.classList.add('hide');
        });
        target.classList.remove('hide');
      }
    });
  }
  applyDetectedOS(os);

  // Mac: try to distinguish ARM vs Intel via User-Agent Client Hints (Chrome/Edge)
  if (os === 'macos-arm' && navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
    navigator.userAgentData.getHighEntropyValues(['architecture']).then(function (hints) {
      if (hints.architecture === 'x86') {
        applyDetectedOS('macos-intel');
      }
    }).catch(function () {});
  }

  return os;
}

function initReveal() {
  AOS.init();
}

function initRedirect() {
  window.DoTheRedirect = (url) => {
    window.location = url;
  }
  window.ThankYouRedirect = (redirect_link) => {
    var RedirectURL = redirect_link;
    var RedirectPauseSeconds = 5;
    setTimeout("DoTheRedirect('" + RedirectURL + "')", parseInt(RedirectPauseSeconds * 1000));
  }
}

function initCleanLinks() {
  // Prevent Google Analytics link decoration on Terms and Privacy Policy links
  const cleanLinks = document.querySelectorAll('a[href*="diode.io/terms"], a[href*="diode.io/privacy-policy"]');
  cleanLinks.forEach(link => {
    // Store the clean URL
    const cleanUrl = link.href.split('?')[0];
    
    // Prevent link decoration by intercepting the click
    link.addEventListener('click', function(e) {
      // If the href has been decorated with query params, use the clean URL
      if (link.href !== cleanUrl && link.href.includes('?')) {
        e.preventDefault();
        window.open(cleanUrl, link.target || '_self', 'noopener');
      }
    });
    
    // Also set data attribute to prevent GTM decoration
    link.setAttribute('data-gtag-outbound', 'false');
  });
}

function initPricingGetStarted() {
  // Handle "Get Started" buttons on pricing page
  // On large screens: open download overlay
  // On small screens (mobile): detect iOS/Android and route to appropriate store
  document.querySelectorAll('.pricing-get-started').forEach((button) => {
    // Only handle buttons that have store URLs (pricing page buttons)
    if (!button.hasAttribute('data-ios-url') || !button.hasAttribute('data-android-url')) {
      return;
    }
    
    // The button.area should already be set by initPopup() above
    // Handle all clicks ourselves
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if screen is mobile (below md breakpoint: 768px)
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Detect iOS or Android
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isAndroid = /android/i.test(userAgent);
        
        // Get store URLs from data attributes
        const iosUrl = button.getAttribute('data-ios-url');
        const androidUrl = button.getAttribute('data-android-url');
        
        // Route to appropriate store
        if (isIOS && iosUrl) {
          window.location.href = iosUrl;
        } else if (isAndroid && androidUrl) {
          window.location.href = androidUrl;
        } else {
          // Fallback: if device not detected, open the popup manually
          if (button.area) {
            const popup = button.area;
            if (popup.classList.contains('visible')) {
              setTimeout(function () {
                popup.classList.remove('open');
                setTimeout(function () {
                  popup.classList.remove('visible');
                }, 250);
              }, 25);
            } else {
              popup.classList.add('visible');
              setTimeout(function () {
                popup.classList.add('open');
              }, 25);
            }
          }
        }
      } else {
        // On large screens, open the download overlay manually
        if (button.area) {
          const popup = button.area;
          if (popup.classList.contains('visible')) {
            setTimeout(function () {
              popup.classList.remove('open');
              setTimeout(function () {
                popup.classList.remove('visible');
              }, 250);
            }, 25);
          } else {
            popup.classList.add('visible');
            setTimeout(function () {
              popup.classList.add('open');
            }, 25);
          }
        }
      }
      return false;
    });
  });
}
