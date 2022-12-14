<template>
  <div class="board">
    <table>
      <colgroup>
        <col style="width: 18.5%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">작성자</th>
          <td>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              v-model="list.author"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">제목</th>
          <td>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              v-model="list.title"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">내용</th>
          <td>
            <textarea
              rows="10"
              placeholder="내용을 입력하세요."
              v-model="list.content"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <div class="right">
        <button class="button blue" @click="registBoard">등록</button>
        <button class="button" @click="cancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: {
        title: "",
        author: "",
        content: "",
      },
    };
  },
  methods: {
    //등록버튼 눌렀을 시
    registBoard() {
      const body = {
        title: this.list.title,
        created_at: new Date().toLocaleString(), // regist함수 안에 넣어 줄 것
        modified_at: new Date().toLocaleString(),
        author: this.list.author,
        content: this.list.content,
      };
      // this.$store.dispatch("FETCH_LIST", this.list);
      axios
        .post(`http://192.168.70.212/posts`, body)
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          alert("등록되었습니다.");
        })
        .then(() => this.$router.push({ name: "home" }))
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$router.go(-1); //이전 페이지로 돌아감
    },
  },
};
</script>

<style>
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
  padding: 7px 20px 9px 20px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  line-height: 150%;
}
.board table td input,
.board table td textarea {
  width: 100%;
  color: #000 !important;
}
.buttons {
  position: relative;
  height: 32px;
  margin-top: 10px;
  margin-bottom: 50px;
}
.buttons > div.right {
  position: absolute;
  height: 32px;
  right: 0;
}
.buttons > div > .button {
  overflow: visible;
  cursor: pointer;
  min-width: 125px;
  height: 32px;
  margin: 0 2px;
  padding: 0 15px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #dfdfdf;
  background: #fff;
  border-radius: 10px;
}
.buttons > div > .button.blue {
  /* color: #fff; */
  /* border-color: #0099d2 !important;
  background: #0099d2 !important; */
}
</style>
