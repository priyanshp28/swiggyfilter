import React, { useState } from 'react';

const Filter = () => {
  const [filters, setFilters] = useState({
    cuisine: [],
    veg: [],
    rating: null,
    sortBy: null,
  });

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? [...prevFilters[name], value] : prevFilters[name].filter((item) => item !== value),
    }));
  };

  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleClearAll = () => {
    setFilters({ cuisine: [], veg:[], rating: null, sortBy: null });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const queryString = new URLSearchParams({
      ...(filters.cuisine.length > 0 && { cuisine: filters.cuisine.join(',') }),
      ...(filters.veg.length>0  && { veg: filters.veg.join(',') }),
      ...(filters.rating && { rating: filters.rating }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    }).toString();

    // make backend API call logic
    console.log("Filter Query:", queryString);
  };

  return (
    <div className="filter-container">
      <h1>Swiggy Filters</h1>
      <form onSubmit={handleSubmit}>
        <h2>Cuisine</h2>
        <div className="filter-group">
          <label htmlFor="italian">
            <input
              type="checkbox"
              id="italian"
              name="cuisine"
              value="italian"
              checked={filters.cuisine.includes('italian')}
              onChange={handleCheckboxChange}
            />
            Italian
          </label>
          <label htmlFor="chinese">
            <input
              type="checkbox"
              id="chinese"
              name="cuisine"
              value="chinese"
              checked={filters.cuisine.includes('chinese')}
              onChange={handleCheckboxChange}
            />
            Chinese
          </label>
          <label htmlFor="indian">
            <input
              type="checkbox"
              id="indian"
              name="cuisine"
              value="indian"
              checked={filters.cuisine.includes('indian')}
              onChange={handleCheckboxChange}
            />
            Indian
          </label>
        </div>
        <h2>Veg/Nonveg</h2>
        <div className="filter-group">
          <label htmlFor="pure-veg">
            <input
              type="checkbox"
              id="pure-veg"
              name="veg"
              value="pureveg"
              checked={filters.veg.includes('pureveg')}
              onChange={handleCheckboxChange}
            />
            Pure Veg
          </label>
          <label htmlFor="non-veg">
            <input
              type="checkbox"
              id="non-veg"
              name="veg"
              value="nonveg"
              checked={filters.veg.includes('nonveg')}
              onChange={handleCheckboxChange}
            />
            Non Veg
          </label>
        </div>
        <h2>Rating</h2>
        <div className="filter-group">
          <select value={filters.rating} name="rating" onChange={handleSelectChange}>
            <option value={null}>Select Rating</option>
            <option value="4">4 Star & Above</option>
            <option value="3">3 Star & Above</option>
          </select>
        </div>
        <h2>Sort By</h2>
        <div className="filter-group">
          <select value={filters.sortBy} name="sortBy" onChange={handleSelectChange}>
            <option value={null}>Default Sorting</option>
            <option value="cost_low_to_high">Cost (Low to High)</option>
            <option value="delivery_time">Delivery Time (Fastest)</option>
          </select>
        </div>
        <button type="submit">Filter</button>
        <button type="button" onClick={handleClearAll}>
          Clear All
        </button>
      </form>
      <h2>Filtered Restaurants</h2>
      <div id="filtered-restaurants">
        {/* code to display filtered restaurants based on backend response */}
        <p>No restaurants found yet. Apply filters to see results.</p>
      </div>
    </div>
  );
};

export default Filter;