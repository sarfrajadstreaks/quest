const chalk = require('chalk')
const log = console.log
var beforeEachs = []
var afterEachs = []
var afterAlls = []
var beforeAlls = []
var Totaltests = 0
var passedTests = 0
var failedTests = 0
var stats = []
var currDesc = {
    it: []
}

var currIt = {}

function beforeEach(fn) {
    beforeEachs.push(fn)
}

function afterEach(fn) {
    afterEachs.push(fn)
}

function beforeAll(fn) {
    beforeAlls.push(fn)
}

function afterAll(fn) {
    afterAlls.push(fn)
}

function expect(value) {
    return {

        // Match or Asserts that expected and actual objects are same.
        toBe: function(expected) {
            if (value === expected) {
                currIt.expects.push({ name: `expect ${value} toBe ${expected}`, status: true })
                passedTests++
            } else {
                currIt.expects.push({ name: `expect ${value} toBe ${expected}`, status: false })
                failedTests++
            }
        },

        // Match the expected and actual result of the test.
        toEqual: function(expected) {
            if (value == expected) {
                currIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: true })
                passedTests++
            } else {
                currIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: false })
                failedTests++
            }
        }
    }
}

function it(desc, fn) {
    Totaltests++
    if (beforeEachs) {
        for (var index = 0; index < beforeEachs.length; index++) {
            beforeEachs[index].apply(this)
        }
    }
    //var f = stats[stats.length - 1]
    currIt = {
            name: desc,
            expects: []
        }
        //f.push(desc)
    fn.apply(this)
    for (var index = 0; index < afterEachs.length; index++) {
        afterEachs[index].apply(this)
    }
    currDesc.it.push(currIt)
}

function describe(desc, fn) {
    currDesc = {
        it: []
    }
    for (var index = 0; index < beforeAlls.length; index++) {
        beforeAlls[index].apply(this)
    }
    currDesc.name = desc
    fn.apply(this)
    for (var index = 0; index < afterAlls.length; index++) {
        afterAlls[index].apply(this)
    }
    stats.push(currDesc)
}

exports.showTestsResults = function showTestsResults() {
    console.log(`Total Test: ${Totaltests}    
Test Suites: passed, total
Tests: ${passedTests} passed, ${Totaltests} total
`)
    const logTitle = failedTests > 0 ? chalk.bgRed : chalk.bgGreen
    log(logTitle('Test Suites'))
    for (var index = 0; index < stats.length; index++) {
        var e = stats[index];
        const descName = e.name
        const its = e.it
        log(descName)
        for (var i = 0; i < its.length; i++) {
            var _e = its[i];
            log(`   ${_e.name}`)
            for (var ii = 0; ii < _e.expects.length; ii++) {
                const expect = _e.expects[ii]
                log(`      ${expect.status === true ? chalk.green('√') : chalk.red('X') } ${expect.name}`)
            }
        }
        log()
    }
}

global.describe = describe
global.it = it
global.expect = expect
global.afterEach = afterEach
global.beforeEach = beforeEach
global.beforeAll = beforeAll
global.afterAll = afterAll