"use client";

import { useState, useRef, useEffect } from "react";

export default function FilterSelect({ options, onSelect, onChange, placeholder = "Select an option" }) {
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState(options);
	const container = useRef(null);

	useEffect(() => {
		// skip if no options
		if (!options) {
			setFilteredOptions([]);
			return;
		}

		// filter options for input
		setFilteredOptions(
			options.filter((option) =>
				option.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, options]);

	// close on outside click
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (container.current && !container.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// clean up event listener
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option) => {
		setSearch(option);
		setOpen(false);

		if (onSelect) {
			onSelect(option);
		}
	};

	const handleChange = function (event) {
		setSearch(event.target.value);
		setOpen(true);

		if (onChange) {
			onChange(event);
		}
	}

	return (
		<div ref={container} >
			<input
				type="text"
				placeholder={placeholder}
				value={search}
				onChange={handleChange}
				onFocus={() => setOpen(true)}
			/>
			{open && filteredOptions.length > 0 && (
				<div style={{
					backgroundColor: "white",
					color: "black",
					position: "absolute",
					overflowY: "auto",
					maxHeight: "90%",
					maxWidth: "100%",
					fontSize: "13px",
					zIndex: 1,
					padding: "10px"
				}}>
					{filteredOptions.map((option) => (
						<Option option={option} />
					))}
				</div>
			)}
		</div>
	);

	function Option({ option }) {
		const optionRef = useRef(null);

		return (
			<p
				ref={optionRef}
				key={option}
				onClick={() => handleSelect(option)}
				className="redHover"
			>
				{option}
			</p>
		);
	}
}
