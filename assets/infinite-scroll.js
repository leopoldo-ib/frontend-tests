class InfiniteScroll extends HTMLElement {
  constructor() {
    super();

    this.nextUrl = this.dataset.nextUrl;
    this.productsLoadingType = this.dataset.productsLoadingType;
    this.sectionToRender = this.dataset.sectionToRender;
    this.requestPending = false;

    if (this.productsLoadingType === 'load_more_button')
      this.loadMoreButton = this.querySelector('#infinite-scroll-load-more');
  }

  connectedCallback() {
    if (this.productsLoadingType === 'load_more_button') {
      this.loadMoreButton.addEventListener('click', this.fecthNextProducts.bind(this));
    }
    if (this.productsLoadingType === 'infinite_scroll') {
      const handleIntersection = (entries, observer) => {
        if (this.nextUrl && entries[0].isIntersecting === true) {
          this.fecthNextProducts();
        } else if (!this.nextUrl && entries[0].isIntersecting === true) {
          observer.unobserve(this);
        }
      };

      new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 500px 0px' }).observe(this);
    }
  }

  fecthNextProducts() {
    if (this.requestPending) return;
    this.requestPending = true;
    this.setVisualPendingState();
    fetch(`${this.nextUrl}&sections=${this.sectionToRender}`)
      .then((response) => response.json())
      .then((response) => {
        this.insertNewProducts(response);
        this.setVisualPendingState();
        this.requestPending = false;
      });
  }

  insertNewProducts(response) {
    let nextSection = new DOMParser().parseFromString(response[`${this.sectionToRender}`], 'text/html');
    let nextItems = nextSection.getElementById('product-grid').innerHTML;
    let actualProductGrid = document.getElementById('product-grid');
    actualProductGrid.insertAdjacentHTML('beforeend', nextItems);
    let updatedNextUrl = nextSection.querySelector('#infinite-scroll-sentinel');
    this.nextUrl = updatedNextUrl.dataset.nextUrl;
  }

  setVisualPendingState() {
    this.classList.toggle('infinite-scroll--loading');
  }
}

customElements.define('infinite-scroll', InfiniteScroll);
