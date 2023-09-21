if (!customElements.get('responsive-video')) {
  class ResponsiveVideo extends HTMLElement {
    constructor() {
      super();
      this.poster = this.querySelector('[id^="Lazy-Video-Poster-"]');
      this.onMobile = window.innerWidth <= 749 ? true : false;
      this.playVideoManually = JSON.parse(this.dataset.manualVideoPlay);

      const content = document.createElement('div');
      if (this.onMobile) {
        content.appendChild(
          this.querySelector('[id^="Responsive-Video-Poster-Template-"]')
            .content.querySelector('[id^="Responsive-Video-Section-Mobile-Poster-"]')
            .cloneNode(true)
        );
      } else {
        content.appendChild(
          this.querySelector('[id^="Responsive-Video-Poster-Template-"]')
            .content.querySelector('[id^="Responsive-Video-Section-Desktop-Poster-"]')
            .cloneNode(true)
        );
      }
      this.querySelector('[id^="Lazy-Video-Poster-"]').appendChild(content.querySelector('img, svg'));

      if (!this.poster) return;
      this.poster.addEventListener('click', this.loadContent.bind(this));
    }

    connectedCallback() {
      const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(this);
        if (!this.playVideoManually) this.loadContent();
      };

      new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '-50% 0% -50% 0%' }).observe(this);
    }

    loadContent(focus = true) {
      window.pauseAllMedia();
      if (!this.getAttribute('loaded')) {
        const content = document.createElement('div');
        if (this.onMobile) {
          content.appendChild(
            this.querySelector('[id^="Responsive-Video-Template-"]')
              .content.querySelector('[id^="Responsive-Video-Section-Mobile-"]')
              .cloneNode(true)
          );
        } else {
          content.appendChild(
            this.querySelector('[id^="Responsive-Video-Template-"]')
              .content.querySelector('[id^="Responsive-Video-Section-Desktop-"]')
              .cloneNode(true)
          );
        }
        this.setAttribute('loaded', true);
        const lazyElement = this.appendChild(content.querySelector('video, iframe'));

        if (focus) lazyElement.focus();
        if (lazyElement.nodeName == 'VIDEO' && lazyElement.getAttribute('autoplay')) {
          lazyElement.play();
        }
      }
    }
  }

  customElements.define('responsive-video', ResponsiveVideo);
}
