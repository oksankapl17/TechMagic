import {from, fromEvent, merge, of} from 'rxjs';
import {filter, map, scan, reduce, combineLatestWith} from 'rxjs/operators';
import {MOCK_CARS, MOCK_USERS} from './mock-data';

console.clear();

/* Task 1  **/
// create variable result$ that sums all numbers in array
// extend with pipe operators, so that you will get expected result
// for example for array [1, 'a', 4, null, '8']
// you should get 1 + 4 + 8 = 13

// Data Source
const dataSource = from([3, 1, '939', null, 3, {numb: 3}, undefined, 'number']);
const source$ = from(dataSource);

const result$ = source$.pipe(
    map(el => +el),
    filter(d => typeof d === 'number' && !isNaN(d)),
    reduce((acc: number, val: number) => acc + val)
);
result$.subscribe((value) => console.log(value));

/* Task 2 **/
// lets imagine that it is some kind of http call
// that returns us some users
// you should create variable countUsers$
// it will return us number of users which name starts with 'a' or 'A' or 'c' or 'C'

// Data Source
interface MockUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
}
interface fetchUsersType {
    users: MockUser[];
}
const fetchUsers = {
    users: MOCK_USERS
};

const fetchData$ = of(fetchUsers);

const countUsers$ = fetchData$.pipe(
    map((el: fetchUsersType) => el.users),
    map((users: MockUser[]) => users.filter(u => ['c', 'C', 'a', 'A'].includes(u.first_name.charAt(0)))),
);
countUsers$.subscribe((numberOfUsers) => console.log(numberOfUsers));



/* Task 3 **/

// lets imagine that you have web application that sells cars
// some user want to buy a car which price is less than 22000 (if its price is 22000 - it is ok for user)
// and not older than 4 years old (if its age is 4 - it is ok for user)
// so we need to filter all cars that are older or more expensive
// and also you should return cars as string
// '#model - #age: #price $'
// for example
// {
//   "age": 14,
//   "model": "Oldsmobile",
//   "price": 32966
// }
// this car you should return as 'Oldsmobile - 14: 32966 $'

// Data Source
interface MockCar {
    age: number;
    model: string;
    price: number;
}
const cars$ = from(MOCK_CARS);

const filteredCars$ = cars$.pipe(
    filter((el: MockCar) => el.age <= 4 && el.price <= 22000),
    map(car => `${car.model} - ${car.age}: ${car.price} $`)
)
filteredCars$.subscribe((car) => console.log(car));


/* Task 4 **/
// Last one will be easy
// you need to calculate sum of values from both inputs
// only if they are both numbers and both are present
// Tip: look for operators that somehow merge or combine streams
interface InputEventTarget extends EventTarget {
    value?: string
}
interface InputEvent extends Event {
    readonly target: InputEventTarget
}
const valueAEl = document.getElementById('valueA');
const valueBEl = document.getElementById('valueB');
const input1$ = fromEvent(valueAEl, 'input')
const input2$ = fromEvent(valueBEl, 'input')
// 1
merge(input1$, input2$).pipe(
    map((ev: InputEvent) => Number(ev?.target?.value)),
    filter(d => typeof d === 'number' && !isNaN(d)),
    scan((acc: number, val: number) => acc + val, 0)
).subscribe(val => console.log('cumulative', val));

// 2
input1$.pipe(
    combineLatestWith(input2$),
    map(([e1, e2] : [e1: InputEvent, e2: InputEvent]) => Number(e1.target.value) + Number(e2.target.value)),
).subscribe(val => console.log('sum', val));
