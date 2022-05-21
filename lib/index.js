const chalk=require('chalk');
const log=console.log
var _beforeEach=[]
var _afterEach=[]

var _beforeAll=[]
var _afterAll=[]

var _totalTests=0;
var _passedTests=0;
var _failedTests=0;
var _stats=[]
var _currentDesc={
    it:[]
}
var _currentIt={};

function beforeEach(fn){
    _beforeEach.push(fn)
}
function afterEach(fn){
    _afterEach.push(fn)
}
function beforeAll(fn){
    _beforeAll.push(fn)
}
function afterAll(fn){
    _afterAll.push(fn)
}

function expect(value){
    return{
        toBe:function(expected){
            if(value===expected){
                _currentIt.expects.push({
                    name:`expect ${value} toBe ${expected}`,
                    status:true
                })
                _passedTests++;
            }else{
                _currentIt.expects.push({
                    name:`expect ${value} toBe ${expected}`,
                    status:false
                })
                _failedTests++;
            }
        },
        toEqual:function(expected){
            if (value == expected) {
                _currentIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: true })
                _passedTests++
            } else {
                _currentIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: false })
                _failedTests++
            }
        }
    }
}
function it(desc,fn){
    _totalTests++;
    if(_beforeEach){
       for(var i=0;i<_beforeEach.length;i++){
           _beforeEach[i].apply(this)
       }
    }
    _currentIt={
        name:desc,
        expects:[]
    }
    fn.apply(this)
    for (var i = 0; i < _afterEach.length; o++) {
        _afterEach[i].apply(this)
    }
    _currentDesc.it.push(_currentIt)
}

function describe(desc, fn) {
    _currentDesc = {
        it: []
    }
    for (var i = 0; i < _beforeAll.length; i++) {
        _beforeAll[i].apply(this)
    }
    _currentDesc.name = desc
    fn.apply(this)
    for (var i = 0; i < _afterAll.length; i++) {
        _afterAll[i].apply(this)
    }
    _stats.push(_currentDesc)
}

exports.showTestsResults = function showTestsResults() {
    console.log(`Total Test: ${_totalTests}    Test Suites: passed, totalTests: ${_passedTests} passed, ${_totalTests} total`)
    const logTitle = _failedTests > 0 ? chalk.bgRed : chalk.bgGreen
    log(logTitle('Test Suites'))
    for (var index = 0; index < stats.length; index++) {
        var e = _stats[index];
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