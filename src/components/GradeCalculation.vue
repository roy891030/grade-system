<template>
    <div class="grade-calculation">
      <h2>成績試算</h2>
      <nav>
        <ul>
          <li><button @click="fetchGrades('國語')" class="subject-button chinese">國語</button></li>
          <li><button @click="fetchGrades('數學')" class="subject-button math">數學</button></li>
          <li><button @click="fetchGrades('社會')" class="subject-button social">社會</button></li>
          <li><button @click="fetchGrades('健康')" class="subject-button health">健康</button></li>
        </ul>
      </nav>
      <table v-if="calculatedGrades.length">
        <thead>
          <tr>
            <th>學生ID</th>
            <th>期中考</th>
            <th>期末考</th>
            <th>其他成績平均</th>
            <th>最終成績</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in calculatedGrades" :key="student.student_id">
            <td>{{ student.student_id }}</td>
            <td>{{ student.midterm || 'null' }}</td>
            <td>{{ student.final || 'null' }}</td>
            <td>{{ student.otherAvg || 'null' }}</td>
            <td>{{ student.finalGrade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GradeCalculation',
    data() {
      return {
        grades: [],
        calculatedGrades: [],
        currentSubject: ''
      };
    },
    methods: {
      async fetchGrades(subject) {
        this.currentSubject = subject;
        try {
          const response = await fetch(`/api/grades/${encodeURIComponent(subject)}`);
          const data = await response.json();
          if (data.success) {
            this.grades = data.grades;
            this.calculateFinalGrades();
          } else {
            alert('Failed to fetch grades.');
          }
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
      },
      calculateFinalGrades() {
        const studentGradesMap = new Map();
        this.grades.forEach(grade => {
          if (!studentGradesMap.has(grade.student_id)) {
            studentGradesMap.set(grade.student_id, { student_id: grade.student_id, midterm: 0, final: 0, other: [] });
          }
          const student = studentGradesMap.get(grade.student_id);
          if (grade.grade_type === '期中考') {
            student.midterm = grade.score;
          } else if (grade.grade_type === '期末考') {
            student.final = grade.score;
          } else {
            student.other.push(grade.score);
          }
        });
  
        this.calculatedGrades = Array.from(studentGradesMap.values()).map(student => {
          const midterm = student.midterm || 0;
          const final = student.final || 0;
          const otherAvg = student.other.length ? (student.other.reduce((acc, score) => acc + score, 0) / student.other.length).toFixed(2) : 0;
          const finalGrade = (midterm * 0.3 + final * 0.3 + otherAvg * 0.4).toFixed(2);
          return { ...student, otherAvg, finalGrade };
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .grade-calculation {
    text-align: center;
    margin-top: 20px;
  }
  
  nav {
    margin-top: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center; /* Center the buttons horizontally */
    gap: 15px; /* Adjust the space between buttons */
  }
  
  li {
    display: inline;
  }
  
  .subject-button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 25px;
    border-color: rgba(240, 248, 255, 0);
    background-color: #007bff;
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .subject-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* Slightly raise the button on hover */
  }
  
  .subject-button.chinese {
    background-color: #ff9999;
  }
  
  .subject-button.math {
    background-color: #99ccff;
  }
  
  .subject-button.social {
    background-color: #ffcc99;
  }
  
  .subject-button.health {
    background-color: #99ff99;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px; /* Add some space between buttons and table */
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  small {
    display: block;
    font-size: 0.8em;
    color: gray;
  }
  
  button {
    margin-top: 5px;
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .edit-button {
    background-color: #4CAF50; /* Green */
  }
  
  .edit-button:hover {
    background-color: #45a049;
  }
  
  .save-button {
    background-color: #008CBA; /* Blue */
  }
  
  .save-button:hover {
    background-color: #007bb5;
  }
  
  .delete-button {
    background-color: #f44336; /* Red */
  }
  
  .delete-button:hover {
    background-color: #da190b;
  }
  
  .table-row:hover {
    background-color: #f0f0f0; /* Add a light gray background color on hover */
  }
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .modal p {
    margin: 0 0 20px;
  }
  
  .modal button {
    margin: 0 10px;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  </style>
  