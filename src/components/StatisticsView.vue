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
            <div class="header-content">
              <div>{{ header.grade_type }}｜{{ header.chapter }}</div>
              <small>{{ header.date }}</small>
              <div class="button-group">
                <button v-if="editingIndex !== index" @click="editColumn(index)" class="edit-button">[編輯]</button>
                <button v-if="editingIndex === index" @click="saveColumn(index)" class="save-button">[儲存變更]</button>
                <button @click="confirmDeleteColumn(index)" class="delete-button">[刪除整筆資料]</button>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in processedGrades" :key="student.student_id" class="table-row">
          <td>{{ student.student_id }}</td>
          <td v-for="(header, index) in headers" :key="index">
            <span v-if="!isEditing(index)">{{ student[header.key] || 'null' }}</span>
            <input v-else v-model="student[header.key]" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showDeleteConfirmation" class="modal">
      <p>你確定要刪除整筆資料嗎？</p>
      <button @click="deleteColumn">確定</button>
      <button @click="cancelDelete">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsView',
  data() {
    return {
      grades: [],
      headers: [],
      processedGrades: [],
      editingIndex: null,
      showDeleteConfirmation: false,
      deleteIndex: null,
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
          this.processGrades();
        } else {
          alert('Failed to fetch grades.');
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    },
    processGrades() {
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
    },
    isEditing(index) {
      return this.editingIndex === index;
    },
    editColumn(index) {
      this.editingIndex = index;
    },
    async saveColumn(index) {
      const header = this.headers[index];
      const key = header.key;
      const updates = this.processedGrades.map(student => ({
        student_id: student.student_id,
        score: student[key]
      }));
      try {
        const response = await fetch(`/api/grades/${encodeURIComponent(header.grade_type)}/${encodeURIComponent(header.chapter)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        });
        const data = await response.json();
        if (data.success) {
          this.editingIndex = null;
          this.fetchGrades(this.currentSubject);
        } else {
          alert('更新失败');
        }
      } catch (error) {
        console.error('Error saving grades:', error);
        alert('更新失败');
      }
    },
    confirmDeleteColumn(index) {
      this.deleteIndex = index;
      this.showDeleteConfirmation = true;
    },
    async deleteColumn() {
      const header = this.headers[this.deleteIndex];
      try {
        const response = await fetch(`/api/grades/${encodeURIComponent(header.grade_type)}/${encodeURIComponent(header.chapter)}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          this.showDeleteConfirmation = false;
          this.deleteIndex = null;
          this.fetchGrades(this.currentSubject);
        } else {
          alert('删除失败');
        }
      } catch (error) {
        console.error('Error deleting grades:', error);
        alert('删除失败');
      }
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
      this.deleteIndex = null;
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
  background-color: #00afe489; /* Add a light gray background color on hover */
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
