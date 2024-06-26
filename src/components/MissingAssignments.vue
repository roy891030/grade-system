<template>
    <div>
      <h2>Missing Assignments</h2>
      <button @click="fetchMissingAssignments">Check Missing Assignments</button>
      <ul>
        <li v-for="student in missingAssignments" :key="student.id">
          {{ student.name }} is missing {{ student.subject }} assignments.
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        missingAssignments: []
      };
    },
    methods: {
      async fetchMissingAssignments() {
        try {
          const response = await fetch('/api/missing-assignments');
          const data = await response.json();
          this.missingAssignments = data.missingAssignments;
        } catch (error) {
          console.error('Error fetching missing assignments:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 20px;
  }
  ul {
    margin-top: 20px;
    list-style-type: none;
  }
  </style>
  