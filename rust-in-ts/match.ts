type Matcher<T> = {
  case: (pattern: ((value: T) => boolean) | T, callback: () => void) => Matcher<T>;
  default: (callback: () => void) => void;
};

function match<T>(value: T): Matcher<T> {
  let matched = false; // Flag to track if a match has been found
  const matcher: Matcher<T> = {
    case(pattern: ((value: T) => boolean) | T, callback: () => void): Matcher<T> {
      if (!matched) { // Check if a match has already been found
        if (typeof pattern === "function") {
          if ((pattern as (value: T) => boolean)(value)) {
            callback();
            matched = true;
          }
        } else if (pattern === value) {
          callback();
          matched = true;
        }
      }
      return matcher;
    },
    default(callback: () => void): void {
      if (!matched) { // Check if a match has already been found
        callback();
      }
    },
  };
  return matcher;
}

// let lottery = 17;

// match(lottery)
//   .case((value) => value === 0, () => console.log("You win"))
//   .case(17, () => console.log("So close"))
//   .default(() => console.log("You lose"));


enum GamesTypes { 
    RPG,
    ADVENTURE,
    FPS,
    MOBA,
}

const game: GamesTypes = GamesTypes.ADVENTURE;

match<GamesTypes>(game)
 .case(g => g === GamesTypes.RPG || g === GamesTypes.ADVENTURE, () => console.log("its story driven"))
 .case(GamesTypes.FPS, () => console.log("its FPS"));


