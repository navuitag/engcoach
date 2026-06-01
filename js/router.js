const Router = {
  routes: {},
  currentRoute: "dashboard",

  register(path, handler) {
    this.routes[path] = handler;
  },

  init() {
    window.addEventListener("hashchange", () => this.navigate());
    this.navigate();
  },

  getRoute() {
    const hash = window.location.hash.slice(1) || "/dashboard";
    const [path, ...params] = hash.split("/").filter(Boolean);
    return { path: path || "dashboard", params };
  },

  navigate(path) {
    if (path) {
      window.location.hash = path.startsWith("/") ? path : `/${path}`;
      return;
    }
    const { path: routePath, params } = this.getRoute();
    this.currentRoute = routePath;
    const handler = this.routes[routePath] || this.routes.dashboard;
    if (handler) {
      handler(params);
    }
    this.updateNav();
  },

  go(path) {
    window.location.hash = `/${path}`;
  },

  updateNav() {
    document.querySelectorAll("[data-nav]").forEach((el) => {
      const route = el.getAttribute("data-nav");
      el.classList.toggle("nav-active", route === this.currentRoute);
    });
  }
};
