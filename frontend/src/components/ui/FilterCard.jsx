import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/store/reducer/recipeSlice'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'

const FilterCard = () => {
  const filterData = [
    {
      type: "Breakfast",
      recipes: [
        {
          title: "Pancakes",
          ingredients: ["Milk", "Eggs", "Sugar",],
          time: "20 mins",
        },
        {
          title: "Omelette",
          ingredients: ["Eggs" ],
          time: "10 mins",
        },
      ],
    },
    {
      type: "Lunch",
      recipes: [
        {
          title: "Grilled Chicken Salad",
          ingredients: ["Cucumber", "Tomatoes","Lemon Juice"],
          time: "25 mins",
        },
      ],
    },
    {
      type: "Dinner",
      recipes: [
        {
          title: "Spaghetti Bolognese",
          ingredients: ["Onion", "Garlic", "Tomato Sauce", "Salt", "Pepper"],
          time: "40 mins",
        },
      ],
    },
  ];

  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selected));
  }, [selected, dispatch]);


  const allIngredients = filterData.map((data) => ({
    type: data.type,
    ingredients: [...new Set(data.recipes.flatMap((recipe) => recipe.ingredients))]
  }));
  

  return (
    <div className='h-[60vh] overflow-y-auto w-full p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter by Ingredients</h1>
      <hr className='mt-1' />
      <RadioGroup value={selected} onValueChange={handleSelect}>
      {allIngredients.map((ingredient, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-bold text-lg">{ingredient.type}</h3>
            {ingredient.ingredients.map((ingredient, idx) => {
              const itemId = `id-${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 mt-2" key={idx}>
                  <RadioGroupItem value={ingredient} id={itemId} />
                  <Label htmlFor={itemId}>{ingredient}</Label>
                </div>
              );
            })}
          </div>
        ))}
            
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
