import React from 'react';

function Square({ value, onClick }) {
    return (
        <button
            className="w-20 h-20 text-2xl font-bold cursor-pointer bg-blue-200 bg-opacity-50 border border-blue-300 hover:bg-blue-100 hover:bg-opacity-60"
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Square;