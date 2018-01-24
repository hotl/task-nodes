// Error Callback Functions

const f1cb = (generator, args) => console.log(`Finished with callback sequence, received args: ${JSON.stringify(args, null, 3)}`)

const f2cb = (generator, args) => {
    console.log(`undoing 5 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 3000)
}

const f3cb = (generator, args) => {
    console.log(`undoing 6 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 4000)
}

const f4cb = (generator, args) => {
    console.log(`undoing 7 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 5000)
}

module.exports = [
    f1cb,
    f2cb,
    f3cb,
    f4cb
]