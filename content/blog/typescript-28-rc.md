---
title: TypeScript 2.8 RC
date: 2018-03-25
tags: [typescript, javascript, news]
categories: [development]
type: post
---

Am 2018-03-15 wurde der erste „[release candidate](https://de.wikipedia.org/wiki/Entwicklungsstadium_(Software)#Release_Candidate/Prerelease)“ von [TypeScript 2.8](https://blogs.msdn.microsoft.com/typescript/2018/03/15/announcing-typescript-2-8-rc/) veröffentlicht.

Für mich sind folgende Features relevant:

* Conditional Types
* Granular Control on Mapped Type Modifiers

## Conditional Types

Hiermit kann ich den Typen eines Ausdrucks zur Compile-Zeit dynamisch bestimmen. Benutzt werden dazu [der ternären Auswahloperator `?:`](https://de.wikipedia.org/wiki/Bedingte_Anweisung_und_Verzweigung#Auswahloperator).

Hier ein Beispiel aus dem oben erwähnten Artikel:

```typescript
type IdOrName<T extends number | string> =
    T extends number ? Id : Name;

declare function createLabel<T extends number | string>(idOrName: T): IdOrName<T>;

let a = createLabel("tim");         // Name
let b = createLabel(42);            // Id
let c = createLabel("" as any);     // Id | Name
let d = createLabel("" as never);   // never
```

Zuerst wird der Typ `IdOrName` definiert, der einen Typparameter `T extends number | string` hat, dieser besagt das T entweder ein String oder eine Zahl sein kann und definiert sich dann über den „Conditional Type“. Wenn `T` vom Typen `number` ist, dann ist der Typ `IdOrName<T>` vom Typen `Id` in fast allen anderen Fällen vom Typen `Name`. Als nächstes wird die Funktion `createLabel` erzeugt um ein paar Beispiele zu zeigen. Die Funktion hat einen Typparameter `T` der nur `number` oder `string` sein kann und benutzt diesen im Parameter `idOrName` über den sich dann auch der Rückgabetyp `IdOrName<T>` ergibt. Gibt man den Wert `42` für den Parameter `idOrName` rein, so ist der Rückgabetyp den effektiven Typen `Id`. Für die Werte `"tim"`, `[]` oder auch `{}` würde der effektive Typ `Name` zurück gegeben werden. Es gibt 2 Sonderfälle, zum einen der Typ `any`, der alle Werte annehmen kann, entsprechend ist hier der effektive Typ auch `Id | Name`, das heist es ist der Typ `Id` oder `Name`. Zum anderen gibt es noch den Typen `never`, dort wird der effektive Typ von `IdOrName<T>` zu `never`.

## Granular Control on Mapped Type Modifiers

Als zweites neue Feature gibt es „Granular Control on Mapped Type Modifiers“. Damit kann man die `readonly` Eigenschaft und die `undefined`-Spezifität in Typen ändern die einen Index-Accessor für das Objekt bereitstellen. Hier das Beispiel aus dem original Blog-Artikel:

```typescript
interface Foo {
    readonly abc: number;
    def?: string;
}

type Props<T> = {
    [P in keyof T]: T[P]
}

// All modifiers are copied over.
// 'abc' is read-only, and 'def' is optional.
type IdenticalFoo = Props<Foo>
```

Wir haben hier das Interface `Foo` das die `readonly`-Eigenschaft `abc` und die optionale Eigenschaft `def`. Jetzt definieren wir den Typen `Props` mit den generischen Parameter `T` der einen Index-Access bereitstellt. Als Index sind nur Attribute des Typen `T` erlaubt und der Accessor gibt auch die Werte einfach so zurück. Aus diesem Grund verhällt sich der Typ `IdenticalFoo` genau so wie das Interface `Foo`. Soweit so gut, jetzt die Neuerung:

```typescript
type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}

interface Foo {
    readonly abc: number;
    def?: string;
}

// 'abc' is no longer read-only, but 'def' is still optional.
type TotallyMutableFoo = Mutable<Foo>
```

Durch die Angabe von `-readonly` beim Typen `Mutable` wird nun die Eigenschaft `readonly` des Interfaces ignoriert. Auch hinzugekommen ist, das man optionale Felder zu erforderlichen machen kann:

```typescript
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
}
```

Neben dem entfernen der Eigenschaften von Attributen, kann man sie auch wieder hinzufügen: 

```typescript
/**
 * Make all properties in T optional
 */
type OptionalReadonly<T> = {
    +readonly [P in keyof T]+?: T[P];
}
```

## Fazit

Es gibt noch ein paar mehr Änderungen im Bereich [JSX](https://reactjs.org/docs/introducing-jsx.html), da ich das aktuell nicht benutze hat das für mich keine Relevanz. Das könnte sich mit [Stencil](https://stenciljs.com/) allerdings ändern.

Insgesamt bin ich sehr zufrieden mit der Entwicklung von TypeScript weiterhin sehr zufrieden.
