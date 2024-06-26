<template>
  <div class="statistics-view">
    <h2>Select Subject</h2>
    <nav>
      <ul>
        <li><button @click="fetchGrades('國語')" class="subject-button chinese">Chinese</button></li>
        <li><button @click="fetchGrades('數學')" class="subject-button math">Math</button></li>
        <li><button @click="fetchGrades('社會')" class="subject-button social">Social</button></li>
        <li><button @click="fetchGrades('健康')" class="subject-button health">Health</button></li>
      </ul>
    </nav>
    <table v-if="grades.length">
      <thead>
        <tr>
          <th>學生ID</th>
          <th v-for="(header, index) in headers" :key="index">
            <div>{{ header.grade_type }}｜{{ header.chapter }}</div>
            <small>{{ header.date }}</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in processedGrades" :key="student.student_id">
          <td>{{ student.student_id }}</td>
          <td v-for="(header, index) in headers" :key="index">{{ student[header.key] || 'null' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StatisticsView',
  data() {
    return {
      grades: [],
      headers: [],
      processedGrades: []
    };
  },
  methods: {
    async fetchGrades(subject) {
      try {
        const response = await fetch(`/api/grades/${encodeURIComponent(subject)}`);
        const data = await response.json();
        if (data.success) {
          this.grades = data.grades;
          this.processGrades();
        } else {
          alert('Failed to fetch grades.');
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    },
    processGrades() {
      // 提取所有成績類型和章節/單元的组合，并添加日期，作为表头
      const headersSet = new Map();
      this.grades.forEach(grade => {
        const key = `${grade.grade_type}｜${grade.chapter}`;
        if (!headersSet.has(key)) {
          headersSet.set(key, { grade_type: grade.grade_type, chapter: grade.chapter, date: new Date(grade.date).toLocaleDateString(), key });
        }
      });

      // 按日期排序表头
      this.headers = Array.from(headersSet.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

      // 处理每个学生的成绩数据
      const studentGradesMap = new Map();
      this.grades.forEach(grade => {
        if (!studentGradesMap.has(grade.student_id)) {
          studentGradesMap.set(grade.student_id, { student_id: grade.student_id });
        }
        const key = `${grade.grade_type}｜${grade.chapter}`;
        studentGradesMap.get(grade.student_id)[key] = grade.score;
      });

      // 将 Map 转换为数组
      this.processedGrades = Array.from(studentGradesMap.values());
    }
  }
};
</script>

<style scoped>
.statistics-view {
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
</style>
