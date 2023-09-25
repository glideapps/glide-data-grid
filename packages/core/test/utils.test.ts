import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useStateWithReactiveInput } from '../src/common/utils';

describe('useStateWithReactiveInput', () => {
  test('initial state', () => {
    const { result } = renderHook(() => useStateWithReactiveInput(20));
    expect(result.current[0]).toBe(20);
  });

  test('set state', () => {
    const { result } = renderHook(() => useStateWithReactiveInput(20));

    act(() => {
      result.current[1](30);
    });

    expect(result.current[0]).toBe(30);
  });

  test('set state then render with new initial', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useStateWithReactiveInput(initialValue),
      {
        initialProps: { initialValue: 20 },
      }
    );

    act(() => {
      result.current[1](30);
    });

    rerender({ initialValue: 50 });

    expect(result.current[0]).toBe(50);
  });

  test('set state then render with new initial then set state', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useStateWithReactiveInput(initialValue),
      {
        initialProps: { initialValue: 20 },
      }
    );

    act(() => {
      result.current[1](30);
    });

    rerender({ initialValue: 50 });

    act(() => {
      result.current[1](30);
    });

    expect(result.current[0]).toBe(30);
  });

  test('set state then render with new initial then set state should get re-render value', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useStateWithReactiveInput(initialValue),
      {
        initialProps: { initialValue: 20 },
      }
    );

    act(() => {
      result.current[1](30);
    });

    rerender({ initialValue: 50 });

    act(() => {
      result.current[1]((pv) => {
        expect(pv).toBe(50);
        return 30;
      });
    });

    expect(result.current[0]).toBe(30);
  });

  test('set state with identity does not re-render', () => {
    const { result } = renderHook(({ initialValue }) => useStateWithReactiveInput(initialValue), {
      initialProps: { initialValue: 20 },
    });

    expect(result.all.length).toBe(1);

    act(() => {
      result.current[1]((x) => x);
    });

    expect(result.all.length).toBe(1);
  });

  test('set state with increment re-render', () => {
    const { result } = renderHook(({ initialValue }) => useStateWithReactiveInput(initialValue), {
      initialProps: { initialValue: 20 },
    });

    expect(result.all.length).toBe(1);

    act(() => {
      result.current[1]((x) => x + 1);
    });

    expect(result.all.length).toBe(2);
  });

  test('set state with identity does not re-render after state change', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useStateWithReactiveInput(initialValue),
      {
        initialProps: { initialValue: 20 },
      }
    );

    expect(result.all.length).toBe(1);

    rerender({ initialValue: 50 });

    expect(result.current[0]).toBe(50);

    expect(result.all.length).toBe(2);

    act(() => {
      result.current[1]((x) => x);
    });

    expect(result.current[0]).toBe(50);
    expect(result.all.length).toBe(2);
  });
});
