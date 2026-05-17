import { useCallback, useState } from 'react'

const useDragDrop = (onFileSelect) => {
	const [isDragging, setIsDragging] = useState(false)

	const handleFileSelect = useCallback(
		(file) => {
			if (typeof onFileSelect === 'function') {
				onFileSelect(file || null)
			}
		},
		[onFileSelect]
	)

	const handleInputChange = useCallback(
		(event) => {
			const [file] = event.target.files || []
			handleFileSelect(file)
			event.target.value = ''
		},
		[handleFileSelect]
	)

	const handleDragEnter = useCallback((event) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragging(true)
	}, [])

	const handleDragOver = useCallback((event) => {
		event.preventDefault()
		event.stopPropagation()
		event.dataTransfer.dropEffect = 'copy'
	}, [])

	const handleDragLeave = useCallback((event) => {
		event.preventDefault()
		event.stopPropagation()
		if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
			return
		}
		setIsDragging(false)
	}, [])

	const handleDrop = useCallback(
		(event) => {
			event.preventDefault()
			event.stopPropagation()
			setIsDragging(false)
			const [file] = event.dataTransfer.files || []
			handleFileSelect(file)
		},
		[handleFileSelect]
	)

	return {
		isDragging,
		handleInputChange,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	}
}

export default useDragDrop
