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
      MAX_EXTRA_DISKS = 2;

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                        ---  PROGRAM CODE  ---                            \\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


const pyramid =
          Array.from({ length: TOWER_HEIGHT }, (a, i) => String.fromCharCode(65 + i)).join(""),
      initialState = `${ pyramid }--`,
      finalState = `--${ pyramid }`;

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
            if (!(topRings[posA] <= topRings[posB])    // try posA -> posB
                    && (posB !== 1 || (towers[posB].length < MAX_EXTRA_DISKS))) //
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
 * Solves the hanoi tower puzzle with deep-first search.
 * @param {string} state
 * @param {Set} pastStates
 * @returns {string[]} - Variants array if found
 */
function dive (state = initialState, pastStates = new Set()) {
    if (state === finalState)
        return [finalState];
    let vars = getNextStates(state);
    for (let currentState of vars) {
        if (pastStates.has(currentState))
            continue;
        let result = dive(currentState, (new Set(pastStates)).add(currentState));
        if (result.length)
            return [state].concat(result);
    }
    if (++iter % 1000 === 0) process.stdout.write(`\r${ iter }`);
    return [];
}

(() => {
    console.log(`--- Hanoi Tower Solution ---`);
    console.log(`Tower height: ${ TOWER_HEIGHT }`);
    console.log(`Max extra discs can be used: ${ MAX_EXTRA_DISKS }`);
    console.log(`Solving (DFS algorithm), please wait...`);
    let result = dive();
    console.log(`\rDone, passed ${ iter } possible states.`);
    console.log(
        result.length
            ? `One possible solution found (${ result.length } steps): ${ result.join(" => ") }`
            : `No solutions for this input!`
    );
})();