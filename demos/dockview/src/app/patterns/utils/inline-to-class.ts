import { load } from "cheerio"
import _ from "lodash"

export const inlineToClass = (html: any) => {
  const $ = load(html)

  const styleMap = new Map()

  $("*").each((i, val) => {
    const inlineStyle = $(val).attr("style")
    if (inlineStyle) {
      const existingClassName = styleMap.get(inlineStyle)
      if (existingClassName) {
        $(val).addClass(existingClassName)
      } else {
        const className = `class-${i}`
        styleMap.set(inlineStyle, className)
        $(val).addClass(className)
      }
      $(val).removeAttr("style")
    }
  })

  const styleRules = Array.from(styleMap.entries()).map(([style, className]) => `.${className} { ${style} }`)
  const deduplicatedStyleRules = _.uniq(styleRules)

  const styleTag = `<style>${deduplicatedStyleRules.join("\n")}</style>`
  $("body").append(styleTag)

  return $.html()
}
