// Source: https://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function hasAllParams(req) {
  const hasKey = req.query.key != null;
  const hasLoc = req.query.location != null;
  const hasDis = req.query.distance != null;
  const disIsInt = !isNaN(req.query.distance);
  return hasKey && hasLoc && hasDis && disIsInt;
}

function addIdxToList(list) {
  let newIndex = 0;
  for (let i = 0; i < list.length; i++) {
    list[i].idx = newIndex;
    newIndex ++;
  }
}

exports.shuffle = shuffle;
exports.hasAllParams = hasAllParams;
exports.addIdxToList = addIdxToList;