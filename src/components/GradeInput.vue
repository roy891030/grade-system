<template>
  <div class="grade-input">
    <h2>Select Subject</h2>
    <nav>
      <ul>
        <li><router-link to="/grade-input/chinese" class="subject-button chinese">Chinese</router-link></li>
        <li><router-link to="/grade-input/math" class="subject-button math">Math</router-link></li>
        <li><router-link to="/grade-input/social" class="subject-button social">Social</router-link></li>
        <li><router-link to="/grade-input/health" class="subject-button health">Health</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'GradeInput'
};
</script>

<style scoped>
.grade-input {
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
  background-color: #007bff;
  color: white;
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
</style>
