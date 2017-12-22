SELECT movies.title, movies.genres, AVG(ratings.rating) 
FROM movies, ratings
WHERE movies.movieId = ratings.movieId
GROUP BY movies.title, movies.genres
ORDER BY RAND()
LIMIT 10
;