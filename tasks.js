const f1 = (generator, args) => {
    console.log(`waiting for 5 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 3000)
}

const f2 = (generator, args) => {
    console.log(`waiting for 6 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            // err: 'Error in f2, begin rolling back'
            arg: 'argument'
        })
    }, 4000)
}

const f3 = (generator, args) => {
    console.log(`waiting for 7 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            // arg: 'argument'
            err: 'Error in f3()'
        })
    }, 5000)
}

const f4 = (generator, args) => console.log(`Finished with sequence, received args: ${JSON.stringify(args, null, 3)}`)

module.exports = [
    f1,
    f2,
    f3,
    f4
]