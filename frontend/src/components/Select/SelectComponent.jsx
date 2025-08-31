import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const dietOptions = [
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'glutenFree', label: 'Gluten Free' },
  { value: 'ketogenic', label: 'Ketogenic' }
];

const animatedComponents = makeAnimated();

export default function DietSelect() {
  const [selectedDiets, setSelectedDiets] = useState([]);

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={dietOptions}
      value={selectedDiets}
      onChange={setSelectedDiets}
    />
  );
}


