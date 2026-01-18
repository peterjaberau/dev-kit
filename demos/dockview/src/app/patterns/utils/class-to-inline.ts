import { load } from "cheerio"
import _ from "lodash"

export const classToInline = (html: any) => {
  const $ = load(html)

  const styleMap = new Map()

  // Process existing <style> tag
  $("style").each((i, val) => {
    if (!$(val).html()) return
    //@ts-ignore
    const styleRules = $(val).html().split("}")
    styleRules.forEach((rule) => {
      const [selector, style]: any = rule.split("{")
      const classNames = selector.trim().slice(1).split(".")
      classNames.forEach((className: any) => {
        if (className) {
          styleMap.set(className, style)
        }
      })
    })
    $(val).remove()
  })

  // Process elements with class attributes
  $("[class]").each((i, val) => {
    if (!$(val).attr("class")) return
    //@ts-ignore
    const classNames = $(val).attr("class").split(" ")
    const inlineStyles = classNames.map((className) => styleMap.get(className)).filter(Boolean)
    if (inlineStyles.length > 0) {
      const mergedStyles = _.uniq(inlineStyles).join("; ")
      $(val).attr("style", mergedStyles)
    }
    $(val).removeAttr("class")
  })

  return $.html()
}
