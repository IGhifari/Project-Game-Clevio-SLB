import React from 'react';
import starIcon from '../../../assets/object/star.png';

export default function ClassStar({ foundObjects }) {
    const totalStars = 3;
    const earnedStars = foundObjects.length;

    return (
        <div className="fixed top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <div className="flex">
                {[...Array(totalStars)].map((_, index) => (
                    <div 
                        key={index}
                        className={`transition-all duration-300 ${
                            index < earnedStars 
                                ? 'scale-100 opacity-100' 
                                : 'scale-75 opacity-40'
                        }`}
                    >
                        <img 
                            src={starIcon} 
                            alt="Star"
                            className="w-8 h-8"
                        />
                    </div>
                ))}
            </div>
            <span className="font-bold text-yellow-600">
                {earnedStars}/{totalStars}
            </span>
        </div>
    );
}