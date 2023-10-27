export const starCalculate = (arrayOfRatings) => {
    
    if (!arrayOfRatings)  return; 

    let imdbRating = parseInt(arrayOfRatings[0].Value.split('/')[0] * 10);

    let rottenTomatoesRating = parseInt(arrayOfRatings[1].Value.split('%')[0]);

    let metacriticRating = parseInt(arrayOfRatings[2].Value.split('/100')[0]);

    let sum = imdbRating + rottenTomatoesRating + metacriticRating;

    let averageSum = sum / 3;

    let totalSum = sum;
    
    let star = Math.round(averageSum / 10);

    return { averageSum, star, totalSum, imdbRating, rottenTomatoesRating, metacriticRating  }

}