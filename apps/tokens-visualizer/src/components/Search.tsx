"use client"
import { Box, Combobox, Icon, Input, InputGroup, Portal, useFilter, useListCollection } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import { flushSync } from "react-dom"
import React from "react"
import _ from 'lodash'
import { searchSelector } from "../actors/selectors"

export const Search = (props: any) => {
  const { dictionary, searchQuery, isReady, updateSearch } = searchSelector()

  const contentRef = useRef<HTMLDivElement | null>(null)

  const { startsWith } = useFilter({ sensitivity: "base" })
  const { collection, filter, reset, set } = useListCollection({
    initialItems: dictionary,
    filter: startsWith,
  })

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 28,
    overscan: 10,
    scrollPaddingEnd: 32,
  })
  const handleScrollToIndexFn = (details: { index: number }) => {

    flushSync(() => {
      virtualizer.scrollToIndex(details.index, {
        align: "center",
        behavior: "auto",
      })
    })
  }
  const handleInputChange = (details: any) => {

    if (details.inputValue.length === 0) {
      return
    }

    const filteredItems: any = _.filter(dictionary, (item: any) =>
      _.includes(_.toLower(item.value), _.toLower(details.inputValue))
    )
    set(filteredItems)
    updateSearch(details.inputValue, filteredItems)
  }


  return (
    <>
      {isReady && (
        <Combobox.Root
          lazyMount={false}
          openOnClick={true}
          // openOnKeyPress={true}
          skipAnimationOnMount={true}
          // closeOnSelect={true}
          inputBehavior={'autocomplete'}
          collection={collection}
          onInputValueChange={handleInputChange}
          scrollToIndexFn={handleScrollToIndexFn}
          width="320px"
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Type to search" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger onClick={reset} />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content ref={contentRef}>
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const item: any = collection.items[virtualItem.index]
                    return (
                      <Combobox.Item
                        key={item.value}
                        item={item}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Combobox.ItemText truncate>{item.value}</Combobox.ItemText>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    )
                  })}
                </div>
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      )}
    </>
  )
}
