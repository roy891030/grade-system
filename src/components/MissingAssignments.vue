<template>
  <div>
    <h2>缺交作業查看</h2>
    <div v-for="subject in orderedSubjects" :key="subject" :class="subjectClass(subject)">
      <h3>{{ subject }}</h3>
      <table>
        <thead>
          <tr>
            <th>成績類型｜章節</th>
            <th>未提交的學生ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(assignment, index) in groupedAssignments[subject]" :key="index">
            <td>
              <div>{{ assignment.gradeType }}｜{{ assignment.chapter }}</div>
              <small>{{ assignment.date }}</small>
            </td>
            <td>{{ assignment.missingStudents.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissingAssignments',
  data() {
    return {
      missingAssignments: [],
      groupedAssignments: {},
      orderedSubjects: ['國語', '數學', '社會', '健康']
    };
  },
  methods: {
    async fetchMissingAssignments() {
      try {
        const response = await fetch('/api/missing-assignments');
        const data = await response.json();
        if (data.success) {
          this.missingAssignments = data.missingAssignments;
          this.groupAssignmentsBySubject();
        } else {
          alert('Failed to fetch missing assignments.');
        }
      } catch (error) {
        console.error('Error fetching missing assignments:', error);
      }
    },
    groupAssignmentsBySubject() {
      const grouped = {};
      this.missingAssignments.forEach(assignment => {
        if (!grouped[assignment.subject]) {
          grouped[assignment.subject] = [];
        }
        grouped[assignment.subject].push(assignment);
      });

      // 对每个科目组内的成績類型｜章節按日期排序
      Object.keys(grouped).forEach(subject => {
        grouped[subject].sort((a, b) => new Date(a.date) - new Date(b.date));
        // 对每个成績類型｜章節内的学生ID按升序排序
        grouped[subject].forEach(assignment => {
          assignment.missingStudents.sort((a, b) => a - b);
        });
      });

      this.groupedAssignments = grouped;
    },
    subjectClass(subject) {
      switch (subject) {
        case '國語':
          return 'subject-chinese';
        case '數學':
          return 'subject-math';
        case '社會':
          return 'subject-social';
        case '健康':
          return 'subject-health';
        default:
          return '';
      }
    }
  },
  created() {
    this.fetchMissingAssignments();
  }
};
</script>

<style scoped>
.subject-chinese {
  background-color: #ff9999;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.subject-math {
  background-color: #99ccff;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.subject-social {
  background-color: #ffcc99;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.subject-health {
  background-color: #99ff99;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px; /* Add some space between title and table */
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

h3 {
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
