// for-loop syntax
// for ([initial expression]; [condition]; [increment expression]) { 
//     statement
// }

// 'for' - keyword: let's interpreter know a loop is coming
// '()' - parenthesis tell the interpreter to look for the for loop's expressions 
// var, let, const - in the initial expression we initialize a variable to use as an index (typically 'i', 'j', 'x', or 'y')
// ';' the semicolon is used to delimit the end of the expression and start the next.
// condition - we can define any condition we like, however the most common is to check the length of an array or object.
// and we use the variable we defined in the previous expression
//      for example: i < students.length

// loop over students
var students = ['sam','joe','sue']

for ( var i = 0; i < students.length; i++ ) {
    // do some stuff. eg.
    // console.log( students[i] )  // => 'sam', 'joe', 'sue'
    if ( i === 2 ) {
        console.log( students[i] ) // => ? 'sue'
    }

}

// loop over range
for ( var i = 0; i < 5; i++ ) {
    // do something 5 times
    console.log( i )  // => 0, 1, 2, 3, 4
}

// loop in reverse
for ( var i = students.length - 1; i >= 0; i-- ) {
    // here we must 
}

//    indices: 0   1
var myRange = [0, 10] // 0 inclusive, 10 exclusive stop before 10 "up to but not including"
for ( var i = myRange[0]; i < myRange[1]; i++ ) {

}

// common errors
// forgetting to initialize the index
// for ( i < 5; i++ ) {
    // oops, we need var i = 0
    // this will throw a syntax error, so let's comment it out
// }

// initializing at the wrong position
for ( var i = 1; i < 5; i++ ) {
    // this will only loop 4 times, but I want it to lop 5 times...
}

// looping more times than an array has values
for ( var i = 0; i <= students.length; i++ ) {
    // students.length == 3, but we will loop 4 times,
    // so we will get: 0, 1, 2, undefined
}

