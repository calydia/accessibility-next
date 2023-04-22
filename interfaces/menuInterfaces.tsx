export interface MenuData {
  data: {
    renderNavigation: [{
      path: string,
      title: string,
      iconClass: string,
      type: string,
      items?: [{
        path: string,
        title: string,
        iconClass: string,
        type: string,
        items?: [{
          path: string,
          title: string,
          iconClass: string,
          type: string,
        }]
      }]
    }]
  }
}

export interface MainMenuSitemapData {
  renderNavigation: [{
    path: string,
    title: string,
    iconClass: string,
    type: string,
    items?: [{
      path: string,
      title: string,
      iconClass: string,
      type: string,
      items?: [{
        path: string,
        title: string,
        iconClass: string,
        type: string,
        items?: [{
          path: string,
          title: string,
          iconClass: string,
          type: string,
        }]
      }]
    }]
  }]
}

export interface MainMenuData {
  data: {
    renderNavigation: [{
      path: string,
      title: string,
      iconClass: string,
      type: string,
      items?: [{
        path: string,
        title: string,
        iconClass: string,
        type: string,
        items?: [{
          path: string,
          title: string,
          iconClass: string,
          type: string,
          items?: [{
            path: string,
            title: string,
            iconClass: string,
            type: string,
          }]
        }]
      }]
    }]
  }
}

export interface FooterMenuItem {
  path: string,
  title: string,
  iconClass: string
}

export interface MainMenuItem {
  path: string,
  title: string,
  iconClass: string,
  type: string,
  items?: [{
    path: string,
    title: string,
    iconClass: string,
    type: string,
    items?: [{
      path: string,
      title: string,
      iconClass: string,
      type: string,
    }]
  }]
}
