function weighted_idx(weights) {
    /*
     * Given a list of weights [w0, w1, ...],
     * return the index i with weighted probability wi.
     * The weights don't need to sum to 1, they are just relative weights.
     */
    var cum_w = []; // cumulative weights
    // total weight is returned at the end of reduce
    var total_w = weights.reduce(function(prev, next, i) { return cum_w[i] = prev + next; }, 0);
    var r = Math.random() * total_w;
    return cum_w.findIndex(function(w) { return w > r; });
}

function weighted_choice(pairs) {
    /*
     * Given a list of pairs [[a0, w0], [a1, w1], ...],
     * randomly select an element ai with probability weighted by wi.
     * The weights don't need to sum to 1, they are just relative weights.
     */
    var weights = pairs.map(function(x) { return x[1]; });
    return pairs[weighted_idx(weights)][0];
}

// test, should print ~2.0 and ~3.0
//x = {"a": 0, "b" : 0, "c": 0}; for(var i = 0; i < 10000; i++) { x[weighted_choice([["a", 1], ["b", 2], ["c", 3]])] += 1; }; console.log(x["b"] / x["a"], x["c"]/x["a"]);
