"use client"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { GraphModel, GraphState } from "#models/graph-model"

import { StringMatchSearchResult, StringMatchDictionaryItem } from "#workers/string-match.worker"

import { chakra, Combobox, Icon, Input, InputGroup, Portal, useFilter, useListCollection } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useVirtualizer } from "@tanstack/react-virtual"
import { flushSync } from "react-dom"
import _ from "lodash"
import { searchSelector } from "#actors/selectors"
import { dispatchCustomEvent } from "#utils"

import { useStringMatchWorker } from "#hooks/useStringMatchWorker"
export const TokenSearch: React.FC<any> = ({
  graphState = GraphModel.DEFAULT_STATE as GraphState,
  dictionary = [],
  onSelectId,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StringMatchSearchResult[]>([])
  const contentRef = useRef<HTMLDivElement | null>(null)
  useStringMatchWorker(dictionary, searchQuery, (data: any) => {
    setSearchResults(data)
  })
  const { startsWith } = useFilter({ sensitivity: "base" })
  const { collection, set, reset } = useListCollection({
    initialItems: searchResults,
    filter: startsWith,
  })

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 28,
    overscan: 10,
    scrollPaddingEnd: 32,
  })

  const handleScrollToIndexFn = ({ index }: { index: number }) => {
    flushSync(() => {
      virtualizer.scrollToIndex(index, { align: "center", behavior: "auto" })
    })
  }

  const handleInputValueChange = ({ inputValue }: { inputValue: string }) => {
    setSearchQuery(inputValue)

    if (!inputValue) {
      set(dictionary)
      return
    }

    // Filter current worker results
    const filteredItems = _.filter(searchResults, (item) => _.includes(_.toLower(item.value), _.toLower(inputValue)))
    set(filteredItems)
  }

  const handleValueChange = () => {
    const lastSelected = collection.lastValue
    if (lastSelected) {
      onSelectId?.(lastSelected)
      setSearchQuery("")
    }
  }

  return (
    <Combobox.Root
      value={[]} // We don’t track selected items visually in multi-select
      inputValue={searchQuery}
      onValueChange={handleValueChange}
      onInputValueChange={handleInputValueChange}
      multiple={true}
      openOnKeyPress
      skipAnimationOnMount
      closeOnSelect={false}
      inputBehavior="autocomplete"
      collection={collection}
      scrollToIndexFn={handleScrollToIndexFn}
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
            <chakra.div
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
                    css={{
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
                    <Combobox.ItemText dangerouslySetInnerHTML={{ __html: item.matchMarkup }} />
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </chakra.div>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
