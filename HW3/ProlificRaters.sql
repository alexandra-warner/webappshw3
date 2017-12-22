SELECT userId , COUNT(userId) AS num_ratings 
FROM ratings 
GROUP BY userId
ORDER BY COUNT(userId) DESC;