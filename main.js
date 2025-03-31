/*
con ค่าคงที่
let ค่าเปลี่ยนแปลงได้
==เท่ากับ
!=ไม่เท่ากับ
>มากกว่า
<น้อยกว่า
>=มากกว่าหรือเท่ากับย
<=น้อยกว่าเท่ากับ

let number1 = 5;
let number2 = 3;

let condition1 = number1 >= number2; //Boolean ค่าที่ได้จะเป็น true หรือ false
console.log('result of condition is',condition1); */



/*
let number1=5;
let number2=5;
//if - else condition
if (number1!=number2){
    console.log('this is if');
}else if (number1==number2) {
    console.log('this is else if');
}else { 
    console.log('this is else');
} */




/*
    let score=prompt('Enter your score:');
console.log('your score is '+score);
//if - else condition
if (score>=80) { //false
    console.log('you are grade A');
}else if  (score>=70) {
    console.log('you are grade B');
}else if (score>=60) {
    console.log('you are grade C');
}else if (score>=50) {
    console.log('you are grade D');
}else {
    console.log('you are grade F');
} */



/*
&& และ
|| หรือ
! ไม่

let number1=5;
let number2=8;

let condition=number1>=3 && number2>=5;
console.log('result of condition',condition);

let age=30;
let gender='male';

//true && true = true
if (age>=20 && gender =='male') {
    console.log('You are male adult');
} */

    


/*let number=20;
//ไม่ใช่เลขคู่
if(!(number%2 !=0)) {
    console.log('you are even number');
} */




/*
while loop
for

let counter = 0;

while (counter < 10) {//true
    console.log('while loop');
    counter = counter +1;
    counter+=1
    counter++ //ความหมายเหมือนกัน+1
}

for (let counter = 0; counter < 10; counter = counter +1) {
    console.log('for loop')
} */




/*
array
 
let age1 = 20;
let age2 = 30;
let age3 = 40;
let age4 = 50;
console.log(age1, age2, age3, age4);

let ages = [30, 35 , 40];
console.log('new age', age[2]);
console.log('age list'ages);

//1.แทนที่ค่าใน array
ages = [45, 50];
console.log('new age',ages);

//2.ต่อ array
ages.push(55);
console.log('new age',ages);
*/
/*let ages = [90,60,40,45,50];
console.log(ages);
ages.sort();
console.log(ages);

let name_list=['John','Bob','Alice','Mary']
name_list.push('Mike');
console.log(name_list.length);
console.log(name_list[0]);
console.log(name_list[1]);
console.log(name_list[2]);

for (let index =0; index < name_list.length; index++) {
    console.log(name_list[index]);
} */




/*
object

let student = [{
    name: 'zz',
    age:90,
    grade:'A'
},{
    name:'aa',
    age:66,
    grade:'B'
}];

student.pop()

for (let index =0; index < student.length; index++){
    console.log('Student name',(index+1));
    console.log('name',student[index].name);
    console.log('age',student[index].age);
    console.log('grade',student[index].grade);
} */



/*
let scores1=50
let scores2=90
let grades=''
function calculateGrade(scores) {
    if (scores>=80) {
        grades='A';
    }else if (scores>=70) {
        grades='B';
    }else if (scores>=60) {
        grades='C';
    }else if (scores>=50) {
        grades='D';
    }else {
        grades='F';
    }
    return grades
}
let student1 = calculateGrade(scores1)
let student2 = calculateGrade(scores2)
console.log('grade: ',student1,student2)
*/



/*
array1

let scores = [10,20,30,40,50,60,70,80,90,100];
for (let index = 0; index < scores.length; index++) {
    console.log('score:',scores[index]);
}
/*
scores[0]=scores[0]*2;
scores[1]=scores[0]*2;
scores[2]=scores[0]*2;
scores[3]=scores[0]*2;
scores[4]=scores[0]*2;
*/
//เขียนแบบง่ายสั้นๆ
/*
scores=scores.map((s)=> {
    return s*2;
});

scores.forEach((s)=> {
console.log('new score:',s)
}) */

/* array2 */
let scores = [10,20,30,40];
let newScorets=[]

for (let index = 0; index < scores.length; index++) {
    console.log('score:',scores[index]);
    /*
    if (scores[index]>=30) {
    newScorets.push(scores[index]);
}
*/
}
//เขียนแบบง่ายสั้นๆ
/*let newScorets = scores.filter((s)=> {
        return s; */

/*let newScorets = scores.filter((s)=> {
    if (s>=30) {
        return true;
    }else {
        return false;
    }
});
newScorets.forEach((ns)=> {
    console.log('new score:',ns);
}) */

/* object functions */
let students = [
    {
    name: 'John',
    score: 90,
    grade: 'A'
},
{
    name: 'Jane',
    score: 75,
    grade: 'B'
},
{
    name: 'Jim',
    score: 60,
    grade: 'C'
}
]
let student = students.find((s) => {
    if (s.name === 'Jane') {
        return true
    }
})
let doublescore = students.map((s) => {
    s.score = s.score * 2;
})
let highscore_student = students.filter((s) => {
    if (s.score>80){
        return true
    }
})
console.log('student:',student)
console.log('highscore_student:',highscore_student)