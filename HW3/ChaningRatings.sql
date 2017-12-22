SELECT movies.title, COUNT(ratings.rating) AS num_ratings FROM movies, ratings
WHERE movies.movieId = ratings.movieId AND ratings.timestamp > 1420088400
GROUP BY movies.title
ORDER BY COUNT(ratings.rating) DESC LIMIT 3;