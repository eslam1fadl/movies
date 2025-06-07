import React from 'react'
// import noMovie from '/no-movie.png';
import starIcon from '/star.svg';

function MovieCard({ movie: { title, vote_average, poster_path, original_language, release_date } }) {
    return (
        <div className='movie-card'>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : <svg width="300" height="450" viewBox="0 0 300 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="450" fill="#f3f4f6" />
                    <rect x="50" y="150" width="200" height="150" rx="10" fill="#d1d5db" />
                    <circle cx="120" cy="200" r="15" fill="#9ca3af" />
                    <path d="M100 240L140 200L180 240H100Z" fill="#9ca3af" />
                    <text x="150" y="330" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">No Image Available</text>
                </svg>}
                alt={title}
            />
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src={starIcon} alt='star icon' />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>.</span>
                    <p className='lang'>{original_language}</p>
                    <span>.</span>
                    <p className='year'>
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard