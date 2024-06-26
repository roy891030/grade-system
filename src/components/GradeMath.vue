<template>
  <div>
    <h2>輸入數學成績</h2>
    <form @submit.prevent="submitGrade">
      <label for="time">時間:</label>
      <input v-model="time" id="time" type="datetime-local" required />

      <label for="gradeType">成績類型:</label>
      <select v-model="gradeType" id="gradeType" required>
        <optgroup label="作業">
          <option value="習作">習作</option>
          <option value="學習單">學習單</option>
        </optgroup>
        <optgroup label="考試">
          <option value="小考">小考</option>
          <option value="期中考">期中考</option>
          <option value="期末考">期末考</option>
        </optgroup>
        <option value="上課表現">上課表現</option>
      </select>

      <label for="chapter">章節/單元:</label>
      <input v-model="chapter" id="chapter" type="text" required />
  
      <table>
        <thead>
          <tr>
            <th v-for="i in 10" :key="'header-' + i">學生{{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 4" :key="'row-' + row">
            <td v-for="col in 10" :key="'col-' + col">
              <input v-model="grades[(row - 1) * 10 + (col - 1)]" type="number" min="0" max="100" />
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'GradeMath',
  data() {
    return {
      time: '',
      gradeType: '',
      chapter: '',
      grades: Array(40).fill('')
    };
  },
  methods: {
    async submitGrade() {
  try {
    const response = await fetch('http://localhost:3000/api/grades/math', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        time: this.time,
        gradeType: this.gradeType,
        chapter: this.chapter,
        grades: this.grades
      })
    });
    const data = await response.json();
    if (data.success) {
      alert('Grade submitted successfully!');
    } else {
      alert('Failed to submit grade.');
    }
  } catch (error) {
    console.error('Error submitting grade:', error);
  }
}
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  margin-top: 10px;
  display: block;
  text-align: left;
  width: 100%;
  max-width: 400px;
}
input[type="datetime-local"],
select,
input[type="text"] {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  max-width: 400px;
}
table {
  margin-top: 20px;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
input[type="number"] {
  width: 100%;
  box-sizing: border-box;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #45a049;
}
</style>
