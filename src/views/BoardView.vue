<template>
  <div class="board">
    <h1></h1>
    <div class="buttons">
      <div class="right">
        <router-link :to="{ name: 'new' }" class="button blue"
          ><span>쓰기</span></router-link
        >
      </div>
    </div>
    <table>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: *" />
        <col style="width: 15%" />
        <col style="width: 25%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in this.$store.state.list" v-bind:key="list.id">
          <td>{{ list.id }}</td>
          <td>
            <router-link :to="`/${list.id}`">{{ list.title }}</router-link>
          </td>
          <td>{{ list.author }}</td>
          <td>{{ list.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  //vuex에서 가져온 데이터를 랜더링 하기 위하여
  mounted() {
    this.$store.dispatch("FETCH_BOARD");
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.board {
  width: 800px;
  margin: 20px auto;
}
.board table {
  width: 100%;
  border-top: 1px solid #ccc;
  border-spacing: 0;
}
.board table th {
  padding: 8px 10px 10px 10px;
  vertical-align: middle;
  color: #1d4281;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
}
.board table td {
  padding: 7px 10px 9px 10px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  line-height: 150%;
}
.border a {
  text-decoration: none;
}

.buttons {
  position: relative;
  height: 32px;
  margin-bottom: 20px;
}
.buttons > div.right {
  position: absolute;
  height: 32px;
  right: 0;
}
.buttons > div > a.button {
  display: inline-block;
  min-width: 95px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 13px;
  text-align: center;
  text-decoration: none;
  border-radius: 20px;
}
.buttons > div > .button.blue {
  /* color: #fff; */
  /* border-color: #4267b8;
  background: #4267b8; */
}
</style>
