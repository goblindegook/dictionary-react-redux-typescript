/* tslint:disable */
import * as expect from "expect";

class Test {}

function test_numbers() {
  expect(0).toBe(0);
  expect(0).toBeFalsy();
  expect(0).toBeFewerThan(1);
  expect(0).toBeGreaterThan(-1);
  expect(0).toBeGreaterThanOrEqualTo(-1);
  expect(0).toBeLessThan(1);
  expect(0).toBeLessThanOrEqualTo(0);
  expect(0).toBeMoreThan(-1);
  expect(1).toBeTruthy();
  expect(0).toEqual(0);
  expect(1).toExist();
  expect(0).toNotBe(1);
  expect(0).toNotEqual(1);
  expect(0).toNotExist();
}

function test_strings() {
  expect("").toBe("");
  expect("").toBeFalsy();
  expect("test").toBeTruthy();
  expect("test").toContain("test");
  expect("").toEqual("");
  expect("test").toExclude("tset");
  expect("test").toExist();
  expect("test").toInclude("test");
  expect("test").toMatch(/test/);
  expect("").toNotBe("test");
  expect("test").toNotContain("tset");
  expect("").toNotEqual("test");
  expect("").toNotExist();
  expect("test").toNotMatch(/tset/);
}

function test_arrays() {
  expect([0]).toBe([0]);
  expect([0]).toBeFalsy();
  expect([0]).toBeTruthy();
  expect([0]).toEqual([0]);
  expect([0]).toExist();
  expect([0]).toNotBe([1]);
  expect([0]).toNotEqual([1]);
  expect([0]).toNotExist();
  // TODO: expect([0]).toContain(0);
  // TODO: expect([0]).toExclude(0);
  // TODO: expect([0]).toInclude(0);
  // TODO: expect([0]).toNotContain(0);
  // TODO: expect([0]).toNotInclude(0);
}

function test_objects() {
  const test = new Test();

  expect(test).toBe(test);
  expect(test).toBeA("object");
  expect(test).toBeA(Test);
  expect(test).toBeAn("object");
  expect(test).toBeAn(Test);
  expect(test).toEqual(test);
  expect(test).toExist();
  expect(test).toNotBe({});
  expect(test).toNotBeA("object");
  expect(test).toNotBeA(Test);
  expect(test).toNotBeAn("object");
  expect(test).toNotBeAn(Test);
  expect(test).toNotEqual({});
  expect(test).toNotExist();
}

function test_functions() {
  const test = i => i;

  expect(test).toBe(test);
  expect(test).toEqual(test);
  expect(test).toExist();
  expect(test).toNotBe(test);
  expect(test).toNotEqual(test);
  expect(test).toNotExist();
  expect(test).toNotThrow();
  expect(test).toThrow();
  expect(test).withArgs();
  expect(test).withContext(this);
}

function test_spies() {
  // Spy
  const spy = expect.createSpy<(a: number) => number>()
  expect.isSpy(spy);
  const otherSpy = expect.spyOn({}, "test");
  expect.restoreSpies();

  spy.andCall(() => {});
  spy.andCallThrough();
  spy.andReturn(1);
  spy.andThrow(new Error("test"));
  spy.restore();

  spy(1);
  spy.calls[0].arguments;
  spy.calls[0].context;

  expect(spy).toBe(spy);
  expect(spy).toEqual(spy);
  expect(spy).toExist();
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith();
  expect(spy).toNotEqual(spy);
  expect(spy).toNotExist();
  expect(spy).toNotHaveBeenCalled();
}
