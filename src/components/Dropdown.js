import React from 'react';

export default function Dropdown({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-white font-semibold mb-2">{label}:</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full max-w-sm px-4 py-2 rounded-lg shadow focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
