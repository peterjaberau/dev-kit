import { useContext, useEffect, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isCollapsed_largeArray, ifDisplay, editableAdd, editableDelete, customAdd, customCopy, customDelete } from '../utils'
import { IconButton } from '@chakra-ui/react'
import {
  BiPlus as AddIcon,
  BiTrash as DeleteIcon,
  BiCheck as DoneIcon,
  BiXCircle as CancelIcon,
  BiChevronDown as AngleDownIcon
} from "react-icons/bi";


import CopyButton from './copy-button'
import type { CustomizeOptions } from '../types'
import LargeArrayNode from './large-array-node'

interface Props {
	node: Array<any>
	depth: number
	indexOrName?: number | string
	deleteHandle?: (_: string | number, currentPath: string[]) => void
	customOptions?: CustomizeOptions
	parent?: Record<string, any> | Array<any>
	parentPath: string[]
}

export default function LargeArray({ node, depth, deleteHandle: _deleteSelf, indexOrName, customOptions, parent, parentPath }: Props) {
	const currentPath = typeof indexOrName !== 'undefined' ? [...parentPath, String(indexOrName)] : parentPath

	const nestCollapsedArray: any[] = []
	for (let i = 0; i < node.length; i += 100) {
		nestCollapsedArray.push(node.slice(i, i + 100))
	}

	const { collapsed, enableClipboard, collapseObjectsAfterLength, editable, onDelete, src, onAdd, CustomOperation, onChange, forceUpdate, displaySize } =
		useContext(JsonViewContext)

	const [fold, setFold] = useState(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions))
	useEffect(() => {
		setFold(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions))
	}, [collapsed, collapseObjectsAfterLength])

	// Delete self
	const [deleting, setDeleting] = useState(false)
	const deleteSelf = () => {
		setDeleting(false)
		if (_deleteSelf) _deleteSelf(indexOrName!, parentPath)
		if (onDelete) onDelete({ value: node, depth, src, indexOrName: indexOrName!, parentType: 'array', parentPath })
		if (onChange)
			onChange({
				type: 'delete',
				depth,
				src,
				indexOrName: indexOrName!,
				parentType: 'array',
				parentPath
			})
	}

	// Add
	const [adding, setAdding] = useState(false)
	const add = () => {
		const arr = node as unknown as any[]
		arr.push(null)
		if (onAdd) onAdd({ indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath })
		if (onChange) onChange({ type: 'add', indexOrName: arr.length - 1, depth, src, parentType: 'array', parentPath })
		forceUpdate()
	}

	const isEditing = deleting || adding
	const cancel = () => {
		setDeleting(false)
		setAdding(false)
	}

	const Icons = (
		<>
			{!fold && !isEditing && (
				<span onClick={() => setFold(true)} className='jv-size-chevron'>
					{ifDisplay(displaySize, depth, fold) && <span className='jv-size'>{node.length} Items</span>}
          <AngleDownIcon className='jv-chevron' />
				</span>
			)}

      {isEditing && (
        <IconButton className='json-view--edit' css={{ display: 'inline-block' }} onClick={adding ? add : deleteSelf}>
          <DoneIcon />
        </IconButton>
      )}
      {isEditing && (
        <IconButton className='json-view--edit' css={{ display: 'inline-block' }} onClick={cancel}>
          <CancelIcon />
        </IconButton>
      )}

			{!fold && !isEditing && enableClipboard && customCopy(customOptions) && (
				<CopyButton node={node} nodeMeta={{ depth, indexOrName, parent, parentPath, currentPath }} />
			)}
			{!fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (

        <IconButton className='json-view--edit' onClick={() => add()}>
          <AddIcon />
        </IconButton>

			)}
			{!fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (
        <IconButton className='json-view--edit' onClick={() => setDeleting(true)}>
          <DeleteIcon />
        </IconButton>

				// <DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />
			)}
			{typeof CustomOperation === 'function' ? <CustomOperation node={node} /> : null}
		</>
	)

	return (
		<>
			<span>{'['}</span>

			{Icons}

			{!fold ? (
				<div className='jv-indent'>
					{nestCollapsedArray.map((item, index) => (
						<LargeArrayNode
							key={String(indexOrName) + String(index)}
							originNode={node}
							node={item}
							depth={depth}
							index={index}
							startIndex={index * 100}
							deleteHandle={_deleteSelf}
							customOptions={customOptions}
							parentPath={parentPath}
						/>
					))}
				</div>
			) : (
				<button onClick={() => setFold(false)} className='jv-button'>
					...
				</button>
			)}

			<span>{']'}</span>

			{fold && ifDisplay(displaySize, depth, fold) && (
				<span onClick={() => setFold(false)} className='jv-size'>
					{node.length} Items
				</span>
			)}
		</>
	)
}
