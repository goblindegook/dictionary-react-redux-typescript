import * as expect from "expect";
import * as sinon from "sinon";
import memoize from "../../src/utils/memoize";

describe("memoize", () => {
  it("remembers a function called without arguments", () => {
    const spy = sinon.spy();
    const memoizedSpy = memoize(spy);
    memoizedSpy();
    memoizedSpy();
    expect(spy.callCount).toBe(1);
  });

  it("remembers a function called with arguments", () => {
    const spy = sinon.spy();
    const memoizedSpy = memoize(spy);
    memoizedSpy(1, 2);
    memoizedSpy(1, 2);
    expect(spy.callCount).toBe(1);
  });

  it("does not remember a function called with different arguments", () => {
    const spy = sinon.spy();
    const memoizedSpy = memoize(spy);
    memoizedSpy(1, 2);
    memoizedSpy(2, 1);
    expect(spy.callCount).toBe(2);
  });
});
