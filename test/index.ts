import * as fc from 'fast-check'
import * as E from 'fp-ts/lib/Either'
import { fieldNumber } from 'fp-ts/lib/Field'
import { monoidSum, monoidString } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { setoidNumber, setoidString, Setoid } from 'fp-ts/lib/Setoid'
import * as V from 'fp-ts/lib/Validation'
import * as laws from '../src'
import { getEither } from '../src/Either'
import { getOption } from '../src/Option'
import { getValidation } from '../src/Validation'
import { setoidAsyncOf, setoidAsyncFromEquals } from '../src/laws'
import * as T from 'fp-ts/lib/Task'
import { sequenceT } from 'fp-ts/lib/Apply'

describe('setoid', () => {
  it('should test Setoid laws', () => {
    laws.setoid(setoidNumber, fc.float())
  })
})

describe('ord', () => {
  it('should test Ord laws', () => {
    laws.ord(ordNumber, fc.float())
  })
})

describe('my semigroup instance', () => {
  it('should test Semigroup laws', () => {
    const semigroupSpace: Semigroup<string> = {
      concat: (x, y) => x + ' ' + y
    }
    laws.semigroup(semigroupSpace, setoidString, fc.string())
  })
})

describe('monoid', () => {
  it('should test Monoid laws', () => {
    laws.monoid(monoidSum, setoidNumber, fc.float())
  })
})

describe('semiring', () => {
  it('should test Semiring laws', () => {
    const seed = 1552808164540
    laws.semiring(fieldNumber, setoidNumber, fc.float(), seed)
  })
})

describe('ring', () => {
  it('should test Ring laws', () => {
    const seed = 1552808164540
    laws.ring(fieldNumber, setoidNumber, fc.float(), seed)
  })
})

// describe('field', () => {
//   it('should test Field laws', () => {
//     const seed = Date.now()
//     // tslint:disable-next-line: no-console
//     console.log(seed)
//     laws.field(fieldNumber, setoidNumber, fc.float(), seed)
//   })
// })

describe('functor', () => {
  it('should test Functor laws', async () => {
    await laws.functor(O.option, getOption, S => setoidAsyncOf(O.getSetoid(S)))
    await laws.functor(E.either, arb => getEither(fc.string(), arb), S => setoidAsyncOf(E.getSetoid(setoidString, S)))
    await laws.functor(
      V.validation,
      arb => getValidation(fc.string(), arb),
      S => setoidAsyncOf(V.getSetoid(setoidString, S))
    )
  })
})

describe('apply', () => {
  it('should test Apply laws', async () => {
    await laws.apply(O.option, getOption, S => setoidAsyncOf(O.getSetoid(S)))
    await laws.apply(E.either, arb => getEither(fc.string(), arb), S => setoidAsyncOf(E.getSetoid(setoidString, S)))
    await laws.apply(
      V.getApplicative(monoidString),
      arb => getValidation(fc.string(), arb),
      S => setoidAsyncOf(V.getSetoid(setoidString, S))
    )
  })
})

describe('applicative', () => {
  it('should test Applicative laws', async () => {
    await laws.applicative(O.option, getOption, S => setoidAsyncOf(O.getSetoid(S)))
    await laws.applicative(
      E.either,
      arb => getEither(fc.string(), arb),
      S => setoidAsyncOf(E.getSetoid(setoidString, S))
    )
    await laws.applicative(
      V.getApplicative(monoidString),
      arb => getValidation(fc.string(), arb),
      S => setoidAsyncOf(V.getSetoid(setoidString, S))
    )
  })
})

const liftSetoidTask = <A>(S: Setoid<A>) =>
  setoidAsyncFromEquals((a: T.Task<A>, b: T.Task<A>) => sequenceT(T.task)(a, b).map(([a, b]) => S.equals(a, b)))

describe('monad', () => {
  it('should test Monad laws', async () => {
    await laws.monad(O.option, S => setoidAsyncOf(O.getSetoid(S)))
    await laws.monad(E.either, S => setoidAsyncOf(E.getSetoid(setoidString, S)))
    await laws.monad(V.getMonad(monoidString), S => setoidAsyncOf(V.getSetoid(setoidString, S)))
    await laws.monad(T.task, liftSetoidTask)
  })
})
