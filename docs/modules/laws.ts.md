---
title: laws.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [SetoidAsync (type alias)](#setoidasync-type-alias)
- [applicative (constant)](#applicative-constant)
- [apply (constant)](#apply-constant)
- [chain (constant)](#chain-constant)
- [field (constant)](#field-constant)
- [functor (constant)](#functor-constant)
- [monad (constant)](#monad-constant)
- [monoid (constant)](#monoid-constant)
- [ord (constant)](#ord-constant)
- [ring (constant)](#ring-constant)
- [semigroup (constant)](#semigroup-constant)
- [semiring (constant)](#semiring-constant)
- [setoid (constant)](#setoid-constant)
- [setoidAsyncFromEquals (function)](#setoidasyncfromequals-function)
- [setoidAsyncOf (function)](#setoidasyncof-function)

---

# SetoidAsync (type alias)

**Signature**

```ts
export type SetoidAsync<A> = { equals: (a: A, b: A) => Task<boolean> }
```

# applicative (constant)

**Signature**

```ts
export const applicative = ...
```

# apply (constant)

**Signature**

```ts
export const apply = ...
```

# chain (constant)

**Signature**

```ts
export const chain = ...
```

# field (constant)

**Signature**

```ts
export const field = ...
```

# functor (constant)

**Signature**

```ts
export const functor = ...
```

# monad (constant)

**Signature**

```ts
export const monad = ...
```

# monoid (constant)

**Signature**

```ts
export const monoid = ...
```

# ord (constant)

**Signature**

```ts
export const ord = ...
```

# ring (constant)

**Signature**

```ts
export const ring = ...
```

# semigroup (constant)

**Signature**

```ts
export const semigroup = ...
```

# semiring (constant)

**Signature**

```ts
export const semiring = ...
```

# setoid (constant)

**Signature**

```ts
export const setoid = ...
```

# setoidAsyncFromEquals (function)

**Signature**

```ts
export const setoidAsyncFromEquals: <A>(equals: (a: A, b: A) => Task<boolean>) => SetoidAsync<A> = equals => ...
```

# setoidAsyncOf (function)

**Signature**

```ts
export const setoidAsyncOf: <A>(S: Setoid<A>) => SetoidAsync<A> = S => ({ equals: (a, b) => ...
```
