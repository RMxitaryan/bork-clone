import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({ categories, setCategories }) {
	const handleChange = (event) => {
		setCategories(event.target.value);
	};
	console.log(categories);

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small">categories</InputLabel>
			<Select
				labelId="demo-select-small"
				id="demo-select-small"
				value={categories}
				label="categories"
				onChange={handleChange}
			>
				<MenuItem value="kitchen">kitchen</MenuItem>
				<MenuItem value="home & climate">home & climate</MenuItem>
				<MenuItem value="health & beauty">health & beauty</MenuItem>
				<MenuItem value="bork home">bork home</MenuItem>
				<MenuItem value="accessories">accessories</MenuItem>
			</Select>
		</FormControl>
	);
}
