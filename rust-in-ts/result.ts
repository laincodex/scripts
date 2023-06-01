// Result type
class Result<T, E> {
  private value: T | null;
  private error: E | null;

  private constructor(value: T | null, error: E | null) {
    this.value = value;
    this.error = error;
  }

  static ok<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(value, null);
  }

  static err<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(null, error);
  }

  isOk(): boolean {
    return this.value !== null;
  }

  isErr(): boolean {
    return this.error !== null;
  }

  unwrap(): T {
    if (this.value !== null) {
      return this.value;
    }
    throw new Error("Called unwrap on an Err value");
  }

  unwrapErr(): E {
    if (this.error !== null) {
      return this.error;
    }
    throw new Error("Called unwrapErr on an Ok value");
  }

  match(okCallback: (value: T) => void, errCallback: (error: E) => void): void {
    if (this.isOk()) {
      okCallback(this.unwrap());
    } else if (this.isErr()) {
      errCallback(this.unwrapErr());
    }
  }
}

// Usage example
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.err("Cannot divide by zero.");
  }

  return Result.ok(a / b);
}

// Usage example

const result = divide(10, 2);
result.match(
  (value) => console.log("Result:", value),
  (error) => console.log("Error:", error)
);


const checker = (res: Result<number, string>) => {
    res.match(
        ok => console.log("ok: ", ok),
        err => console.log("err: ", err),
    );
}

checker(divide(10,0));

