<!--
sudo node server.js
npm run serve 
-->
<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/grade-input">Grade Input</router-link></li>
        <li><router-link to="/missing-assignments">Missing Assignments</router-link></li>
        <li><router-link to="/statistics">Statistics</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

#app {
  text-align: center;
}

nav {
  background-color: transparent;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

li {
  margin: 0 1rem;
}

a {
  color: #4CAF50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  nav {
    padding: 0.5rem;
  }

  ul {
    flex-direction: column;
  }

  li {
    margin: 0.5rem 0;
  }

  a {
    padding: 0.5rem;
  }
}
</style>
