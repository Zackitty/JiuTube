export const theme = {
  global: {
    font: {
      color: "#363135",
      family: 'Arial',
      size: '16px',
      height: '20px',
    },
    focus: {
      border: {
        color: "#DBD9DB"
      },
    },
    hover: {
      color: "#ED2D23"
    }
  },
  anchor: {
    fontWeight: "normal",
    hover: {
      textDecoration: "none",
      extend: "color: #ED2D23"
    }
  },
  tabs: {
    extend: "width: 100%",
  },
  tab: {
    color: "#363135",
    hover: {
      color: "#ED2D23",
    },
    active: {
      color: "#ED2D23",
    },
    border: {
      color: "#363135",
      active: {
        color: "#ED2D23"
      },
      hover: {
        color: "#ED2D23"
      }
    },
  },
  image: {
    extend: "border-radius: 5px; max-width: 100%; height: auto;"
  },
};