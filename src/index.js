//      Hanoi Tower Solution Search on JavaScript by ZitRo [zitros.tk]      \\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                      --- CONSTANTS EXAMPLES ---                          \\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// const TOWER_HEIGHT = 4,          // const TOWER_HEIGHT = 5,              \\ State example:     \\
//       MAX_EXTRA_DISKS = 2;       //       MAX_EXTRA_DISKS = 3;           \\ stored as          \\
//                                  //                                      \\ "AC-B-"            \\
// (stored as "ABCD--")             //    5 (stored as "ABCDE--")      5    \\                    \\
//         4                   4    //    ¯¯EE                      ||¯¯    \\                    \\
//      DD¯¯                ||¯¯    //     DDDD            3        ||      \\                    \\
//     CCCC          2      ||      //    CCCCCC        ||¯¯        ||      \\   ||          ||   \\
//    BBBBBB      ||¯¯      ||      //   BBBBBBBB       ||          ||      \\   CC    ||    ||   \\
//   AAAAAAAA     ||        ||      //  AAAAAAAAAA      ||          ||      \\ AAAAAA BBBB   ||   \\
////////////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\

const TOWER_HEIGHT = 3,
      RODS = 4;

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                        ---  PROGRAM CODE  ---                            \\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const pyramid =
          Array.from({ length: TOWER_HEIGHT }, (a, i) => String.fromCharCode(65 + i)).join(""),
      delimiters = Array.from({ length: RODS - 1 }, () => "-").join(""),
      initialState = `${ pyramid }${ delimiters }`,
      finalState = `${ delimiters }${ pyramid }`;

/**
 * This function returns all available states
 * a. "ABCD--" -> ["ABC-D-", "ABC--D"]
 * b. "ABC-D-" -> ["AB-D-C", "ABCD--", "ABC--D"]
 * c. ...and so on
 * @param {string} state - Current state
 */
function getNextStates (state) {
    const towers = state.split("-"),                   // b. ["ABC", "D", ""]
          topRings = towers.map(s => s[s.length - 1]), // b. ["C", "D", undefined]
          variants = [];
    for (let posA = 0; posA < topRings.length; ++posA) {
        if (!topRings[posA]) continue;                 // skip undefined's as we can't move them
        for (let posB = 0; posB < topRings.length; ++posB) {
            if (!(topRings[posA] <= topRings[posB]))   // try posA -> posB
                variants.push(towers.map(
                    (tower, pos) =>
                        pos === posA ? tower.slice(0, tower.length - 1) // take one from top
                        : pos === posB ? tower + topRings[posA]         // place one on top
                        : tower                                         // don't touch
                ).join("-"));
        }
    }
    return variants;
}

let iter = 0;

/**
 * Solves the hanoi tower puzzle with deep-first search (DFS).
 * @param {string} state
 * @param {Set} pastStates
 * @returns {string[]} - Variants array if found
 */
function dfs (state = initialState, pastStates = new Set()) {
    if (state === finalState)
        return [finalState];
    let vars = getNextStates(state);
    if (++iter % 1000 === 0) process.stdout.write(`\r${ iter }`);
    for (let currentState of vars) {
        if (pastStates.has(currentState))
            continue;
        let result = dfs(currentState, (new Set(pastStates)).add(currentState));
        if (result.length)
            return [state].concat(result);
    }
    return [];
}

/**
 * Solves the hanoi tower puzzle with breadth-first search (BFS).
 * @param {string[]} stack
 * @param {Set} past
 * @returns {string[]} - Variants array if found
 */
function bfs (stack = [{ state: initialState, path: [initialState] }],
              past = new Set([initialState])) {
    while (true) {
        let currentState = stack.shift(),
            vars = getNextStates(currentState.state).filter(s => !past.has(s) && past.add(s))
                .map(s => ({ state: s, path: currentState.path.concat(s) })),
            final = vars.filter(s => s.state === finalState)[0];
        if (++iter % 1000 === 0)
            process.stdout.write(`\r${ iter } deeping level ${ currentState.path.length }`);
        if (final) return final.path;
        stack.push(...vars);
    }
}

(() => {
    let result;
    console.log(`--- Hanoi Tower Solution ---`);
    console.log(`Tower height: ${ TOWER_HEIGHT }`);
    console.log(`Number of rods: ${ RODS }`);
    console.log(`Solving (BFS algorithm), please wait...`);
    iter = 0;
    result = bfs();
    console.log(`\rDone, number of iterations: ${ iter }.`);
    console.log(
        result.length
            ? `First possible solution found (${ result.length } steps): ${ result.join(" => ") }`
            : `No solutions for this input!`
    );
    console.log(`Solving (DFS algorithm), please wait...`);
    iter = 0;
    result = dfs();
    console.log(`\rDone, number of iterations: ${ iter }.`);
    console.log(
        result.length
            ? `One possible solution found (${ result.length } steps): ${ result.join(" => ") }`
            : `No solutions for this input!`
    );

})();