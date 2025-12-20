import { defineSlotRecipe } from "@chakra-ui/react/styled-system"

export const jsonViewTreeSlotRecipe = defineSlotRecipe({
  className: "json-view",

  slots: [
    "root",
    "pair",
    "property",
    "index",
    "number",
    "string",
    "boolean",
    "null",
    "indent",
    "chevron",
    "size",
    "copy",
    "edit",
    "link",
    "input",
    "deleting",
    "button",
    "icon",
  ],

  base: {
    /* ================= ROOT ================= */

    root: {
      display: "block",
      color: "#4d4d4d",
      textAlign: "left",

      "--json-property": "#009033",
      "--json-index": "#676dff",
      "--json-number": "#676dff",
      "--json-string": "#b2762e",
      "--json-boolean": "#dc155e",
      "--json-null": "#dc155e",

      "& svg": {
        verticalAlign: "-10%",
      },

      /* show actions on hover */
      _hover: {
        "& :is([data-slot=copy], [data-slot=edit])": {
          display: "inline-block",
        },
        "& [data-slot=link] svg": {
          display: "inline-block",
        },
      },
    },

    /* ================= PAIR ================= */

    pair: {
      _hover: {
        "& :is([data-slot=copy], [data-slot=edit])": {
          display: "inline-block",
        },
        "& [data-slot=link] svg": {
          display: "inline-block",
        },
      },
    },

    /* ================= VALUE TYPES ================= */

    property: { color: "var(--json-property)" },
    index: { color: "var(--json-index)" },
    number: { color: "var(--json-number)" },
    string: { color: "var(--json-string)" },
    boolean: { color: "var(--json-boolean)" },
    null: { color: "var(--json-null)" },

    /* ================= STRUCTURE ================= */

    indent: {
      paddingLeft: "1em",
    },

    chevron: {
      // display: "inline-block",
      // verticalAlign: "-20%",
      cursor: "pointer",
      opacity: 0.4,
      // width: "1em",
      // height: "1em",
      _hover: { opacity: 0.8 },
    },

    size: {
      cursor: "pointer",
      opacity: 0.4,
      // fontSize: "0.875em",
      // fontStyle: "italic",
      // marginLeft: "0.5em",
      // verticalAlign: "-5%",
      // lineHeight: 1,

      /* size hover affects chevron */
      "&:hover + [data-slot=chevron]": {
        opacity: 0.8,
      },
    },

    /* ================= ACTIONS ================= */

    copy: {
      // display: "none",
      // width: "1em",
      // height: "1em",
      // marginLeft: "0.25em",
      cursor: "pointer",
    },

    edit: {
      // display: "none",
      // width: "1em",
      // height: "1em",
      // marginLeft: "0.25em",
      cursor: "pointer",
    },

    link: {
      "& svg": {
        // display: "none",
        // width: "1em",
        // height: "1em",
        // marginLeft: "0.25em",
        cursor: "pointer",
      },
    },

    /* ================= INPUT / STATE ================= */

    input: {
      width: "120px",
      marginLeft: "0.25em",
      borderRadius: "4px",
      border: "1px solid currentColor",
      padding: "0px 4px",
      fontSize: "87.5%",
      lineHeight: "1.25",
      background: "transparent",
    },

    deleting: {
      outline: "1px solid #da0000",
      backgroundColor: "#da000011",
      textDecorationLine: "line-through",
    },

    button: {
      background: "transparent",
      outline: "none",
      border: "none",
      cursor: "pointer",
      color: "inherit",
    },

    icon: {
      verticalAlign: "-16%",
    },
  },

  /* ================= THEMES ================= */

  variants: {
    theme: {
      a11y: {
        root: {
          color: "#545454",
          "--json-property": "#aa5d00",
          "--json-index": "#007299",
          "--json-number": "#007299",
          "--json-string": "#008000",
          "--json-boolean": "#d91e18",
          "--json-null": "#d91e18",
        },
      },

      github: {
        root: {
          color: "#005cc5",
          "--json-property": "#005cc5",
          "--json-index": "#005cc5",
          "--json-number": "#005cc5",
          "--json-string": "#032f62",
          "--json-boolean": "#005cc5",
          "--json-null": "#005cc5",
        },
      },

      vscode: {
        root: {
          color: "#005cc5",
          "--json-property": "#0451a5",
          "--json-index": "#0000ff",
          "--json-number": "#0000ff",
          "--json-string": "#a31515",
          "--json-boolean": "#0000ff",
          "--json-null": "#0000ff",
        },
      },

      atom: {
        root: {
          color: "#383a42",
          "--json-property": "#e45649",
          "--json-index": "#986801",
          "--json-number": "#986801",
          "--json-string": "#50a14f",
          "--json-boolean": "#0184bc",
          "--json-null": "#0184bc",
        },
      },

      winterIsComing: {
        root: {
          color: "#0431fa",
          "--json-property": "#3a9685",
          "--json-index": "#ae408b",
          "--json-number": "#ae408b",
          "--json-string": "#8123a9",
          "--json-boolean": "#0184bc",
          "--json-null": "#0184bc",
        },
      },
    },
  },
})
