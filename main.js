let student = [{
    name: 'John',
    score: 25,
    grade:'A'
},
{
    name:'Jane',
    score: 75;,
    grade: 'B'
},
{
    name: 'Jin',
    score: 60;,
    grade:'C'
}
]
let student = student.find((s) =>{
    if(s.name==='Jane'){
        return true
    }
})