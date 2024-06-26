/* eslint-disable vue/multi-word-component-names */

<template>
  <div>
    <h2>Statistics</h2>
    <button @click="fetchStatistics">Get Statistics</button>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th v-for="subject in subjects" :key="subject">{{ subject }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in statistics" :key="student.id">
          <td>{{ student.name }}</td>
          <td v-for="subject in subjects" :key="subject">{{ student.grades[subject] }}</td>
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
      subjects: ['國語', '數學', '社會', '健康'],
      statistics: []
    };
  },
  methods: {
    async fetchStatistics() {
      try {
        const response = await fetch('/api/statistics');
        const data = await response.json();
        this.statistics = data.statistics;
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
