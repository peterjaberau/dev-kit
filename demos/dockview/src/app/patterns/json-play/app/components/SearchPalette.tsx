import { useJsonSearchApi, useJsonSearchState } from "../hooks/useJsonSearch"
import { ChevronRightIcon, ExclamationTriangleIcon as ExclamationIcon } from "@heroicons/react/24/outline"
import { LuSearch as SearchIcon } from "react-icons/lu"
import { EscapeKeyIcon } from "./Icons/EscapeKeyIcon"
import { ArrowKeysUpDownIcon } from "./Icons/ArrowKeysUpDownIcon"
import { LoadingIcon } from "./Icons/LoadingIcon"
import { Body } from "./Primitives/Body"
import { ShortcutIcon } from "./Icons/ShortcutIcon"
import { Mono } from "./Primitives/Mono"
import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from "downshift"
import { getComponentSlices, getStringSlices } from "../utilities/search"
import classnames from "../utilities/classnames"
import { iconForValue } from "../utilities/icons"
import { useRef, useCallback } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { truncate } from "lodash"
import { JSONHeroPath } from "@jsonhero/path"
import { useJson } from "../hooks/useJson"
import { SearchResult } from "@jsonhero/fuzzy-json-search"

export function SearchPalette({ onSelect, onClose }: { onSelect?: (entry: string) => void; onClose?: () => void }) {
  const searchState = useJsonSearchState()
  const searchApi = useJsonSearchApi()

  const listRef = useRef<HTMLUListElement>(null)

  // ref must point to the scrollable element
  const rowVirtualizer = useVirtualizer({
    count: (searchState.results ?? []).length,
    getScrollElement: () => listRef.current,
    estimateSize: useCallback(() => 70, []),
    overscan: 6,
  })

  function comboboxReducer(
    state: UseComboboxState<SearchResult<string>>,
    actionAndChanges: UseComboboxStateChangeOptions<SearchResult<string>>,
  ): Partial<UseComboboxState<SearchResult<string>>> {
    const { changes, ...action } = actionAndChanges

    // Don't update the input field when selecting an item
    switch (action.type) {
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter: {
        return {
          ...changes,
          inputValue: state.inputValue,
        }
      }
      default:
        return changes
    }
  }

  const cb = useCombobox({
    items: searchState.results ?? [],
    stateReducer: comboboxReducer,
    scrollIntoView: () => {},
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect?.(selectedItem.item)
        searchApi.reset()
      }
    },
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex != null && rowVirtualizer.scrollToIndex(highlightedIndex),
    onInputValueChange: ({ inputValue }) => (inputValue ? searchApi.search(inputValue) : searchApi.reset()),
  })

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape" && onClose && cb.inputValue.length === 0) {
        searchApi.reset()
        onClose?.()
      }
    },
    [onClose, cb.inputValue],
  )

  return (
    <>
      <div className="max-h-[60vh] overflow-hidden px-4 pt-4">
        <label {...cb.getLabelProps()} className="relative block text-slate-400 focus-within:text-slate-600">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-7 w-7 -translate-y-1/2 transform text-slate-700 transition dark:text-white" />
          <input
            {...cb.getInputProps({ onKeyDown: handleInputKeyDown })}
            type="text"
            spellCheck="false"
            placeholder="Search the JSON…"
            className="w-full rounded-sm border-indigo-700 bg-slate-100 py-4 pl-12 pr-4 text-2xl text-slate-900 caret-indigo-700 transition focus:outline-none focus:ring focus:ring-indigo-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <div className="mb-2 mt-4 flex flex-col">
          <div className="results flex">
            {searchState.status !== "idle" && (!searchState.results || searchState.results.length === 0) && (
              <div className="results-loading flex">
                <LoadingIcon className="mr-1 h-5 w-5 animate-spin"></LoadingIcon>
                <Body className="text-slate-400">Loading…</Body>
              </div>
            )}
            {searchState.results && searchState.results.length > 0 && (
              <div className="results-returned">
                <Body className="text-slate-400">
                  {searchState.results.length === 1 ? "1 result" : `${searchState.results.length} results`}
                </Body>
              </div>
            )}
            {searchState.status === "idle" &&
              searchState.query &&
              searchState.query.length > 1 &&
              (!searchState.results || searchState.results.length === 0) && (
                <div className="results-none flex">
                  <ExclamationIcon className="mr-1 h-5 w-5 text-white"></ExclamationIcon>
                  <Body className="text-slate-400">No results for "{cb.inputValue}"</Body>
                </div>
              )}
          </div>
        </div>
        <ul {...cb.getMenuProps({ ref: listRef })} className="relative max-h-[calc(60vh-120px)] w-full overflow-y-auto">
          <li key="total-size" style={{ height: rowVirtualizer.getTotalSize() }} className="mb-[1rem]" />
          {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
            const result: any = (searchState.results ?? [])[virtualRow.index]

            return (
              <SearchItem
                key={result.item.toString()}
                itemProps={cb.getItemProps({
                  item: result,
                  index: virtualRow.index,
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
                result={result}
                isHighlighted={virtualRow.index === cb.highlightedIndex}
              />
            )
          })}
        </ul>
      </div>
      <div className="flex w-full items-center gap-4 rounded-bl-lg rounded-br-lg border-t-[1px] border-slate-200 bg-slate-100 px-3 py-2 transition dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-1">
          <ShortcutIcon className="h-4 w-4 bg-slate-300 text-sm text-slate-900 transition duration-75 group-hover:bg-slate-100 dark:bg-slate-500 dark:group-hover:bg-slate-600">
            ⏎
          </ShortcutIcon>
          <Body className="dakr:text-slate-500 text-slate-700">to select</Body>
        </div>
        <div className="flex items-center gap-1">
          <ArrowKeysUpDownIcon className="text-slate-300 transition dark:text-slate-500" />
          <Body className="dakr:text-slate-500 text-slate-700">to navigate</Body>
        </div>
        <div className="flex items-center gap-1">
          <EscapeKeyIcon className="text-slate-300 transition dark:text-slate-500" />
          <Body className="dakr:text-slate-500 text-slate-700">to close</Body>
        </div>
      </div>
    </>
  )
}

type SearchItemProps = {
  itemProps: React.HTMLAttributes<HTMLLIElement>
  result: SearchResult<string>
  isHighlighted: boolean
}

export function SearchItem({ itemProps, result, isHighlighted }: SearchItemProps) {
  const heroPath = new JSONHeroPath(result.item)
  const [json] = useJson()

  const itemValue = heroPath.first(json)
  const ItemIcon = iconForValue(itemValue)

  return (
    <li {...itemProps} className={classnames("flex w-full hover:cursor-pointer")}>
      <div
        className={classnames(
          "group mb-2 h-[calc(100%-4px)] w-full rounded-sm",
          isHighlighted ? "bg-indigo-700" : "bg-slate-100 dark:bg-slate-900",
        )}
      >
        <div className="flex w-full items-center py-2 pl-4 pr-3">
          <ItemIcon
            className={classnames("h-6 w-6", isHighlighted ? "text-white" : "text-slate-500 dark:text-slate-400")}
          ></ItemIcon>
          <div className="ml-3 flex flex-col">
            <div className="flex w-full items-baseline">
              <SearchPathResult path={heroPath} searchResult={result} isHighlighted={isHighlighted} />
            </div>
            <div className="key-value flex justify-between">
              {result.score.rawValue && (
                <SearchResultValue
                  isHighlighted={isHighlighted}
                  stringValue={result.score.rawValue}
                  matches={result.score.rawValueMatch}
                />
              )}
              {result.score.formattedValue && result.score.formattedValue !== result.score.rawValue && (
                <SearchResultValue
                  isHighlighted={isHighlighted}
                  stringValue={result.score.formattedValue}
                  matches={result.score.formattedValueMatch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

// Outputs the following pair for each component except for the last one:
// <Body className="text-lg">{component}</Body>,
// <ChevronRightIcon className="w-4 h-4" />,
//
// Highlights parts of the component that match the search query.
// The match indices match against the stringified version of the path (e.g. $.foo.bar.0.details.description)
//
// If combined component strings are too long, then we need to choose some components to hide behind an ellipsis, making sure we don't hide matches
function SearchPathResult({
  path,
  searchResult,
  isHighlighted,
  maxWeight = 90,
}: {
  path: JSONHeroPath
  isHighlighted: boolean
  searchResult: SearchResult<string>
  maxWeight?: number
}) {
  const description = searchResult.score.description
  const label = searchResult.score.label

  const labelMatches = searchResult.score.labelMatch
  const descriptionMatches = searchResult.score.descriptionMatch

  const descriptionSlices = getComponentSlices(
    description ?? "",
    (descriptionMatches ?? []).map(({ start, end }) => ({
      start,
      end: end - 1,
    })),
    maxWeight,
  )

  return (
    <>
      {label && (
        <SearchResultValue
          isHighlighted={isHighlighted}
          stringValue={label}
          matches={labelMatches}
          textSize="text-lg"
          className={classnames("mr-3 text-lg", isHighlighted ? `text-white` : "text-slate-900 dark:text-white")}
          key="label"
        />
      )}
      {descriptionSlices.map((slice, i) =>
        slice.type === "component" ? (
          <span
            key={i}
            className={
              slice.slice.isMatch
                ? classnames(
                    "text-base",
                    isHighlighted ? "text-white underline underline-offset-1" : "text-indigo-600 dark:text-indigo-400",
                  )
                : classnames("text-base", isHighlighted ? "text-white" : "text-slate-800 dark:text-slate-400")
            }
          >
            {slice.slice.slice}
          </span>
        ) : slice.type === "ellipsis" ? (
          <Body
            key={i}
            className={classnames("text-base", isHighlighted ? "text-white" : "text-slate-600 dark:text-slate-400")}
          >
            …
          </Body>
        ) : (
          <ChevronRightIcon
            key={i}
            className={classnames(
              "relative top-[2px] mx-[1px] h-3 w-3",
              isHighlighted ? "text-white" : "text-slate-600 dark:text-slate-400",
            )}
          />
        ),
      )}
    </>
  )
}

function SearchResultValue({
  isHighlighted,
  stringValue,
  matches,
  className,
  textSize,
}: {
  isHighlighted: boolean
  stringValue: string
  matches?: Array<any>
  className?: string
  textSize?: "text-xs" | "text-sm" | "text-base" | "text-lg"
}) {
  const output = createOutputForMatch(stringValue, isHighlighted, textSize, matches)

  return (
    <Body
      className={className ?? classnames("mr-2", isHighlighted ? `text-white` : "text-slate-600 dark:text-slate-400")}
    >
      {output}
    </Body>
  )
}

function createOutputForMatch(
  stringValue: string,
  isHighlighted: boolean,
  textSize: "text-xs" | "text-sm" | "text-base" | "text-lg" = "text-base",
  matches?: Array<any>,
  maxLength: number = 68,
) {
  if (!matches || matches.length === 0) {
    return <>{truncate(stringValue, { length: maxLength })}</>
  }

  const stringSlices = getStringSlices(stringValue, matches, maxLength)

  return (
    <>
      {stringSlices.map((s, index) => {
        return (
          <span
            key={index}
            className={
              s.isMatch
                ? classnames(
                    textSize,
                    isHighlighted ? "text-white underline underline-offset-1" : "text-indigo-600 dark:text-indigo-400",
                  )
                : ""
            }
          >
            {s.slice}
          </span>
        )
      })}
    </>
  )
}
