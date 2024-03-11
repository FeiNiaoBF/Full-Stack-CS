import React from 'react';
/// Header
const Header = (props) => {
  //   console.log(props);
  return <h2>{props.course}</h2>;
};

/// Content
const Content = (props) => {
  return (
    <div>
      {props.part.map((part) => {
        console.log(part);
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      console.log('what is happening', props.part);
    </div>
  );
};

/// Part
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

/// Total
const Total = (props) => {
  //   console.log(props);
  var total = props.exercises.reduce((sum, part) => {
    // console.log('what is happening', sum, part);
    return sum + part.exercises;
  }, 0);
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      {props.course.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content part={course.parts} />
            <Total exercises={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
