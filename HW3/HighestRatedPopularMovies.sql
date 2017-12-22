SELECT AVG(rating) AS rating, title, COUNT(rating) AS num_ratings
FROM movies, ratings
WHERE movies.movieId = ratings.movieId
GROUP BY title
HAVING COUNT(rating) > 100
ORDER BY AVG(rating) DESC LIMIT 50;